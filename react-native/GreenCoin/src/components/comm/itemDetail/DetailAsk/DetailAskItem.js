import React,{useState} from 'react';
import { Text,Image, View, Dimensions,TextInput,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation,useRoute } from '@react-navigation/native';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

function getDateType(date){
  function checkZero(checkString){
    return checkString.toString().length == 1 ?  "0" + checkString : checkString;
  }
  var temp = `${checkZero(date.getFullYear())}-${checkZero(date.getMonth() + 1)}-${checkZero(date.getDate())}`
        //  + ` ${checkZero(date.getHours())}:${checkZero(date.getMinutes())}:${checkZero(date.getSeconds())}`;
  return temp;
}


export default function DetailAskItem({index,item,productInfo}){
  //item.board_id 수정필요 
  const [password,setPassword] = useState(false);
  const [dropDown,setDropDown] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const validatePassword = () =>{
      if(item.board_pw == password){
        navigation.navigate("askDetail",{root:route.name,boardInfo:item,productInfo:productInfo});
      }
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.titleContainer} onPress={()=>{setDropDown(!dropDown)}}> 
          <View style={styles.contentContainer}>
            <Text style={styles.page}>{index}</Text>
            <View style={styles.imageContainer}>
              <Image style={styles.rock} source={require("../../../../assets/img/ask/rock.png")} resizeMode={"stretch"}/>
            </View>
            <Text style={styles.title}>{item.board_title}</Text>
            <View style={styles.newBox}><Text style={styles.new}>NEW</Text></View>
          </View>
          <View style={styles.contentContainer}>
              <Text style={styles.name}>{item.board_user}</Text>
              <Text style={styles.date}>{getDateType(new Date(parseInt(item.board_date)))}</Text>
          </View>
          {
            dropDown ?
            <View style={styles.passwordContainer}>
            <Text style={styles.password}>비밀번호 입력</Text>
            <TextInput style={styles.inputBox} onChangeText={text=>{setPassword(text)}}></TextInput>
            <TouchableOpacity style={styles.buttonBox}  onPress={validatePassword}> 
              <Text style={styles.button}>확인</Text>
            </TouchableOpacity>
            </View>
            :
            null
          }
        </TouchableOpacity>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
    alignItems: "center",
    justifyContent :"center",
    borderBottomWidth:1,
    borderColor:"#F0F2F6", 
    padding:"5rem",
    paddingLeft:"20rem",
    marginTop:"8rem",
    marginBottom:"10rem",
  },
  titleContainer:{
    marginBottom:"10rem",
   },
  page:{  marginRight:"33rem",  },
  imageContainer:{ width:"17rem", },
  rock:{
    width:"15rem",
    right:"10rem",
    marginRight:"10rem",
  },
  title:{ marginRight:"10rem", },
  newBox:{
    width:"38rem",
    height:"18rem",
    borderWidth:1,
    backgroundColor:"#0D2141",
    alignItems: "center",
    justifyContent :"center",
    marginRight:"auto",
  },
  new:{ fontSize:"11rem",  color:"white",},
  contentContainer:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent :"center",
    width:"100%",
  },
  name:{ marginRight:"15rem",},
  date:{ marginRight:"70rem",},
  passwordContainer:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent :"center",
    marginTop:"10rem",  
  },
  password:{
    fontSize:"17rem",
    marginRight:"10rem",
  },
  inputBox:{
    width:"120rem",
    height:"35rem",
    borderWidth:1,
    borderColor:"#F0F2F6",
    marginRight:"10rem",
  },
  buttonBox:{
    width:"65rem",
    height:"35rem",
    borderWidth:1,
    backgroundColor:"#0D2141",
    alignItems: "center",
    justifyContent :"center",
  },
  button:{
    color:"white",
  }
});