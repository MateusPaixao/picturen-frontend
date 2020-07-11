import React, { useState } from 'react';
import { FlatList, StyleSheet, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { Input, Button, GroupSearch, Text, Image, ButtonImage } from './styles'
import { Container } from '../../styles'
import { Feather } from '@expo/vector-icons'

import { Alert } from 'react-native'

import api from '../../services/api'

import { useAuth } from '../../contexts/auth'

const window = Dimensions.get("window")

const Register: React.FC = () => {

    let lastPress: number = 0
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
        let delta = new Date().getTime() - lastPress

        if (delta < 200) {
            const { data, status } = await api.post('/words', {
                link: image,
                word,
                username: user?.username
            })

            if (status == 200) {
                Alert.alert('Success', 'Added in your list!')
            }
        }

        lastPress = new Date().getTime()
    }

    return (
        <Container>
            <GroupSearch>
                <Input placeholder="Type a word..." placeholderTextColor="#ffffff" onChangeText={(word: string) => setWord(word)}/>
                <Button onPress={handleSearch}>
                    <Feather name="search" size={25} color="#1b86f9"/>
                    { window.width > 800 && <Text>Search</Text> }
                </Button>  
            </GroupSearch>

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
                    <ButtonImage onPress={() => handlerRegister(image)}>
                        <Image source={{ uri: image }} />
                    </ButtonImage>
                )}
            />}
        </Container>
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