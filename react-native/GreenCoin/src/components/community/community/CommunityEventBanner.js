import React ,{useState}from 'react';
import { Text, View, Dimensions,Image ,TouchableOpacity ,Linking, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper'


export default function CommunityEventBanner({couponList}) {
  const [idx, setIndex] = useState(0);

    return (
      <View style={styles.container}>
         <Swiper style={styles.wrapper} 
              loop={true}
              activeDotStyle={{top:"10.5%",opacity:1,width:"13%",backgroundColor:"#66D8B9"}}
              dotStyle={{top:"10.5%",opacity:1}}
              onIndexChanged={(index)=>{setIndex(index)}}
              >
              <TouchableOpacity style={styles.imageStyle} onPress={async ()=>{ }}>
                        <Image resizeMode={"cover"} style={styles.imageStyle} source={require('../../../assets/img/icon/banner.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageStyle} onPress={async ()=>{ }}>
                        <Image resizeMode={"cover"} style={styles.imageStyle} source={require('../../../assets/img/icon/banner.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageStyle} onPress={async ()=>{ }}>
                        <Image resizeMode={"cover"} style={styles.imageStyle} source={require('../../../assets/img/icon/banner.png')} />
              </TouchableOpacity>
                
          </Swiper>
      </View>
        
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginBottom:"20rem",
  },  
  wrapper:{
    height:"166.480rem",
  },  
  imageStyle:{
    width:"100%",
    height:"100%",
  },
  cuponLabelContainer:{
    bottom : "50rem",
    marginLeft:"auto",
    right:"10rem"
  },
  currentLabel:{
    fontSize:"10.9rem",
    fontWeight:'bold',
  },
  lengthLabel:{ 
    fontSize:"10.9rem",
    fontWeight:'bold',
    color:"white"
  }
});