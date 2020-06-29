import React, { useState, useEffect } from 'react';
import { FlatList, Platform } from 'react-native';
import {
    Container,
    Image,
    Title,
    Group,
    Word,
    BoxAction,
    BoxEdit,
    ButtonAction,
    TextButton, 
    InputAction
} from './styles'

import api from '../../services/api'

interface Word {
    id: number,
    link: string,
    word: string
}

const List: React.FC = () => {

    const [showBoxAction, setShowBoxAction] = useState(0)
    const [words, setWords] = useState<Word[]>([])
    const [currentWord, setCurrentWord] = useState('')

    useEffect(() => {
        api.get('/words/mateus')
        .then(({data, status}) => {
            if(status == 200){
                setWords(data.words)
            }
        })
    }, [])

    function toggleCurrentWord(word: Word) {
        setShowBoxAction(word.id)
        setCurrentWord(word.word)
    }

    return (
        <Container>
            <Title>Your similar words</Title>
            <FlatList
                contentContainerStyle={{ padding: 24 }}
                showsVerticalScrollIndicator={false}
                numColumns={Platform.OS == 'web' ? 2 : 1}
                data={words}
                keyExtractor={word => String(word.id)}
                renderItem={({ item: word }) => (
                    <Group disabled={showBoxAction == word.id} onPress={() => toggleCurrentWord(word)}>
                        <Image source={{ uri: word.link }} />
                        <Word>{word.word}</Word>

                        {showBoxAction == word.id && 
                        <BoxAction>
                            <BoxEdit>

                                <InputAction onChangeText={(word: string) => setCurrentWord(word)} value={currentWord} />

                                <ButtonAction color="#2a9d8f;">
                                    <TextButton>Edit</TextButton>
                                </ButtonAction>

                                <ButtonAction color="#e76f51;">
                                    <TextButton>Delete</TextButton>
                                </ButtonAction>
                            </BoxEdit>
                        </BoxAction>}
                    </Group>
                    
                )}
            />
        </Container>
    )
}

export default List;