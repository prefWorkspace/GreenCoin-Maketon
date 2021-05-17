import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,TextInput,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Data = [
  {title:"사이즈"},
  {title:"S"},
  {title:"M"},
  {title:"L"},
  {title:"XL"},
  {title:"XS"},
];

export default function ReviewSearchBar({setSearch}) {


    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.itemContainer} onPress={()=>{}}>
            <View style={styles.touchableOpacity}>
              <View style={styles.labelContainer}>
                  <TextInput style={styles.title} placeholder={"검색어를 입력해주세요."} onChangeText={text=>{setSearch(text)}}/>
              </View>
              <Image style={styles.image} source={require('../../../assets/img/icon/search.png')}/>
          </View>
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
    paddingLeft:"20rem",
    paddingRight:"20rem",
    paddingTop:"10rem",
  },
  itemContainer:{
    width:"100%",
    height:"45rem",
    padding:"3rem",
    alignItems: "center",
    justifyContent: "center",
  },
  touchableOpacity:{
    flexDirection: 'row',
    alignItems: "center",
  },
  labelContainer:{
    width:"100%",
    height:"100%",
    flexDirection: 'row',
    backgroundColor:"#F5F6FA",
    alignItems: "center",
    justifyContent: "center",
    borderWidth:1,
    borderRadius:5,
    borderColor:"#E1E6ED",
  },
  label:{
    fontSize:"11.891rem",
    color:"black",
  },
  title:{
    top:"6rem",
    left:"5rem",
    color:"black",
    fontFamily:"NotoSansKR-Bold",
    height:"100%",
    width:"100%",
  },
  image:{
    right:"10rem",
    marginLeft:"auto",
    tintColor:"#CBC9D9"
  },
});
