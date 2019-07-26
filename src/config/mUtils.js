import Vue from 'vue'
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
};

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
};


/**
 * 获取cookie
 */
export const getCookie = name => {
  let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)){
    return unescape(arr[2]);
  }else{
    return null;
  }
};
/**
 * 删除cookie
 */
export const delCookie = name => {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cval=getCookie(name);
  if(cval!=null){
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
  }
};

export const setCookie = (name,value) => {
  let Days = 30;
  let exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
};


/**
 * 字符窜转时间
 * 传值方式： YYYY-MM-DD HH:mm:ss -->2019-07-03 15:00:00
 * 传值方式： YYYY-MM-DD -->2019-07-03
 */
let forTime = (formater,t) =>{
  let date = t ? new Date(t) : '';
  if(date){
    let Y = date.getFullYear() + '',
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
      return formater.replace(/YYYY|yyyy/g,Y)
        .replace(/YY|yy/g,Y.substr(2,2))
        .replace(/MM/g,(M<10?'0':'') + M)
        .replace(/DD/g,(D<10?'0':'') + D)
        .replace(/HH|hh/g,(H<10?'0':'') + H)
        .replace(/mm/g,(m<10?'0':'') + m)
        .replace(/ss/g,(s<10?'0':'') + s)
  }else{
    return '';
  }
};
Vue.prototype.$forTime = forTime;
