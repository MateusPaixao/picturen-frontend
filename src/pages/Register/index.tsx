import React, { useState } from 'react';
import { Container, Input, Button, GroupSearch, Text } from './styles'
import { Feather } from '@expo/vector-icons'

import api from '../../services/api'

const Register: React.FC = () => {

    const [images, setImages] = useState([])
    const [word, setWord] = useState('')

    async function handleSearch() {

        if(!word.trim()) {
            alert('Type the word for will search')
            return
        }

        const { data: imagesFound } = await api.get(`/images?word=${word}`)

        if (images){
            setImages(imagesFound)
        }
    }

    return (
        <Container>
            <GroupSearch>
                <Input onChangeText={(word: string) => setWord(word)}/>
                <Button onPress={handleSearch}>
                    <Feather name="search" size={25} color={'#333333'}/>
                    <Text>Search</Text>    
                </Button>  
            </GroupSearch>
        </Container>
    )
}

export default Register;