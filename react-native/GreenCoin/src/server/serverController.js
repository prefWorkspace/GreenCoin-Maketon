const ip = "http://api.checkmyactivity.com";

const api = {
  connectFetchController : async (path,method,body,callBack,errorCallBack,isJson) =>{

      return fetch(`${ip}${path}`, {
        credentials:'include',
        method: method,
        headers:  { 'Content-Type': 'application/json'},
        body:body?body:null,
      }).then(function(res) {
        return res.json();
      }).then(function(data) {
          callBack(data);
        return data;
      }).catch(function(e){
        console.log(e);
        if(errorCallBack)
          errorCallBack(e);
      });
    },

    insertFilePostFetchController : (path,body,callBack,errorCallBack) =>{
      fetch(`${ip}${path}`, {
        credentials:'include',
        method: 'post',
        body: body,
        // mode: 'cors'
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        callBack(data);
      }).catch(function(e){
        console.log(e);
        if(errorCallBack)
          errorCallBack(e);
      });
    },

}

export default api; 