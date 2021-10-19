import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;
  signInUrl: string
}

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  }
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider(props: AuthProviderProps){
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=9da374dd029d459df694`
  const [user, setUser] = useState<User | null>(null)

  const signIn = async (githubCode: string) => {
 
    const response = await api.post<AuthResponse>('/authenticate', {
      code: githubCode,
    })

    const { token, user } = response.data

    localStorage.setItem('@dowhile:token', token)

    setUser(user)
  }

  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes('?code=')

    if(hasGithubCode){
      const [urlWithGithubCode, githubCode] = url.split('?code=')
     
      window.history.pushState({}, '', urlWithGithubCode)
      
      signIn(githubCode)
    }
  }, [])


  return(
    <AuthContext.Provider value={{signInUrl, user}}>
      {props.children}
    </AuthContext.Provider>
  )
}