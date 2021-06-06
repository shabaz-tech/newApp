import React,{useEffect,useState} from 'react'
import { View, Text, FlatList,Image,Dimensions,ActivityIndicator, Touchable, TouchableOpacity } from 'react-native'
import styles from '../Styles/HomeScreenStyles'

const w  = Dimensions.get('screen').width;

const HomeScreen = ({navigation}) => {
    const [data,setData] =useState([])
  //  console.log('data ---> ',data)   
    const [loading,setLoading] = useState(true)
    const [error,setError] =useState(null)

    const getNewsData = async () => {
        fetch(`https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=d29d58aab88d4ea0b04ddb245a230068`,{
            method :'GET',
            headers : {
                          'content-type':'application/json'
                       }
             })
                .then (  res => res.json())
                .then ( async data => {
                  setData(data)
                  setLoading(false)  
               })
    }

    useEffect(()=>{
        getNewsData()
    },[])

   

    const renderNewsData = ( {item} ) =>
    (
        <View style={styles.card}>
           <TouchableOpacity onPress = {()=>navigation.navigate('Details', {item})}>
                <View > 
                            <View style= {{padding : '2%' }}>
                                <Image resizeMode='cover' style={{ width:w*0.9, height:w*0.4, borderRadius:8}}
                                    source={{ uri: item.urlToImage }} />
                            </View>
                                <Text style ={{flex : 1,padding : '2%'}}>{item.title} </Text>
                        </View>
           </TouchableOpacity>
        </View>

    )
     
       
    

    return (
        <View style= {styles.container}>  
         {
                 loading ?
                 <View style={{flex:1,alignItems : 'center',marginTop : '60%'}}>
                     <ActivityIndicator size="large" color = "#044594"  />
                 </View>
                 :
           <FlatList 
                data = {data.articles}
                renderItem={ renderNewsData }
                onRefresh={ getNewsData }
                refreshing={loading}
                keyExtractor = {(item,index) =>index.toString()}
           />
        }
        </View>
    )
}

export default HomeScreen
