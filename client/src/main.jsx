import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContext } from './context/AuthContext';
import { ToastContext } from './context/ToastContext.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
    <ToastContext>
       <AuthContext>
            <App />
      </AuthContext>
    </ToastContext>
   </BrowserRouter>
)
