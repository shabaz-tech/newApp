import  { StyleSheet,Dimensions } from 'react-native'

const w  = Dimensions.get('screen').width;

export default StyleSheet.create({
    container  : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    image : { width:w*0.8, 
        height:w*0.8, 
        borderRadius:100,
        marginLeft:'2%',
        marginBottom : '10%'}
})