import React, { useState, Fragment } from 'react';
import { FlatList, StyleSheet, Platform, Dimensions, ActivityIndicator } from 'react-native'
import { Input, Button, GroupSearch, Group, Text, Image, ButtonImage } from './styles'
import { Container } from '../../styles'
import Header from '../../components/Header'
import { Feather } from '@expo/vector-icons'

import { Alert } from 'react-native'

import api from '../../services/api'

import { useAuth } from '../../contexts/auth'

const window = Dimensions.get("window")

const Register: React.FC = () => {

    const [addDisabled, setDisabled] = useState(false)
    const [images, setImages] = useState([])
    const [word, setWord] = useState('')
    const [loading, setLoading] = useState(false)

    const { user } = useAuth()

    async function handleSearch() {

        if(!word.trim()) {
            Alert.alert('Ops!', 'Type the word for will search')
            return
        }
        setLoading(true)

        const { data, status } = await api.get(`/images?word=${word}`)
        if (data && status == 200) {
            setLoading(false)
            setImages([])
            setTimeout(() => setImages(data.images), 500)
            
        }
    }


    async function handlerRegister(image: string) {

        setDisabled(true)
        const { data, status } = await api.post('/words', {
            link: image,
            word,
            username: user?.username
        })

        if (status == 200) {
            setDisabled(false)
            Alert.alert('Success', 'Added in your list!')
        }
    }

    return (
        <Fragment>
            <Header />
            <Container paddingTop={15}>
                <GroupSearch>
                    <Input placeholder="Type a word..." placeholderTextColor="#ffffff" onChangeText={(word: string) => setWord(word)}/>
                    <Button onPress={handleSearch}>
                        <Feather name="search" size={25} color="#1b86f9"/>
                        { window.width > 800 && <Text>Search</Text> }
                    </Button>  
                </GroupSearch>

                <Text>Double tap on image, for add!</Text>

                {loading && 
                <Container>
                    <ActivityIndicator size="large" color="#151728" />
                </Container>}
                {!loading && <FlatList
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    numColumns={Platform.OS == 'web' ? 2 : 1}
                    data={images}
                    keyExtractor={image => image}
                    renderItem={({ item: image }) => (
                        <Group>
                            <Image source={{ uri: image }} />

                            <ButtonImage 
                            disabled={addDisabled}
                            onPress={() => !addDisabled && handlerRegister(image)}>
                                <Feather name="plus-circle" size={24} color="#1b86f9" />
                            </ButtonImage>
                        </Group>
                    )}
                />}
            </Container>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    list: {
        padding: 24,
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // flexWrap: 'wrap',
        // marginHorizontal: 'auto',
        // maxWidth: 800
    }
})

export default Register;