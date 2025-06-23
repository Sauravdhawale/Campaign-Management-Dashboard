ArkenTech Campaign Management Dashboard
This is a web-based campaign dashboard developed for ArkenTech Solutions to manage and monitor marketing campaigns efficiently. The dashboard supports tracking of campaign metrics, lead performance, budget allocation, and pacing status across multiple campaign types.

Features
Campaign creation, editing, and deletion functionality

Real-time status indicators: Active, Paused, Completed

Budget allocation and lead delivery tracking

Date-based campaign filtering and monitoring

Campaign pacing feedback (On Track, Behind, Completed)

Admin and user views

Tech Stack
Frontend: React, Tailwind CSS, TypeScript

Backend: Node.js with API routes

Database: MySQL (refer to arkentech_crm.sql)

Build Tool: Vite

Runtime: Bun

Folder Structure
bash
Copy
Edit
/arkentechcrm
│
├── api               # Backend APIs
├── dist              # Production build output
├── node_modules      # Installed dependencies
├── public            # Static assets
├── src               # Main frontend application
├── components        # Reusable UI components
├── .env              # Environment variables
├── arkenTech_crm.sql # Database schema
├── vite.config.ts    # Vite configuration
├── tailwind.config.ts# Tailwind CSS config
├── tsconfig.*        # TypeScript configs
└── README.md         # Project documentation
Setup Instructions
Clone the repository

bash
Copy
Edit
git clone https://github.com/yourusername/arkentechcrm.git
cd arkentechcrm
Install dependencies

bash
Copy
Edit
bun install
Setup environment variables
Create a .env file based on .env.example and add your local or remote DB/API configs.

Run the development server

bash
Copy
Edit
bun dev
Visit on browser
Open http://localhost:3000

Database
The database schema is available in the arkentech_crm.sql file.

Use it to initialize your MySQL or MariaDB instance.

Deployment
The application can be deployed using platforms that support Node.js environments such as:

Vercel

Netlify (with backend hosted separately)

Render

Docker (manual configuration)

License
This project is developed by ArkenTech Solutions. For internal or client-specific use only. Contact the admin for licensing queries.
