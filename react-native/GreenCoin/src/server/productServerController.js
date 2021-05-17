
import localStringData from '../const/localStringData';

const api = localStringData.api;

export default {/*
  getProductListByCategoryName: (category,setItemList) => {
    category = category == "전체보기" ? "" : category;
     api.get(`productSimpleInfo/getProducts/${category}`,{}).then(response=>{
       setItemList(response.data)}
       );
  },*/
  getWhatsNewItemList: (formData,setItemList) =>{
    api.post(`productSimpleInfo/getwhatnewitemlist/`,formData,{}).then(response=>{
      setItemList(response.data)}
      );
  },
  getMainInitList:(formData,callback)=> { 
    api.post(`/productSimpleInfo/init/`,formData,{}).
    then(value=>{
      callback(value.data);
    }).catch(er=>{alert(" ","getMainInitList :  " +  er)})
  },
  getMainBestItemList:(formData,callback)=> { 
    api.post(`/productSimpleInfo/bestItemlist/`,formData,{}).
    then(value=>{
      callback(value.data);
    }).catch(er=>{alert(" ","getMainBestItemList :  " + er)})
  },
  getYddList:(params,callback)=> { 
    api.get(`/newList?${params}`,{}).
    then(value=>{
      callback(value.data);
    }).catch(er=>{alert(" ","getMainBestItemList :  " + er)})
  },
  getFilterInitItemList:(formData,callback)=>{
    api.post(`/productSimpleInfo/filterInitItemList`,formData,{
    }).then(response=>{
      if(response.data)
        callback(response.data);
     }).catch(e=>{console.log(e)})
  },
  getShoplistInitSetting:(formData,callback)=>{
    api.post(`/productSimpleInfo/init`,formData,{
    }).then(response=>{
      if(response.data)
        callback(response.data);
     }).catch(e=>{console.log(e)})
  },
  getFilterItemList:(formData,callback)=> { 
    api.post(`/productSimpleInfo/filterItemList/`,formData,{
    }).then(response=>{
      if(response.data)
        callback(response.data);
     }).catch(e=>{console.log(e)})
  },
  getProductDetailById:(id,callback,error)=> { 
    api.get(`/product/detail/${id}`,{
    }).then(response=>{
      if(response.data)
        callback(response.data);
     }).catch(e=>{
       console.log(e); error();})
  },
  getProductSearchList:(formData,callback)=>{
    api.post(`/productSimpleInfo/shoplist/search`,formData,{
    }).then(response=>{
      if(response.data)
        callback(response.data);
     }).catch(e=>{console.log(e)})
  },
};

