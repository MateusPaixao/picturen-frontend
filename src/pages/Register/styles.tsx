import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    padding: 10px;
    background-color: #c3cfd9;
`
export const GroupSearch = styled.View`
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    flex-direction: row;
`

export const Input = styled.TextInput`
    flex: 0 0 30%;
    padding: 5px;
    border: 1px solid #333333;
    outline: none;
`

export const Text = styled.Text`
    text-transform: uppercase;
    font-weight: bold;
    color: #333333;
    margin-left: 5px;
`
export const Button = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #63c9d4;
    border: 1px solid #12c1ea;
    padding: 10px;
    max-width: 160px;
    width: 80%;
    align-items: center;
`




