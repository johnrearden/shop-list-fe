import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';
const ACCESS_TOKEN_EXPIRY = 'ACCESS_TOKEN_EXPIRY';

export const getAccessToken = async () => {
    return await getValueFor(ACCESS_TOKEN);
}

export const getRefreshToken = async () => {
    return await getValueFor(REFRESH_TOKEN);
}

export const setTokens = async (accessToken, refreshToken) => {
    await save(ACCESS_TOKEN, accessToken);
    await save(REFRESH_TOKEN, refreshToken);
}

export const deleteTokens = async () => {
    await deleteItem(ACCESS_TOKEN);
    await deleteItem(REFRESH_TOKEN);
}

export const setTokenExpiry = async (token) => {
    const expiry = jwtDecode(token?.refresh).exp;
    await save(ACCESS_TOKEN_EXPIRY, expiry);
}

export const deleteTokenExpiry = async () => {
    await deleteItem(ACCESS_TOKEN_EXPIRY);
}

async function save(key, value) {
    await SecureStore.setItemAsync(key, value)
        .then(() => {
            return true;
        }).catch(err => {
            console.error(err)
        });
}

async function getValueFor(key) {
    await SecureStore.getItemAsync(key)
        .then(result => {
            return result;
        }).catch(err => {
            console.error(err);
        });
}

async function deleteItem(key) {
    await SecureStore.deleteItemAsync(key)
        .then(() => {
            return true;
        }).catch(err => {
            console.error(err);
        })
}