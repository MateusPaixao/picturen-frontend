import React, { useState } from 'react'
import { Alert } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { useAuth } from '../../contexts/auth'

import { 
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
import { Container } from '../../styles'

import api from '../../services/api'
import { validateEmail } from '../../utils/validate'


const SignIn: React.FC = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPass, setShowPass] = useState(false)
    const [loginMode, setMode] = useState(true)

    const { signIn } = useAuth()

    async function handleSubmit(name: string, email: string, password: string, loginMode: boolean){
        if (!email.trim() || !password.trim()){
            Alert.alert('Ops', 'Fill in all fields')
            return
        }

        if(!validateEmail(email)){
            Alert.alert('Ops', 'Invalid email')
            return
        }

        if(loginMode){

            try {
                signIn(email, password)
            } catch (error) {
                Alert.alert('Ops', 'Erro on login, try again')
            }
            
        }else{

            if (!name.trim()){
                Alert.alert('Ops', 'Fill in all fields')
                return 
            }

            try {
                const { status } = await api.post('/users', { name, email, password })

                if (status == 200){
                    await handleSubmit(name, email, password, true)
                }else{
                    Alert.alert('Ops', 'Erro on register, try again')
                }
            } catch (error) {
                Alert.alert('Ops', 'Erro on register, try again')
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

export default SignIn