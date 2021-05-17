import React,{useState,useEffect}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Platform,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function DetailSetOptionSelectBox({relative, zIndex,title,list ,clickSelect}) {



    //const [title,setTitle ] = useState("");
    const [show,setShow ] = useState(false);
    const [selectTitle, setSelectTitle] = useState(title);
    const [listHistory, setListHistory] = useState(list);
    // if(list == undefined || list.length == 0 || reset == true){
    //   return <View></View>
    // }


    useEffect(() => {

      if(!list || list[0].opt_relate_id == 0){
        return;
      }
      
      if(listHistory != null){
        if(JSON.stringify(listHistory) != JSON.stringify(list)){
          setSelectTitle(title);
        }
      }
     
        
      setListHistory(list);   
      }, [list])

    const openDropDownModal = () =>{
      setShow(e => !e);
    }

    const modalSelect = (value) =>{
      setShow(false);
      if(clickSelect(value) == false)
        return;
      setSelectTitle(value.label);
    }

    return (
      <View style={[styles.container]}>
        
        <TouchableOpacity style={styles.titleContainer} onPress={openDropDownModal}>
          <Text style={styles.title}>{selectTitle}</Text>
          {
            show ? 
            <Image style={styles.dropDownImage} source={require('../../../assets/img/label_point/dropUpPoint.png')} resizeMode={"stretch"}/>
            :
            <Image style={styles.dropDownImage} source={require('../../../assets/img/label_point/dropDownPoint.png')} resizeMode={"stretch"}/>
          }
        </TouchableOpacity>
        <View style={[ relative ? styles.dropdownContainer : styles.dropdownDetailContainer,{zIndex:zIndex}]}>
          {
            show && list ?
            <View style={[styles.dropDownStyle]}>
              {
                list.map((value)=>{
                  return (
                    <TouchableOpacity style={[styles.selectTitle]} onPress={()=>{modalSelect(value)}}>
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
          

//
//<Text style={styles.example}>asdsadas</Text>
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    marginBottom:"5rem",
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
    backgroundColor:"white",
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
    position: "relative",//Platform.OS != "ios" ? "absolute" : "relative",
    width:"100%",
    //top: "50rem", //Platform.OS != "ios" ?  "50rem" : 0
  },
  dropdownDetailContainer:{
    position: "absolute",//Platform.OS != "ios" ? "absolute" : "relative",
    width:"100%",
    top: "50rem", //Platform.OS != "ios" ?  "50rem" : 0
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
