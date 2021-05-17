import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function DetailAskItem(){
  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.contentContainer}> 
            <View style={styles.replyContainer}>
              <Image style={styles.reply} source={require("../../../../assets/img/ask/reply.png")} resizeMode={"stretch"}/>
            </View>
            <View style={styles.rockContainer}>
              <Image style={styles.rock} source={require("../../../../assets/img/ask/rock.png")} resizeMode={"stretch"}/>
            </View>
            <Text style={styles.title}>상품문의합니다.</Text>
            <View style={styles.newBox}><Text style={styles.new}>NEW</Text></View>
          </View>
          <View style={styles.contentContainer}>
              <Text style={styles.name}>SKIDS*****</Text>
              <Text style={styles.date}>2020.11.30</Text>
          </View>
        </View>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
    alignItems: "center",
    justifyContent :"center",
    borderBottomWidth:1,
    borderColor:"#F0F2F6",
    padding:"5rem",
    marginTop:"10rem",
  },
  titleContainer:{
    height:"50rem",
    marginRight:"45rem",
  },
  replyContainer:{
    marginRight:"20rem",
  },
  reply:{
    width:"20rem",
    height:"12rem",
  },
  rockContainer:{
    width:"17rem",
    marginRight:"5rem",
  },
  rock:{
    width:"16rem",
    right:"10rem",
  },
  title:{
    marginRight:"10rem",
  },
  newBox:{
    width:"38rem",
    height:"18rem",
    borderWidth:1,
    backgroundColor:"#0D2141",
    alignItems: "center",
    justifyContent :"center",
  },
  new:{
    fontSize:"11rem",
    color:"white",
  },
  contentContainer:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent :"center",
    width:"100%",
  },
  name:{
    marginLeft:"80rem",
    marginRight:"15rem",
  },
  date:{
  }
});