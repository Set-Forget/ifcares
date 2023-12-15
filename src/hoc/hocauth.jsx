import React, {useEffect} from 'react'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'


const withAuth = (WrappedComponent) => {
  return (props) => {
    const {auth} = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!auth) {
            router.push('/auth/login')
        }
    }, [auth])

    if (!auth) {
        return <p>Loading...</p>
    }

    return <WrappedComponent {...props}/>
    
  }
}

export default withAuth