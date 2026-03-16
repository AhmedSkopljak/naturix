# naturix

[![Live Preview](https://img.shields.io/badge/Live-Preview-brightgreen)](https://naturix.vercel.app/)

🛒 Naturix | Full-Stack Grocery Delivery App
Naturix is a comprehensive e-commerce solution built with the MERN stack, designed to streamline online grocery shopping. The application features a robust architecture that manages everything from secure user transactions to complex administrative inventory control and cloud-based asset management.

🌟 Key Features
👤 Customer Experience
Secure Authentication: User registration and login powered by JWT and encrypted passwords.

Persistent Shopping Cart: Real-time cart logic that retains items and calculates totals dynamically.

Seamless Ordering: Simplified checkout process allowing users to place grocery orders efficiently.

Stripe Integration: Fully integrated Stripe API for secure and reliable credit card processing.

🔐 Admin Dashboard
Global Order Overview: A dedicated interface for administrators to monitor and track all incoming orders across the platform.

Advanced Inventory Control: Instead of permanent deletion, I implemented an Availability Toggle. Admins can switch products between "Active" and "Inactive" status to manage stock levels without breaking historical order data.

Product Management: Full CRUD capabilities for adding and updating product details, pricing, and descriptions.

🛠️ Technical Stack
Frontend: React.js, Tailwind CSS, Axios, React Router

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Cloud Storage: ImageKit.io (Used for optimized image hosting and delivery)

Security: JSON Web Tokens (JWT), Bcrypt

Payments: Stripe API

Deployment: Vercel (Frontend), Render (Backend)

🚀 Installation & Local Setup
Clone the repo:

Bash
git clone https://github.com/AhmedSkopljak/naturix.git
Install Backend dependencies:

Bash
npm install
Install Frontend dependencies:

Bash
cd client && npm install
Start the App:

Bash
npm run dev
👤 Author
Ahmed Skopljak – Software Engineer
