import { atom } from "recoil";

const AuthState = atom({
    key: 'authState',
    default: {
        token: window.localStorage.getItem('token') || null,
        isLogin: false,
        user: null,
    },
});

export default AuthState;