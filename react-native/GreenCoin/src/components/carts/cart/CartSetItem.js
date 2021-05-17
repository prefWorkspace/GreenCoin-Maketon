import React ,{useState,useEffect} from 'react';
import { Text,Image, View, Dimensions,TouchableOpacity, Platform, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CheckBox  from '@react-native-community/checkbox';
import CartOptionDrop from './CartOptionDrop';
import { useNavigation ,useRoute} from '@react-navigation/native';
import localStringData from '../../../const/localStringData';


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CartSetItem({item,active, option ,changeOption,deleteKey, optionalArray, clickActive,setModalItem ,clickDelete}) {

    const [show,setShow] = useState(true);
  
    const navigation = useNavigation();
    const routeInfo = useRoute();

    const getPrice = () => {
      let price = 0;
      option.data.map((value)=>{
        var optionList = value.options.optionList;
        var p = 0;
        for(var calKey in optionList){
          for(var i =0;i<	optionList[calKey].length ;i++){
            p  += optionList[calKey][i].opt_price;
          }
        }
  
        if(value.options.isSetOptional == true || value.options.isOptional == false){
          p  += Math.round((value.prd_price) - ((value.prd_price) * (value.prd_sale_rate)) / 100);
        }
        price += p  * value.count;
      });

      return price;
    }


    const moveToItemDetail = () =>{
      navigation.navigate("itemDetail",{root:routeInfo.name ,id:option.prd_id});
    }

    const purchaseButton = () =>{
      navigation.navigate("cartOrderItem",{root:routeInfo.name ,productlist:[JSON.parse(JSON.stringify(item))]})

    }

    const getOptionText = () =>{

      for(var i =0;i<option.data.length;i++){
        let value = option.data[i];
        for(let key in value.options.optionList){
          let optionlist = value.options.optionList[key];
          let optionText = "";
          optionlist.map((opt,i)=>{
            optionText += " " + opt.opt_name + ( i + 1 == optionlist.length ?  " " :  " /");
          })

          return <Text style={styles.size}>[ {optionText} ] {option.data.length > 1 ? `외 ${option.data.length - 1}건`: ""}</Text>
        }
      }
      return null;
    }

    function deleteOption(index){
      clickDelete(item,index,deleteKey);
    }

    function changeCount(index,num){
      if(option.data[index].count + num < 1)
        return;

      changeOption(option.data[index].count + num, index);
    }



    const setShowModal = () =>{ setShow(!show); };
    const setModalItemEvent = () =>{ setModalItem(item) };

    if(!option || !option.data || option.data.length == 0)
       return null;



    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
              <View style={styles.checkboxContainer}>
                <CheckBox boxType="square" tintColors={{true:"#0D2141" ,false:"#D2D5DA"}} value={active} style={styles.checkBox} onValueChange={()=>{clickActive(!active)}}></CheckBox>
              </View>
              <TouchableOpacity style={styles.imageContainer} onPress={moveToItemDetail}>
                  <Image style={styles.image} source={{uri:localStringData.imagePath + option.prd_img}}></Image>
              </TouchableOpacity>
                <View style={styles.labelContainer}>
                  <Text style={styles.title}>{option.prd_title}</Text>
                  <Text>{ getOptionText()}</Text>
                  <View style={styles.resultContainer}>
                    <Text style={styles.price}>총 {numberWithCommas((getPrice()) * option.count)}원</Text>
                    <Text style={styles.close} onPress={setShowModal}>{ show ? "선택 옵션 접기" : "선택 옵션 보기"}</Text>
                  </View>
              </View>
          </View>
          <View style={styles.hr}></View>
          {
            show ?
              option.data.map((value,index)=>{
                return <CartOptionDrop value={value} isLast={index + 1 == option.data.length} index={index} deleteOption={deleteOption} changeCount={changeCount} ></CartOptionDrop>
              })
            :
              null
          }
          <View style={styles.itemOptionContainer}>
            <TouchableOpacity style={styles.itemOption} onPress={setModalItemEvent}>
              <Text style={[styles.borderBox,styles.option]}>옵션변경</Text>
            </TouchableOpacity>   
            <TouchableOpacity style={styles.itemOption} onPress={purchaseButton}>
              <Text style={[styles.borderBox,styles.order]}>주문하기</Text>
            </TouchableOpacity>   
          </View>
          <View style={styles.hr}></View>
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
    backgroundColor:"white",
  },
  itemContainer:{
    width:"90%",
    height:"146.480rem",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  resultContainer:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginTop:"25rem",
  },
  imageContainer:{
    width:"35%",
    height:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer:{
    width:"10%",
    height:"100%",
    alignItems: "center",
  },
  checkBox:{
    marginBottom:"auto",
    top:Platform.OS != "ios" ? "7rem" : "20rem",
    transform: Platform.OS != "ios" ? [] : [{scaleX:0.8},{scaleY:0.8}]
  },
  labelContainer:{
    width:"60%",
    height:"100%",
    padding:"10rem",
    marginTop:"10rem",
    right:"10rem",
  },  
  image:{
    width :"105rem",
    height :"105rem",
    marginLeft:"5rem",
    marginRight:"auto",
  },
  title:{
    fontSize:"16.846rem",
  },
  price:{
    fontSize:"13rem",
    color:"black",
    marginRight:"auto",
  },
  close:{
    fontSize:"13rem",
    color:"#26CBFF",
    marginLeft:"auto",
  },
  bottomBorder:{
    width:"90%",
    marginTop:"5rem",
    borderBottomWidth:1,
    borderBottomColor :"#efefef",
    backgroundColor:"white",
  },
  itemOptionContainer:{
    width:"76%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'flex-end',
    marginTop:"5rem",
    marginBottom:"5rem",
    marginLeft:"8.5%",
  },
  itemOption:{
    marginLeft:"6rem",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:"5rem",
  },
  size:{
    marginRight:"auto",
    fontSize:"14rem",
    color:"#D2D5DA",
  },
  delete:{
    width:"57.276rem",   
    marginRight:"auto",
    borderColor:"#D2D5DA",
    color:"#7C7C7C",
    fontSize:"14rem",
  },
  option:{
    width:"79.276rem",  
    marginLeft:"auto",  
  },
  order:{
    width:"79.276rem",
    marginLeft:"auto",  
    backgroundColor:"black",
    color:"white",
  },
  borderBox:{
    borderWidth:1,
    borderRadius:Platform.OS != "ios" ? 30 : 4,
    textAlign: 'center',
    paddingTop:Platform.OS != "ios" ? "7rem" : "8rem", 
    height:"32.701rem",
  },
  hr:{
    borderBottomColor:"#D2D5DA",
    borderBottomWidth: 1,
    height:"1rem",
    width:"76%",
    marginLeft:"8.5%",
    marginTop:"5rem",
    marginBottom:"10rem",
  },
  countContainer:{
    width:"100.086rem",
    height:"40.282rem",
    flexDirection: 'row',
    marginRight:"auto",
    borderWidth:1,
    borderColor:"grey",
    justifyContent :"center",
    alignItems: "center",
    marginTop:"10rem",
  },
  touchableOpacity:{
    width:"40rem",
    height:"20rem",
    margin:"5rem",
    justifyContent :"center",
    alignItems: "center",
  },
  minus:{
    width:"14rem",
    height:"3rem",
    top:"1.5rem",
  },
  num:{
    fontSize:"16rem",
  },
  plus:{
    width:"14rem",
    height:"14rem",
    marginRight:"5rem",
  }
  
});
