import React, { Component,useEffect,useState } from 'react';
import { Platform, View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList, Image, Dimensions, Switch,TouchableOpacity } from 'react-native';
import { Button } from 'galio-framework';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LottieView from "lottie-react-native";
// import * as TaskManager from 'expo-task-manager';
import Constants from 'expo-constants';
// const LOCATION_TASK_NAME = "background-location-task";
const MapScreen=()=>{

    const navigation = useNavigation();
    const route = useRoute();

    const [BusStatus,setBusStatus]=useState()
    const [status,setStatus]=useState()
    
    const routeName = route.params.itemId;  
    console.log(routeName)

    function BusStatusCheck(){
        if(BusStatus=='off'){
            return(
        <LottieView
            autoPlay
            style={{
                width: 200,
                height: 200,
            }}
            source={require('../assets/lottie/error.json')}
            />
            )
        }else if(BusStatus=='on'){
            return(
            <LottieView
            autoPlay
            style={{
                width: 200,
                height: 200,
            }}
            source={require('../assets/lottie/success.json')}
            />
            )
        }else{
            return(
                <ActivityIndicator size="large" color="grey" />
            )
        }
    }
    
    function mainData(){
        firebase.database().ref(routeName+'buttonCondition').once('value').then((datasnapshot)=> {      
        if(datasnapshot.val().turnMap=='on'){
            _getLocationAsync()
        }else{
            firebase.database().ref(routeName).set({
                latitude:null,
                longitude:null
            })
        }
        });
        firebase.database().ref(routeName+'buttonCondition').once('value').then((datasnapshot)=> {      
            setBusStatus(datasnapshot.val().turnMap)
        });
        
    }
 
    useEffect(()=>{
    let { status } = Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            if (Platform.OS === 'android' && !Constants.isDevice) {
                console.log('not this device')
                  } else {
                      setInterval(
                  mainData
                  ,5000)
                }
    }

   
    })

    function setMapData(){
      firebase.database().ref(routeName+'buttonCondition').set({
        turnMap:'on'
      }) 
    }

    function deletMapData(){
      firebase.database().ref(routeName+'buttonCondition').set({
        turnMap:'off'
      })
    }
    
    async function _getLocationAsync(){

        // await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        //     enableHighAccuracy: true,
        //     distanceInterval: 1,
        //     timeInterval: 5000
        //   });
        //   // watchPositionAsync Return Lat & Long on Position Change
        //    location = await Location.watchPositionAsync(
        //     {
        //       enableHighAccuracy: true,
        //       distanceInterval: 1,
        //       timeInterval: 10000
        //     },
        //     newLocation => {
        //       let { coords } = newLocation;
        //       console.log(coords);
        //       let region = {
        //         latitude: coords.latitude,
        //         longitude: coords.longitude,
        //         latitudeDelta: 0.045,
        //         longitudeDelta: 0.045
        //       };
        //     //   this.setState({ region: region });
        //     },
        //     error => console.log(error)
        //   );
        //   return location;

      let location =await Location.getCurrentPositionAsync({});
 
      firebase.database().ref(routeName).set({
        location
      })
      }
    
    function SwitchOn(){
        return(
        <Button color="#50C7C7" shadowless onPress={setMapData}>ON</Button>
        )
    }

    function SwitchOff(){
        return(
        <Button color="#E9446A" shadowless onPress={deletMapData}>OFF</Button>
        )
    }

    

  return(
   
      <View style={styles.container}>         
              {/* <Button onlyIcon icon="close" iconFamily="antdesign" iconSize={30}  color="#E9446A" iconColor="#fff" style={{ width: 40, height: 40, marginLeft:'auto'}} onPress={()=>{navigation.navigate('App')}}>warning</Button>  */}
              <Text style={{fontSize:25,color:'#E9446A'}}>Route Name : {routeName}</Text>
              <Text style={{fontSize:25,color:'#E9446A'}}>Bus Status : {BusStatus}</Text>
              <View style={{marginTop:25}}>
                <BusStatusCheck/>
              </View>
              
              <View style={styles.bottomBar}>
                  <SwitchOn/>
                  <SwitchOff/>
              </View>
      </View>
);
}
// TaskManager.defineTask(LOCATION_TASK_NAME, ({ data: { loca }, error }) => {
//     console.log('background-------')
//     if (error) {
//      console.log(error)
//       return;
//     }
//     console.log('Received new locations', loca);

//   });

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      marginTop:25

  },
  header: {
      paddingTop: 64,
      paddingBottom: 16,
      backgroundColor: "#FFF",
      alignItems: "center",
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: "#EBECF4",
      shadowColor: "#454D65",
      shadowRadius: 15,
      shadowOpacity: 0.2,
      zIndex: 10
  },
  headerTitle: {
      fontSize: 20,
      fontWeight: "500"
  },
  circle: {
      width: 500,
      height: 500,
      borderRadius: 500 / 2,
      backgroundColor: "#fff",
      position: 'absolute',
      left: -120,
      top: -20
  },
  paragraph: {
      margin: 24,
      fontSize: 18,
      textAlign: 'center',
  },
  map: {
      ...StyleSheet.absoluteFillObject
  },
  locationSwitch: {
      left: 280,
  },
  topBar: {
      top: Platform.OS === "android" ? hp('2%') : hp('5%'),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginHorizontal: wp("2%"),
  },

  rightBar: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center"
  },
  bottomBar:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    position: 'absolute',
    bottom:10,
    marginBottom:25
  }
})

export default MapScreen;
