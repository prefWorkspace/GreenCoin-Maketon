import React,{useState} from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MultiSlider from '@ptomasroos/react-native-multi-slider';



const Marker = ({currentValue}) =>{
 return (
    <View style={styles.markerContainer}>
          <View style={styles.rangeContainer}>
            <Text style={styles.markerLabel}>{currentValue}%</Text>
            <View style={styles.markerPoint}/>
          </View>
          <View style={styles.dot}>
            <View style={styles.dotCenter}/>
          </View>
    </View>
 ) ;
}


export default function Sale({sale,setSale}) {
    return (
      <View style={styles.hr}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>할인율</Text>
        <Text style={styles.valueAbleLabel}>{sale[0]}%이상~{sale[1]}%이하</Text>
        </View>
        <View style={styles.sliderContainer}>
            <MultiSlider
                values={[sale[0],sale[1]]}
                min={0}
                max={80}
                onValuesChangeFinish={(values) => {setSale(values)}}
                sliderLength={styles.slider.width}
                step={1}
                allowOverlap
                width={200}
                selectedStyle={{backgroundColor: 'rgba(189, 196, 204, 0.3);' }}
                unselectedStyle={{backgroundColor: 'rgba(189, 196, 204, 0.3);' }}
                markerStyle={{backgroundColor: 'black'}}
                touchDimensions={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  slipDisplacement: 40,
                }}        
                isMarkersSeparated={true}
                customMarkerLeft={(e) => {
                  return (<Marker currentValue={e.currentValue}/>)
               }}
         
             customMarkerRight={(e) => {
                  return (<Marker currentValue={e.currentValue}/>)
             }}
            ></MultiSlider>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.pivotLabel}>10% 이상</Text>
          <Text style={styles.pivotLabelRight}>80% 이하</Text>
        </View>
      </View>
      </View>
    );
  }
  

//326.025
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
  },
  title:{
    fontFamily:"NotoSansKR-Medium",
    fontSize:"15.855rem",
  }, 
  valueAbleLabel:{
    top:"13rem",
    marginLeft:"auto",
    fontFamily:"Montserrat-Regular",
    fontSize:"11.891rem",
    color:"#888C92"
  },
  titleContainer:{  flexDirection: 'row',  },
  pivotLabel:{
    top:"1rem",
    fontFamily:"Montserrat-Medium",
    fontSize:"11.891rem", 
    color:"black",
  },
  pivotLabelRight:{
    top:"1rem",
    marginLeft:"auto",
    fontFamily:"Montserrat-Medium",
    fontSize:"11.891rem",
    color:"black",
  },
  sliderContainer:{ 
    width:"100%",  
    height:"80rem",
    justifyContent: "flex-start",
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor:"white",
    justifyContent: "center",
    alignItems: "center",
    marginTop:"35rem",
  },
  selectBox:{
    margin:"3.5rem",
    width :"103.059rem",
    height:"33.692rem",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 2,
    fontSize:"11.891rem",
    textAlign: "center",
    paddingVertical: 9,
  },
  slider:{   width:'286.025rem', },
  hr:{   width:"100%",  padding:"15rem", },
  markerContainer:{
    width:"100rem",
    height:"100rem",
    justifyContent: "center",
    alignItems: "center",
  },
  dot:{
    width:"20rem",
    height:'20rem',
    backgroundColor:"white",
    borderWidth:1,
    borderColor:"#0D2141",
    borderRadius:100,
    justifyContent: "center",
    alignItems: "center",
    bottom:"12rem",
  },
  dotCenter:{
    width:"12rem",
    height:'12rem',
    backgroundColor:"#0D2141",
    borderRadius:100,
  },
  rangeContainer:{
    width:"70rem",
    height:'30rem',
    backgroundColor:"#0D2141",
    bottom:"25rem",
    justifyContent: "center",
    alignItems: "center",
  },
  markerPoint:{
    width:"10rem",
    height:'10rem',
    backgroundColor:"#0D2141",
    transform: [{ rotate: '45deg'}],
    top:"6rem",
  },
  markerLabel:{
    color:"white",
    fontSize:"12rem",
    top:"4rem",
  }
});