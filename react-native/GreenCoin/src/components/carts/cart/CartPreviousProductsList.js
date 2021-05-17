import React,{useState ,useEffect} from 'react';
import { Text,Image, View, Dimensions,ScrollView,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import cartPreviousController from '../../../db/realm/cartPreviousController';
import localStringData from '../../../const/localStringData';
import { useNavigation,useRoute } from '@react-navigation/native';


function numberWithCommas(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}


export default function CartPreviousProductsList() {
  const [itemList , setItemList] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  

  const Item = ({item,index,removeWishList}) => {

    const removeEvent = () =>{ removeWishList(item,index);}
    const navigationMove = () =>{ navigation.navigate("itemDetail",{root:route.name ,id:item.prd_id});}

  return (
    <View style={styles.gridViewContainer}>
        <TouchableOpacity style={styles.imagebody} onPress={navigationMove}>
            <Image style={styles.topImage} source={{uri:localStringData.imagePath + item.src}} />
            <TouchableOpacity style={styles.wishContainer} onPress={removeEvent}>
              <Image style={styles.image} source={require('../../../assets/img/cart/delete.png')}></Image>
            </TouchableOpacity>
            <Text style={styles.title}>{item.prd_title}</Text>
            {
                item.prd_sale_rate != 0 ? 
                <Text style={styles.orginalPrice}>{numberWithCommas(item.prd_price)}원 <Text style={styles.sale}>{Math.floor(item.prd_sale_rate)}%</Text></Text>
                :
                null
            }
            <Text style={styles.currentPrice}>{numberWithCommas(Math.round(item.prd_price - ((item.prd_price * item.prd_sale_rate) / 100)))}원</Text>
        </TouchableOpacity>
    </View>
    )
  };


  const deleteCallBack = (data) =>{
    if(data == false)
      Alert.alert(" ","삭제 실패");
  }

  const callback = (data)=>{
    const reverse = [];
    for(let i=data.length-1; i >= 0; i--) {
      reverse.push(data[i]);
    }
    setItemList(reverse); 
  }

  useEffect(() => { 
    cartPreviousController.getPreviousProductList(callback);
  }, [])

    return (
      <ScrollView style={styles.container}>
         <View style={styles.flatContainer}>
          {
            itemList.map((item,index)=>{

              const removeWishList = (item ,index)=>{
                cartPreviousController.deletePreviousProductList(item.prd_id,callback);
              }

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
