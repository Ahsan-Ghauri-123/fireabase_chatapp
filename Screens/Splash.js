import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';

const Splash = (props) => {
  useEffect(()=>{
    setTimeout(()=>{
      props.navigation.navigate("Login");
    }, 3000);
  }, []);
  return (
    <View style={{flex:1, backgroundColor:"#98eb34", justifyContent:"center", alignItems:"center"}}>
    <Image source={require("../assets/images/image-removebg-preview.png")} style={{height:350, width:280}} />
    <Text style={{fontSize:45, fontWeight:"bold", color:"black", opacity:0.7}}>CHAT APP</Text>
    </View>
  );
};


export default Splash;