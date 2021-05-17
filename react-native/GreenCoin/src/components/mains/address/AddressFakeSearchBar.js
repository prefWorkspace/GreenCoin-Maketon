import React,{useState}  from 'react';
import { Text,TextInput, View, Dimensions,Image,TouchableOpacity, Alert } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';



export default function AddressSearchBar({moveToSearchPage}) {
    const [searchKey,setSearchKey] = useState("");
    return (
      <TouchableOpacity style={styles.container}     onPress={moveToSearchPage}> 
          <Image style={styles.image} source={require("../../../assets/img/icon/search.png")}></Image>
          <TextInput 
            editable={false}
            style={styles.textinput} 
            placeholder={"도로명, 건물명 또는 지번으로 검색"}>
        </TextInput>
      </TouchableOpacity>
    );
}


  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    width :"380rem",
    height:"54rem",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor :"white",
    shadowRadius: 3,
    elevation: 2,
  },
  image:{
    width:"14.864rem",
    height:"21.801rem",
    
  },
  textinput:{
    width:"80%",
    height:"80%",
    fontSize :"15.855rem",
    marginLeft:"10rem",
    top:"1rem",
  },
  
});