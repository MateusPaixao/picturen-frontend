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
    InputAction,
    Actions,
    Text,
    GroupText
} from './styles'

import { Feather } from '@expo/vector-icons'

import * as Speech from 'expo-speech'

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
    const [modeAction, setModeAction] = useState('')

    useEffect(() => {
        api.get('/words/mateus')
        .then(({data, status}) => {
            if(status == 200){
                setWords(data.words)
            }
        })
    }, [])

    function toggleCurrentWord(word: Word, mode: string = 'edit') {
        setShowBoxAction(word.id)
        setCurrentWord(word.word)
        setModeAction(mode)
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
                    <Group>
                        <Image source={{ uri: word.link }} />
                        <Word>{word.word}</Word>


                        <Actions>
                            <ButtonAction onPress={() => toggleCurrentWord(word)}>
                                <Feather name="edit" size={24} color="#1B86F9"/>
                            </ButtonAction>

                            <ButtonAction onPress={() => Speech.speak(word.word, { language: 'en' })}>
                                <Feather name="volume-2" size={24} color="#1B86F9"/>
                            </ButtonAction>

                            <ButtonAction onPress={() => toggleCurrentWord(word, 'delete')}>
                                <Feather name="trash" size={24} color="#1B86F9"/>
                            </ButtonAction>
                        </Actions>

                        {showBoxAction == word.id && 
                        <BoxAction>
                            {modeAction == 'edit' &&
                            <BoxEdit>

                                <InputAction autoFocus={true} onChangeText={(word: string) => setCurrentWord(word)} value={currentWord} />

                                <ButtonAction color="#1b86f9">
                                    <Feather name="save" size={24} color="#ffffff"/>
                                    <TextButton>Save</TextButton>
                                </ButtonAction>

                            </BoxEdit>}


                            {modeAction == 'delete' &&
                            <BoxEdit>

                                <GroupText>
                                    <Text>This will remove "{currentWord}" of your list, do you sure?</Text>
                                </GroupText>

                                <ButtonAction color="#e21b1b">
                                    <Feather name="trash" size={24} color="#ffffff" />
                                    <TextButton>Delete</TextButton>
                                </ButtonAction>
                            </BoxEdit>}
                            
                            <ButtonAction onPress={() => setShowBoxAction(0)}>
                                <TextButton>Cancel</TextButton>
                            </ButtonAction>

                            
                        </BoxAction>}
                    </Group>
                    
                )}
            />
        </Container>
    )
}

export default List;