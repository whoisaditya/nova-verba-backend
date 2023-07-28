# Nova Verba - Backend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is the backend repository for Nova Verba, an innovative app designed to improve English language skills by recommending new words to users every single day. The app utilizes a Node.js backend with Express, MongoDB for the database, and Vercel for hosting. It also integrates with Firebase, enabling users to log in using their Google accounts.

The primary purpose of this repository is to handle all backend functionalities related to user management, word recommendation, and user word tracking. It leverages a free dictionary API, [DictionaryAPI](https://api.dictionaryapi.dev/api/v2/entries/en/), to search for new words and stores their meanings in the MongoDB database.

## Table of Contents

- [Nova Verba - Backend](#nova-verba---backend)
  - [Table of Contents](#table-of-contents)
  - [Demo](#demo)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [API Endpoints](#api-endpoints)
    - [User Routes](#user-routes)
  - [License](#license)

## Demo

Nova Verba is currently deployed and can be accessed at: [https://nova-verba.vercel.app/](https://nova-verba.vercel.app/)

## Technologies Used

- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Firebase](https://firebase.google.com/)
- [DictionaryAPI](https://api.dictionaryapi.dev/api/v2/entries/en/)
- [Vercel](https://vercel.com/)

## Installation

To run the Nova Verba backend locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/whoisaditya/nova-verba-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd nova-verba-backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the root of the project.
   - Add the necessary environment variables, including MongoDB connection string, Firebase credentials, and any other relevant configuration.

5. Run the server:

   ```bash
   npm start
   ```

6. The backend server will be accessible at `http://localhost:3000`.

## API Endpoints

### User Routes

- `POST /user/login`: User login route. Allows a user to log in using their Google account.

- `POST /user/streak/update`: Updates the current streak of a logged-in user.

- `POST /user/word/add`: Adds a new word for a logged-in user.

- `GET /user/details`: Retrieves the details of a logged-in user.

- `GET /user/word/search`: Searches for words related to a logged-in user.

For detailed information on request and response parameters for each endpoint, please refer to the code documentation.

## License

Nova Verba is open-source software licensed under the [MIT License](https://opensource.org/licenses/MIT).

---
Feel free to contribute to this project by creating issues or submitting pull requests. Happy learning and word discovering with Nova Verba! 🚀