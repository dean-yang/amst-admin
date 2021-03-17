const api = {

    adress:'http://47.108.200.61:3000/admin', // ip地址
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

}
export default api