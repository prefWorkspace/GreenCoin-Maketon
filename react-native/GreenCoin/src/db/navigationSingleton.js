export default class navigationSingleton {

    static myInstance = null;

    _screenList = [];
    
    static getInstance() {
        if (navigationSingleton.myInstance == null) {
            navigationSingleton.myInstance = new navigationSingleton();
        }
     
        return this.myInstance;
    }

    getScreen(){
        return this._screenList.pop();
    }

    insertRouteScreen(routeName){
        var last = this._screenList.pop();
        if(last && last != routeName){
            this._screenList.push(last);
            this._screenList.push(routeName);
        }
        else
            this._screenList.push(routeName);
    }

 
}