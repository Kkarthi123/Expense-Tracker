import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Toast = ({ message,isSuccess, isError, duration=3000}) => {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setVisible(false);
        }, duration);
    
        return () => clearTimeout(timer);
      }, [duration]);
    
      if (!visible) return null; 

    return ReactDOM.createPortal(
        <div className={`${isSuccess && "bg-green-400 text-green-600"} ${isError && "bg-red-300 text-red-500"} rounded toast-component`}>
         {message}
        </div>,
        document.getElementById('toast-root')
    );
};

export default Toast;