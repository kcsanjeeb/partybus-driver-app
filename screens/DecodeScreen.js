import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions, Text, View, StyleSheet, Animated ,ActivityIndicator} from 'react-native';
import { TouchableOpacity } from "react-native";
import { Button } from 'galio-framework';
import LottieView from "lottie-react-native";


export default function DecodeScreen(props) {
    const navigation = useNavigation();
    const route = useRoute();

    // const data = props.navigation.getParam("data", "NO-QR");
    const data = route.params.data;
    const [contact, setContact] = useState(' ...');
    const [date, setDate] = useState('...');
    const [time, setTime] = useState(' ...');
    const [bus, setBus] = useState(' ...');
    const [pax, setPax] = useState(' ...');
    const [pickup, setPickup] = useState(' ...');
    const [payStatus, setPayStatus] = useState(' ...');
    const [status, setStatus] = useState('...');

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    

    function PaidStatus(){
        if(payStatus=='Paid'){
            return(
                <View style={{ backgroundColor: '#32CD32', borderRadius: 9, height: 25, width: 80, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', textTransform: 'uppercase', color: '#fff', fontSize: 18, fontWeight: '600' }}>{payStatus}</Text>
           </View>
            )
        }else{
            return(
            <View style={{ backgroundColor: 'red', borderRadius: 9, height: 25, width: 80, justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', textTransform: 'uppercase', color: '#fff', fontSize: 18, fontWeight: '600' }}>{payStatus}</Text>
       </View>   
            )
        } 
    }
    function ActiveStatus(){
        

    
        if(status=='ACTIVE'){
            function onsubmit(){
                console.log('button clicked')
                fetch(`http://209322598e25.ngrok.io/partybusnepal/pbn_api/qr_enter.php?res=yes&tik_id=${data}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    },
        
                }).then((response) => response.json())
                .then((response) => {
                    console.log(response)
                }).catch((error)=>{
                    console.log(error)
                })
                console.log('button clicked and done')
                // navigate('Scanner')
            }
            return(
                <View style={{ marginTop: 15 }}>
                <Button size="small" onPress={onsubmit} color="#50C7C7" shadowless style={{ fontSize: 20,marginTop:15 }}>GO</Button>
            </View>
            )
        }else if(status=='EXPIRED'){
            return(
            <View style={{ marginTop: 25 }}>
                   <Button size="large" color="red" shadowless style={{ fontSize: 25,marginTop:15 }}>The ticket is expired.</Button>
              
            </View>
            )
        }else{
            return(
                <View style={{ marginTop: 25 }}>
                <Button size="large" color="red" shadowless style={{ fontSize: 25,marginTop:15 }}>Invalid Ticket</Button>
           
                </View> 
            )
        }
    }

    function Success(){
        
        if(status=='EXPIRED'){
            return(
        <LottieView
            autoPlay
            loop
            style={{
                width: 100,
                height: 100,

                borderColor: 'silver', borderWidth: 0.3,borderRadius:15

            }}
            source={require('../assets/lottie/error.json')}
           
        />
            )
        }else if(status=='ACTIVE'){
            return(
            <LottieView
            autoPlay
            loop
            style={{
                width: 100,
                height: 100,

                borderColor: 'silver', borderWidth: 0.3,borderRadius:15

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
useEffect(()=>{
    fetch(`http://209322598e25.ngrok.io/partybusnepal/pbn_api/qr_getinfo.php?tik_id=${data}`)
        .then((response) => response.json())
        .then((response) => {
         
            setContact(response.contact);
            setDate(response.Pdate);
            setTime(response.time);
            setBus(response.rName);
            setPax(response.pax);
            setPickup(response.pickup);
            setPayStatus(response.payStatus);
            setStatus(response.status);

        })
        .catch((error) => {
            console.log('not found history')
        })
    })
 
    return (
        <View style={styles.container}>
            
            <View style={styles.box}>

                <View style={{ flexDirection: "row" }}>
                    <View style={{ padding: 15 }}>
                        <View style={styles.textView}>
                            <Text style={styles.textHeader}>Date</Text>
                            <Text style={styles.text}>{date}</Text>
                        </View>
                        <View style={styles.textView}>
                            
                                <View>
                                    <Text style={styles.textHeader}>Time</Text>
                                    <Text style={styles.text}>{time}</Text>
                                </View>

                            
                        </View>
                        <View style={styles.textView}>
                            
                            <View>
                                <Text style={styles.textHeader}>Contact</Text>
                                <Text style={styles.text}>{contact}</Text>
                            </View>

                        
                    </View>


                    </View >


                    <View style={styles.textView}>
                        <View style={styles.routeHeader}>
                            <Text style={styles.routeHeader}>Route Name</Text>
                            <Text style={styles.textRoute}>{date}</Text>
                        </View>
                        <View style={styles.textViewPax}>
                            <Text style={styles.textHeaderPax}> Pax</Text>
                            <Text style={{ color: '#32CD32', fontSize: 60, fontWeight: '900',textAlign: 'right'}}>{pax}</Text>
                        </View>
                    </View>


                </View>
                <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row' }}>
           
                    <View style={{ borderTopColor: 'silver', borderTopWidth: 1, padding: 10 }}>
                    <Text style={styles.text}>Pickup Point : {pickup} </Text>
                    <View>
                        <Text style={styles.textPaid}>Payment Status</Text>
                             <PaidStatus/>
                         </View>
                    </View>
               </View>
            
                    <View style={{marginLeft:'auto'}}>
                        <Success/>
                    </View>
                </View>

            </View>
          <ActiveStatus/>
        </View>
    );
}
DecodeScreen.navigationOptions = {
    title: 'Decoded'
};



const styles = StyleSheet.create({

    container: {
        justifyContent: 'center', alignContent: 'center', alignItems: 'center', flex: 1,
        backgroundColor: "#EFECF4",
      
    },
    box: {
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        elevation: 15,
        shadowOpacity: 0.56,
        shadowRadius: 9.51,
        padding: 25,
    },
    text: {
        color: 'grey',
        fontSize: 18,
        marginBottom: 15
    },
    textRoute:{
        color: 'grey',
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'right'
    },
    textHead: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 25
    },
    textHeader: {
        color: 'grey',
        fontSize: 30,
        fontWeight: '700'
    },
    routeHeader:{
        color: 'grey',
        fontSize: 25,
        fontWeight: '700',
        marginTop:8
    },
    textHeaderPax:{
        color: 'grey',
        fontSize: 40,
        fontWeight: '700',
        textAlign:'right'
    },
    textBus: {
        fontSize: 25,
      
        textTransform: 'uppercase',
        color: 'grey',
        fontWeight: '800',
        paddingBottom: 15
    },
    textPaid:{
        color: 'grey',
        fontSize: 18,
        paddingTop:-5,
        marginBottom: 15
    },

});
