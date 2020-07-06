import React from 'react'
import { Feather } from '@expo/vector-icons'
import { 
    createDrawerNavigator, 
    DrawerContentScrollView, 
    DrawerItemList, 
    DrawerItem 
} from '@react-navigation/drawer';

import { useAuth } from '../contexts/auth'

import AppRoutes from './app.routes'

import { View, Text, Image, StyleSheet } from 'react-native'

const Drawer = createDrawerNavigator();

const drawerContentOptions = {
    style: { backgroundColor: '#151728' }
} 

function CustomDrawerContent(props: any) {
    const { signOut, user } = useAuth()

    return (
        <DrawerContentScrollView {...props}>

            <View style={styles.containerUser}>
                <Image style={styles.avatar} source={{ uri: 'https://images.unsplash.com/photo-1476136236990-838240be4859?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=60' }} />
                <Text style={styles.textName}>{user?.name}</Text>
                <Text style={styles.textUsername}>{user?.username}</Text>
            </View>

            <DrawerItemList {...props} />
            <DrawerItem
                icon={({ focused, color, size }) => <Feather color="#9c9cab" size={size} name="log-out" />}
                labelStyle={{ color: '#9c9cab' }}
                label="Sign Out"
                onPress={() => signOut()}
            />
        </DrawerContentScrollView>
    );
} 

const UserRoutes: React.FC = () => (
    <Drawer.Navigator drawerContentOptions={drawerContentOptions} drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen 
        options={{ drawerIcon: () => <Feather name="home" size={24} color="#9c9cab" /> }}
        name="Home" component={AppRoutes} />
    </Drawer.Navigator>
)

const styles = StyleSheet.create({
    containerUser: {
        padding: 10,
    },
    textName: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    textUsername: {
        color: '#9c9cab'
    },
    avatar: {
        height: 80,
        width: 80,
        borderRadius: 50
    }
})

export default UserRoutes