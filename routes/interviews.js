const express = require('express');
const router = express.Router();
const { request } = require('graphql-request');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

router.get('/:interview_id', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')

  let query =  `
    {
      interview(id:${req.params.interview_id}) {
        id
        score
        summary
        users {
          firstName
          lastName
          email
          role
        }
        notes {
          score
          body
          question {
            body
          }
        }
      }
    }
  `

  await request('https://thawing-wave-76846.herokuapp.com/graphql', query)
    .then(resp => {
      const intScore = resp.interview.score;
      const intSummary = resp.interview.summary;
      const student = resp.interview.users.find(user => user.role === 0);
      const interviewer = resp.interview.users.find(user => user.role === 1);
      const intName = `${interviewer.firstName} ${interviewer.lastName}`;
      const notes = resp.interview.notes.map(note =>
        `<h3>${note.question.body}</h3>
        <ul>
          <li>Score: ${note.score}</li>
          <li>${note.body}</li>
        </ul>`
      );
      const options = {
        auth: {
          api_user: process.env.SENDGRID_USERNAME,
          api_key: process.env.SENDGRID_PASSWORD
        }
      };
      const client = nodemailer.createTransport(sgTransport(options));

      const email = {
        to: student.email,
        from: 'no-reply@mockr.com',
        subject: 'Your mock interview results',
        text: 'plain text',
        html: `<h2>Results from your mock interview with ${intName}</h2>
          <ul>
            <li>Final Score: ${intScore}</li>
            <li>Final Summary: ${intSummary}</li>
          </ul>
          ${notes.join(" ")}`
      };

      client.sendMail(email)
        .then(emailRes => {
          if (!emailRes.message == 'success') {
            payload = {
              message: 'Email not sent.'
            }
            res.status(400).send(payload)
            return;
          }
          res.status(200).send(emailRes)
        })
    })
});

module.exports = router;
