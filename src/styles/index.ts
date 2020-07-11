import styled from 'styled-components/native';
import Constants from 'expo-constants'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding:  10px;
    padding-top:  ${(props: any) => props.paddingTop || Constants.statusBarHeight + 20}px;
    background-color: #373e57;
`