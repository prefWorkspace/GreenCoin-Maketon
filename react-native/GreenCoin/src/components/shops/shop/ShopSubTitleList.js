import React,{useState,useEffect} from 'react';
import { Text, View, Dimensions,ScrollView,TouchableOpacity ,FlatList} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


export default function ShopSubTitleList({subCategoriesList,setSubCategory,subCategory,category}) {


    
    return (
      <ScrollView style={subCategoriesList[category[1]] && subCategoriesList[category[1]].length ? styles.container : null} horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          subCategoriesList[category[1]] && subCategoriesList[category[1]].length > 0 ?
          <View style={styles.dataContainer}>
          {
            subCategoriesList[category[1]].map((value,index)=>{
              if(value.cat_id == category[1])
              return <TouchableOpacity style={styles.titleBar} onPress={()=>{setSubCategory(index)}} activeOpacity={1}>
                        <Text style={index == subCategory ? styles.titleActive : styles.title}>{value.brn_name}</Text>
                     </TouchableOpacity>
            })
          }
          </View>
          :
          null
        }
      </ScrollView>
    );
}
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width :"100%",
    paddingTop:"10rem",
    paddingBottom:"10rem",
    borderBottomWidth:.5,
    borderBottomColor:"#C7C7C7",
    backgroundColor:"white",
  },
  dataContainer:{
    width: "100%",
    height:"36rem",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  titleBar:{
    marginBottom:"18rem",
    marginLeft:"18rem",
  },
  title:{
    fontFamily:"Montserrat-Medium",
    fontSize:"14rem",
    color :"#C7C7C7",
  },
  titleActive:{
    fontFamily:"Montserrat-Medium",
    fontSize:"14rem",
    color :"#26CBFF",
  },
});