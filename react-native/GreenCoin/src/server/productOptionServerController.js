
import localStringData from '../const/localStringData';

const api = localStringData.api;

export default {
  getProductOptionsDetailById:(id,callback)=> { 
    api.get(`/productsOption/get/${id}`,{
    }).then(response=>{
      if(response.data)
        callback(response.data);
     }).catch(e=>{console.log(e)})
  },
  getProductOptionListForMog:(txn_id,id,callback)=> { 
    api.get(`/productsOption/get/${txn_id}/${id}`,{
    }).then(response=>{
      if(response.data)
        callback(response.data);
     }).catch(e=>{console.log(e)})
  },
};

