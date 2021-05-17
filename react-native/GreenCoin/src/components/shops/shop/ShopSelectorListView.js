import React, { useEffect,useState } from "react";
import { TouchableOpacity,Dimensions,Image, FlatList, Text, View, Alert } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import appStaticInfomation from '../../../db/appStaticInfomation';
import localStringData from '../../../const/localStringData';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import serverController from '../../../server/serverController';

const Data = [{cat_name:"전체보기",cat_id :0,cat_order:0,cat_parent: 0}];

export default  function ShopSelectorListView(){
  const navigation = useNavigation();
  const [categorieslist,setCategorieslist] = useState([]);

  
  const appInfo = appStaticInfomation.getInstance();

  useEffect(() => {
    setCategorieslist(appInfo._categorieslist);
  }, [])

  if(useIsFocused() == true && categorieslist.length != appInfo._categorieslist.length&& appInfo._categorieslist.length > 0){
      setCategorieslist(appInfo._categorieslist);
  }

  return (
        <View style={styles.container}>
          <View style={styles.flatContainer}>
          {
              categorieslist.map((item)=>{
                return <View style={styles.itemContainer}>
                        <Item item={item} navigation={navigation}/>
                      </View>
              })
          }
          </View>
        </View>
  );
}


const Item = ({item,navigation}) => {

  return (
    <TouchableOpacity style={styles.gridViewContainer} onPress={()=>{item.cat_name == "리뷰" ? navigation.navigate("reviewFilter",{root:"main"}) : navigation.navigate("shopList",{cat_name:item.cat_name,cat_id : item.cat_id});}}>
    <View style={styles.imagebody}>
        <Image style={styles.imgIcon} source={{uri:localStringData.imagePath + item.cat_img}} resizeMode={"stretch"}/>
    </View>
    <Text style={styles.gridViewTextLayout} >{item.cat_name}</Text>
</TouchableOpacity>)
};


  

const entireScreenWidth = Dimensions.get('window').width;

EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container:{
    width: '411.428rem',
    backgroundColor:"white"
  },
  imagebody:{
    height : "36rem",
  },
  flatContainer:{   
    justifyContent: "flex-start",
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor:"white",
    alignItems: "center",
    paddingTop:"12rem",
    paddingBottom:"12rem",
  }, 
  itemContainer:{
    width:"23.6%",
  },
  gridViewContainer: {
    alignItems: 'center',
    height: '75.06rem',
  },
 gridViewTextLayout: {
  fontSize: '12.88rem',
  color: '#2E3541',
  fontWeight:'bold',
},
imgIcon:{
  width :"27.865rem",height :"27.865rem",
},
});