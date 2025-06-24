Architecture & Flow
Overview
This is a full-stack user feedback system with a React frontend, Node.js/Express backend, and MongoDB database.

Flow
1. User submits feedback via the React frontend form.
2. Frontend sends POST request to backend `/feedback` API.
3. Backend validates and stores feedback in MongoDB.
4. Dashboard fetches feedback from backend `/feedback` API with filtering/sorting options.

Tech Stack
Frontend: React
Backend: Node.js, Express.js
Database: MongoDB (Atlas or local)

Data Model
- User name
- Email
- Feedback text
- Timestamp
- (Optional) Category

Portability
All configuration is via environment variables.
No hardcoded paths; works on any laptop with Node.js and npm. 
