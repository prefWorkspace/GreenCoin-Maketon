import React,{useState ,useEffect} from 'react';
import { Text,Image, View, Dimensions,ScrollView,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import userInfoSingleton from '../../../db/userInfoSingleton';
import likesServerController from '../../../server/likesServerController';
import { useIsFocused, useNavigation , useRoute } from '@react-navigation/native';
import localStringData from '../../../const/localStringData';

function numberWithCommas(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}

const Item = ({item,index,removeWishList}) => {
  const navigation = useNavigation();
  const route = useRoute();

  function moveToNaviation(){
    navigation.navigate("itemDetail",{root:route.name,id:item.prd_id});
  }

  function updateRemoveWishList(){
    removeWishList(item,index);
  }

  return (
  <TouchableOpacity style={styles.gridViewContainer} onPress={moveToNaviation}>
      <View style={styles.imagebody}>
          <Image style={styles.topImage}  source={{uri:localStringData.imagePath + item.prd_img}} />
          <TouchableOpacity style={styles.wishContainer} onPress={updateRemoveWishList}>
            <Image style={styles.image} source={require('../../../assets/img/shop/wishList.png')}></Image>
          </TouchableOpacity>
          <Text style={styles.title}>{item.prd_title}</Text>
          {
              item.prd_sale_rate != 0 ? 
              <Text style={styles.orginalPrice}>{numberWithCommas(item.prd_price)}원 <Text style={styles.sale}>{Math.floor(item.prd_sale_rate)}%</Text></Text>
              :
              null
          }
          <Text style={styles.currentPrice}>{numberWithCommas(Math.round(item.prd_price - ((item.prd_price * item.prd_sale_rate) / 100)))}원</Text>
      </View>
  </TouchableOpacity>)
};


export default function CartActiveOtherTag({activeIndex}) {
  const [itemList , setItemList] = useState([]);


  const deleteCallBack = (data) =>{
    if(data == false)
      Alert.alert(" ","삭제 실패");
  }
  const removeWishList = (item ,index)=>{
    var array = itemList.filter((value,i)=>{ return i != index;})
    var formData = new FormData();
    formData.append("like_id",item.like_id);
    likesServerController.deleteLikesTag(formData, deleteCallBack);
    setItemList(array);
  }

  const callback = (data)=>{ setItemList(data); }


  useEffect(() => { 
    if(activeIndex == 1){
      var formData = new FormData();  
      formData.append("mem_id",userInfoSingleton.getInstance()._userId);
      likesServerController.getLikesLikesByUserId(formData,callback);
    }
  }, [activeIndex])

    return (
      <ScrollView style={styles.container}>
         <View style={styles.flatContainer}>
          {
            itemList.map((item,index)=>{
              return <Item item={item} removeWishList={removeWishList} index={index}></Item>
            })
          }
          </View>
      </ScrollView>
    );
  }



  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container:{
    height:"100%",
  },
  InstarLabel:{
    fontFamily:"Montserrat-Bold",
    fontSize:"13.873rem",
    left:"15rem",
    marginBottom:"10rem"
  },
  flatContainer:{
    justifyContent: "flex-start",
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop:"5rem",
    left:"14rem",
    zIndex:100,
  },
  imagebody:{
    width:"100%",
    padding:"5rem",
  },
  gridViewContainer: {
   width:"120rem",
   height:"170rem",
 },
  topImage:{
    width:"106rem",
    height: "106rem",
  },
  title:{
    fontSize:"11rem",
  },
  orginalPrice:{
    color:"#878787",
    fontSize:"10rem",
  },
  currentPrice:{
    color:"#4C4C4C",
    fontSize:"10rem",
  },
  sale:{
    color:"#26CBFF",
    fontSize:"10rem",
  },
  wishContainer:{
    position:'absolute',
    top:"7rem",
    right:"13rem",
  },
  image:{
    width:"30rem",
    height:"30rem",
  }

});
