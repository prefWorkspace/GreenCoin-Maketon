import React ,{useState,useEffect}from 'react';
import { Text, View, Dimensions,TouchableOpacity,Image, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });



export default function DeliverModalSelectItem({option,count,setCount}){


  var optionlist = [];
  for(const list in option){
    optionlist.push(option[list]);
  }

  
  const decreaseCount = () =>{
    if(count > 1){
      setCount(count - 1);
    }
  }

  const increaseCount = () =>{
      setCount(count + 1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.labelContainer}>
        {
          optionlist.map((value)=>{
            return  <Text style={styles.title}>[옵션 : {value.size} / {value.color}]</Text> 
          })
        }
        </View>
        <TouchableOpacity onPress={()=>{}}>
          <Text style={styles.close}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultContainer}>
        <View style={styles.countContainer}>
         <TouchableOpacity style={styles.touchableOpacity} onPress={decreaseCount}>
         <Image style={styles.minus} source={require('../../../assets/img/minus-plus/minus.png')} resizeMode={"center"}/>
          </TouchableOpacity>
            <Text style={styles.num}>{count}</Text>
          <TouchableOpacity style={styles.touchableOpacity} onPress={increaseCount}>
          <Image style={styles.plus} source={require('../../../assets/img/minus-plus/plus.png')} resizeMode={"center"}/>
          </TouchableOpacity>
        </View>
      </View>
   
    </View>
  )
};

const styles = EStyleSheet.create({
  container:{
    paddingTop:"10rem",
    paddingRight:"15rem",
    paddingLeft:"15rem",
    width:"100%",
    paddingBottom:"10rem",
    backgroundColor:"#F8F9FA",
  },
  title:{
    fontSize:"12.882rem",
    marginRight:"auto",
  },
  close:{
    left:"30rem",
  },
  titleContainer:{
    flexDirection: 'row',
  },
  labelContainer:{
    width:"88%",
    alignItems: "center",
  },
  resultContainer:{
    flexDirection: 'row',
    alignItems: "center",
    marginTop:"13rem",
  },
  countContainer:{
    width:"89.086rem",
    height:"36.282rem",
    flexDirection: 'row',
    marginRight:"auto",
    borderWidth:1,
    borderColor:"grey",
    justifyContent :"center",
    alignItems: "center",
  },
  minus:{
    fontSize:"30rem",
    width:"11rem",
    height:"1.7rem",
    top:"1rem",
    left:"3rem",
  },
  num:{
    fontSize:"14rem",
  },
  plus:{
    width:"10rem",
    height:"13rem",
    right:"5rem",
  },
  touchableOpacity:{
    width:"40rem",
    height:"30rem",
    margin:"5rem",
    justifyContent :"center",
    alignItems: "center",
  },
 
});