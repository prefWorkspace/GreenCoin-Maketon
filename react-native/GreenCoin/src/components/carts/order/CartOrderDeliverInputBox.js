import { useNavigation ,useRoute} from '@react-navigation/native';
import React from 'react';
import { Text, View, Dimensions,TextInput ,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function CartOrderDeliverInputBox({setAddress,zipcode}){
  const routeInfo = useRoute();
  const navigation = useNavigation();

  const getAddress = () =>{
    navigation.navigate("address",{root:routeInfo.name ,order:true, setAddress:setAddress});
  }

  return (
    <View style={styles.container}>
      <View style={styles.deliverContainer}>
        <View style={styles.itemContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.label}>우편번호</Text>
          </View>
          <TextInput style={styles.inputContainer} value={zipcode} editable={false}/>
          <TouchableOpacity style={styles.changeButton} onPress={getAddress}>
            <Text style={styles.change}>변경</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor:"white",
  },
  deliverContainer:{
    width:"100%",
    height:"60rem",
    padding:"4rem",
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor:"white",
  },
  itemContainer:{
    height:"100%",
    width:"100%",
    flexDirection: 'row',
    alignItems: "center", 
  },
  titleContainer:{
    width:"20%",
  },
  inputContainer:{
    width:"45%",
    height:"48rem",
    alignItems: "center", 
    justifyContent: "center",
    borderColor:"#E1E6ED",
    borderWidth: 1,
    borderRadius:4,
    backgroundColor: "rgba(196, 196, 196, 0.1)",
    paddingLeft:"10rem",
    marginLeft:"20rem",
  },
  changeButton:{
    width:'80rem',
    height:"48rem",
    borderWidth:1,
    borderRadius:5,
    backgroundColor:"#0D2141",
    marginLeft:"auto",
    alignItems: "center", 
    justifyContent: "center",
  },
  change:{
    color:"white",
  },
  label:{
    marginRight:"auto",
    color:"#000000",
    fontSize:"13rem",
  }
});