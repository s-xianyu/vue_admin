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
*车销客后台-车销客总汇
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
*检查管理-华币余额大于500超15天未消费
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
/*
*日常工作表-RFM模型
 */
export const  payRfmModelList = params => get(`${api}/admin/payRfmModel/getList.json`,params);
/*
*日常工作表充值检查
 */
export const getCheckRecharge = params => get(`${api}/admin/money/recharge/getCheckRecharge.json`,params);
/*
*日常工作表-未审核入账管理
 */
export const getNoCheckList = params => get(`${api}/admin/caiwuRuzhang/getNoCheckList.json`,params);
/*
*日常工作表-未审核充值检查
 */
export const getNoCheckRecharge = params => get(`${api}/admin/money/recharge/getNoCheckRecharge.json`,params);
/*
*日常工作表-操作过网上充值的用户-未处理（25）
 */
export const findPaymentUser = params => get(`${api}/admin/usercontact/findPaymentUser.json`,params);
/*
*日常工作表-操作过网上充值的用户-所有（25）
 */
export const findPaymentUserAll = params => get(`${api}/admin/usercontact/findPaymentUserAll.json`,params);
/*
*日常工作表-直充成功无归属客服表（0）
 */
export const findPaymentUserState0Mid0 = params => get(`${api}/admin/usercontact/findPaymentUserState0Mid0.json`,params);


/*
* 冻结华币管理-确认收入
 */
export const getMoney = params => get(`${api}/admin/caiwuConfirm/getMoney.json`,params);
/*
* 冻结华币管理-华币冻结
 */
export const getTcmoneyClearlogList = params => get(`${api}/admin/tcmoneyClearlog/getTcmoneyClearlogList.json`,params);
/*
* 冻结华币管理-华币冻结上传确认
 */
export const getTcmoneyConfimList = params => get(`${api}/admin/tcmoneyClearlog/getTcmoneyConfimList.json`,params);
/*
* 冻结华币管理-华币冻结需处理
 */
export const getClearMoney100List = params => get(`${api}/admin/tcmoneyClearlog/getClearMoney100List.json`,params);
/*
* 冻结华币管理-冻结华币未处理
 */
export const getOneMonthUntreat = params => get(`${api}/admin/tcmoneyClearlog/getOneMonthUntreat.json`,params);
/*
 *
 */
export const getOrgUserTree = params => get(`${api}/admin/rbac/user/getOrgUserTree.json`,params);

export const getTreeNodeListRole = params => get(`${api}/admin/rbac/role/getTreeNodeList.json`,params);

export const getTreeNodeListManager = params => get(`${api}/admin/manager/getTreeNodeList.json`,params);

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
