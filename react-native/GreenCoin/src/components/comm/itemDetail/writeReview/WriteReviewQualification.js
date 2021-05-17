import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function WriteReviewQualification() {
    const [dropBox,setDropBox] = useState(false);
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.itemContainer} onPress={()=>{setDropBox(!dropBox)}}>
              <Text>적립금 조건을 더 알아보세요</Text>
              {
                  dropBox ?
                  <Image style={styles.image} source={require('../../../../assets/img/label_point/dropUpPoint.png')}></Image>
                  :
                  <Image style={styles.image} source={require('../../../../assets/img/label_point/dropDownPoint.png')}></Image>
              }
          </TouchableOpacity>
          {
            dropBox?
            <View style={styles.dropItemContainer}>
            <Text style={styles.label}>찰칵,리뷰 작성하고 적립금 받기!</Text>
            <Text style={styles.label}>* 매주 베스트리뷰 1분 선정! 50,000원 적립금 지급</Text>
            <Text style={styles.label}>* 매주 베스트리뷰 1분 선정! 50,000원 적립금 지급</Text>
            <Text style={styles.label}>* 매주 베스트리뷰 1분 선정! 50,000원 적립금 지급</Text>
            <Text style={styles.label}></Text>
            <Text style={styles.label}>* 매주 베스트리뷰 1분 선정! 50,000원 적립금 지급</Text>
            <Text style={styles.label}>* 매주 베스트리뷰 1분 선정! 50,000원 적립금 지급</Text>
            <Text style={styles.label}>* 매주 베스트리뷰 1분 선정! 50,000원 적립금 지급</Text>
            <Text style={styles.label}>* 매주 베스트리뷰 1분 선정! 50,000원 적립금 지급</Text>
            </View>
            :
            null
          }
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
    alignItems: "center",
    justifyContent: "center",
    padding :"20rem",
  },
  itemContainer:{
    width:"100%",
    height:"50rem",
    padding:"15rem",
    borderWidth:1,
    borderRadius:5,
    borderColor:"#E1E6ED",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  dropItemContainer:{
    width:"100%",
    padding:"15rem",
    borderRadius:5,
    borderColor:"#E1E6ED",
    borderRightWidth:1,
    borderLeftWidth:1,
    borderBottomWidth:1,
  },  
  label:{
    fontSize:"11.891rem",
    color:"black",
  },
  image:{
    marginLeft:"auto",
  },
});
