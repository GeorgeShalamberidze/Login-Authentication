# Login-Authentication
GraphQL/React/JWT

## Built with: 
 - GraphQL
 - Apollo
 - NodeJS
 - ReactJS
 - WebSocket

### Getting Started

1. Clone the repo
   ```sh
   git clone https://github.com/GeorgeShalamberidze/Login-Authentication.git
   ```
2. Install packages
   ```sh
   code.
   cd frontend
   npm install & npm start
   cd..
   cd backend
   npm install & npm start (nodemon index.js)
   ```

Client is subscribed to the graphql apollo server and recieving registered user count live.
App is using refresh token with 7 day expiration date. 
It counts the amount of users registered & your login attempts.
