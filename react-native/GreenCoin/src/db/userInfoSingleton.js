export default class CommonDataManager {

    static myInstance = null;

    _isLogin = false;
    _loginType = -1;
	_userId = "";
    _userName = "";
    _name = "";
	_autoLogin = "";
    _mem_phone = "";
    _bday = "";
    _email = "";
    _tok_name = "";

    _mem_notification = "";

    /**
     * @returns {CommonDataManager}
     */
    static getInstance() {
        if (CommonDataManager.myInstance == null) {
            CommonDataManager.myInstance = new CommonDataManager();
        }
     
        return this.myInstance;
    }

    updateFilterState(state){   
         this._benefit = state.benefit;
         this._sortType = state.sortType;
         this._price_min = state.price_min;
         this._price_max = state.price_max;
         this._sale_min = state.sale_min;
         this._sale_max = state.sale_max;
    }


    updateUserInfo(state){     
        this._userId = state.userId;
        this._userName = state.userName;
        this._name = state.name;
        this._autoLogin = state.autoLogin;
        this._isLogin = state.isLogin;
        this._gender =state.gender ? state.gender : "false";
        this._bday = state.bday ? state.bday : "";
        this._mem_phone = state.phone ? state.phone : "";
        this._email = state.email;
        this._mem_notification = state.mem_notification;
        this._tok_name = state.tok_name;
    }

    logout(){
        this._userId =  "";
        this._userName = "";
        this._name = "";
        this._autoLogin = false;
        this._isLogin = false;
        this._gender = "";
        this._bday =  "";
        this._mem_phone = "";
        this._mem_notification = "";
    }

    isLogin(){
        return this._isLogin;
    }

    getUserID() {
        return this._mem_id;
    }

    setUserID(id) {
        this._mem_id = id;
    }
}