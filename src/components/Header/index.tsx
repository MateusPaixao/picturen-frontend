import React from 'react';
import { Feather } from '@expo/vector-icons'
import { HeaderContainer } from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, DrawerActions } from '@react-navigation/native'

const Header: React.FC = (props: any) => {
  const { onPress } = props

  const navigation = useNavigation()
  return (
      <HeaderContainer>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ margin: 10 }}>
              <Feather name="menu" size={35} color="#1b86f9" />
          </TouchableOpacity>
      </HeaderContainer>
  )
}

export default Header;