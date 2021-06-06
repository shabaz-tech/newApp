import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer  } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LandingScreen from '../Containers/LandingScreen'
import HomeScreen from '../Containers/HomeScreen'
import NewsDetailsScreen from '../Containers/NewsDetailsScreen'

const Index = () => {

    const rootStack = createStackNavigator()
    
    const globalOptions  = {
        headerStyle  : { backgroundColor : "#202d64" },
        headerTitleStyle : { color : 'white' },
        headerTintColor : "white"
    }

    return (
     <NavigationContainer>
        <rootStack.Navigator initialRouteName="LandingScreen" screenOptions = {globalOptions} >
            <rootStack.Screen name = "LandingScreen" component = {LandingScreen} options ={{ headerShown : false }} />
            <rootStack.Screen name = "Home" component = {HomeScreen} options ={{ title : 'News',  headerTitleAlign: 'center', }} />
            <rootStack.Screen name = "Details" component = {NewsDetailsScreen} options ={{ title : false }}/>
        </rootStack.Navigator>
     </NavigationContainer>
    )
}

export default Index
