import * as React from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,ScrollView,TextInput, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';
import MainTextContent from '../../comm/content/MainTextContent';


const getIconType = (icon) =>{
  switch(icon){
    case "dust" : return require('../../../assets/img/icon/dust.png');
    case "community" : return require('../../../assets/img/icon/community.png');
    default : return require('../../../assets/img/icon/dust.png');

  }
}

const Data = [
  {
    title:"탄소 줄이기",
    active: true,
  },
  {
    title:"미세먼지",
    active: false,
  },
  {
    title:"환경오염",
    active: false,
  },
  {
    title:"쓰레기 줄이기",
    active: false,
  },
  {
    title:"미세먼지",
    active: false,
  },
  {
    title:"환경오염",
    active: false,
  },
  {
    title:"쓰레기 줄이기",
    active: false,
  },
  {
    title:"미세먼지",
    active: false,
  },
  {
    title:"환경오염",
    active: false,
  },
  {
    title:"쓰레기 줄이기",
    active: false,
  }
]


const CategoryTag = ({value}) =>{
  return (
    <TouchableOpacity style={value.active ? styles.tagActive : styles.tagUnactive}>
        <Text style={value.active ? styles.activeLabel : styles.unactiveLabel}>{value.title}</Text>
    </TouchableOpacity>
  )
}

export default function CommunityContentList({title,icon,list}) {

    return (
      <View style={styles.container}>
        <View style={styles.likeInfoContainer}>
          <View style={styles.likeInfo}>
            <Image style={styles.image} source={getIconType(icon)} resizeMode="stretch"></Image>
            <Text>{title}</Text>
          </View>
        </View>
        <ScrollView style={styles.tagContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            Data.map((value)=>{
              return <CategoryTag value={value}></CategoryTag>
            })
          }
        </ScrollView>
        <View style={styles.hideTagLast}></View>
        <View style={styles.searchContainer}>
          <View style={styles.searchBarContainer}>
            <TextInput style={styles.searchInput}></TextInput>
            <Image style={styles.searchIcon} source={require('../../../assets/img/icon/searchIcon.png')} resizeMode="stretch"></Image>
          </View>
        </View>
        {
          list.map((item)=>{
              return <MainTextContent item={item}></MainTextContent>          
          })
        }
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    justifyContent: "center",
  },
  likeInfoContainer:{
    flexDirection: 'row',
    width:"100%",
    padding:"10rem",
    alignItems: "center",
    justifyContent: "center",
  },
  tagContainer:{
    width:"95%",
    height:"35rem",
    marginBottom:"10rem",
    paddingLeft:"10rem",
  },
  hideTagLast:{
    backgroundColor:"white",
    position:"absolute",
    width:"30rem",
    height:"35rem",
    top:"48rem",
    left:"345rem",
    opacity:.7,
  },
  tagActive:{
    backgroundColor:"#66D8B9",
    borderRadius:50,
    alignItems: "center",
    justifyContent: "center",
    padding:"10rem",
  },
  tagUnactive:{
    borderRadius:50,
    borderColor:"#BFBFBF",
    borderWidth:1,
    alignItems: "center",
    justifyContent: "center",
    padding:"10rem",
  },
  activeLabel:{
    color:"white",
  },
  unactiveLabel:{
    color:"#7B7B7B",
  },
  likeInfo:{
    marginRight:"auto",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer:{
    paddingLeft:"10rem",
    paddingRight:"10rem",
    marginBottom:"5rem",
  },
  searchBarContainer:{
    borderWidth:1,
    borderRadius:50,
    borderColor:"#BFBFBF",
    height:"20rem",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    height:"35rem",
  },  
  searchInput:{
    paddingLeft:"20rem",
    width:"100%",
    height:"35rem",
    fontSize:14
  },
  searchIcon:{
    width:"26rem",
    height:"26rem",
    marginLeft:"auto",
    marginRight:"4rem",
  },
  
  image:{
    width:"28.42rem",
    height:"28.42rem",
    marginRight:"10rem",
  },
  likeInfoMore:{
    marginLeft:"auto",
  },
  searchImage:{
    width :"31.46rem",
    height :"31.46rem",
    top:"23.28rem",
    left:"15rem",
  }

});
