import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { SkillContextProvider } from './context/skillContext';
import { AuthContextProvider } from './context/authContext';
import { TestimonialContextProvider } from './context/testimonialContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <TestimonialContextProvider> 
      <SkillContextProvider>
       
        <App />
        
      </SkillContextProvider>
      </TestimonialContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
