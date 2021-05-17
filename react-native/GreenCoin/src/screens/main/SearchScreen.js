import  React ,{useState,useEffect} from 'react';
import { Text,Image, View, Dimensions,ScrollView, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import SearchBar from '../../components/mains/search/SearchBar';
import SearchItemList from '../../components/mains/search/SearchItemList';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';
import { useRoute ,useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
  const [blur,setBlur] = useState(false);
  const [input,setInput] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  navigationBackHandler();

  useEffect(() => {
    if(blur == true && input.length > 1){
      navigation.navigate("shopSearch",{root:route.name,input:input.replace(/ /gi, "")});
    }
    setBlur(false);
  }, [blur])

  
    return (
      <ScrollView style={styles.container}>
        <CommonTitleBar title={"검색하기"} rightOption={"close"}/>
        <SearchBar 
          setBlur={setBlur} 
          setInput={setInput}>
        </SearchBar>
      </ScrollView>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width :"100%",
    height:"100%",
    backgroundColor:"white",
  },
  titleContainer:{
    width:"100%",
    height:"200rem",
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    fontSize:"19rem",
    fontFamily:"NotoSansKR-Bold",
  }
  
});