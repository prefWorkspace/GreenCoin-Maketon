import * as React from 'react';
import { Text, View, Dimensions ,TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function BirthdayInformation({weight,height, setWeight,setHeight}) {
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
            <Text style={styles.title}>내 신체사이즈</Text>
            <TextInput style={styles.textInput} value={height} keyboardType={'numeric'} onChangeText={text=>setHeight(text)}/>
            <Text> cm </Text>
            <TextInput style={styles.textInput} value={weight} keyboardType={'numeric'} onChangeText={text=>setWeight(text)}/>
            <Text> kg </Text>
        </View>
        <View style={styles.hr}/>
        <Text style={styles.subTitle}>*프로필 정보를 입력하시면 맞춤형 상품을 추천해드립니다.</Text>
      </View>
    );
  }
  


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
    height:'59.457rem',
  },
  title:{
      marginRight:"auto",
      fontSize:"14.864rem",
  },
  textInput:{
    width:"67.385rem",
    height:"35.674rem",
    borderColor:"#efefef",
    borderWidth:1,
    textAlign: 'center',
  },
  hr:{
    marginTop:"auto",
    width:"86%",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1.2,
  }, 
  subTitle:{
    fontSize:"13rem",
    marginRight:"auto",
    left:"27rem",
    marginTop:"15rem",
    marginBottom:"60rem",
  },
});