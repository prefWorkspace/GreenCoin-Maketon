import React , {useState} from 'react';
import { Text,TouchableOpacity, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
// import TextInputMask from 'react-native-text-input-mask';

export default function DeliverInfoSelectTab({clickSearchOrder , startDate , endDate,setShow}) {
    const [searchBar,setSearchBar] = useState(false);


    const calCulateDateMonth = (month)=>{
      var date = new Date();
      date.setMonth(date.getMonth() - month);
      return  date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth()  + 1) : date.getMonth() + 1) + "-"
      +  (date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate());
    }

    const calCulateDateDay = (day)=>{
      var date = new Date();
      date.setDate(date.getDate() - day);
      return  date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth()  + 1) : date.getMonth() + 1) + "-"
       +  (date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate());
    }

    const modalOpen = (type) =>{
      setShow({show:true, type:type});
    }

    return (
      <View style={styles.container}>
          <View style={styles.infoColum}>
              <TouchableOpacity onPress={()=>{clickSearchOrder(calCulateDateDay(7))}}>
                 <Text style={styles.label}>일주일</Text>
               </TouchableOpacity>
              <Text style={styles.labelDivisionTag}></Text>
              <TouchableOpacity onPress={()=>{clickSearchOrder(calCulateDateMonth(1))}}>
              <Text style={styles.label}>1개월</Text>
               </TouchableOpacity>
              <Text style={styles.labelDivisionTag}></Text>
              <TouchableOpacity onPress={()=>{clickSearchOrder(calCulateDateMonth(3))}}>
              <Text style={styles.label}>3개월</Text>
               </TouchableOpacity>
              <Text style={styles.labelDivisionTag}></Text>
              <TouchableOpacity onPress={()=>{clickSearchOrder(calCulateDateMonth(6))}}>
              <Text style={styles.label}>6개월</Text>
               </TouchableOpacity>
              <View style={styles.customRange}>
                <TouchableOpacity style={styles.touchableOpacity} onPress ={()=>{setSearchBar(!searchBar)}}>
                  <Text style={styles.priod}>기간 설정</Text>
                </TouchableOpacity>
              </View>
          </View>
          {
              searchBar == true ? 
              <View style={styles.infoColum}>
                <Text style={styles.searchInput}  onPress={()=>{modalOpen("start")}}>{startDate}</Text>
                <Text style={styles.inputTitle}>부터</Text> 
                <Text style={styles.searchInput}  onPress={()=>{modalOpen("end")}}>{endDate}</Text>
                <Text style={styles.inputTitle}>까지</Text> 
                <View style={styles.selecSearch}>
                <TouchableOpacity style={styles.touchableOpacity} onPress ={()=>{clickSearchOrder(startDate,endDate)}}>
                  <Text style={styles.search}>조회</Text>
                </TouchableOpacity>
                </View>
              </View>
              :
                false
          }
          
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth:1,
    borderBottomColor :"#efefef",
    backgroundColor:"white",
    backgroundColor:"#F4F6F9",
  },
  infoColum:{
    width:"100%",
    height:"58.412rem",   
    alignItems: "center",
    flexDirection: 'row',
    padding:"20rem",
  },
  touchableOpacity:{
    width:"100%",
    height:"100%",    
    alignItems: "center",
    justifyContent:"center",
    borderColor:"rgba(0, 0, 0, 0.5)",
  },
  customRange:{
    borderWidth:1,
    marginLeft:"auto",
    width:"77.294rem",
    height:"36.665rem",
    alignItems: "center",
    justifyContent:"center",
  },
  label:{
    fontFamily:"NotoSansKR-Medium",
  },
  labelDivisionTag:{
    borderRightWidth: 1,
    borderRightColor:"#DBDDE1",
    marginLeft:"15rem",
    marginRight:"15rem",
  },
  inputTitle:{
    fontSize:"14rem",
    fontFamily:"NotoSansKR-Regular",
    marginRight:"6rem",
  },
  searchInput:{
    width:"90rem",
    height:"36.665rem",
    backgroundColor:"white",
    borderWidth:.5,
    borderColor:"rgba(0, 0, 0, 0.5)",
    fontFamily:"NotoSansKR-Regular",
    marginRight:"6rem",
    fontSize:"13rem",
    textAlign: 'center',
    paddingBottom:"0rem",
  },
  priod:{
    fontSize:"13rem",
    color:"black",
    fontFamily:"NotoSansKR-Regular",
  },
  search:{
    fontSize:"13rem",
    color:"white",
    fontFamily:"NotoSansKR-Regular",
  },
  selecSearch:{  
    borderWidth:1,
    marginLeft:"auto",
    width:"77.294rem",
    height:"36.665rem",
    alignItems: "center",
    justifyContent:"center",
    backgroundColor:"#0D2141",
  }
  
});
