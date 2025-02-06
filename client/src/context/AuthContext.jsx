import React, { useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from '../utils/common';
import axiosInstance from '../utils/axios-instance';
import { useToastContext } from './ToastContext';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const AuthenticationContext = React.createContext();

export const AuthContext = ({children}) => {

    const [profileData, setProfileData] = React.useState(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(getCookie('authToken')? true: false);
    const [isAppLoading, setIsAppLoading] = React.useState(true);
    const [isAuthRunning, setIsAuthRunning] = React.useState(false);
    const {showToast} = useToastContext()

    useEffect(() => {
        if(isLoggedIn){
            InitApplication()
        }
    }, [isLoggedIn]);


    const handleOauthSuccess = async (token) => {
        try {
            setIsAuthRunning(true)
            let {data} = await axiosInstance.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/oAuthLogin`, {token}, {withCredentials: true});
            if(data){
                setCookie("authToken", data?.authToken, 1)
                setIsLoggedIn(true);
            }
        } catch (error) {
            showToast("Authentication failed!", false)
        }finally{
            setIsAuthRunning(false)
        }
    };


    const hanldeCustomLogin = async (email, password) => {
        try {
            setIsAuthRunning(true)
            let {data} =  await axiosInstance.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signIn`, {email, password}, {withCredentials: true});
            if(data){
                setIsLoggedIn(true);
                return customLogin;
            }
        } catch (error) {
            showToast("Authentication failed!", false)
        }finally{
            setIsAuthRunning(false)

        }
    }


    const handleLogout = async () => {
        try {
            deleteCookie("authToken")
            setIsLoggedIn(false);
        } catch (error) {
            console.log(error);
        }
    }


    const handleSignUp = async (name, email, password)=>{
        try {
            setIsAuthRunning(true)
            let customsignUp =  await axiosInstance.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signUp`, {name, email, password}, {withCredentials: true});
            if(customsignUp.data){
                setIsLoggedIn(true);
                return customsignUp
            }
        } catch (error) {
            showToast("Authentication failed!", false)
        }finally{
            setIsAuthRunning(false)

        }
    }


    const InitApplication = async () => {
        try {
            let profile = await axiosInstance.get(`${import.meta.env.VITE_API_BASE_URL}/api/profile`, {withCredentials: true});
            setProfileData(profile.data.profile);
            setTimeout(()=>{
                setIsAppLoading(false);
            }, 3000)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <AuthenticationContext.Provider value={{handleOauthSuccess, hanldeCustomLogin, isAuthRunning ,clientId, profileData, isLoggedIn, handleLogout, isAppLoading, handleSignUp}}>
            <GoogleOAuthProvider clientId={clientId}>
                {children}
            </GoogleOAuthProvider>
        </AuthenticationContext.Provider>
    )
}

export const useAuthContext = () => React.useContext(AuthenticationContext);

