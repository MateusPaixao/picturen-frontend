import React, { useState } from 'react';
import { FlatList, StyleSheet, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Input, Button, GroupSearch, Text, Image, ButtonImage } from './styles'
import { Feather } from '@expo/vector-icons'

import api from '../../services/api'

import { useAuth } from '../../contexts/auth'

const window = Dimensions.get("window")

const Register: React.FC = () => {

    let lastPress: number = 0
    const navigation = useNavigation()
    const [images, setImages] = useState([])
    const [word, setWord] = useState('')

    const { user } = useAuth()

    async function handleSearch() {

        if(!word.trim()) {
            alert('Type the word for will search')
            return
        }

        const { data, status } = await api.get(`/images?word=${word}`)

        if (data && status == 200){
            setImages(data.images)
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
                // navigation.navigate('List')
                alert('Show animation!')
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


            <FlatList
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
            />
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