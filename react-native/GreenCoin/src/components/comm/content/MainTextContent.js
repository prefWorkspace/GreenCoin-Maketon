import * as React from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';

export default function MainTextContent({item}) {

    return (
      <View style={styles.container}>
        <View style={styles.likeInfoContainer}>
          <View style={styles.likeInfo}>
            {
              item.type != 0 ?
              <Image source={require('../../../assets/img/shop/wishList.png')}></Image>
              :
              null
            }
            <Text>{item.title}</Text>
          </View>
          <Text style={styles.likeInfoMore}>{item.date}</Text>
        </View>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "center",
  },
  likeInfoContainer:{
    flexDirection: 'row',
    width:"100%",
    padding:"10rem",
    alignItems: "center",
    justifyContent: "center",
  },
  likeInfo:{
    marginRight:"auto",
    flexDirection: 'row',
  },
  likeInfoMore:{
    marginLeft:"auto",
  },
  titleAreaBody:{
    flexDirection: 'row',
    width:"240rem",
    padding:"10rem",
    height:"68.42rem",
    alignItems: "center",
    justifyContent: "center",
  },
  titleLabel:{
    textAlign:"center",
    fontSize :"14rem",
    fontWeight:'bold',
    
    //fontFamily: "NotoSansCJKkrRegular"
  },
  titleAddressPoint:{
    marginLeft:"5rem",
    bottom:"2rem",
  },
  logoImage:{
    width :"59.457rem",
    height :"44.593rem",
    top:"10rem",
  },
  searchImage:{
    width :"31.46rem",
    height :"31.46rem",
    top:"23.28rem",
    left:"15rem",
    
  }

});
