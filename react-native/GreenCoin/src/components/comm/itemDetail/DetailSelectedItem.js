import React ,{useState,useEffect}from 'react';
import { Text, View, Dimensions,TouchableOpacity,Image, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function DetailSelectedItem({item,title,count, price,index,removeSelectItem,updateCount}){

  var optionList = [];

  for(const key in item.optionList){
    optionList.push(item.optionList[key]);
  }
  
  const decreaseCount = () =>{
    if(count > 1){
      updateCount(index,count - 1);
    }
  }


  const increaseCount = () =>{
    updateCount(index,count + 1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={()=>{removeSelectItem(index)}}>
          <Text style={styles.title}>X</Text>
        </TouchableOpacity>
      </View>
      {
        optionList.map((list)=>{

          let optionName = "";
          let price = 0;
          
          for(var i = 0;i<list.length;i++){
            price += list[i].opt_price;
            optionName += " " + list[i].opt_name + ( i + 1 == list.length ?  " " :  " /");
          }
          optionName += price > 0 ? " 옵션가 : " + numberWithCommas(price) +"원" : "";
          return <Text style={styles.title}>[ 옵션 : {optionName} ]</Text>;
        })
      }
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
      <Text>{numberWithCommas(price)}원</Text>
      </View>
   
    </View>
  )
};

const styles = EStyleSheet.create({
  container:{
    padding:"15rem",
    width:"100%",
  },
  title:{
    fontSize:"12.882rem",
    marginRight:"auto",
  },
  titleContainer:{
    flexDirection: 'row',
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
    height:"10rem",
    right:"5rem",
  },
  touchableOpacity:{
    width:"40rem",
    height:"100%",
    margin:"5rem",
    justifyContent :"center",
    alignItems: "center",
  },
 
});