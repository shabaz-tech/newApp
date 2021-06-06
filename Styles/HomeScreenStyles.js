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
        marginBottom : '10%'
    },
        card:{
            justifyContent  : 'space-between',
            flex: 1,
        
            padding : '1%',
            paddingRight:'1%',
            shadowColor:'white',
            shadowOffset : {
              width: 0,
              height : 0
            },
            shadowOpacity : 0.0,
          
            elevation : 6,
           
            marginVertical : '2%',
            
            marginLeft : '2%',
            marginRight : '2%',
            width : '95%',
            borderRadius : 10,
            backgroundColor : 'white',
            height : '20%'
          },
})