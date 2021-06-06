import React,{useState,useEffect} from 'react'
import { View, Text,Image,Dimensions, ScrollView,Button, Share, TouchableOpacity } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from '../Styles/NewScreenDetailsStyle'
import * as FileSystem from 'expo-file-system';
import { documentDirectory } from 'expo-file-system'
import * as MediaLibrary from "expo-media-library";

const w  = Dimensions.get('screen').width;


const NewsDetailsScreen = ( props ) => {

    const [dataRecievedFromParams,setdataRecievedFromParams] =  useState([])
   
    useEffect(()=>{
        const data = props.route.params.item
        if(!data) return 
        return setdataRecievedFromParams(data)
    },[])

   const handleShare = () => {
    
     let title = dataRecievedFromParams.title
     let url =dataRecievedFromParams.url
     let message = `${title}\n\n Read more @${url} \n\n Shared via Daily news App`
     return Share.share(
         {title,message, url : message},
         {dialogTitle : `Share ${title}`}
     )
   }

   const splitImageName = () => {
    let url = dataRecievedFromParams.urlToImage
     let imagePath = url.split('/')
     let filename = imagePath[imagePath.length - 1]
    //console.log(filename)
    saveImage(url,filename)
   }

   
    const saveImage = async(url,filename) => {

      var imageUrl =  url
      var imageName = filename

      const downloadResumable = FileSystem.createDownloadResumable(
        imageUrl,
        
        FileSystem.documentDirectory + imageName,
        
        {},
    
      );

      try {
        const { uri } = await downloadResumable.downloadAsync();
        console.log("Finished downloading to ", uri);
        //savefile (uri);
        const { status } = await MediaLibrary.requestPermissionsAsync();
      //console.log(status);
      if (status === "denied") {
        alert("You need to provide permission");
      }
  
      if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(uri);
        console.log("Asset", asset);
        const status = await MediaLibrary.createAlbumAsync(
          "Download",
          asset,
          false
        );
        if (status.title == "Download") alert("File Saved to Downloads");
        else alert("File Didn't save....");
      }
      } catch (e) {
        console.error(e);
      }
    
  
    //  savefile = async (fileUri) => {
 
      
    // };
   }

    
  
    return (
        <View > 
           <ScrollView>
           <View style= {{padding : '2%',flexDirection : 'column' }}>
                <Image resizeMode='cover' style={{ width:w*0.96, height:w*0.7, borderRadius:8,}}
                    source={{ uri: dataRecievedFromParams.urlToImage }} />
                  <View style ={{marginLeft : '20%',marginRight : '20%',marginTop : '0.8%'}}>
                        <Button     
                                
                                title ="Save Image"
                                color="#202d64"
                                onPress = {splitImageName}
                            />
                  </View>
                 
               
                        <View style= {{flexDirection : 'row',justifyContent : 'space-between',padding : '4%'}}>
                        
                        <Text style= {{fontSize : 18,flex : 1}}>{dataRecievedFromParams.author ? dataRecievedFromParams.author : null }</Text>
                        
                        <View style ={{paddingLeft : '10%',paddingRight : '14%'}}>
                            <TouchableOpacity   onPress = {handleShare}>
                                    <Icon name="share" color ="#777777" size={25} />
                            </TouchableOpacity>
                        </View>
                
                        <Text style= {{fontSize : 18,flex : 1}}>{dataRecievedFromParams.publishedAt ? 
                        moment( dataRecievedFromParams.publishedAt || moment.now()).format("Do MMM, YYYY") : null }</Text>
                    </View>       
                
                    
               
                    <Text  style= {{padding : '2%',flex : 1,flexWrap : 'wrap',opacity: 0.6}}>{dataRecievedFromParams.title}</Text>
                    <Text style= {{padding : '2%',flex : 1,flexWrap : 'wrap',opacity: 0.6}}>{dataRecievedFromParams.description}</Text>
                        <Text style= {{padding : '2%',flex : 1,flexWrap : 'wrap',opacity: 0.6}}>{dataRecievedFromParams.content}</Text>
                
                   
                 
                   
                   
                 
                        
                
            </View>
           </ScrollView>
        </View>
    )
}

export default NewsDetailsScreen
