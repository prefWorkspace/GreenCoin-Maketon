import React, {useState} from 'react';
import { Text, View, Dimensions,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function Sort({sortType,setSortType}) {
  
    return (
      <View style={styles.hr}>
      <View style={styles.container}>
         <Text style={styles.title}>정렬</Text>
            <View style={styles.tagContainer}>
              <TouchableOpacity style={sortType == 0 ? styles.selectBoxActive : styles.selectBox} onPress={()=>{setSortType(0)}}>
                <Text style={sortType == 0 ? styles.selectActive :  styles.select} >최신순</Text>
              </TouchableOpacity>
              <TouchableOpacity style={sortType == 1 ? styles.selectBoxActive : styles.selectBox} onPress={()=>{setSortType(1)}}>
                <Text style={sortType == 1 ? styles.selectActive :  styles.select} >인기순</Text>
              </TouchableOpacity>
              <TouchableOpacity style={sortType == 2 ? styles.selectBoxActive : styles.selectBox} onPress={()=>{setSortType(2)}}>
                <Text style={sortType == 2 ? styles.selectActive :  styles.select} >리뷰많은순</Text>
              </TouchableOpacity>
              <TouchableOpacity style={sortType == 3 ? styles.selectBoxActive : styles.selectBox} onPress={()=>{setSortType(3)}}>
                <Text style={sortType == 3 ? styles.selectActive :  styles.select} >낮은가격순</Text>
              </TouchableOpacity>
              <TouchableOpacity style={sortType == 4 ? styles.selectBoxActive : styles.selectBox} onPress={()=>{setSortType(4)}}>
                <Text style={sortType == 4 ? styles.selectActive :  styles.select} >높은가격순</Text>
              </TouchableOpacity>
            </View>
      </View>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    bottom:"10rem"
  },
  title:{
    fontFamily:"NotoSansKR-Medium",
    fontSize:"15.855rem",
  },
  tagContainer:{ 
    width:"100%",  
    left:"4.5rem",
    justifyContent: "flex-start",
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor:"white",
  },
  selectBox:{
    margin:"3.5rem",
    width :"103.059rem",
    height:"33.692rem",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  selectBoxActive:{
    margin:"3.5rem",
    width :"103.059rem",
    height:"33.692rem",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 2,
    backgroundColor:"#0D2141",
    justifyContent: "center",
    alignItems: "center",
  },
  select:{
    fontSize:"11.891rem",
    textAlign: "center",
    fontFamily:"NotoSansKR-Regular",
    color:"black"
  },
  selectActive:{
    fontSize:"11.891rem",
    textAlign: "center",
    color:"white",
    fontFamily:"NotoSansKR-Regular",
  },
  hr:{
    width:"100%",
    padding:"15rem",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  }, 
});