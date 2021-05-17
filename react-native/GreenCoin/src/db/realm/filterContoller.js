
import Realm from 'realm';
import userInfoSingleton from '../userInfoSingleton';

const FilterSetting = {
        name: 'FilterSetting',
        properties: {
            benefit:'bool',
            sortType:{ type: 'int', default: 0 },
            price_min : { type: 'int', default: 0 },
            price_max : { type: 'int', default: 0 },
            sale_min : { type: 'int', default: 0 },
            sale_max : { type: 'int', default: 0 }
    }
};


const createNewUserSchema = (realm,state) =>{
    realm.create('FilterSetting', {
        benefit: state.benefit,
        sortType: state.sortType,
        price_min : state.price_min,
        price_max : state.price_max,
        sale_min : state.sale_min,
        sale_max : state.sale_max,
    });
}

const updateUserInfomation = async (state,moveToNext)=>{
    Realm.open({schemaVersion:17,schema: [FilterSetting]})
    .then(realm => {
        realm.write(()=>{
            try{  
                let filter = realm.objects('FilterSetting');
                if(filter.length == 0){
                    createNewUserSchema(realm,state);
                    return;
                }

                filter[0].benefit = state.benefit;
                filter[0].sortType = state.sortType;
                filter[0].price_min = state.price_min;
                filter[0].price_max = state.price_max;
                filter[0].sale_min = state.sale_min;
                filter[0].sale_max = state.sale_max;

                userInfoSingleton.getInstance().updateFilterState(state);
                 moveToNext();
            }
            catch{
                createNewUserSchema(realm,state);
            }   
        })
        
     
    });
}

const loadFilterInfoFromRealm = async () =>{

    var initData = {};
    var realm = await Realm.open({schemaVersion:17,schema: [FilterSetting]});
    var filter = await realm.objects('FilterSetting');
    
    initData.benefit = filter[0] == undefined  ? false : filter[0].benefit;
    initData.sortType =  filter[0] == undefined  ? 0 : filter[0].sortType;
    initData.price_min = filter[0] == undefined  ? 1000 : filter[0].price_min; 
    initData.price_max = filter[0] == undefined  ? 300000 : filter[0].price_max; 
    initData.sale_min = filter[0] == undefined  ? 0 : filter[0].sale_min; 
    initData.sale_max = filter[0] == undefined  ? 100 : filter[0].sale_max;
    userInfoSingleton.getInstance().updateFilterState(initData);
    return (await initData);
}


export default {
    setFilterRealm : (state,moveToNext) => {
        updateUserInfomation(state,moveToNext);
    },
    loadFilterInfo : () => {
        loadFilterInfoFromRealm();
    }

};
  