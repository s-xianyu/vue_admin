import Vue from 'vue'
const ajax = Vue.prototype.$ajax;
const api = 'api';

/*
*左侧导航
 */
export const getUserTreeNodeList = params => get(`${api}/admin/backstage/admin/getUserTreeNodeList.json`,params);

/*
*登录
 */
export const login = (login_name,password) => {
  let params = {
    login_name,
    password
  };
  return get(`${api}/admin/backstage/gologin.do`,params);
};

/*
*当月综合排行
 */
// export const ContactCensusMonthSortlist = params => get(`${api}/admin/appIM/getAppUserNostar.json`,params);
export const ContactCensusMonthSortlist = params => get(`${api}/admin/contactcensusday/ContactCensusMonthSortlist.json`,params);

/*
*车销客总汇
 */
export const carManUserList = (value) => {
  let params = {
    'page.start':value.start,
    'page.limit':value.limit,
    'carManUser.company':value.company,
    'carManUser.mobile':value.mobile,
    'carManUser.hx_loginname':value.hx_loginname,
  };
  return get(`${api}/admin/carManUser/getList.json`,params);
};
/*
*华币余额大于500超15天未消费
*/
export const moneyfivehfifteennopay = params => get(`${api}/admin/usercontact/moneyfivehfifteennopay.json`,params);
/*
*获取客服人员名单
 */
export const getAllManagerList = params => get(`${api}/admin/manager/getAllManagerList.json`,params);
/*
*获取省份列表
 */
export const getProvince = () => get(`${api}/admin/sys/areacode/getProvince.json`);


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
  return new Promise((resolve, reject) =>{
    ajax.get(url, {
      params: params
    }).then(res => {
      resolve(res);
    }).catch(err =>{
      reject(err.data)
    })
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    ajax.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err =>{
        reject(err.data)
      })
  });
}
