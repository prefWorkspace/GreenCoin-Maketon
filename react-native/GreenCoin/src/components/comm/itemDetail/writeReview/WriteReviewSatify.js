import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


const Data = [
  {title:"별점을주세요!",star:0,},
  {title:"별로에요!",star:1, },
  {title:"그냥 그래요!",star:2,},
  {title:"보통이에요!",star:3,},
  {title:"좋아요!",star:4, },
  {title:"아주 좋아요!",star:5, },
];


const getStar = (type,count,setSatisfy)=>{
  return type == true ?
        <TouchableOpacity onPress={()=>{setSatisfy(count + 1)}} activeOpacity={1}>
          <Image style={styles.star} source={require("../../../../assets/img/review/star.png")} />
        </TouchableOpacity>
        :
        <TouchableOpacity  onPress={()=>{setSatisfy(count + 1)}} activeOpacity={1}>
          <Image style={styles.star} source={require("../../../../assets/img/review/starEmpty.png")} />
        </TouchableOpacity>
}

const getStarImageList = (count,setSatisfy) =>{
  let imageList = [];
  for(var i =0;i < 5;i++){
    if(i < count )
      imageList.push(getStar(true, i,setSatisfy));
    else
      imageList.push(getStar(false, i,setSatisfy));
  }
  return imageList;
}

export default function WriteReviewSatify({satisfy,setSatisfy}) {
    const [dropBox,setDropBox] = useState(false);

    const touchItemListByIndex = (index,setSatisfy) =>{
      return (
      <View style={styles.touchableOpacity}>
        <View style={styles.labelContainer}>
          <Text>{Data[index].title}</Text>
        </View>
        <View style={styles.starList}>
          { getStarImageList(Data[index].star,setSatisfy)  }
        </View>
      </View>
      );
    }


    return (
      <View style={styles.container}>
          <Text style={styles.title}>* 만족도</Text>
          <TouchableOpacity style={styles.itemContainer} onPress={()=>{setDropBox(!dropBox)}}>
          {
            touchItemListByIndex(satisfy,setSatisfy)
          }
         </TouchableOpacity>
      </View>
    );
  }

//
//<Text style={styles.example}>asdsadas</Text>
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    padding :"20rem",
    marginBottom:"20rem",
  },
  itemContainer:{
    width:"100%",
    height:"50rem",
    padding:"15rem",
  },
  dropItemContainer:{
    width:"100%",
    padding:"15rem",
    borderRadius:5,
    borderColor:"#E1E6ED",
    borderRightWidth:1,
    borderLeftWidth:1,
    borderBottomWidth:1,
  },  
  touchableOpacity:{
    alignItems: "center",
    justifyContent: "center",
    marginBottom:"8rem",
  },
  labelContainer:{
  },
  label:{
    fontSize:"11.891rem",
    color:"black",
  },
  title:{
    color:"black",
    fontFamily:"NotoSansKR-Bold",
    marginRight:"auto",
  },
  star:{
    width:"41rem",
    height:"41rem",
    margin:"3rem",
  },
  starList:{
    flexDirection: 'row',
  }
});
