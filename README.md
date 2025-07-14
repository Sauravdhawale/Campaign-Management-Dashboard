ArkenTech Campaign Management Dashboard
A modern, web-based campaign dashboard developed for ArkenTech Solutions to streamline and monitor marketing campaign performance. Built with Vite, React (TypeScript), Tailwind CSS, and shadcn/ui components, this tool supports real-time campaign tracking, lead performance insights, and team-specific dashboards.

🔗 Project Info
Live Preview: <img width="1440" height="776" alt="image" src="https://github.com/user-attachments/assets/96d99c83-140d-4de6-a669-c0bd2aadd58c" />


Tech Stack: React + Vite + Tailwind + TypeScript + MySQL + Bun Runtime

✨ Features
Campaign creation, editing, deletion

Real-time campaign status: Active, Paused, Completed

Budget allocation & lead delivery tracking

Pacing status: On Track, Behind, Completed

Date-based filtering

Team-based views with role-specific access:

Team Admin: Access to only their assigned team campaigns

Super Admin: Full access to all campaigns across teams

🧱 Technologies Used
Frontend: React, Tailwind CSS, TypeScript

Backend: Node.js (via API routes)

Database: MySQL (arkentech_crm.sql provided)

Build Tool: Vite

Runtime: Bun

UI Library: shadcn-ui

🗂 Folder Structure
bash
Copy
Edit
arkentechcrm/
├── api/                   # Backend API routes
├── dist/                  # Production build
├── node_modules/
├── public/                # Static assets
├── src/                   # Frontend app
├── components/            # Reusable UI components
├── .env                   # Environment config
├── arkenTech_crm.sql      # MySQL DB schema
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
⚙️ Setup Instructions
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/arkentechcrm.git
cd arkentechcrm
2. Install Dependencies
bash
Copy
Edit
bun install
3. Configure Environment
Create a .env file using .env.example as a template. Add your local or remote MySQL credentials and API configs.

4. Start Development Server
bash
Copy
Edit
bun dev
Visit: http://localhost:3000

🗄 Database Setup
Import arkentech_crm.sql into your MySQL or MariaDB instance to initialize the database.

🚀 Deployment Options
This app can be deployed on platforms that support Node.js environments:

Vercel

Render

Netlify (with separate backend hosting)

Docker (custom configuration required)

🌐 Custom Domain Setup
To connect a custom domain via Lovable:

Go to Project > Settings > Domains

Click Connect Domain

Follow the domain mapping steps.

More info: Lovable Docs – Custom Domains

📄 License
This project is proprietary and developed by ArkenTech Solutions. For internal or client-specific use only. Contact the admin for licensing permissions.

Let me know if you’d like the same as a README.md file download or copied into your project directly.
