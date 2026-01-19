# Dark Room

A simple image gallery web application built with Node.js, Express, and MongoDB.

## Features

- Upload and display images
- Image gallery view
- Individual image viewing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB

## Installation

1. Clone the repository or download the project files
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```

## Configuration

Create a `_config.js` file with your MongoDB connection URI:

```javascript
module.exports = {
  mongoURI: {
    development: 'mongodb://localhost:27017/dark-room-dev',
    production: 'your-production-mongodb-uri'
  }
};
```

## Running the Application

1. Ensure MongoDB is running on your system
2. Start the server:
   ```
   node server.js
   ```
3. Open your browser and navigate to `http://localhost:5000`

## Environment Variables

You can also set the following environment variables:

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)

## Testing

Run the test suite:

```
npm test
```

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- EJS templating
- Multer for file uploads
