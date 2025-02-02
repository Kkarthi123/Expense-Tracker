import React, { createContext, useContext, useState } from 'react'
import Toast from '../components/Toast';

const ToasterContext = createContext();

export const ToastContext = ({children}) => {

    const [toast, setToast] = useState(null);

    const showToast = (message, isSuccess = false, isError = false, duration = 3000) => {
        setToast({ message, isSuccess, isError, duration });
    };

  return (
    <ToasterContext.pr value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          isSuccess={toast.isSuccess}
          isError={toast.isError}
          duration={toast.duration}
        />
      )}
    </ToasterContext.pr>
  )
}

export const useToastContext = ()=>{ useContext(ToasterContext) }
