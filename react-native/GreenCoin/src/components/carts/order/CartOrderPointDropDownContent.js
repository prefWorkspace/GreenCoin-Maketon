  import React , {useState ,useEffect} from 'react';
  import { Text, View, Dimensions,TouchableOpacity,Alert ,TextInput} from 'react-native';
  import EStyleSheet from 'react-native-extended-stylesheet';

  import CheckBox  from '@react-native-community/checkbox';


  const entireScreenWidth = Dimensions.get('window').width;
  EStyleSheet.build({ $rem: entireScreenWidth / 380 });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  export default function CartOrderPointDropDownContent({coupon,pointLimit,point,setPoint}){

    const [active,setAcitve] = useState(false);

    useEffect(() => {
      if(active)
        setPoint(pointLimit);
    }, [active])
    
    return (
      <View style={styles.container}>
        <View style={styles.dropContainer}>
              <Text style={styles.label}>3만원이상 결제시 포인트 사용이 가능합니다.</Text>
              <View style={styles.itemContainer}>
                <TextInput 
                  style={styles.textInput} 
                  value={point.toString()}
                  keyboardType={'numeric'}
                  placeholder={"0"}
                  onChangeText={(text)=>{  

                    if(coupon){
                      Alert.alert(" ","쿠폰과 포인트를 동시에 사용할 수 없습니다.");
                      return;
                    }

                    if(text.length == 0)
                      text = 0;
                      
                    if(text > pointLimit){
                      setPoint(pointLimit);
                    }
                    else{
                      setPoint(text);
                      setAcitve(false);
                    }
                  }}
                ></TextInput>
                <Text style={styles.label}>P</Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>사용 가능한 포인트 <Text style={styles.labelPoint}>{numberWithCommas(pointLimit)}P</Text></Text>
                <CheckBox boxType="square" value={active} onChange={()=>{setAcitve(!active)}} tintColors={{true:"#0D2141" ,false:"#D2D5DA"}}></CheckBox>
              </View>
          </View>
      </View>
    )
  };


  const styles = EStyleSheet.create({
    container:{
      alignItems: "center", 
      justifyContent: "center",
    },
    itemContainer:{
      flexDirection: 'row',
      alignItems: "center", 
    },
    title:{
      color:"#000000",
      fontSize:"14rem",
      marginRight:"auto",
    },
    subtitleContainer:{
      marginLeft:"auto",
    },
    subtitle:{
      fontFamily:"NotoSansKR-Bold",
      color:"#26CBFF",
      fontSize:"17rem",
    },
    dropContainer:{
      width:"100%",
    },
    textInput:{
      width:"90%",
      height:"48rem",
      borderWidth:1,
      borderColor:"#E1E6ED",
      marginRight:"auto",
      paddingLeft:"10rem",
    },
    label:{
      fontFamily:"NotoSansKR-Medium",
      color:"black",
      fontSize:"13rem",
    },
    labelPoint:{
      fontFamily:"NotoSansKR-Medium",
      color:"#26CBFF",
      fontSize:"13rem",
    }

  });