# Frontend Setup - React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with TypeScript, Hot Module Replacement (HMR), and some ESLint rules to maintain high code quality. It is designed to be used with a **MERN stack** backend and integrates with Auth0 for authentication.

---

## Table of Contents

1. [Frontend Setup](#frontend-setup)
2. [ESLint Configuration](#eslint-configuration)
3. [Tech Stack](#tech-stack)
4. [Development Scripts](#development-scripts)
5. [AI Integration](#ai-integration)
6. [Environment Variables](#environment-variables)
7. [Known Limitations or Assumptions](#known-limitations-or-assumptions)

---

## Frontend Setup

1. **Clone the Repository**  
   Clone the repository to your local machine:
   ```bash
   git clone <repository-url>


2.**Install Dependencies**
npm install

3.**Start the Development Server**
After installing dependencies, you can start the development server with Vite:
npm run dev




ESLint Configuration
To ensure that your code is clean, maintainable, and follows best practices, you should use TypeScript-aware ESLint rules.

If you're developing a production application, we recommend updating the ESLint configuration to enable type-aware lint rules:

Install ESLint and TypeScript Plugins
First, make sure to install the necessary packages:

npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks


Update .eslintrc.js Configuration
Modify your .eslintrc.js to use type-aware linting rules for better code quality:


module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // Use recommended type-checked rules
    'tseslint.configs.recommendedTypeChecked',
    // Alternatively, use this for stricter rules
    'tseslint.configs.strictTypeChecked',
    // Optionally, add this for stylistic rules
    'tseslint.configs.stylisticTypeChecked',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  rules: {
    // Add or override any custom rules here
    'react/prop-types': 'off', // Disable prop-types validation for TypeScript
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Adjust rules as per your needs
  },
}


Update eslint.config.js
Configure the React-specific plugins to use recommended rules for React and TypeScript:


import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default {
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
}



Tech Stack
React.js: JavaScript library for building user interfaces.

TypeScript: Static type checking for JavaScript.

Vite: Next-generation, fast development build tool.

Tailwind CSS: Utility-first CSS framework for building responsive UIs.

Shadcn: Component library for consistent UI.

Axios: HTTP client for making requests to the backend.

Auth0: Authentication service for handling user sign-in and access control.

React-Router: For managing client-side routing.



Development Scripts
npm run dev: Starts the Vite development server at http://localhost:3000.

npm run build: Bundles the project for production.

npm run lint: Runs ESLint to check for code quality and stylistic issues.

npm run preview: Serves a production preview of the app built using npm run build.




AI Integration
The frontend integrates with OpenAI's GPT-3/4 model to generate personalized campaign messages based on user input. The integration takes place in the backend, and the frontend interacts with the backend to fetch AI-generated messages for campaign management.


Environment Variables
Create a .env file in the frontend directory with the following environment variables:


REACT_APP_API_URL=<your-backend-api-url>
REACT_APP_AUTH0_DOMAIN=<your-auth0-domain>
REACT_APP_AUTH0_CLIENT_ID=<your-auth0-client-id>



Known Limitations or Assumptions
Frontend:
Performance: The frontend performance may degrade with a large number of campaign entries. Optimizations such as pagination, lazy loading, and caching should be implemented for large datasets.

Responsiveness: The layout is mobile-friendly, but some minor UI tweaks may be necessary on smaller screen sizes.

Error Handling: The error handling for API calls could be more granular. Currently, if an error occurs, a generic error message is shown to the user.

