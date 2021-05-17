import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute} from '@react-navigation/native';
import localStringData from '../../../const/localStringData';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const getStarImageList = (count) =>{
  let imageList = [];
  for(var i =0;i < 5;i++){
    if(i < count )
      imageList.push( <Image style={styles.star} source={require("../../../assets/img/review/star.png")} />);
    else
      imageList.push( <Image style={styles.star} source={require("../../../assets/img/review/starEmpty.png")} />);
  }
  return imageList;
}

export default function ItemBox({item}){
  const navigation = useNavigation();
  const route = useRoute();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.itemContainer} onPress={()=>{navigation.navigate("reviewDetail",{root:route.name , id:item.rev_id})}}>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri:localStringData.imagePath + item.prd_img}} resizeMode={"stretch"}/>
          <View style={styles.subImageContainer}>
            <Image style={styles.subImage} source={{uri:localStringData.imagePath + item.prd_img}} resizeMode={"stretch"}/>
            <Text style={styles.subTitle}>{item.prd_title}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.gradeContainer}>
            <Text style={styles.title}>{item.mem_name != undefined ? item.mem_name.slice(0,3) + "***" : ""}</Text>
            <View style={styles.likeContainer}>
              <Image style={styles.thumb} source={require('../../../assets/img/review/thumb.png')}></Image>
              <Text style={styles.like}>{item.rev_helped}</Text>
            </View>
          </View>
          <View style={styles.gradeContainer}>
            <View style={styles.starContainer}>
            {
              getStarImageList(item.rev_score)
            }
             <Text style={styles.like}>좋아요</Text>
            </View>
         
          </View>
          <Text style={styles.currentPrice}>{item.rev_content}</Text>
        </View>
        </TouchableOpacity>
      </View> 
  )
};


const styles = EStyleSheet.create({
  container:{ 
    width:"49.9%", 
    marginBottom:"30rem",
    marginRight:"auto",
 },
  imageContainer:{
    width: "96%",
    justifyContent: "center",
    alignItems: "center",
  },
  image:{  width:"170rem",height:"170rem"},  
  subImageContainer:{
    backgroundColor:"rgba(0,0,0,0.5)",
    width:"100%",
    height:"60rem",
    bottom:0,
    position:"absolute",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
  subImage:{
    width:"25%",
    height:"80%",
  },
  subTitle:{
    width:"70%",
    color:"white",
    paddingLeft:"8rem",
  },
  textContainer:{ left:"4.5rem", width: "92%", },
  gradeContainer:{
    width:"100%",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
  tagContainer:{   
    width:"100%",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginBottom:"10rem",
  },
  starContainer:{
    width:"100%",
    marginRight:"auto",
    flexDirection: 'row',
    bottom:"5rem",
  },
  like:{
    marginLeft:"auto",
  },
  title:{
    fontFamily:"NotoSansKR-Medium",
    marginRight:"auto",
  },
  likeContainer:{
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
  thumb:{
    marginLeft:"auto",
    marginRight:"4rem",
  },
  label:{
    fontFamily:"NotoSansKR-Medium",
    marginLeft:"10rem",
  },
 
 
});