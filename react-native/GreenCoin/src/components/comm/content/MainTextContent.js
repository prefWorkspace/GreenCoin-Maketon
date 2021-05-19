import * as React from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';


const getStylesType = (type) =>{
  switch(type){
    case 0 : return <View style={styles.contentTypeA}><Text>Hot</Text></View>;
    case 1 : return <View style={styles.contentTypeA}><Text>Hot</Text></View>;
    case 2 : return <View style={styles.contentTypeB}><Text>New</Text></View>;
    case 3 : return <View style={styles.contentTypeC}><Text>Hot</Text></View>;
  }
}

export default function MainTextContent({item}) {
    const navigation = useNavigation();

    const moveToContentDetail = () =>{
      navigation.navigate("communityDetail");
    }


    return (
      <TouchableOpacity style={styles.container} onPress={moveToContentDetail}>
        <View style={styles.likeInfoContainer}>
          <View style={styles.likeInfo}>
            {
              item.type != 0 ?
              getStylesType(item.type)
              :
              null
            }
            <Text>{item.title}</Text>
          </View>
          <Text style={styles.likeInfoMore}>{item.date}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "center",
    width:"100%",
    paddingLeft:"8rem",
    paddingRight:"8rem",
  },
  likeInfoContainer:{
    flexDirection: 'row',
    width:"100%",
    paddingTop:"10rem",
    paddingBottom:"10rem",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth:1,
    borderBottomColor:"#EDEDED",
  },
  likeInfo:{
    width:"70%",
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
  },
  contentTypeA:{ 
    backgroundColor:"#66D8B9",
    borderRadius:10,
    width :"30rem",
    height :"20rem",
    alignItems: "center",
    justifyContent: "center",
    marginRight:"6rem",
  },
  contentTypeB:{ 
    backgroundColor:"#505050",
    borderRadius:10,
    width :"30rem",
    height :"20rem",
    alignItems: "center",
    justifyContent: "center",
    marginRight:"6rem",
  },
  contentTypeC:{ 
    backgroundColor:"#66D8B9",
    borderRadius:10,
    width :"30rem",
    height :"20rem",
    alignItems: "center",
    justifyContent: "center",
    marginRight:"6rem",
  },
  contentTypeD:{ 
  },
});
