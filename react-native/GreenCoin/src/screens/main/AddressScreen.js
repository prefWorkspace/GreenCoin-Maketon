import  React ,{useState,useEffect} from 'react';
import { Text,Image, View, Dimensions,ScrollView, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import AddressSearchBar from '../../components/mains/address/AddressSearchBar';
import AddressSaveList from '../../components/mains/address/AddressSaveList';
import AddressSearchList from '../../components/mains/address/AddressSearchList';
import AddressSearchTip from '../../components/mains/address/AddressSearchTip';
import {navigationBackHandler,navigate} from '../../navigation/NavigationBackHandler';
import { useNavigation } from '@react-navigation/native';
import userInfoSingleton from '../../db/userInfoSingleton';
import addressServerController from '../../server/addressServerController';
import GetLocation from 'react-native-get-location'

export default function AddressScreen({route}) {

  const orderPage = route.params.order;
  const setAddress = route.params.setAddress;
  const [searchList,setSearchList] = useState([]);
  const [index,setIndex] = useState(0);
  const [inputFocus,setInputFocus] = useState(false);
  const [homeAddress,setHomeAddress] = useState({});
  const [currentAddress,setCurrentAddress] = useState({});
  const [companyAddress,setCompanyAddress] = useState({});
  const navigation = useNavigation();
  const userInfo = userInfoSingleton.getInstance();

  const moveToSearchPage = (searchKey) =>{
    
    navigation.navigate("addressSearch",{root:route.name,  addressType:-1 , setAddress : setAddress , orderPage:orderPage , searchKey:searchKey}); 
  }

  var isClick = false;
  const insertCurrentDeliverPos = async ()=>{ 

    if(isClick){
      Alert.alert(" ","위치 정보 확인중입니다.");
      return;
    }
    
    isClick = true;
    let result = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    }).catch((e)=>{
      Alert.alert(" ","위치를 가지고 올수 없습니다.");
      isClick = false;
    });

    let addressResult = await (await addressServerController.getCurrentAddressInformation(result.latitude,result.longitude)).json();
    if(addressResult && addressResult.results && addressResult.results.length > 0){
      let adr = addressResult.results[0].formatted_address.replace("대한민국 ", '');
      moveToSearchPage(adr);
      isClick = false;
    }
    else{
      Alert.alert(" ","위치를 가지고 올수 없습니다.");
      isClick = false;
    }
  }
  const insertHomeDeliverPos = ()=>{  navigation.navigate("addressSearch",{root:route.name,  addressType:1 , setAddress : setAddress, orderPage:orderPage});}
  const insertCompanyDeliverPos = ()=>{  navigation.navigate("addressSearch",{root:route.name,  addressType:2, setAddress : setAddress, orderPage:orderPage});}

  const initCallBack = (data) => {
    data.map((item)=>{
      if(item.addr_base != "3"){
        switch(item.addr_base){
          case "0" : setCurrentAddress(item); break;
          case "1" : setHomeAddress(item);  break;
          case "2" : setCompanyAddress(item);  break;
        }
      }
    })


    setSearchList(data.filter(value=> value.addr_base == "3"));
  }

  const sendDataToServer = (item)=>{
    var formData = new FormData();
    formData.append('addr_title',item.addr_title);
    formData.append('addr_zipcode',item.addr_zipcode);
    formData.append('addr_address1',item.addr_address1);
    formData.append('addr_address2',item.addr_address2);
    formData.append('mem_id',userInfoSingleton.getInstance()._userId);
    formData.append('addr_receiver',userInfoSingleton.getInstance()._name);
    formData.append('addr_wireline',item.addr_wireline);
    formData.append('addr_base',0);
    formData.append('addr_phone',userInfoSingleton.getInstance()._mem_phone);
    addressServerController.insertUserAddressInformation(formData,callBack);
  }

  const insertDeliverInfo = (item)=>{
    if(orderPage == true){
      navigation.goBack();
      navigation.navigate("cartOrderItem");
    }
    else if(orderPage == false){
      navigation.goBack();
      navigation.navigate("deliverInfo");
    }
    else
      sendDataToServer(item);
      setAddress(item);
  }

  const callBack =(data)=>{
    if(data == 1){
      navigation.goBack();
    }
  }

  const clickDelete = (data) =>{

    if(data.addr_base == 0){
      setAddress({});
    }
    var formData = new FormData();
    formData.append('mem_id',data.mem_id);
    formData.append('addr_id',data.addr_id);
    addressServerController.deleteUserAddressInformation(formData,callBack);
  }

  useEffect(() => {
    var formData = new FormData();
    formData.append('mem_id',userInfo._userId);
    addressServerController.getUserAddressList(formData,initCallBack);
  }, [])

  navigationBackHandler();


    return (
      <ScrollView style={styles.container}>
        <CommonTitleBar title={"배송지 상세 정보"} rightOption={"close"}></CommonTitleBar>
        <AddressSearchBar setIndex={setIndex} setSearchList={setSearchList}/>
        {
          index == 1 ?
            searchList.length != 0 ?
            searchList.map((item)=>{ 
  
              var clickToDetail = ()=>{
                navigation.navigate("addressDetail",{
                  item:item,
                  addressType:route.params.addressType,
                  setAddress:setAddress,
                  orderPage: orderPage
                }
              )};
  
              return ( <AddressSearchList item={item} clickToDetail={clickToDetail}/>)
            })
            :
            <AddressSearchTip></AddressSearchTip>
          :
          null
        }
        {   
          index == 0 ?
          <AddressSaveList item={currentAddress} icon={"0"} defaultTitle={"현재 위치로 배송"} 
            clickDelete={clickDelete} 
            clickAddress={
              currentAddress.addr_base == undefined ? 
              insertCurrentDeliverPos
              :
              insertDeliverInfo
          }/>
          :
          null
        }
        {   
          index == 0 ?
          <AddressSaveList item={homeAddress} icon={"1"} defaultTitle={"집 추가"} 
          clickDelete={clickDelete} 
          clickAddress={ 
            homeAddress.addr_base == undefined ?  
            insertHomeDeliverPos
            :
            insertDeliverInfo
          }/>
          :
          null
        }
        {   
          index == 0 ?
          <AddressSaveList item={companyAddress} icon={"2"} defaultTitle={"회사 추가"} 
          clickDelete={clickDelete} 
          clickAddress={  
            companyAddress.addr_base == undefined ? 
            insertCompanyDeliverPos
            :
            insertDeliverInfo
          }/>
          :
          null
        }
        {
          index == 0 ?
          inputFocus ?
          <AddressSearchTip></AddressSearchTip>
          :
          searchList.length == 0 ?
          null
          :
          searchList.map((item)=>{ 
    
            const clickAddress =(data) =>{setCurrentAddressAsClick(data)};
            return <AddressSaveList item={item} clickAddress={clickAddress} clickDelete={clickDelete} clickAddress={insertDeliverInfo}/>
          })
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
    height:"100%",
    backgroundColor:"white",
  },
  postcode:{
    width:"100%",
    height:"400rem",
  },
  
});