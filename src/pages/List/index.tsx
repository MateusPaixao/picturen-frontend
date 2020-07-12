import React, { useState, useEffect, Fragment } from 'react';
import { FlatList, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth'
import {
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

import Header from '../../components/Header'

import { Container } from '../../styles'

import { Feather } from '@expo/vector-icons'

import * as Speech from 'expo-speech'

import api from '../../services/api'

interface Word {
    id: number,
    link: string,
    word: string
}

const List: React.FC = () => {

    const navigation = useNavigation()

    const [showBoxAction, setShowBoxAction] = useState(0)
    const [words, setWords] = useState<Word[]>([])
    const [currentWord, setCurrentWord] = useState('')
    const [modeAction, setModeAction] = useState('')

    const { user } = useAuth()

    useEffect(() => {
        
        const loadWords = async () => {
            
            const { data, status } = await api.get(`/words/${user?.username}`)

            if(status == 200){
                setWords(data.words)
            }
        }

        const unsubscribe = navigation.addListener('focus', () => {
            loadWords()
        });

        return unsubscribe

    }, [navigation])

    function toggleCurrentWord(word: Word, mode: string = 'edit') {
        setShowBoxAction(word.id)
        setCurrentWord(word.word)
        setModeAction(mode)
    }

    function handleUpdate(word: Word, currentWord: string) {
        const { id } = word 

        if(!currentWord.trim()){
            Alert.alert('Ops!', 'Type something.')
            return
        }
        
        api.put(`/words/${user?.username}/${id}`, { word: currentWord })

        let wordsUpdate = [...words]

        const indexUpdated = wordsUpdate.findIndex(word => word.id == id)
        wordsUpdate[indexUpdated].word = currentWord

        setWords(wordsUpdate)
        setShowBoxAction(0)
    }


    function handleDelete(word: Word) {
        const { id } = word

        api.delete(`/words/${user?.username}/${id}`)
        const updatedWords = words.filter(word => word.id !== id)

        setWords(updatedWords)
        setShowBoxAction(0)
    }

    return (
        <Fragment>
            <Header />
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

                                <ButtonAction color="#1b86f9" onPress={() => handleUpdate(word, currentWord)}>
                                    <Feather name="save" size={24} color="#ffffff"/>
                                    <TextButton>Save</TextButton>
                                </ButtonAction>

                            </BoxEdit>}


                            {modeAction == 'delete' &&
                            <BoxEdit>

                                <GroupText>
                                    <Text>This will remove "{currentWord}" of your list, do you sure?</Text>
                                </GroupText>

                                <ButtonAction color="#e21b1b" onPress={() => handleDelete(word)}>
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
        </Fragment>
    )
}

export default List;