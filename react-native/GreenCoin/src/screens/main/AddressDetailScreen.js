import  React ,{useState,useRef} from 'react';
import { Text,Image, View, Dimensions,ScrollView, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import AddressSelected from '../../components/mains/address/AddressSelected';
import AddressInputDetail from '../../components/mains/address/AddressInputDetail';
import AddressTypeSelectBox from '../../components/mains/address/AddressTypeSelectBox';
import AddressSetInfo from '../../components/mains/address/AddressSetInfo';
import AddressModal from '../../components/mains/address/AddressModal';


import {navigationBackHandler,useNavigation} from '../../navigation/NavigationBackHandler';

import userInfoSingleton from '../../db/userInfoSingleton';
import addressServerController from '../../server/addressServerController'


export default function AddressDetailScreen({route}) {
  

    let item = route.params.item;
    const addressType = route.params.addressType;
    const setAddress = route.params.setAddress;
    const orderPage = route.params.orderPage;
    const navigation = useNavigation();
    const inputBox = useRef(null);
    
    const [active,setActive] = useState(addressType == -1 ? 2 : addressType - 1);  
    const [addressDetail,setAddressDetail] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);

    const callBack = (data)=>{

      if(data != 0){

        item.addr_wireline = addressDetail;
        
        if(orderPage){

          
          route.params.setAddress({
            addr_zipcode : item.zipNo,
            addr_address1 : item.jibunAddr,
            addr_title :  item.jibunAddr,
            addr_detail :  item.addr_wireline,
          });

          navigation.goBack();
          navigation.goBack();
          if(navigation.canGoBack())
             navigation.goBack();
          navigation.navigate("cartOrderItem");
        }
        else if(!orderPage){
          route.params.setAddress(item);
          navigation.goBack();
          navigation.goBack();
          if(navigation.canGoBack())
             navigation.goBack();
          navigation.navigate("tab");
        }
        else
          navigation.reset({index: 0, routes: [{ name: 'tab' }],});
      }
      else
        Alert.alert(" ","저장 실패");
    }


    const insertDeliverInfo = ()=>{

      var formData = new FormData();
      
      formData.append('addr_title',item.jibunAddr);
      formData.append('addr_zipcode',item.zipNo);
      formData.append('addr_address1',item.roadAddrPart1);
      formData.append('addr_address2',item.roadAddrPart2);
      formData.append('mem_id',userInfoSingleton.getInstance()._userId);
      formData.append('addr_receiver',userInfoSingleton.getInstance()._name);
      formData.append('addr_wireline',addressDetail);
      formData.append('addr_base',addressType == -1 ? 0 : (active ? active : -1) + 1);
      formData.append('addr_phone',userInfoSingleton.getInstance()._mem_phone);

      addressServerController.insertUserAddressInformation(formData,callBack);
    }

    
    navigationBackHandler();




    const checkIsTextInputed = () =>{
      if(addressDetail.length == 0 || active == -1){ setModalVisible(true); }
      else{ insertDeliverInfo();}
   }


    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <CommonTitleBar title={"배송지 상세 정보"} leftOption={"back"} shadow={false}></CommonTitleBar>
          <AddressSelected back={false} title={item.jibunAddr} subtitle={item.roadAddr}></AddressSelected>
          <AddressInputDetail inputBox={inputBox} setAddressDetail={setAddressDetail} ></AddressInputDetail>
          <AddressTypeSelectBox active={active} setActive={setActive}></AddressTypeSelectBox>
        </ScrollView>
        <View style={styles.setContainer}>
          <AddressSetInfo checkIsTextInputed={checkIsTextInputed}></AddressSetInfo>
        </View>
        {
            isModalVisible == true ?
            <AddressModal inputBox={inputBox} isModalVisible={isModalVisible} setModalVisible={setModalVisible}></AddressModal>
            :
            null
          }
        
      </View>
     
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
  setContainer:{
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },

  
});