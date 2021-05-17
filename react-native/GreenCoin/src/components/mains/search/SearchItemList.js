import * as React from 'react';
import { Text,Image, View, Dimensions,TouchableOpacity,StyleSheet ,FlatList} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ItemBox from '../../comm/ItemBox';

import { useNavigation,useRoute } from '@react-navigation/native';

const Data = [
  {key:"a", src: require("../../../assets/img/sample/clothes.png") },
  {key:"b", src: require("../../../assets/img/sample/clothes.png")},
  {key:"c", src: require("../../../assets/img/sample/clothes.png")},
  {key:"d", src: require("../../../assets/img/sample/clothes.png")},
  {key:"e", src: require("../../../assets/img/sample/clothes.png")},
  {key:"f", src: require("../../../assets/img/sample/clothes.png")},
  {key:"fz", src: require("../../../assets/img/sample/clothes.png")},
  {key:"fa", src: require("../../../assets/img/sample/clothes.png")},
  {key:"fw", src: require("../../../assets/img/sample/clothes.png")},
  {key:"fe", src: require("../../../assets/img/sample/clothes.png")},
  {key:"fr", src: require("../../../assets/img/sample/clothes.png")},
  {key:"ft", src: require("../../../assets/img/sample/clothes.png")},
]



export default function SearchItemList({applyFilter,title ,itemListCount,itemList}) {
  const navigation = useNavigation();  
  const routeInfo = useRoute();
/*
  const itemList = Data.map((value, idx) => {
    return renderPage(value);
  });*/

    return (
      <View style={styles.container} >
        <Text style={styles.searchTitle}>{title}</Text>
        <View style={styles.titleContainer}>
          <View style={styles.titleLabelContainer}>
            <Text style={styles.title}>검색내 상품수</Text>
            <Text style={styles.itemCount}>{itemListCount}개</Text>
          </View>
          <TouchableOpacity style={styles.filter} onPress={()=>{navigation.navigate("filter",{ root:routeInfo.main, applyFilter:applyFilter})}}>
              <Image source={require("../../../assets/img/label_point/filter.png")}></Image><Text style={styles.filterLabel}>필터</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.renderContainer}>
          {
            itemList.map((item)=>{
              return <ItemBox item={item} /> 
            })
          }
        </View>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width: '100%',
    marginTop:"12rem",   
    justifyContent: "center",
    alignItems: "center",
  },
  searchTitle:{
    fontSize:"24.837rem",
    fontFamily:"NotoSansKR-Bold",
    marginRight:"auto",
    marginLeft:"12rem",
  },
  titleContainer:{
    width:"95%",
    flexDirection: 'row',
    paddingLeft:"5rem",
    paddingRight:"5rem",
    marginTop:"13rem",
    justifyContent: "center",
    alignItems: "center",
  },
  titleLabelContainer:{
    marginRight:"auto",
    justifyContent: 'flex-end',
    bottom:"13.5rem"
  },
  title:{
    fontSize:"17.837rem",
    fontFamily:"NotoSansKR-Bold",
  },
  itemCount:{
    color:"#D2D5DA",
    fontSize:"12.882rem",
    fontFamily:"Montserrat-SemiBold",
    bottom:"12.5rem"
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