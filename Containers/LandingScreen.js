import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView,Button } from 'react-native'
import styles from '../Styles/LandingScreenStyles'

const LandingScreen = ( {navigation} ) => {

    const navigateToHome = () =>{
        navigation.replace('Home')
    }
    return (
        <View style = {styles.container}>
                <Image  source = {require('../assets/newsLogo.png')} 
                 resizeMode='cover' style={styles.image}/>
                <View style= {{marginTop : '20%'}}>
                    <Button     
                        style ={{padding : '60%'}}
                        title ="Get started"
                        color="#202d64"
                        onPress = {navigateToHome}
                    />
                </View>
        </View>
    )
}

export default LandingScreen
