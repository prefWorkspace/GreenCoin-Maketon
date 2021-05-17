import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,TextInput,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function WriteReviewOrderOption({orderState}) {

  console.log(orderState)
    if(!orderState)
      <View></View>

      return null;
    const option = JSON.parse(orderState.mog_option);

    const getOptionText = () =>{
      let optionText = "";
      option.data.map((value)=>{
        for(let key in value.options.optionList){
          let optionlist = value.options.optionList[key];
          let opPrice = 0;
          optionlist.map((opt,i)=>{
            optionText += " " + opt.opt_name + ( i + 1 == optionlist.length ?  " " :  " /");
            opPrice += opt.opt_price;
          })
          optionText += (opPrice ? numberWithCommas(opPrice) +"원 " : "") + value.count +"개\n"
        }
      });

      return optionText;
  }

    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
             <Text style={styles.title}>* 구매 옵션</Text>
             <TextInput placeholder={getOptionText()} style={styles.inputTitle} editable={false}></TextInput>
          </View>
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft :"20rem",
    paddingRight:"20rem",
  },
  itemContainer:{
    width:"100%",
  },
  inputTitle:{
    width:"100%",
    borderWidth:1,
    borderColor:"#E1E6ED",
    borderRadius:5,
    padding:"10rem",
    fontSize:"14rem",
  },
  title:{
    color:"black",
    fontFamily:"NotoSansKR-Bold",
  }


});
