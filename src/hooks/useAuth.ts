import {useContext} from 'react'
import { AuthContext } from '../contexts/Auth'

export default function useAuth(){
  const {signInUrl, user, signOut} = useContext(AuthContext)

  return {signInUrl, user, signOut}
}