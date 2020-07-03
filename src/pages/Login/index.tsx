import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'

import { storeData, getData } from '../../utils/storage'

import { useNavigation } from '@react-navigation/native';

import { 
    Container, 
    Image, 
    GroupIntput, 
    Input, 
    LoginButton, 
    Text, 
    TextButton, 
    PassButton,
    SignUpButton,
    TitleApp
} from './styles'

import api from '../../services/api'


const Login: React.FC = () => {

    const navigation = useNavigation()

    useEffect(() => {
        const isLogged = async () => {
            const isLogged = await getData('userLogged')
            if (isLogged){
                navigation.navigate('Home')
            }
        }

        isLogged()
    }, [])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPass, setShowPass] = useState(false)
    const [loginMode, setMode] = useState(true)

    async function handleSubmit(name: string, email: string, password: string, loginMode: boolean){
        if (!email.trim() || !password.trim()){
            alert('Ops, Fill in all fields')
            return
        }

        if(loginMode){

            try {
                const { data: userLogged } = await api.post('/sessions', { email, password })

                if (userLogged.auth){
                    const syncData = await storeData('userLogged', userLogged)

                    if (syncData) {
                        navigation.navigate('Home')
                    }else{
                        alert('Erro on login, try again')
                    }
                }
            } catch (error) {
                alert('Erro on login, try again')
            }
            
        }else{

            if (!name.trim()){
                alert('Ops, Fill in all fields')
                return 
            }

            try {
                const { status } = await api.post('/users', { name, email, password })

                if (status == 200){
                    await handleSubmit(name, email, password, true)
                }else{
                    alert('Erro on register, try again')
                }
            } catch (error) {
                alert('Erro on register, try again')
            }
            
        }

    }

    return (
        <Container>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1476136236990-838240be4859?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=60' }}/>

            <TitleApp>Picturen</TitleApp>

            {!loginMode &&
            <GroupIntput>
                <Feather name="user" size={24} color="#1771d6" />
                <Input placeholder="Type your name" placeholderTextColor="#ffffff" value={name} onChangeText={name => setName(name)}/>
            </GroupIntput> }


            <GroupIntput>
                <Feather name="mail" size={24} color="#1771d6"/>
                <Input placeholder="Type your email" placeholderTextColor="#ffffff" value={email} onChangeText={email => setEmail(email)}/>
            </GroupIntput>

            <GroupIntput>
                <Feather name="lock" size={24} color="#1771d6"/>
                <Input 
                value={password} onChangeText={password => setPassword(password)}
                secureTextEntry={!showPass} 
                placeholder="Type your password" 
                placeholderTextColor="#ffffff"/>

                <PassButton onPress={() => setShowPass(!showPass)}>
                    <Feather name={showPass ? "eye" : "eye-off"} size={24} color="#151728" />
                </PassButton>
                
            </GroupIntput>

            <LoginButton onPress={() => handleSubmit(name, email, password, loginMode)}>
                {loginMode && <TextButton>Login</TextButton>}
                {!loginMode && <TextButton>Register</TextButton>}
            </LoginButton>


            {loginMode && <Text>Don't have an account? </Text>}

            <SignUpButton onPress={() => setMode(!loginMode)}>
                {loginMode && <Text>Sign Up</Text>}
                {!loginMode && <Text>Back login</Text>}
            </SignUpButton>
        </Container>
    )
}

export default Login