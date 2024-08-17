# CodefolioFrontend

Codefolio is a React-based platform designed for software developers to create, manage, and showcase their professional profiles. The project integrates with GitHub and Medium, providing a comprehensive tool for developers to display their skills, experiences, and projects.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contact](#contact)

## Features

- **Profile Creation:** Developers can create detailed profiles highlighting their skills, experiences, projects, and more.
- **GitHub Integration:** Automatically showcase GitHub repositories and contributions.
- **Medium Integration:** Display blog posts and articles from Medium.
- **CV Parsing:** Upload CVs to auto-generate profile sections.
- **Chatbot Interaction:** AI-powered chatbot that answers questions about skills and experiences.
- **Recruiter Tools:** Features for recruiters to search and filter developers based on specific skills.

## Tech Stack

- **Frontend:**
  - **React:** A JavaScript library for building user interfaces.
  - **React Router DOM:** For handling routing in the application.
  - **Formik & Yup:** For building and validating forms.
  - **React Modal:** For creating accessible modal dialogs.
  - **React Spinners:** A collection of loading spinners for React.
  - **FontAwesome:** For using scalable vector icons.
  - **Tailwind CSS:** A utility-first CSS framework for styling.

## Project Structure

```bash
Codefolio-Frontend/
├── public/
│   ├── index.html        # The main HTML file
│   └── ...
├── src/
│   ├── components/       # Reusable components
│   │   ├── Header.js     # Header component
│   │   ├── Profile.js    # Profile component
│   │   └── ...
│   ├── pages/            # Application pages
│   │   ├── Home.js       # Home page
│   │   ├── Dashboard.js  # Dashboard page
│   │   └── ...
│   ├── services/         # API calls and services
│   │   ├── api.js        # API service
│   │   └── ...
│   ├── App.js            # Main application component
│   ├── index.js          # Entry point
│   └── ...
└── package.json          # Project configuration
