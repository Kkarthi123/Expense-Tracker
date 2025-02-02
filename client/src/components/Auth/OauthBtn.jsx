import React from 'react';
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthContext } from "../../context/AuthContext";

const OauthBtn = ({textName}) => {

  const { handleOauthSuccess } = useAuthContext();

  const login = useGoogleLogin({
    onSuccess: handleOauthSuccess,
    onError: () => console.log("Login Failed"),
  });

  return (
    <div className='w-full'>
        <button
            onClick={login}
            className="px-4 py-2 rounded-2xl transition flex items-center justify-center gap-2 border w-full hover:bg-blue-50 hover:border-blue-100"
        >
            <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google Logo"
            className="w-5 h-5"
            />
             {textName || "Sign in with Google"} 
        </button>
    </div>
  )
}

export default OauthBtn