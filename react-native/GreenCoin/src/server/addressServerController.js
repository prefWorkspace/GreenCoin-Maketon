
import localStringData from '../const/localStringData';

const api = localStringData.api;

export default {
    getUserAddressList: (formData,nextEvent) => {
       api.post(`/users/address/getlist/`,formData,{
       }).then(response=>{
         nextEvent(response.data);
        }).catch(e=>{console.log(e)})
    },
    insertUserAddressInformation:(formData,callback)=>{
      api.post(`/users/address/insert`,formData,{}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","address E  " + er)})
    },
    deleteUserAddressInformation:(formData,callback)=>{
      api.post(`/users/address/delete`,formData,{}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","address  " + er)})
    },
    getCurrentAddressInformation:(latitude,altitude,callback)=>{
      return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${altitude}&language=ko&key=${localStringData.mapApi}`);
    },
    
    
};

