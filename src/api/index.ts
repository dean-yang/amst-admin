const api = {
    login:'/login',
    // 一级分类
    getfirstClassification:'/firstClassification/get',
    setfirstClassification:'/firstClassification/set',
    deletefirstClassification:'/firstClassification/delete',
    updatefirstClassification:'/firstClassification/update',

    // banner
    getbanner:'/banner/get',
    setbanner:'/banner/set',
    updatebanner:'/banner/update',
    deletebanner:'/banner/delete',

    // 二级产品
    setsecondClassification:'/secondClassification/set',
    getsecondClassification:'/secondClassification/get',
    deletesecondClassification:'/secondClassification/delete',
    updatesecondClassification:'/secondClassification/update',


    // 精选
    setcarefullyChosen:'/carefullyChosen/set',
    getcarefullyChosen:'/carefullyChosen/get',
    updatecarefullyChosen:'/carefullyChosen/update',
    deletecarefullyChosen:'/carefullyChosen/delete',


    // 换季清洗
    setchangeSeasonClean:'/changeSeasonClean/set',
    getchangeSeasonClean:'/changeSeasonClean/get',
    updatechangeSeasonClean:'/changeSeasonClean/update',
    deletechangeSeasonClean:'/changeSeasonClean/delete',

}
export default api