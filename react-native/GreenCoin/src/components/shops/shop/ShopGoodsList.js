import React,{useState,useEffect} from 'react';
import { Text,Image, View, Dimensions,TouchableOpacity,StyleSheet ,FlatList} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ItemBox from '../../comm/ItemBox';
import { useNavigation ,useRoute} from '@react-navigation/native';
import MarginBox from '../../comm/MarginBox';

import userInfoSingleton from '../../../db/userInfoSingleton';


export default function ShopGoodsList({category,itemList,itemCount,applyFilter}) {

   // const [itemList , setItemList] = useState([]);
    const instance = userInfoSingleton.getInstance();
    const navigation = useNavigation();
    const route = useRoute();

    const moveToNext = ()=>{
      navigation.goBack();
    }

    return (
      <View style={styles.container} >
        <View style={styles.titleContainer}>
          <View style={styles.titleLabelContainer}>
            <Text style={styles.title}>{category[0]}</Text>
            <Text style={styles.itemCount}>{itemCount}개</Text>
          </View>
          <TouchableOpacity style={styles.filter} onPress={()=>{navigation.navigate("filter",{root:route.name, applyFilter:applyFilter})}}>
              <Image source={require("../../../assets/img/label_point/filter.png")}></Image><Text style={styles.filterLabel}>필터</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.renderContainer}>
          {
            itemList.map((item, idx) => {
              if(idx < itemList.length)
                return <ItemBox key={idx+"_good_list"} item={item}/> ;
            })
          }
        </View>
        <MarginBox height={200}></MarginBox>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width: '100%',
    marginTop:"12rem",   
    marginBottom:"20rem",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer:{
    width:"95%",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    paddingLeft:"5rem",
    paddingRight:"5rem",
    marginTop:"13rem",
  },
  titleLabelContainer:{
    marginRight:"auto",
    justifyContent: 'flex-end',
  },
  title:{
    fontSize:"17.837rem",
    fontFamily:"NotoSansKR-Bold",
  },
  itemCount:{
    color:"#D2D5DA",
    fontSize:"12.882rem",
    fontFamily:"Montserrat-SemiBold",
    //bottom:"12.5rem"
  },
  filter:{
    width:"72.339rem",
    height:"38.647rem", 
    marginLeft:"auto",
    backgroundColor:"#0D2141",
    borderRadius:5,
    flexDirection: 'row',    
    justifyContent: "center",
    alignItems: "center",
  },
  filterLabel:{
    color:"#FFFFFF",
    fontSize:"12.88rem",
    marginLeft:"6rem",    
    fontFamily:"Montserrat-SemiBold",

  },
  renderContainer:{
    width:"100%",
    justifyContent: "flex-start",
    flexWrap: 'wrap',
    flexDirection: 'row', 
    left:"8rem",
  }
});