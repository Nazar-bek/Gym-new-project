import React, { useState } from 'react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { FaGithub, FaGoogle } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { auth } from '@/firebase'
import FillLoading from '../shared/FillLoading'

const Social = () => {
    const [isLoading, setIsloading] = useState(false)
  const navigate = useNavigate()
  const OnGoogle = () => {
    setIsloading(true)
    const googleProvider = new GoogleAuthProvider()
    signInWithPopup(auth, googleProvider).then(() => {
      navigate("/")
    }).finally(() => setIsloading(false))
  }

  const OnGitHub = () => {
    setIsloading(true)
    const gitHubProvider = new GithubAuthProvider()
    signInWithPopup(auth, gitHubProvider).then(() => {
      navigate("/")
    }).finally(() => setIsloading(false))
  }
  return (
    <div>
      {
        isLoading && <FillLoading/>
      }
      <Separator className='my-3'/>
        <div className="grid grid-cols-2 gap-2">
          <Button className='h-12' variant={"secondary"} disabled={isLoading} onClick={() => OnGitHub()}>
            <FaGithub className='mr-2'/>
            <span>Sign in with GitHub</span>
          </Button>
          <Button className='h-12' variant={"destructive"} onClick={() => OnGoogle()} disabled={isLoading}>
            <FaGoogle className='mr-2'/>
            <span>Sign in with Google</span>
          </Button>
        </div>
    </div>
  )
}

export default Social