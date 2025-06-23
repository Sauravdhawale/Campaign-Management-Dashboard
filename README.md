<<<<<<< HEAD
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c752638e-08c5-4acf-945a-f8a79b3df9e2

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c752638e-08c5-4acf-945a-f8a79b3df9e2) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c752638e-08c5-4acf-945a-f8a79b3df9e2) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
=======
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
>>>>>>> 825167e4c6f79c67f678f989e09b54c18d10a83a
