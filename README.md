# Project: Mockr Microservice

## Visit the app on Heroku:
https://aqueous-crag-29295.herokuapp.com/

## Contributors
* [Sejin Kim](https://github.com/froydroyce)
* [Djavan Munroe](https://github.com/djavanm)
* [Eric O'Neill](https://github.com/eoneill23)
* [Aurie Gochenour](https://github.com/Myrdden)

## About the Project  
* The Mockr Microservice was built as to handle the functionality of sending a user an email once an interview has finished in the main application [Mockr](https://github.com/eoneill23/mockr)
* It was a was an extension feature of our 13 day group project, completed by two front-end and two back-end focused students at Turing School of Software and design.
* The purpose was to build a tested microservice that handled all the outgoing emails through SendGrid's server for the main application.

## Tech Stack
* Express.js
* Node.js
* Jest

## Packages Used
* Nodemailer

## GitHub Repositories for Connected Applications
* https://github.com/froydroyce/mockr_api
* https://github.com/eoneill23/mockr

## Local Setup
  ### Instructions:
      1. Clone the GitHub repository
      2. Go to the directory with the new repo  
      3. Run `npm install`
      4. create a `.env` file in root and add environment variables for sendgrid

        SENDGRID_USERNAME=<YOUR_USERNAME>
        SENDGRID_PASSWORD=<YOUR_PASSWORD>

      5. To run the server: `npm start`

  ### Run tests:
        1. Run `npm test`
        2. To run a single test file: `npm test -- <file_name>`
        3. To generate coverage report: `open coverage/lcov-report/index.html`

###  Interview Endpoint:

#### 1) User can send interview results via email to student

***Request:***
```
GET '/interviews/:interview_id'
```

***Response Example:***
```
status: 200
{ message: "success" }
```
