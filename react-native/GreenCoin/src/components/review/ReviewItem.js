import * as React from 'react';
import { Text,Image, View, Dimensions,TouchableOpacity,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation,useRoute } from '@react-navigation/native';
import localStringData from '../../const/localStringData';

const getStarImageList = (count) =>{
  let imageList = [];
  for(var i =0;i < 5;i++){
    if(i < count )
      imageList.push( <Image style={styles.star} source={require("../../assets/img/review/star.png")} />);
    else
      imageList.push( <Image style={styles.star} source={require("../../assets/img/review/starEmpty.png")} />);
  }
  return imageList;
}


function getDateType(date){
  function checkZero(checkString){
    return checkString.toString().length == 1 ?  "0" + checkString : checkString;
  }
  var temp = `${checkZero(date.getFullYear())}-${checkZero(date.getMonth() + 1)}-${checkZero(date.getDate())}`
          + ` ${checkZero(date.getHours())}:${checkZero(date.getMinutes())}:${checkZero(date.getSeconds())}`;
  return temp;
}



export default function ReviewItem({item,deleteReview}) {
  const navigation = useNavigation();
  const route = useRoute();

    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.itemContainer} onPress={()=>{navigation.navigate("reviewDetail",{root:route.name,id:item.rev_id})}}>
              <View style={styles.imageContainer}>
                  <Image style={styles.image} source={{uri:localStringData.imagePath + item.prd_img}}></Image>
              </View>
              <View style={styles.labelContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{item.rev_title}</Text>
                </View>
                <View style={styles.starIconContainer}>
                  {getStarImageList(item.rev_score)}
                </View>
                  <Text style={styles.date}>{item.rev_date.split('.')[0]}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={()=>{navigation.navigate("writeReview",{root:route.name,item:item})}}>
                  <Text style={styles.editBox}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{deleteReview(item)}}>
                  <Text style={styles.deleteBox}>삭제</Text>
                </TouchableOpacity>
              </View>
          </TouchableOpacity>
          <View style={styles.bottomBorder}></View>
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
  },
  itemContainer:{
    width:"100%",
    height:"146.480rem",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    padding:"10rem",
    paddingRight:"20rem",
    left:"10rem",
  },
  starIconContainer:{
    flexDirection: 'row',
    alignItems: "center",
  },
  buttonContainer:{
    width:"20%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer:{
    flexDirection: 'row',
    alignItems: "center",
  },
  imageContainer:{
    width:"30%",
    height:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer:{
    width:"50%",
    height :"99.068rem",
    justifyContent: "center",
    paddingBottom:"10rem",
  },  
  image:{
    width :"99.068rem",
    height :"99.068rem",
    marginRight:"20rem"
  },
  editBox:{
    borderWidth: 1,
    borderRadius:5,
    color:"black",
    backgroundColor:"white",
    width:"59.457rem",
    height:"33.692rem",
    padding:"8rem",
    paddingLeft:"18rem",
    fontSize:"11.891rem",
    marginBottom:"10rem",
  },
  deleteBox:{
    borderWidth: 1,
    borderRadius:5,
    color:"white",
    backgroundColor:"#0D2141",
    width:"59.457rem",
    height:"33.692rem",
    padding:"8rem",
    paddingLeft:"18rem",
    fontSize:"11.891rem",
  },
  star:{
    fontSize:"12.873rem",
    color:"#878787",
    bottom:Platform.OS != "ios" ?"18rem":0,
  },
  date:{
    fontSize:"14rem",
    color:"#878787",
    top:Platform.OS != "ios" ?"5rem":0,
  },
  title:{
    color:"black",
    fontFamily: "NotoSansKR-Bold",
    fontSize:"14.855rem",
    bottom:Platform.OS != "ios" ?"10rem":"5rem",
  },  
  bottomBorder:{
    width:"90%",
    marginTop:"5rem",
    borderBottomWidth:1,
    borderBottomColor :"#efefef",
    backgroundColor:"white",
  },

});
