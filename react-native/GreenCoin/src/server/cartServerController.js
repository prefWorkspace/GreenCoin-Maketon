
import localStringData from '../const/localStringData';

const api = localStringData.api;


export default {
    inserCarttItemListToCart:(formData,callback)=>{
      api.post(`/cart/insert`,formData,{}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","insertCart :  " + er)})
    },
    updateCartItem:(formData,callback)=>{
      api.post(`/cart/update/item`,formData,{}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","updateCartItem :  " +  er)})
    },
    deleteCartItem:(formData,callback)=>{
      api.post(`/cart/delete/item`,formData,{}).
      then(value=>{
        callback(value.data);
      }).catch(er=>{alert(" ","deleteCartItem :  " +  er)})
    },
    getCartItemList:(mem_id,callback)=> { 
      api.get(`/cart/getlist/user/${mem_id}`,{}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","getCartItemList :  " +  er)})
    },
    
};

