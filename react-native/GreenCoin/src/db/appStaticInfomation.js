export default class appStaticInfomation {

    static myInstance = null;

    _area = null;
    _interest = null;
    _step = false;


    _categorieslist = [];
    _subCategoriesList = {};
    _loginBanner = [];
    _ptagList = {};
    _faqCatList = [];
    _faqlist = {};
    _token = "";
    _shipLimit = 0;
    _shipIsland = 0;
    _isTab = false;
    
    static getInstance() {
        if (appStaticInfomation.myInstance == null) {
            appStaticInfomation.myInstance = new appStaticInfomation();
        }
     
        return this.myInstance;
    }

    updateFaqList(faqlist){

        this._faqCatList = [];
        this._faqlist = {};

        faqlist.map((value)=>{
            if(this._faqlist[value.faq_cat_id]){
                this._faqlist[value.faq_cat_id].push(value);
            }
            else{
                this._faqCatList.push(value.faq_cat_id);
                this._faqlist[value.faq_cat_id] = [value];
            }
        })
    }

    updateFinCount(finCount){
        this._finCount = finCount;
    }

    updateToken(token){
        this._token = token;
    }
    
    updatePtag(ptagList){

        ptagList.map((value)=>{
            this._ptagList[value.ptag_id] = {src : value.ptag_img , height:value.ptag_height, width:value.ptag_width};
        })
    }

    updateCategorieslist(categorlist,subCategorlist){
        this._subCategoriesList = {};
        
        subCategorlist.map((value)=>{
            
            if(this._subCategoriesList[value.cat_id] == undefined)
                this._subCategoriesList[value.cat_id] = [];

            this._subCategoriesList[value.cat_id].push({
                brn_id : value.brn_id,
                cat_id : value.cat_id,
                brn_name : value.brn_name
            });
          });

        this._categorieslist = categorlist;

    }

 
}