import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter as Router} from "react-router-dom";
import Auth0providerwithNavigate from './auth/Auth0ProviderWithNavigate.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
<Auth0providerwithNavigate>
    <App />
    </Auth0providerwithNavigate>
    </Router>
  </StrictMode>,
)
