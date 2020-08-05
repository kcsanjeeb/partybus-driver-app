
import React from 'react';

import * as Permissions from 'expo-permissions';
import { Dimensions,Text,View,ActivityIndicator } from 'react-native';
import { Button } from 'galio-framework';
import { BarCodeScanner } from 'expo-barcode-scanner';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ScannerScreen extends React.Component{
  
  state = {
    hasCameraPermission: null, 
    isScanned: false 
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    this.setState({ hasCameraPermission: status === "granted" ? true : false });
  }

  handleBarCodeScanned = ({ type, data }) => {
      this.props.navigation.navigate('DecodeScreen', {
        data: data 
      });
  }

  render(){
    const { hasCameraPermission, isScanned } = this.state;
    if(hasCameraPermission === null){
      console.log("Requesting permission");
      return (
        <View style={{flex:1,justifyContent:"center", backgroundColor: "#EFECF4"}}>
          <ActivityIndicator size="large" color="red" />
          <Text>Loading ... </Text>
        </View>
      );
    }

    if(hasCameraPermission === false){
      return ( 
        <View style={{flex:1,justifyContent:"center"}}>
         <Text>Please grant Camera permission</Text>
        </View> 
      )
    }

    if(hasCameraPermission === true && !isScanned && this.props.navigation.isFocused() ){
      return <View style = {{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
  
        backgroundColor: "#EFECF4"
      }}>
       
        <View style={{ }}>
        <BarCodeScanner
          onBarCodeScanned = { isScanned ? undefined : this.handleBarCodeScanned }
          style = {{
            height:  windowHeight/1.5,
            width: windowWidth,
          
          }}
        >
        </BarCodeScanner>
        </View>
      </View>
    }
    else{
      return (
      <View>
        <Text>Problem arised</Text>
      </View>
    )}


  }

}