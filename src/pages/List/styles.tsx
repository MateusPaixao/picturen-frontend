import styled from 'styled-components/native'
import Constants from 'expo-constants'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    padding: 10px;
    background-color: #c3cfd9;
    padding-top: ${Constants.statusBarHeight + 20}px;
`

export const Image = styled.Image`
    width: 300px;
    height: 300px;
`

export const Group = styled.TouchableOpacity`
    border: 1px solid #333333;
    overflow: hidden;
    border-radius: 8px;
    margin: 5px;
`

export const Title = styled.Text`
    font-size: 24px;
    color: #333333;
    font-weight: bold;
`
export const Word = styled.Text`
    font-size: 24px;
    color: #333333;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    background-color: #ffffff;
    padding: 10px 0;
`

export const BoxAction = styled.View`
    background: rgba(0,0,0,.9);
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`

export const BoxEdit = styled.View`
    width: 70%;
    justify-content: flex-end;
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
`

export const ButtonAction = styled.TouchableOpacity`
    background: ${props => props.color};
    padding: 10px;
`

export const TextButton = styled.Text`
    font-size: 18px;
    text-align: center;
    color: #ffffff;
`

export const InputAction = styled.TextInput`
    font-size: 18px;
    width: 100%;
    padding: 15px;
    border: 1px solid #333333;
`