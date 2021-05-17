import React,{useState,useEffect}  from 'react';
import { Text,TextInput, View, Dimensions,Image,StyleSheet, Alert } from 'react-native';
import localStringData from '../../../const/localStringData'
import EStyleSheet from 'react-native-extended-stylesheet';

const searchDeliverAPI = (searchKey,setSearchList) => {
  

    if(searchKey.length < 4){
      return;
    }
     
    fetch(`https://www.juso.go.kr/addrlink/addrLinkApiJsonp.do?confmKey=${localStringData.searchApi}&keyword=`+ searchKey +'&resultType=json&countPerPage=10')
    .then((response) => response.text())
    .then((responseText) => {
        const match = responseText.match(/\((.*)\)/); // 정규식은 JSONP응답에 따라 달라질 수 있음. 이 경우 ( 응답 )이고 match는 ( ) 를 포함한 전체 응답과 () 내부의 데이터가 배열 형태로 출력됨 
        if(match==null) 
             Alert.alert(" ","Message", "null");
        let jsonResult =  JSON.parse(match[1].toString()); // ( ) 를 뗀 진짜 json 형태의 데이터를 파싱하고
        let jusoArray=  jsonResult.results.juso; // juso 속성도 array 형태이기 때문에 또 받아주고,
        if(jusoArray == null || jusoArray.length == 0){
          Alert.alert(" ","검색 결과가 없습니다.")
        }
        else
          setSearchList(jusoArray);

    })
    .catch((error) => {
        console.error(error);
    });
}


export default function AddressSearchBar({setIndex,setSearchList,searchAPIKey}) {
    const [searchKey,setSearchKey] = useState(searchAPIKey);

    useEffect(() => {
      if(searchAPIKey){
        setSearchKey(searchAPIKey);
        searchDeliverAPI(searchAPIKey,setSearchList);
      }
      else{
        setSearchKey("");
      }
    }, [searchAPIKey])
    return (
      <View style={styles.container }>
          <Image style={styles.image} source={require("../../../assets/img/icon/search.png")}></Image>
          <TextInput 
            style={styles.textinput} 
            onFocus={()=>{
              if(setIndex)
                setIndex(1);
               setSearchList([]);
              }}
            value={searchKey}
            onChangeText={(text)=>{setSearchKey(text)}} 
            placeholder={"도로명, 건물명 또는 지번으로 검색"}  
            onBlur={()=>{searchDeliverAPI(searchKey,setSearchList)}}
            onSubmitEditing={()=>{searchDeliverAPI(searchKey,setSearchList)}}
            />
      </View>
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