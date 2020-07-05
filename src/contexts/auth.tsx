import React, { createContext, useState, useEffect, useContext } from 'react'
import api from '../services/api'
import { getData, storeData, clearData } from '../utils/storage'

interface User {
    active: number
    auth: boolean
    created_at: string
    email: string
    id: number
    name: string
    removed: number
    token: string
    updated_at: string
    username: string
}

interface AuthContextData {
    signed: boolean
    user: User | null
    loading: boolean
    signIn(email: string, password: string): Promise<void>
    signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await getData('@PENAuth:user')
            const storagedToken = await getData('@PENAuth:token')

            // await new Promise(resolve => setTimeout(resolve, 2000))

            if (storagedUser && storagedToken){
                api.defaults.headers['Authorization'] = storagedToken.token

                setUser(storagedUser)
                setLoading(false)
            }else{
                setLoading(false)
            }
        }

        loadStorageData()
    }, [])

    async function signIn(email: string, password: string) {
        // const response = await auth.signIn()
        const { data: userLogged } = await api.post('/sessions', { email, password })

        if (!userLogged) {
            alert('Erro on login, try again')
            return
        }

        setUser(userLogged)

        api.defaults.headers['Authorization'] = `${userLogged.token}`

        await storeData('@PENAuth:user', userLogged)
        await storeData('@PENAuth:token', { token: userLogged.token })
    }

    function signOut() {
        clearData().then(() => {
            setUser(null)
        })
    }
    
    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    return context
}