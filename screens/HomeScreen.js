import React,{useEffect,useState,useCallback} from 'react';
import { View, StyleSheet,Dimensions,FlatList,RefreshControl,Text} from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
  useNavigationState
} from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';
import BigCard from '../model/bigCard'
import MapsApi from '../apis/MapsApi';
import { Button } from 'galio-framework';

HomeScreen =()=>{
  const navigation = useNavigation();
  
  const {width,height} =Dimensions.get('window')
  const  [news, setNews] = useState([])
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

    useEffect(()=>{
        getNewsFromAPI();
    },[setRefreshing])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getNewsFromAPI();
        setTimeout(()=>setRefreshing(false),1000)
      }, [refreshing]);

    function getNewsFromAPI(){ 
      MapsApi.get('routes_gps.php')
        .then(async function(response){     
                setNews(response.data)
        })
        .catch(function(error){
            console.log(error)
        })
    }

  if(!news){
      console.log('null')
  }
  return(
    <View style={styles.container}>
    
 <FlatList data={news}
  style={{width:width}}
        keyExtractor={(item,index)=>'key'+index}
        renderItem={({item,index})=>{
            return (<BigCard item={item}/>)
            
        }} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
       />
       
       <View style={styles.bottomBar}>
       
       <Button size="large" onPress={() => navigation.navigate('ScannerScreen')} color="#E9446A" shadowless style={{ fontSize: 20,marginTop:15 }}><Text style={{fontSize:28,color:'#fff'}}><AntDesign name="qrcode" size={45} style={{ color: "#fff", shadowColor: "#E9446A", shadowOffset: { width: 0, height: 0 }, shadowRadius: 10, shadowOpacity: 0.3 }} /><Text>Scan Tickets</Text></Text></Button>
        </View>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  ActivityIndicatorStyle:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#222a42'
  
},
image: {
  flex: 1,
  resizeMode: "cover",
  justifyContent: "center"
},
bottomBar:{

  justifyContent: 'center',
  alignItems: 'center',

}
})
export default HomeScreen;