import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function CartModalSizeSelectBox({zIndex , reset,title,list ,clickSelect}) {

    
    const [show,setShow ] = useState(false);
    const [selectTitle,setSelectTitle ] = useState(title);

    const openDropDownModal = () =>{
      setShow(e => !e);
    }

    const modalSelect = (value) =>{
      clickSelect(value);
      setSelectTitle(value.label);
      setShow(false);
    }

    const clickSelectModal = () => {
      modalSelect(value);
    }

    return (
      <View style={[styles.container,{zIndex:zIndex * 300}]}>
        <TouchableOpacity style={styles.titleContainer} onPress={openDropDownModal} hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}>
          <Text style={styles.title}>{selectTitle}</Text>
          {
            show ? 
            <Image style={styles.dropDownImage} source={require('../../../assets/img/label_point/dropUpPoint.png')} resizeMode={"stretch"}/>
            :
            <Image style={styles.dropDownImage} source={require('../../../assets/img/label_point/dropDownPoint.png')} resizeMode={"stretch"}/>
          }
        </TouchableOpacity>
        <View style={styles.dropdownContainer}>
          {
            show && list ?
            <View style={styles.dropDownStyle}>
              {
                list.map((value)=>{
                  return (
                    <TouchableOpacity style={styles.selectTitle} onPress={clickSelectModal}>
                        <Text style={styles.label}>{value.label}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            :
            null
          }
        </View>
    </View>
    );

}
          

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    marginBottom:"5rem",
    zIndex:5000
  },
  titleContainer:{
    width:"100%",
    height:"50rem",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    width:"100%",
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
    justifyContent: "center",
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
    position: "absolute",//Platform.OS != "ios" ? "absolute" : "relative",
    width:"100%",
    top: "50rem", //Platform.OS != "ios" ?  "50rem" : 0,
    zIndex:4000,
  },
  dropDownStyle:{
    width:"100%",
    borderWidth:1,
    borderColor:"#E1E6ED",
    backgroundColor:"white",
    padding:"10rem",
    fontSize:"12.882rem",
    justifyContent: "center",
  }
});
