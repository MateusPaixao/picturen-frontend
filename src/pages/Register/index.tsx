import React, { useState } from 'react';
import { FlatList, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Input, Button, GroupSearch, Text, Image, ButtonImage } from './styles'
import { Feather } from '@expo/vector-icons'

import api from '../../services/api'

const Register: React.FC = () => {

    const navigation = useNavigation()
    const [images, setImages] = useState([])
    const [word, setWord] = useState('')

    async function handleSearch() {

        if(!word.trim()) {
            alert('Type the word for will search')
            return
        }

        const { data, status } = await api.get(`/images?word=${word}`)

        if (data && status == 200){
            setImages(data.images)
            console.log(data.images)
        }
    }


    async function handlerRegister(image: string) {
        const { data, status } = await api.post('/words', {
            link: image,
            word,
            username: 'mateus'
        }) 

        if(status == 200){
            navigation.navigate('List')
        }
    }

    return (
        <Container>
            <GroupSearch>
                <Input placeholder="Type a word..." placeholderTextColor="#ffffff" onChangeText={(word: string) => setWord(word)}/>
                <Button onPress={handleSearch}>
                    <Feather name="search" size={25} color="#1b86f9"/>
                    { Platform.OS == 'web' && <Text>Search</Text> }
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