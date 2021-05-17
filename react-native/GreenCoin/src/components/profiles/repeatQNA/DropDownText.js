import React,{useState} from 'react';
import { Text,Image, View, Dimensions,TouchableOpacity,} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const contents ={
    title: "주문 취소 버튼이 안눌려요",
    body: "Hi. I love this component. What do you think?\nHi. I love this component. What do you think?"
};
 

export default function DropDownText({item}) {
  const [dropBox,setDropBox] = useState(false);
    return (
      <View style={styles.container}>
      <TouchableOpacity style={styles.itemContainer} onPress={()=>{setDropBox(!dropBox)}} activeOpacity={1}>
        <View style={styles.touchableOpacity}>
          <View style={styles.labelContainer}>
              <Text style={styles.title}>{item.faq_name}</Text>
          </View>
          {
              dropBox ? 
              <Image style={styles.image} resizeMode={"stretch"} source={require('../../../assets/img/label_point/dropUpPoint.png')}></Image>
              :
              <Image style={styles.image} resizeMode={"stretch"} source={require('../../../assets/img/label_point/dropDownPoint.png')}></Image>
          }
      </View>
      </TouchableOpacity>
      {
        dropBox?
        <View style={styles.dropItemContainer}>
            <Text>{item.faq_content}</Text>
        </View>
        :
        null
      }
    </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"90%",
    borderBottomWidth:1,
    borderBottomColor :"#efefef",
    backgroundColor:"white",
  },
  itemContainer:{
    width:"100%",
    marginTop:"20rem",
    marginBottom:"20rem",
  },
  title:{
    fontSize:"14.864rem",
    marginRight:"auto",
  },
  image:{
    marginLeft:"auto",
  },
  subtitle:{
    fontSize:"14.864rem"
  },
  touchableOpacity:{
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    paddingRight:"5rem",
  },
  dropItemContainer:{
    marginBottom:"20rem",
  }
});