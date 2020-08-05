import React, { useState }  from 'react'
import {View, StyleSheet, Text, Image, Dimensions,TouchableOpacity,Alert } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {
    useNavigation,
    useRoute,
    useFocusEffect,
    useNavigationState
  } from '@react-navigation/native';
const {width,height} =Dimensions.get('window')
import { Entypo } from '@expo/vector-icons'; 


const BigCard =({item})=>{
    const navigation = useNavigation();
    return( 
        <View style={styles.cardView}> 
            <View style={{flexDirection:'row'}}>
                <View style={styles.LeftCard}>
                    <View style={{flexDirection:'row'}}> 
                        <Feather name="map-pin" size={24} color="silver" />
                        <View>
                            <Text style={styles.boldText}>Start</Text>
                            <Text style={styles.author}>{item.start+' | '}</Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons name="dots-vertical" size={24} color="silver" />
                    <View style={{flexDirection:'row'}}> 
                        <Entypo name="controller-stop" size={24} color="silver" />
                        <View>
                            <Text style={styles.boldText}>Goal</Text>
                            <Text style={styles.author}>{item.end+' | '}</Text>
                        </View>
                    </View>  
                </View>
                <View style={{flex: 1,borderLeftWidth: 0.3,
                     borderLeftColor: 'silver',}}>
                    <View style={{flexDirection:'row', flex: 1,justifyContent: 'space-between', backgroundColor:'#293352'}}> 
                        <View style={{paddingTop:10}}>
                        <Text style={styles.boldText}>Route Name</Text>
                             <Text style={styles.author}>{item.name} </Text>   
                            <Text style={styles.boldText}>Time</Text>
                             <Text style={styles.author}>{item.time} </Text>            
                             </View>
                       
                    </View> 
                    
                    <TouchableOpacity  onPress={() => navigation.navigate('MapScreen',{ itemId:item.name })} style={{borderTopLeftRadius:30}}> 
                        <Text style={{padding:15,textAlign:'center',color:'#fff'}}>View Map </Text>
                    </TouchableOpacity> 
                  
                </View>
            </View>
        </View>
    )
} 
const styles =StyleSheet.create({
    cardView:{
        borderRadius: 5,    
        marginVertical:13,
        marginHorizontal: 15,
        backgroundColor: '#222a42',
        position:'relative',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 7,
        },
        elevation: 15,
        shadowOpacity: 0.56,
        shadowRadius: 9.51,
        
    },
    title:{
        marginHorizontal:width*0.05,
        marginVertical:width*0.03,
        color:'#fff',
        fontSize:20,
        fontWeight:'bold'

    },
    description:{
       color:'grey',
       fontSize:16,
       marginRight: 'auto',
       marginHorizontal:width*0.05,
       marginVertical:width*0.05,
    },
    image:{
        width: 'auto',
        height:height/5,
        marginLeft:width*0.05,
        marginRight:width*0.05,
        marginVertical:width*0.01,
    },
    author:{
        marginBottom:width*0.01,
        marginLeft:width*0.05,
        fontSize:15,
        color:'grey'
    },
    created:{
        marginBottom:width*0.01,
        fontSize:16,
        color:'#D7160A',
        
    },
    boldText:{
        color:'silver',
        fontSize:16,
        fontWeight:'800',
        marginLeft:width*0.05,
    },
    LeftCard:{
        width:width/2,
        padding:17,
       
    },
  
})
export default BigCard