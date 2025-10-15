import { auth } from '@/firebase'
import { useUserState } from '@/stores/auth.user'
import React, { useEffect, type ReactNode } from 'react'
import FillLoading from '../shared/FillLoading'

const AuthProvider = ({children} : {children: ReactNode}) => {
    const{ setUser, isLoading} = useUserState() 

    useEffect(() => {
    auth.onAuthStateChanged(user => {
        if(user){
            setUser(user)
        }else{
            setUser(null)
        }
    })
    }, [])
  return isLoading ? <FillLoading/> : children
}

export default AuthProvider