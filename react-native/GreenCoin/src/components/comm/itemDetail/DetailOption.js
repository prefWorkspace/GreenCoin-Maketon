import React ,{useState,useEffect}  from 'react';
import { Text, View, Dimensions,TouchableOpacity,Image, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
  
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const Data = [
  "XS",
  "S",
  "M",
  "L",
  "XL"
];




export default function DetailOption({optionList,checkValidation}){



  const [colorlist ,setColorList] = useState([]);
  const [sizelist ,setSizeList] = useState({});




  const [count,setCount] = useState(0);
  const [color, setColor] = useState(-1);
  const [size,setSize] = useState(-1);

  const setDefaultValue = () =>{
    setCount(0); 
    setColor(-1); 
    setSize(-1);
  }

  useEffect(()=>{
    var colorList = [];
    var sizeList = {};
    optionList.map((value)=>{
      if(sizeList[value.po_value1] == undefined)
        colorList.push({name : value.po_value1 , color:value.po_color,po_price : value.po_price ,po_id :value.po_id});
      if(sizeList[value.po_value1] == undefined)
        sizeList[value.po_value1] = [{size : value.po_value2, inventory : value.po_inventory , po_price : value.po_price, po_id :value.po_id}];
      else
        sizeList[value.po_value1].push({size : value.po_value2, inventory : value.po_inventory,po_price : value.po_price, po_id :value.po_id});
    });
    setColorList(colorList);
    setSizeList(sizeList);
  },[optionList]);

  useEffect(() => { updateData(); }, [count])
  useEffect(() => { updateData(); }, [color])
  useEffect(() => { updateData(); }, [size])

  const updateData = () => {
    if(count != 0 && color != -1 && size != -1){
       checkValidation(count,colorlist[color].name,sizelist[colorlist[color].name][size]);
       setDefaultValue();
    }
  }

  const SizeBoxList = () =>{
    return sizelist[colorlist[color].name].map((value,index)=>{
      return  <TouchableOpacity 
                style={size ==  index ? styles.sizeBoxActive : styles.sizeBox}
                onPress={()=>{setSize(index); }}>
                <Text  style={size ==  index ? styles.labelActive : styles.label}>{value.size}</Text>
              </TouchableOpacity>
    
    });
  }

  return (
    <View style={styles.container}>
         <View style={styles.colorContainer}>
           {
             colorlist.map((value,index)=>{
                return  <TouchableOpacity style={[color == index ? styles.colorActive : styles.color,{backgroundColor:value.color}]} onPress={()=>{ setColor(index);}}/>

             })
           }
        </View> 
        {
          colorlist[color] && sizelist[colorlist[color].name] ?
            <View style={styles.sizeContainer}>
              <Text style={styles.title}>사이즈</Text>
              <View style={styles.itemContainer}>
                <SizeBoxList></SizeBoxList>
              </View>
            </View>
         :
         null
       }
        <View style={styles.countContainer}>
          <Text style={[styles.labelMargin,styles.title]}>수량</Text>
          <View style={styles.counterBox}>
          <TouchableOpacity style={styles.touchableOpacity} onPress={()=>{if(count > 1)setCount(count-1);}}>
            <Image style={styles.minus} source={require('../../../assets/img/minus-plus/minus.png')} resizeMode={"stretch"}/>
          </TouchableOpacity>
            <Text style={styles.num}>{count}</Text>
          <TouchableOpacity style={styles.touchableOpacity} onPress={()=>{setCount(count+1);}}>
            <Image style={styles.plus} source={require('../../../assets/img/minus-plus/plus.png')} resizeMode={"stretch"}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    backgroundColor:"white",
    borderRadius:10,
    paddingLeft:"20rem",
  },
  colorContainer:{
    flexDirection: 'row',
    alignItems: "center",
  },
  color:{
    width:"30rem",
    height:"30rem",
    borderRadius: "15rem",
    marginRight:"10rem",
  },
  colorActive:{
    width:"30rem",
    height:"30rem",
    marginRight:"10rem",
    borderWidth:5,
    borderRadius: "15rem",
    borderColor:"#E6F6F6",
  }, 
  itemContainer:{
    width:"100%",
    flexDirection: 'row',
    justifyContent: "flex-start",
    flexWrap: 'wrap',
  },
  sizeContainer:{
    marginTop:"10rem",
  },
  title:{
    color:"black",
    marginRight:"10rem",
  },
  label:{
    color:"black",
    fontSize:"12.882rem",
  },
  labelActive:{
    color:"black",
    fontSize:"12.882rem",
  },
  sizeBoxActive:{
    height:"38rem",
    alignItems: "center",
    justifyContent: "center",
    borderWidth:1,
    padding:"15rem",
    marginRight:"5rem",
    marginTop:"5rem",
  },
  sizeBox:{
    height:"38rem",
    alignItems: "center",
    justifyContent: "center",
    borderWidth:1,
    padding:"15rem",
    marginRight:"5rem",
    marginTop:"5rem",
    borderColor:"#D8D8D8",
  }, 
  countContainer:{
    width:"100%",
    flexDirection: 'row',
    alignItems: "center",
    marginTop:"10rem",
  },
  counterBox:{
    width:"100.086rem",
    height:"40.282rem",
    flexDirection: 'row',
    marginRight:"auto",
    borderWidth:1,
    borderColor:"grey",
    justifyContent :"center",
    alignItems: "center"
  },
  touchableOpacity:{
    width:"40rem",
    height:"20rem",
    margin:"5rem",
    justifyContent :"center",
    alignItems: "center",
  },
  minus:{
    fontSize:"30rem",
    width:"14rem",
    height:"3rem",
    top:"1.5rem",
  },
  num:{
    fontSize:"16rem",
  },
  plus:{
    width:"14rem",
    height:"14rem",
    marginRight:"5rem",
  }


});