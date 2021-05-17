import React ,{useState,useEffect} from 'react';
import { Text,Image, View, Dimensions,TouchableOpacity, Platform, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CheckBox  from '@react-native-community/checkbox';

import { useNavigation ,useRoute} from '@react-navigation/native';
import localStringData from '../../../const/localStringData';


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CartOrderDrop({value , isLast}) {

  function getPriceInfoByOptionData(options){
	
    var p = 0;
    var op = 0;
    var sp = 0;
    let optionList = options.options.optionList;

     for(let calKey in optionList){
       for(let z =0;z<	optionList[calKey].length ;z++){
         op += optionList[calKey][z].opt_price;
       }
     }

     if(options.options.isOptional == false){
       p += Math.round((options.prd_price) - ((options.prd_price * options.prd_sale_rate) / 100));
       sp += Math.round(((options.prd_price * options.prd_sale_rate) / 100));
     }

    return { price : p , optionPrice : op , salePrice : sp };
}


   function getOptionString(){         
          let optionText="";
          for(let key in value.options.optionList){
            optionText += "[";
            let optionlist = value.options.optionList[key];
            optionText +=(value.options.isSetOptional==true) ? value.prd_title+":" : "";

            for(let z =0;z < optionlist.length;z++){
              var opt = optionlist[z];
              optionText += opt.opt_name + ( z + 1 == optionlist.length ?"" : "/");
            }
            optionText+="]"
          }

          return optionText + " "  + (priceInfo.optionPrice > 0 ? `+${numberWithCommas(priceInfo.optionPrice)}원 ` : "") +value.count +"개";
   }

  

   let priceInfo = getPriceInfoByOptionData(value);


    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.option}>
            { 
              getOptionString() 
            }
            </Text>
          </View>
          <View>
              <View style={styles.priceContainer}>
                  <Text style={styles.price}>
                     {numberWithCommas((priceInfo.price + priceInfo.optionPrice) * value.count)}원
                  </Text>
              </View>
             
          </View>
        </View>
        {
          isLast ? 
          null
          :
          <View style={styles.bottomLine}></View>
        }        
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"94%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#efefef"
  },
  itemContainer:{
    width:"100%",
    padding:"4rem",
    flexDirection: 'row',
    justifyContent: "center",
  },

  deleteContainer:{
    width:"30rem",   
    height:"22rem",   
    color:"#7C7C7C",
    fontSize:"14rem",
    backgroundColor:"black",
    alignItems: "center",
    justifyContent: "center",
    marginLeft:"2rem",
  },
  
  controllerContainer:{
    flexDirection: 'row',
    left:"8rem",
  },

  optionTextContainer:{
    width:"180rem",
    marginRight:"auto",
    paddingLeft:"10rem",
    paddingTop:"10rem",
  },

  priceContainer:{
    width:"120rem",
    padding:"10rem",
    
  },

  option:{
    color:"grey",
    fontSize:"14rem",
  },

  price:{
    marginLeft:"auto",
    fontFamily:"Montserrat-Bold",
    fontSize:"14rem",
  },

  countContainer:{
    width:"70rem",
    height:"22rem",
    flexDirection: 'row',
    borderWidth:1,
    borderColor:"grey",
    justifyContent :"center",
    alignItems: "center",
  },

  delete:{
    color:"white",
    fontSize:"14rem",
    backgroundColor:"black",
  },

  bottomLine:{
    width:"90%",
    height:"1rem",
    borderStyle: 'dashed',
    borderRadius: 0.5,
    borderWidth: 1,
    borderColor:"grey",
  },  

  touchableOpacity:{
    width:"36rem",
    height:"20rem",
    justifyContent :"center",
    alignItems: "center",
  },
  
  minus:{
    width:"8rem",
    height:"2rem",
    top:"1rem",
  },
  num:{
    fontSize:"16rem",
  },
  plus:{
    width:"8rem",
    height:"8rem",
    marginRight:"5rem",
  }
  
  
});
