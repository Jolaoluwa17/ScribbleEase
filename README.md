# Scribblease - Notepad Application

Scribblease is a cross-platform notepad application built with React Native, designed to help users create, manage, and organize their notes effortlessly. This app integrates with a backend API using Axios, making it efficient for synchronizing and retrieving user notes across multiple devices.

## Features

- **Create Notes:** Easily create text notes with a simple, user-friendly interface.
- **Edit and Delete Notes:** Modify or remove notes as needed.
- **Search Functionality:** Quickly search through your notes.
- **Sync with Backend:** Notes are stored and retrieved from a server, ensuring users have access to their data across devices.
- **Real-time Updates:** API integration allows for near-instantaneous syncing between local data and the server.

## Technologies Used

- **Frontend:**
  - **React Native:** The core framework used for building the app, ensuring cross-platform compatibility (iOS and Android).
  - **Tailwind CSS:** For clean and responsive styling across the app.
  
- **Backend API Integration:**
  - **Axios:** Axios is used for handling all HTTP requests, providing seamless communication with the backend API to store, retrieve, and manage notes.
  - **REST API:** The app interacts with a RESTful API to handle note data. CRUD (Create, Read, Update, Delete) operations are efficiently implemented using Axios.

## Installation and Setup

To run the Scribblease application locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup) or [Expo CLI](https://expo.dev/)
- Backend API (details below)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/scribblease.git
   
2. Navigate into the project directory:
   cd scribblease
   
3. Install the dependencies:
   npm install

4. Set up your environment: Create an .env file in the root of the project and add your backend API URL (if applicable):
   REACT_APP_API_URL=https://your-api-url.com

5. Start the app: For React Native CLI:
   npx expo start

## API Endpoints
Scribblease interacts with a RESTful backend that handles various note-related operations. Here are the key endpoints:

GET /notes: Fetch all notes for the logged-in user.
POST /notes: Create a new note.
PUT /notes/:id: Update an existing note by ID.
DELETE /notes/:id: Delete a note by ID.

## Axios Configuration
Axios is configured with an API base URL to handle all HTTP requests efficiently. This is set in the app to ensure proper communication with the backend API.

import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,  // Backend API URL from .env file
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

## Contributing
We welcome contributions to Scribblease! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
