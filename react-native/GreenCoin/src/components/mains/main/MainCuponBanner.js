import React ,{useState}from 'react';
import { Text, View, Dimensions,Image ,TouchableOpacity ,Linking, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper'
import localStringData from '../../../const/localStringData';


export default function MainCuponBanner({couponList}) {
  const [idx, setIndex] = useState(0);

    return (
      <View style={styles.container}>
         <Swiper style={styles.wrapper} 
              loop={true}
              activeDotStyle={{opacity:0}}
              dotStyle={{opacity:0}}
              index={0}
              onIndexChanged={(index)=>{setIndex(index)}}
              >
              <TouchableOpacity style={styles.imageStyle} onPress={async ()=>{ }}>
                        <Image resizeMode={"cover"} style={styles.imageStyle} source={require('../../../assets/img/sample/cupon.png')} />
                </TouchableOpacity>
                
          </Swiper>
          <View style={styles.cuponLabelContainer}>
            <Text>
              <Text style={styles.currentLabel}>
                {idx + 1} 
              </Text>
              <Text style={styles.lengthLabel}>
                 / {couponList.length}
              </Text>   
            </Text>
          </View>
      </View>
        
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginBottom:"40rem",
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