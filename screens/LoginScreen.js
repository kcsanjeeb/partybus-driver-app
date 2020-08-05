import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableOpacityComponent, Image, StatusBar, LayoutAnimation } from 'react-native';
import * as firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class LoginScreen extends Component {
    static navigationOptions={
        headerShown: false
    };
  state={
      email:"",
      password:"",
      errorMessage: null,
  }
 

  handleLogin =()=>{
      console.log('hey')
      const {email,password}=this.state
      firebase.auth().signInWithEmailAndPassword(email,password)
      .catch(error=>this.setState({errorMessage:error.message}));
    
  }
  render() {
      LayoutAnimation.easeInEaseOut();
    return (
        <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
     
        
          <StatusBar barStyle="light-content"></StatusBar>
            <View style={{marginTop:110,marginBottom:80 }}> 
            <Image
                source={require("../assets/party-bus-nepal.png")} style={{alignSelf:"center",width: 320,
                height: 140,shadowColor: '#000',
                shadowOffset: { width:-4, height: 3 },
                shadowOpacity: 0.7,
                shadowRadius: 5}}></Image></View>
        <Text style={styles.greeting}>
            {`Hello again. \nWelcome Back`}
        </Text>
        <View style={styles.errorMessage}>
            {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>

        <View style={styles.form}>
            <View> 
                <Text style={styles.inputTitle}>Email Address</Text>
                <TextInput 
                style={styles.input} 
                autoCapitalize="none"
                onChangeText={email =>this.setState({email})}
                value={this.state.email}
                ></TextInput> 
            </View>
            <View style={{marginTop:32}}> 
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput 
                style={styles.input}  
                secureTextEntry 
                autoCapitalize="none"
                onChangeText={password=>{this.setState({password})}}
                value={this.state.password}
                ></TextInput> 
            </View>
        </View>

         <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
             <Text style={{color:"#FFF",fontWeight:"900"}}>SIGN IN </Text>
         </TouchableOpacity>

    
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    greeting:{
        marginTop:-32,
        fontSize:18,
        fontWeight:"400",
        textAlign:"center"
    },
    errorMessage:{
        height:72,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:30,
    },
    error:{
        color:"#E9446A",
        fontSize:13,
        fontWeight:"600",
        textAlign:"center",
    },
    inputTitle:{
        color:"#8A8F9E",
        fontSize:13,
        fontWeight:"600",
        textTransform:"uppercase"
    },
    form:{
        marginBottom:48,
        marginHorizontal:30,
    },
    input:{
        borderBottomColor:"#8A8F9E",
        borderBottomWidth:StyleSheet.hairlineWidth,
        height:40,
        fontSize:20,
        color:"#161F3D"
    },
    button:{
        marginHorizontal:30,
        backgroundColor:"#E9446A",
        borderRadius:4, 
        height:52,
        alignItems:"center",
        justifyContent: 'center'
    }
});
