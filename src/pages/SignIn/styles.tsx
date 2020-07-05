import styled from 'styled-components/native';
import Constants from 'expo-constants'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #373e57;
    padding-top: ${Constants.statusBarHeight + 20}px;
`

export const Image = styled.Image`
    width: 200px;
    height: 200px;
    margin-bottom: 10px;
    border-radius: 50%;
`

export const GroupIntput = styled.View`
    border: 1px solid #151728;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    width: 100%;
    max-width: 300px;
    margin: 5px 0;
    border-radius: 40px;
`

export const Input = styled.TextInput`
    font-size: 18px;
    color: #ffffff;
    margin-left: 5px;
    padding: 5px;
    width: 100%;
`

export const LoginButton = styled.TouchableOpacity`
    background-color: #1771d6;
    width: 100%;
    max-width: 200px;
    padding: 15px;
    border-radius: 40px;
    margin: 10px 0;
`


export const TextButton = styled.Text`
    color: #ffffff;
    font-size: 18px;
    text-align: center;
    color: #151728;
    text-transform: uppercase;
`

export const Text = styled.Text`
    color: #151728;
`
export const SignUpButton = styled.TouchableOpacity``
export const PassButton = styled.TouchableOpacity`
    margin-left: 5px;
`

export const TitleApp = styled.Text`
    font-size: 24px;
    color: #151728;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
`