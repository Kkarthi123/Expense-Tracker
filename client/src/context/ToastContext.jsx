import React, { createContext, useContext, useState } from 'react'
import Toast from '../components/Toast';

const ToasterContext = createContext();


export const ToastContext = ({children}) => {

    const [toast, setToast] = useState(null);

    const showToast = (message, isSuccess = true, duration = 5000) => {
        setToast({ message, isSuccess, duration });
    };


  return (
    <ToasterContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          isSuccess={toast.isSuccess}
          isError={toast.isError}
          duration={toast.duration}
          setToast={setToast}
        />
      )}
    </ToasterContext.Provider>
  )
}

export const useToastContext = () => useContext(ToasterContext);


