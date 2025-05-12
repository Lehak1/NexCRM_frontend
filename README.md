# React + TypeScript + Vite

# Frontend Setup - React + TypeScript + Vite


# Campaign Management System

This project is a full-stack **MERN** (MongoDB, Express.js, React, Node.js) application for managing marketing campaigns, customer segmentation, and personalized messaging. The frontend is built with **React**, **TypeScript**, and **Vite**, while the backend utilizes **Node.js**, **Express.js**, and **MongoDB**. The system also integrates **Auth0** for authentication and **OpenAI's GPT-3/4** for AI-driven content generation.

---

## Table of Contents

1. [Frontend Setup](#frontend-setup)
2. [Development Scripts](#development-scripts)
3. [Tech Stack](#tech-stack)
4. [AI Integration](#ai-integration)
5. [Environment Variables](#environment-variables)
6. [Known Limitations or Assumptions](#known-limitations-or-assumptions)


---

## Frontend Setup

### Steps to Set Up Frontend:
1. **Clone the Repository**  
   Clone the repository to your local machine:
   ```bash
   git clone <repository-url>



2. **Clone the Repository** 

npm install

3. **Start the Development Server** 




# Development Scripts
npm run dev: Starts the development server with hot module replacement (HMR) at http://localhost:3000.

npm run build: Bundles the project for production using Vite.

npm run lint: Runs ESLint to check for code quality and stylistic issues.

npm run preview: Serves a production preview of the app built using npm run build.


# Tech Stack
Frontend:
1. React.js: JavaScript library for building user interfaces.

2. TypeScript: Static type-checking for JavaScript.

3. Vite: Next-generation, fast development build tool.

4. Tailwind CSS: Utility-first CSS framework for building responsive UIs.

5. Shadcn: Component library for consistent UI.

6. Auth0: Authentication service for handling user sign-in and access control.

7. Axios: HTTP client for making requests to the backend.

8. React-Router: For client-side routing.



# AI Integration
The frontend interacts with the backend to fetch AI-generated campaign messages using Gemini Api. These messages are generated based on customer data and campaign goals, allowing for personalized communication with target audiences. The backend processes the user input, interacts with the OpenAI API, and returns AI-generated messages to the frontend.



# Frontend env variables:
REACT_APP_API_URL: The URL of the backend API to interact with.

REACT_APP_AUTH0_DOMAIN: Your Auth0 domain for authentication.

REACT_APP_AUTH0_CLIENT_ID: Your Auth0 client ID.



## Known Limitations or Assumptions

### Frontend:
1. **Performance:**
   - The frontend performance may degrade when dealing with a large number of campaigns or customer entries. For example, rendering many customer profiles or campaigns simultaneously might lead to slower load times.
   - It is recommended to implement **pagination**, **lazy loading**, or **virtualization** techniques for better performance when handling large datasets.

2. **Responsiveness:**
   - While the frontend layout is designed to be **mobile-responsive**, certain UI components may need minor adjustments on smaller screen sizes.
   - Some complex components, such as tables or multi-step forms, may require additional styling tweaks to ensure a seamless experience on all devices.

3. **Error Handling:**
   - The current error handling approach for API calls is generic. If an API request fails, the user sees a simple error message without specifics about what went wrong.
   - For a better user experience, more granular error messages should be implemented, providing users with meaningful information on the issue (e.g., network issues, server errors).

4. **State Management:**
   - While **React Context** or **useState** is used to manage simple states, complex application states might require more advanced state management solutions, such as **Redux** or **Zustand**, especially when dealing with large forms, deep component trees, or interdependent data.

5. **Cross-Browser Compatibility:**
   - The frontend is tested on major modern browsers (Chrome, Firefox, Safari). However, compatibility with older versions of Internet Explorer or certain legacy browsers is not guaranteed and may require polyfills or further testing.

6. **Authentication Flow:**
   - The application uses **Auth0** for authentication. Ensure that your **Auth0 tenant** is correctly set up to avoid issues with authentication flow.
   - If there are any changes to the Auth0 setup (e.g., domain or client ID), make sure to update the respective environment variables to maintain seamless login.

7. **Third-Party Libraries:**
   - The app relies on third-party libraries like **Tailwind CSS** for styling and **Shadcn** for UI components. Ensure that these libraries are up-to-date to avoid compatibility issues and take advantage of the latest features and fixes.

8. **Security:**
   - The frontend currently does not implement certain security measures, such as **XSS protection** or **CSRF protection**. Although Auth0 handles authentication, further attention is needed to secure the application fully in production.
