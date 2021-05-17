export default class CommonDataManager {

    static myInstance = null;

    _isLogin = false;
    _loginType = -1;
	_userId = "";
    _userName = "";
    _name = "";
	_userPassword = "";
	_autoLogin = "";
    _register_date = "";
    _mem_phone = "";
    _gender = "";
    _bday = "";
    _height ="";
    _weight ="";
    _email = "";
    _mem_refund_bank = "";
    _mem_refund_account = "";
    _refund_name = "";
    _tok_name = "";

    _mem_notification = "";
    _mem_notification_event = "";

    _benefit= "";
    _sortType= "";
    _price_min ="";
    _price_max ="";
    _sale_min = "";
    _sale_max ="";

    _point = 0;
    _coupon = 0;
    _cartCount = 0;

    _currentAddress = {};
    /**
     * @returns {CommonDataManager}
     */
    static getInstance() {
        if (CommonDataManager.myInstance == null) {
            CommonDataManager.myInstance = new CommonDataManager();
        }
     
        return this.myInstance;
    }

    updateCartCount(count){
        this._cartCount = count;
    }

    updatePointAndCoupon(state){
        this._point = state.point;
        this._coupon = state.coupon;
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
        this._height =  state.height ? state.height : "";
        this._weight =  state.weight ? state.weight : "";
        this._mem_phone = state.phone ? state.phone : "";
        this._loginType = state.mem_method;
        this._email = state.email;
        this._mem_refund_bank = state.mem_refund_bank;
        this._mem_refund_account = state.mem_refund_account;
        this._refund_name = state.refund_name;
        this._mem_notification = state.mem_notification;
        this._mem_notification_event = state.mem_notification_event;
        this._tok_name = state.tok_name;

    }

    logout(){
        this._userId =  "";
        this._userName = "";
        this._name = "";
        this._userPassword = "";
        this._autoLogin = false;
        this._isLogin = false;
        this._gender = "";
        this._bday =  "";
        this._height =  "";
        this._weight =  "";
        this._mem_phone = "";
        this._loginType = -1;
        this._mem_notification = "";
        this._mem_notification_event = "";
        this._point = 0;
        this._coupon = 0;
        this._cartCount = 0;
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