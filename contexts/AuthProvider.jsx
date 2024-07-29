import axios from 'axios';
import { axiosInstance } from '../api/axiosDefaults';
import { getAccessToken, getRefreshToken, storeTokens, 
    setTokenExpiry, deleteTokenExpiry, deleteTokens } from '../utils/utils';
import { createContext, useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleMount = async () => {
        try {
            const accessToken = await getAccessToken();
            if (!accessToken) {
                return null;
            }
            axiosRes.defaults.headers.Authorization = `Bearer ${accessToken}`;
            const {data} = await axiosRes.get('dj-rest-auth/user/');  
            setUser(data);  
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        handleMount();
    }, []);

    useEffect(() => {
        // The request interceptor checks the access token expiry, and if
        // necessary performs the access/refresh token shuffle. 
        axiosInstance.interceptors.request.use(
            async (config) => {
                if (authTokenExpired) {
                    try {
                        const refreshToken = await getRefreshToken();
                        if (refreshToken) {
                            const resp = await axios.post(
                                '/dj-rest-auth/token/refresh/',
                                { refresh: refreshToken }
                            );
                            const newRefreshToken = resp.data.refresh;
                            const newAccessToken = resp.data.access;
                            await storeTokens(
                                newAccessToken,
                                newRefreshToken,
                            );
                            await setTokenExpiry(resp.data);
                            config.headers.Authorization = `Bearer ${newAccessToken}`;
                        } else { // No refresh token present
                            await deleteTokens();
                            await deleteTokenExpiry();
                            setUser(null);
                            router.replace('/login');
                            return config;
                        }
                    } catch (err) {
                        console.error("Error refreshing token", err);
                        await deleteTokens();
                        await removeTokenTimestamp();
                        setUser(null);
                        router.replace("/login"); // Redirect to login page if token refresh fails
                        return config;
                    }
                } else { // access token still valid - use it.
                    const accessToken = await getAccessToken();
                    if (accessToken) {
                        config.headers.Authorization = `Bearer ${accessToken}`;
                    }
                }
                return config;
            }, (error) => {
                console.error("Error in request interceptor", error);
                return Promise.reject(error);
            }
        );

        // The response interceptor reacts to a 401 error
        axiosInstance.interceptors.response.use(
            (response) => response,
            async(err) => {
                if (err.response?.status === 401) {
                    try {
                        const refreshToken = await getRefreshToken();
                        if (refreshToken) {
                            const resp = await axios.post(
                                '/dj-rest-auth/token/refresh/',
                                { refresh: refreshToken }
                            );
                            const newRefreshToken = resp.data.refresh;
                            const newAccessToken = resp.data.access;
                            await storeTokens(
                                newAccessToken,
                                newRefreshToken,
                            );
                            await setTokenExpiry(resp.data);
                            err.config.headers.Authorization = `Bearer ${newAccessToken}`;
                            return axios(err.config);
                        } else { // No refresh token present
                            await deleteTokens();
                            await removeTokenTimestamp();
                            setUser(null);
                            router.replace('/login');
                            return Promise.reject(err);
                        }
                    } catch (err) {
                        console.error("Error refreshing token", err);
                        await deleteTokens();
                        await removeTokenTimestamp();
                        setUser(null);
                        router.replace("/login"); // Redirect to login page if token refresh fails
                    }
                }
                return Promise.reject(err); // for non-401 errors
            }
        )
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}