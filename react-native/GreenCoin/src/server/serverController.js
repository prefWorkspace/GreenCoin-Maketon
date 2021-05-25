const ip = "http://api.checkmyactivity.com";

const api = {
  connectFetchController : async (path,method,body,callBack,errorCallBack) =>{

      return fetch(`${ip}${path}`, {
        credentials:'include',
        method: method,
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:body?body:null,
      }).then(function(res) {
        return res.json();
      }).then(function(data) {
          callBack(data);
        return data;
      }).catch(function(e){
        if(errorCallBack)
          errorCallBack(e);
      });
    },
}

export default api; 