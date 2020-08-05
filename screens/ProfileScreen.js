import React, { Component } from 'react';
import { View, Text ,StyleSheet,Image, TextBase } from 'react-native';
import Fire from '../fire';
import { Button } from 'galio-framework';

export default class ProfileScreen extends Component {
 
  state={
    user:{ }
  };

  unsubscribe=null;
  
  componentDidMount(){
    const user = this.props.uid || Fire.shared.uid;

    this.unsubscribe = Fire.shared.firestore
    .collection("users")
    .doc(user)
    .onSnapshot(doc=>{
      this.setState({user:doc.data() });
    });
  }

componentWillUnmount(){
  this.unsubscribe();
}

  render() {
    
    return (
      <View style={styles.container}>
        <View style={{marginTop:64, alignItems:"center"}}>
          <View style={styles.avatarContainer}>
            <Image 
            style={styles.avatar} 
            source={
              this.state.user.avatar
              ?{uri:this.state.user.avatar}
              :require("../assets/tempAvatar.jpg")
            } 
            />
          </View>
          <Text style={styles.name}>{this.state.user.name}</Text>
        </View>
     
        <View style={styles.stat}>

        <Button style={styles.button}  round uppercase color="#E9446A"size="small"  onPress={()=>{Fire.shared.signOut()}} >Log Out</Button>


            </View>
      </View>
    );
  }
}
const styles= StyleSheet.create({
    container:{
        flex: 1,
    },
    avatarContainer:{
      shadowColor:"#151734",
      shadowRadius:30,
      shadowOpacity:0.4
    },  
    avatar:{
      width:136,
      height:136,
      borderRadius:68
    },
    name:{
      marginTop:24,
      fontSize:16,
      fontWeight:"600"
    },
    statsContainer:{
      flexDirection:"row",
      justifyContent:"space-between",
      margin:32
    },
    stat:{
      alignItems:"center",
      flex:1
    },
    statAmount:{
      color:"#4F566D",
      fontSize:18,
      fontWeight:"300"
    },
    statTitle:{
      color:"#C3C5CD",
      fontSize:12,
      fontWeight:"500",
      marginTop:4
    },
    button:{
      justifyContent:'center',
      alignItems:"center",
      marginHorizontal:25,
      marginVertical:20
    }
})
