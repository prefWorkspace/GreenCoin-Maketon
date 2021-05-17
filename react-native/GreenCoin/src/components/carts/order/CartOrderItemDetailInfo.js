import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import localStringData from '../../../const/localStringData';
import CartOrderDrop from './CartOrderDrop';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CartOrderItemDetailInfo({item}) {


  const [show,setShow] = useState(false);
  

  if(!item || !item.cart_items)
    return null;

  const option = item.cart_items;

  const getPrice = () => {
    let price = 0;
    option.data.map((value)=>{
      var optionList = value.options.optionList;
      var p = 0;
      for(var calKey in optionList){
        for(var i =0;i<	optionList[calKey].length ;i++){
          p += optionList[calKey][i].opt_price;
        }
      }

      if(value.options.isSetOptional == true || value.options.isOptional == false){
        p += Math.round((value.prd_price) - ((value.prd_price) * (value.prd_sale_rate)) / 100);
      }
      price +=  p * value.count;
    });

    return price;
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

        return <Text style={styles.size}>[{optionText}] {option.data.length > 1 ? `외 ${option.data.length - 1}건`: ""}</Text>
      }
    }
    return null;
  }

  const setShowEvent = () =>{ setShow(!show); }

    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                  <Image style={styles.image} source={{uri:localStringData.imagePath + item.prd_img}} resizeMode={"cover"}></Image>
              </View>
              <View style={styles.labelContainer}>
                  <Text style={styles.title}>{option.prd_title}</Text>
                  { getOptionText()}
                  <View style={styles.resultContainer}>
                    <Text style={styles.price}>총 {numberWithCommas((getPrice()) * option.count)}원</Text>
                    <Text style={styles.close} onPress={setShowEvent}>{ show ? "선택 옵션 접기" : "선택 옵션 보기"}</Text>
                  </View>
              </View>
          </View>
          <View style={{height:10}}></View>
          {
            show ?
            item.cart_items.data.map((value,index)=>{
              return <CartOrderDrop value={value} isLast={true}></CartOrderDrop>
            })
            :
            null
          }
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
    marginBottom:"15rem",
  },
  resultContainer:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer:{
    width:"90%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer:{
    width:"44%",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer:{
    width:"60%",
    right:"10rem",
  },  
  image:{
    width :"120rem",
    height :"120rem",
    marginRight:"auto",
    borderRadius:4
  },
  title:{
    fontSize:"17rem",
    fontFamily:"NotoSansKR-Medium",
    bottom:"16rem",
  },
  option:{
    fontSize:"13rem",
    fontFamily:"Poppins-Regular",
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
  size:{
    marginRight:"auto",
    fontSize:"14rem",
    color:"grey",
    bottom:"24rem",
  },
});
