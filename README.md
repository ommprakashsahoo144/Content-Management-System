📰 Content Management System (CMS)
A full-stack, role-based Content Management System built with Node.js, Express, PostgreSQL (Sequelize ORM) for the backend and React + Bootstrap for the frontend.

🔧 Tech Stack
Frontend: React.js, Bootstrap 5, React Router

Backend: Node.js, Express.js, Sequelize ORM

Database: PostgreSQL

Authentication: JWT, bcrypt

Authorization: CASL (Role & Permission-based Access Control)

👥 Roles & Permissions
Role	Capabilities
Admin	Manage users (Author/Reader), review & approve articles, moderate comments, reply to reader comments
Author	Create, edit, delete, submit articles
Reader	View published articles, like articles, comment on articles

✅ Core Features
🔐 Authentication & Authorization
Secure login/register

Role-based redirection

Password reset (with token)

✍️ Author Functionality
Create/edit/delete articles

Submit articles for admin review

🧑‍⚖️ Admin Functionality
View all users (create/delete)

Review submitted articles

Approve/reject articles

View & delete comments

Reply to reader comments

👁️ Reader Functionality
View published articles

Like articles (1 per user)

Comment on articles

See admin replies to comments

📂 Project Structure
bash
Copy
Edit
cms-backend/
├── controllers/
├── routes/
├── models/
├── middlewares/
├── config/
├── services/
└── utils/

cms-frontend/
├── src/
│   ├── pages/
│   │   ├── admin/
│   │   ├── author/
│   │   ├── reader/
│   ├── components/
│   ├── api/
│   └── utils/
🚀 How to Run
📦 Backend
bash
Copy
Edit
cd cms-backend
npm install
node seeders/adminSeeder.js   # Run once to create default admin
npm run dev
🌐 Frontend
bash
Copy
Edit
cd cms-frontend
npm install
npm run dev
🔗 Frontend runs at: http://localhost:5173
🔗 Backend runs at: http://localhost:5000
