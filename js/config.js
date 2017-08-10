const  BASEURL='http://118.178.224.224/appsrv';
//http://118.178.224.224:6080/appsrv/cateInfo.action?homeType=CTHOME&pageno=2&prdName=
export default{
    BASEURL,
    LOGIN:BASEURL+'/sysLogin.action?appLogin=&userLogin=',
    HOMEGOODS:BASEURL+'/cateInfo.action?homeType=CTHOME',
    SETTIME:BASEURL+'/cateInfo.action?homeType=CTLIMIT',
    ClASSIFY:BASEURL+'/homeInfo.action?homeType=FF',
    MEAL:BASEURL+'/shoppingAction.action?meatInfo=',
    MEALD:BASEURL+'/shoppingAction.action?meatDetInfo=&gcollIds=',
    REGISTER:BASEURL+'/sysLogin.action?appUserRegister=',
    CLIVE:BASEURL+'/shoppingCardAction.action?guestGood=&pinfoId=',
    ADDCART:BASEURL+'/shoppingCardAction.action?homeType=NEW&pinfoId=',
    CARTSHOPING:BASEURL+'/shoppingCardAction.action?pinfoId=',
    CWCATCLASS:BASEURL+'/shoppingAction.action?catClassInfo=',
    ZLCATCLASS:BASEURL+'/shoppingAction.action?zlClassInfo==',
    LYCATCLASS:BASEURL+'/shoppingAction.action?lyClassInfo=',
    YPCATCLASS:BASEURL+'/shoppingAction.action?ypClassInfo=',
    ORDER:BASEURL+'/orderAction.action?createOrder=&pinfoId=',
   BROWERORDER:BASEURL+'/orderAction.action?browerOrder=&pinfoId=',
    ADDADDREE:BASEURL+'/app/baseDataAction.action?addrInfo=&dataType=NEW&pinfoId=',
    UPDATEADDREE:BASEURL+'/app/baseDataAction.action?addrInfo=&dataType=UPDATE&pinfoId=',
    SHOWADDREE:BASEURL+'/app/baseDataAction.action?addrInfo=&pinfoId=',
    PRODUCTDETAIL:BASEURL+'/cateInfo.action?homeType=CTSING&prdIds=',
    MYORDER:BASEURL+'/orderAction.action?myOrder=&pinfoId=',
    REMOVE:BASEURL+'/orderAction.action?dealOrder=&homeType=DEL&pinfoId=',
    REMOVEORDER:BASEURL+'/orderAction.action?dealOrder=&homeType=CANCEL&pinfoId=',
    MYPET:BASEURL+'/app/baseDataAction.action?carInfo=&pinfoIds=',
    kindList:[{"ptyIds":1,"ptyCd":"FZ","ptyName":"女装","ptyImg":"/appimage/kind_1.png","ptyFlag":"Y"},{"ptyIds":2,"ptyCd":"MZ","ptyName":"男装","ptyImg":"/appimage/kind_2.png","ptyFlag":"Y"},{"ptyIds":3,"ptyCd":"TZ","ptyName":"美装","ptyImg":"/appimage/kind_3.png","ptyFlag":"Y"},{"ptyIds":4,"ptyCd":"PX","ptyName":"配饰","ptyImg":"/appimage/kind_4.png","ptyFlag":"Y"},{"ptyIds":5,"ptyCd":"XP","ptyName":"鞋品","ptyImg":"/appimage/kind_5.png","ptyFlag":"Y"},{"ptyIds":6,"ptyCd":"XB","ptyName":"箱包","ptyImg":"/appimage/kind_6.png","ptyFlag":"Y"},{"ptyIds":7,"ptyCd":"JJ","ptyName":"居家","ptyImg":"/appimage/kind_7.png","ptyFlag":"Y"},{"ptyIds":8,"ptyCd":"MY","ptyName":"美食","ptyImg":"/appimage/kind_8.png","ptyFlag":"Y"},{"ptyIds":9,"ptyCd":"SM","ptyName":"数码","ptyImg":"/appimage/kind_9.png","ptyFlag":"Y"},{"ptyIds":10,"ptyCd":"OT","ptyName":"其它","ptyImg":"/appimage/kind_10.png","ptyFlag":"Y"}],
     Regs:{
        isEmail:"^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
    } 

}

// prdType分类：CW-宠物/ZL-主粮/LY-零食/YP-日用品/TC-套餐;
// subPrdType代表四类，默认A->按时间倒顺,价格C大到小,人气D销量大到小。
// 实现商品名称检索条件