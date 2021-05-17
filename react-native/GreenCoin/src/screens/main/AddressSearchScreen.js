import  React ,{useState} from 'react';
import { Text,Image, View, Dimensions,ScrollView, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import AddressSearchBar from '../../components/mains/address/AddressSearchBar';
import AddressSaveList from '../../components/mains/address/AddressSaveList';
import AddressSearchList from '../../components/mains/address/AddressSearchList';
import AddressSearchTip from '../../components/mains/address/AddressSearchTip';
import {navigationBackHandler , useNavigation}  from '../../navigation/NavigationBackHandler';



export default function AddressScreen({route}) {
  const [searchList,setSearchList] = useState([]);
  const navigation = useNavigation();
  const setAddress = route.params.setAddress;
  const orderPage = route.params.orderPage;
  
 // navigationBackHandler();
    return (
      <ScrollView style={styles.container}>
        <CommonTitleBar title={"배송지 상세 정보"} leftOption={"back"} shadow={false}/>
        <AddressSearchBar setSearchList={setSearchList} searchAPIKey={route.params.searchKey}/>
        {
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