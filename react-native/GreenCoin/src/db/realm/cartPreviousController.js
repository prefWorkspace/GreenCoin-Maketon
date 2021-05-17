
import Realm from 'realm';
import userInfoSingleton from '../userInfoSingleton';
import loginRegisterController from '../../server/loginRegisterController';


const PreviousProduct = {
        name: 'previousProduct',
        properties: {
            src:'string',
            prd_id : { type: 'int', default: 0 },
            prd_title : 'string',
            prd_price:{ type: 'int', default: 0 },
            prd_sale_rate : { type: 'int', default: 0 },
            prd_list_price : { type: 'int', default: 0 },
    }
};

const createPreviousProducts = async (state) =>{
    var realm = await Realm.open({schemaVersion:17,schema: [PreviousProduct]});
    realm.write(()=>{
        try{

            let list = realm.objects('previousProduct').filter((value) =>{console.log(value.prd_id + " " + state.prd_id); return value.prd_id==state.prd_id});
            realm.delete(list);


            let lengthCheckList = realm.objects('previousProduct');
            if(lengthCheckList.length >= 9){
                let removeList = realm.objects('previousProduct').filter((value,index) =>{ return lengthCheckList.length - 9 >= index});
                realm.delete(removeList);
            }
            
            realm.create('previousProduct', {
                src: state.src,
                prd_title : state.prd_title,
                prd_id : state.prd_id,
                prd_price: state.prd_price,
                prd_sale_rate : state.prd_sale_rate,
                prd_list_price : state.prd_list_price,
            });

        }
        catch(e){
            console.log(e);
        }   
    });
};


const getPreviousProductListFromRealm = async (callBack)=>{
    var realm = await Realm.open({schemaVersion:17,schema: [PreviousProduct]});
    realm.write(()=>{
        try{

            let list = realm.objects('previousProduct');
            callBack(list);
        }
        catch(e){
            console.log(e);
        }   
    });
}

const deletePreviousList = async (prd_id,callBack)=>{
    var realm = await Realm.open({schemaVersion:17,schema: [PreviousProduct]});
    realm.write(()=>{
        try{

            let list = realm.objects('previousProduct').filter((value) =>{ return value.prd_id==prd_id});
            realm.delete(list);
            callBack(realm.objects('previousProduct'));
        }
        catch(e){
            console.log(e);
        }   
    });
}

export default {
    setPreviousProduct : (state) =>{
        createPreviousProducts(state)
    },
    getPreviousProductList : (callBack) => {
        getPreviousProductListFromRealm(callBack);
    },
    deletePreviousProductList : (prd_id ,callBack) =>{
        deletePreviousList(prd_id,callBack);
    }
};
  