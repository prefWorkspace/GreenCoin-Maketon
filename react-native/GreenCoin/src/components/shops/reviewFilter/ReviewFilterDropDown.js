import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity} from 'react-native-gesture-handler'

export default function DetailSetOptionSelectBox({zIndex, style, reset,title,list ,filterClick}) {

    const [show,setShow ] = useState(false);
    const [selectTitle,setSelectTitle ] = useState(title);
    if(list == undefined || list.length == 0 || reset == true){
      return <View></View>
    }

    const openDropDownModal = () =>{
      setShow(e => !e);
    }

    const modalSelect = (value) =>{
      filterClick(value);
      setSelectTitle(value.label);
      setShow(false);
    }

    return (
      <View style={[style,{}]}>
        <TouchableOpacity style={styles.titleContainer} onPress={openDropDownModal}>
          <Text style={styles.title}>{selectTitle}</Text>
          {
            show ? 
            <Image style={styles.dropDownImage} source={require('../../../assets/img/label_point/dropUpPoint.png')} resizeMode={"stretch"}/>
            :
            <Image style={styles.dropDownImage} source={require('../../../assets/img/label_point/dropDownPoint.png')} resizeMode={"stretch"}/>
          }
        </TouchableOpacity>
        <View style={[styles.dropdownContainer,{zIndex:zIndex + 20000}]} nestedScrollEnabled={true}>
          {
            show ?
            <ScrollView style={[styles.dropDownStyle,{zIndex:zIndex + 450000}]} >
              {
                list.map((value)=>{
                  return (
                    <TouchableOpacity style={styles.selectTitle} onPress={()=>{modalSelect(value)}}>
                        <Text style={styles.label}>{value.label}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
            :
            null
          }
        </View>
    </View>
    );
}
          

//
//<Text style={styles.example}>asdsadas</Text>
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  titleContainer:{
    width:"160rem",
    height:"50rem",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    borderRadius:5,
    borderColor:"#E1E6ED",
    borderWidth:1,
    paddingLeft:"10rem",
    paddingRight:"10rem",
  },
  title:{
    color:"black",
    fontFamily:"NotoSansKR-Bold",
    marginRight:"auto",
  },
  selectTitle:{
    height:"35rem",
    justifyContent: "center"
  },
  touchableOpacity:{
    flexDirection: 'row',
    alignItems: "center",
    marginBottom:"8rem",
  },
  labelContainer:{
    width:"100rem",
    flexDirection: 'row',
  },
  label:{
    fontSize:"13rem",
    color:"black",
  },
  dropdownContainer:{
    position:"absolute",
    width:"100%",
    top:"50rem",
    backgroundColor:"white",
  },
  dropDownStyle:{
    width:"100%",
    height:"200rem",
    borderWidth:1,
    borderColor:"#E1E6ED",
    padding:"10rem",
    fontSize:"12.882rem",
  }
});
