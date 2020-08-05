import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

export default class LoadingScreen extends Component {

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
            this.props.navigation.navigate(user ? "HomeScreen" : "Auth");
        })
    }

  render() {
    return (
      <View style={styles.container}>
          <ActivityIndicator size="large"></ActivityIndicator>
        <Text> Loading... </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"

    }
});
