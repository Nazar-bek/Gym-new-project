import {create }from "zustand"


type AuthStateType = "login" | "register"
interface IAuthStoreType {
    authState: AuthStateType,
    setAuth : (state : AuthStateType) => void 
}

export const useAuthState = create<IAuthStoreType>((set) =>({
    authState: "login",
    setAuth: (state) => set({authState: state})
}))