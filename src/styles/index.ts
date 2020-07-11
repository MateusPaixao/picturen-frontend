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