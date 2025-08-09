# 👥 SEAI - Smart Real-Time Collaborative Platform for Coders

## Overview
SEAI is an advanced real-time messaging platform powered by cutting-edge AI and real-time communication technologies. It provides a seamless, responsive, and intelligent user experience for messaging, collaboration, and AI-driven functionalities.

---

## 🔥Features

### 1. Real-Time Messaging (Socket.io)
- Instant messaging for users with real-time updates.
- Powered by Socket.io for bi-directional communication.

### 2. AI-Powered Smart Chat (Google Gemini)
- **Auto-suggest Messages:** Context-aware message suggestions.
- **Conversation Summaries:** Concise AI-generated summaries of long chat histories.
- **Intelligent Replies & Insights:** Empathetic and insightful AI-generated responses.

### 3. User Authentication & Authorization (JWT)
- Secure login and registration using JSON Web Tokens (JWT).
- Role-based access for administrators and users.

### 4. Redis Caching
- Caching for frequently accessed data, including user sessions, chat lists, and statuses.
- Enhanced performance with faster response times.

### 5. Chat Rooms & Private Messaging
- Supports both 1-on-1 private messaging and group chat rooms.
- Includes typing indicators, read receipts, and online status tracking.

### 6. Responsive UI with React
- Built with React for a modern and mobile-responsive user interface.
- Real-time updates powered by Socket.io without requiring page reloads.

### 7. AI-Generated Code Execution
- Enables users to run AI-generated code directly in the browser.
- Provides real-time feedback and execution results.

### 8. Dynamic File Structure Development
- Dynamically generates file structures based on AI code.
- Allows users to modify, add, or remove files within the chat interface.

---

## Installation

### Prerequisites
- Node.js (v14 or later)
- Redis server
- A Google Gemini API key for AI-powered features

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Vaibhavvs7/SEAI.git
   cd SEAI

2. Install dependencies:

    ```bash
    npm install

3. Configure environment variables:

    Create a .env file in the root directory.
    Add the following variables
    ```bash
    NODE_ENV=development
    JWT_SECRET=your_jwt_secret
    REDIS_URL=redis://localhost:6379
    GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key

  
4. start
     ```bash
     cd backend
     npm nodemon index.js
     
5.server
    ```bash
    
    cd frontend
    npm run dev


Acknowledgements
Socket.io for real-time communication.
Redis for caching.
Google Gemini for AI-powered features.
React for the responsive UI.

### Contributing
Contributions are welcome!


