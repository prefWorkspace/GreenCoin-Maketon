import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });



function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ReviewDetailTitle({reviewData , productInfo}){


  if(!reviewData || !productInfo || !reviewData.mog_option)
    return null;

    var mogOption = JSON.parse(reviewData.mog_option);

    function calculateTotal(){
      var mogPrice  = Math.round(reviewData.mog_total_price * ((reviewData.mog_total_dis_price - reviewData.txn_shipping) / (reviewData.mog_price)));
        return numberWithCommas(mogPrice);
    }
  

  const getOptionText = () =>{
      var tagList = [];
      mogOption.data.map((value)=>{
        for(let key in value.options.optionList){
          let optionlist = value.options.optionList[key];
          let optionText = "";
          optionlist.map((opt,i)=>{
            optionText += " " + opt.opt_name + ( i + 1 == optionlist.length ?  " " :  " /");
          })
          tagList.push(<Text style={styles.size}>{optionText}</Text>);
        }
      });
      return tagList;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{productInfo.prd_title}</Text>
      <View style={styles.titleDetailContainer}>
        <Text style={styles.salePrice}>{numberWithCommas(calculateTotal())}원</Text>
        <View style={styles.sizeBox}>
        {
          getOptionText()
        }
        </View>
      </View>
  </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
    padding:"15rem",
  },
  sizeBox:{
    marginRight:"auto",
  },
  size:{
    fontSize:"14rem",
  },
  title:{
    fontSize:"19.819rem",
    marginRight:"auto",
  },
  titleDetailContainer:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  salePrice:{
    color:"black",
    fontSize:"23.782rem",
    marginRight:"10rem",
  },
  originalPrice:{
    color:"#878787",
    fontSize:"18.828rem",
    marginRight:"auto",
  },
});