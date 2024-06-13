<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Setup Instructions</title>
</head>
<body>
    <h1>Project Setup Instructions</h1>

    <h2>1. Install Frontend and Backend Node Modules</h2>
    <p>Open your terminal and navigate to the project's root directory. Then, run the following command to install the required Node modules:</p>
    <pre><code>npm install</code></pre>

    <h2>2. Add Environment Variables</h2>
    <p>Create a <code>.env</code> file in both the <strong>backend</strong> and <strong>frontend</strong> directories and set the following variables:</p>

    <h3>Backend (.env)</h3>
    <pre><code>
PORT=your_port_number
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
    </code></pre>

    <h3>Frontend (.env)</h3>
    <pre><code>
REACT_APP_API_URL=your_api_url
    </code></pre>

    <h2>3. Start Backend Server</h2>
    <p>Navigate to the <strong>backend</strong> directory and start the backend server by running the following command:</p>
    <pre><code>npm start</code></pre>

    <h2>4. Start Frontend Server</h2>
    <p>Navigate to the <strong>frontend</strong> directory and start the frontend server by running the following command:</p>
    <pre><code>npm run dev</code></pre>

    <h2>Project Overview</h2>
    <p>This project consists of a frontend and a backend. The frontend is built with React, and the backend is built with Node.js and Express. The project also includes MongoDB for the database and JSON Web Tokens (JWT) for authentication.</p>

    <h3>Frontend</h3>
    <p>The frontend is located in the <code>frontend</code> directory. It contains the React application that interacts with the backend API.</p>

    <h3>Backend</h3>
    <p>The backend is located in the <code>backend</code> directory. It contains the Express server and connects to the MongoDB database.</p>

    <h2>Getting Help</h2>
    <p>If you encounter any issues or have any questions, please refer to the project's documentation or open an issue on the GitHub repository.</p>

    <footer>
        <p>© 2024 Your Project Name</p>
    </footer>
</body>
</html>
