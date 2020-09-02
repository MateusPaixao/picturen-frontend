import styled from 'styled-components/native';
import { Dimensions } from 'react-native'

const window = Dimensions.get("window")

export const GroupSearch = styled.View`
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    flex-direction: row;
`

export const Group = styled.View`
    margin: 5px;
    border-radius: 8px;
    overflow: hidden;
    elevation: 8;
    box-shadow: 0 5px 0 rgba(0, 0, 0, .4);
`

export const Text = styled.Text`
    text-transform: uppercase;
    font-weight: bold;
    color: #9c9cab;
    margin: 10px 0;
    margin-left: 5px;
`

export const Input = styled.TextInput`
    flex: 0 0 ${window.width > 800 ? 20 : 80}%;
    padding: 5px;
    color: #ffffff;
    font-size: 18px;
    border: 1px solid #151728;
    border-right-width: 0;
`

export const Button = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #151728;
    padding: 15px;
    max-width: 160px;
    width: ${window.width > 800 ? 80 : 20}%;
    align-items: center;
`

export const Image = styled.Image`
    width: 300px;
    height: 300px;
    background-color: #151728;
`
export const ButtonImage = styled.TouchableOpacity`
    background-color: #151728;
    padding: 15px;
    justify-content: center;
    align-items: center;
`
export const BoxInserted = styled.View`
`