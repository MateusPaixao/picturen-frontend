import styled from 'styled-components/native'

export const Image = styled.Image`
    width: 300px;
    height: 300px;
`

export const Group = styled.View`
    overflow: hidden;
    border-radius: 8px;
    margin: 5px;
`

export const Title = styled.Text`
    font-size: 24px;
    color: #ffffff;
    text-transform: uppercase;
    font-weight: bold;
`
export const Word = styled.Text`
    font-size: 20px;
    /* color: #1771d6; */
    color: #9c9cab;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    background-color: #151728;
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
    background: #151728;
    border-radius: 8px;
    overflow: hidden;
`

export const ButtonAction = styled.TouchableOpacity`
    background: ${props => (props.color ? props.color : 'transparent')};
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
`

export const TextButton = styled.Text`
    font-size: 18px;
    text-align: center;
    margin: 0 5px;
    color: #ffffff;
`

export const Text = styled(TextButton)``

export const GroupText = styled.View`
    padding: 15px 0;
`

export const InputAction = styled.TextInput`
    font-size: 18px;
    color: #ffffff;
    width: 100%;
    padding: 15px;
`

export const Actions = styled.View`
    flex-direction: row;
    justify-content: space-around;
    background-color: #151728;
    border: 1px solid transparent;
    border-top-color: #272a3a;
`