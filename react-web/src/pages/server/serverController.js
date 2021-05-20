const ip = "http://api.checkmyactivity.com/";

const api = {
    connectFetchController : async (path,method,body,callBack,errorCallBack) =>{
     return fetch(`${ip}${path}`, {
        credentials:'include',
        method: method,
      //   headers: {
      //     'Authorization' : `Bearer ${jwtToken}`,
      //     'Connection' : 'keep-alive',
      // },
        body:body?body:null,
      }).then(function(res) {
        return res.json();
      }).then(function(data) {
        if(callBack)
          callBack(data);
        return data;
      }).catch(function(e){
        console.log(e);
        if(errorCallBack)
          errorCallBack(e);
      });
    }
}

export default api;