import React,{useState,useEffect} from 'react';
import { Text, View, Dimensions,TextInput ,Image,TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

//import ModalContent from '../../comm/ModalContent';


export default function ChangeAbout() {

  const [isModalVisible,setIsModalVisible] =useState(false);
  //const [modalType,setModalType] = useState("");
  

  const saveData = () =>{
    setModalType("FailSearchAccount");
    //setModalType("BankTimeOut");
    setIsModalVisible(true);
  }

    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.question} onPress={()=>{}}> 
            <Image source={require('../../../assets/img/settingIcon/question.png')} ></Image>
          </TouchableOpacity>
          <Text style={styles.title}>  환불계좌 등록</Text>
        </View>
        <Text style={styles.label}>
          교환 요청을 하시기 전 반드시 반품 가능 여부를 확인해주세요.{"\n"}
          교환 사유를 확인할 수 있는 사진을 등록하시면 보다 신속하게{"\n"}교환 처리 진행됩니다.
        </Text>
      </View>
    );
  }
  //<ModalContent modalType={modalType} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}></ModalContent>


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer:{
    width:"86%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    height:'50.457rem',
  },
  contentContainer:{
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    fontSize:"14.864rem",
    marginRight:"auto",
    color:"#878787",
  },
  label:{
    color:"#878787",
    fontSize:"13rem",
  }
});