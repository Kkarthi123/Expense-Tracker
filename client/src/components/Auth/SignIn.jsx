import React, { useState } from "react";
import OauthBtn from "./OauthBtn";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import AsyncButton from "../AsyncButton";


const SignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {hanldeCustomLogin, isAuthRunning} = useAuthContext();
  
  const loginFormSubmit = async (e)=>{
    e.preventDefault();
    await hanldeCustomLogin(email, password);
  }

  return (
    <div>
      <div className="shadow-md rounded-lg px-5 py-8 pb-7 w-[370px] bg-white">
        <div className="mb-7 text-center">
          <span className="text-xl font-bold">Sign In with Expense Tracker</span>
        </div>
        <div>
          <OauthBtn />
        </div>
        <div className="text-center text-sm my-7 relative">
          <span className="absolute border border-gray-200 w-full left-0 top-[9px]"></span>
          <span className="bg-white relative z-[1] inline-block px-[5px] text-gray-500">Or Sign In with Email</span>
        </div>
        <form onSubmit={(e) => loginFormSubmit(e)}>
          <div className="flex flex-col mb-5">
            <label htmlFor="email" className="block text-[15px] font-medium text-gray-500">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full p-2.5 outline-none focus-within:border-gray-400" placeholder="Enter Email" required />
          </div>
          <div className="flex flex-col mb-10">
            <label htmlFor="password" className="block text-[15px] font-medium text-gray-500">Password</label>
            <div className='bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg w-full p-2.5 flex place-items-center'>
              <input pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters" type={showPassword ? "text" : "password"} id="password" onChange={(e) => setPassword(e.target.value)} className=" outline-none focus-within:border-gray-400 w-full" placeholder="Enter Password" required minLength="8" />
              {
                password && (
                  <i
                    className={`fa-regular ${showPassword ? 'fa-eye' : 'fa-eye-slash'} cursor-pointer`}
                    onClick={() => setShowPassword((prev) => !prev)}
                  ></i>
                )
              }
            </div>
          </div>
          <div>
            <AsyncButton buttonType="submit" buttonName="Sign In" customButtonClass="p-2 bg-[#259b70] w-full rounded-md text-white hover:bg-[#228b65]" isActionRunning={isAuthRunning}/>
          </div>
        </form>
        <div className='mt-3 text-[13px]'>
          <span>Create New Account? <Link to="/auth/sign-up" className='underline text-blue-500 hover:text-blue-600'>Sign Up.</Link></span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
