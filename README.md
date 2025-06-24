 React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

 Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

 User Feedback System

 Project Structure

- `backend/` — Node.js + Express + MongoDB backend
- `frontend/` — React frontend

 Prerequisites
- Node.js (v14+ recommended)
- npm (v6+ recommended)
- (Optional) MongoDB locally, or use the provided MongoDB Atlas URI

 Setup Instructions

 1. Clone or Copy the Folder
 Copy the entire `User Feedback System` folder to your desired location or another laptop.

 2. Backend Setup

cd backend
cp .env.example .env # On Windows, copy .env.example .env
npm install
npm start

Edit `.env` to set your MongoDB password if needed.
The backend will run on `http://localhost:5000` by default.

 3. Frontend Setup

cd frontend
npm install
npm run dev

The frontend will run on `http://localhost:3000` by default.

Environment Variables
`MONGODB_URI` — Your MongoDB connection string (already set for Atlas)
`PORT` — Backend server port (default: 5000)

Usage
Submit feedback via the frontend form.
View feedback in the dashboard.

Notes
 All dependencies are managed via `package.json` in each folder.
No absolute paths are used; everything is portable.
For any issues, check the README or `.env.example` for configuration. 