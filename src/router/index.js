import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import {
  index,
  login,
  home,
  password,
  // 车销客
  CarManUserGridPanel,
  // 日常工作表
  PayRfmModelTabPanel,
  RechargeCheckPanel,
  CaiwuRuzhangNoCheckGridPanel,
  RechargeNoCheckPanel,
  PaymentUserTabPanel,
  // 车辆撮合
  CarModuleInterfaceTabPanel,
  CarRequireChuJiaGridPanel,
  CarRequireChuJiaTwoGridPanel,
  CarRequireCountTabPanel,
  CarRequireNoContactGridPanel,
  PersonalAssitantTabPanel,
  // 群管理
  GroupCarRecordGridPanel,
  GroupMoneyCostStatisticsGridPanel,
  GroupMoneyCostRecordGridPanel,
  GroupAssistantStatisticsGridPanel,
  ContactUserBigUserGridPanel,
  AppSearchRequireGridPanel,
  YkjCarGridPanel,
  ContactUserSaleTypeTabPanel,
  AppUserGroupGridPanel,
  SirenzhuliTabPanel,
  GroupFinanceTabPanel,
  SubscribeGridPanel,
  GroupMobileTabPanel,
  SirenzhuliByManagerGridPanel,
  GroupMoneyCostTabPanel,
  BargJdCheckGridPanel,
  GroupMoneyRechargeTabPanel,
  SuperUserStatisticsTabPanel,
  GroupRecordTabPanel,
  GroupCountGridPanel,
  YkjContactPaiHangGridPanel,
  RefundCheckGridPanel,

  // 冻结华币管理
  TcmoneyClearlogConfirmGridPanel,
  TcmoneyClearlogHb100GridPanel,
  TcmoneyClearlogUntreatTabPanel,
  CaiwuConfirmMoneyFormPanel,
  TcmoneyClearlogGridPanel,

  //人员角色管理
  UserRolePanel,
  RolePermitionPanel,
  PermitionMenuPanel,
  MenutreePanel,
  UserCommentGridPanel,
  ManagerGridPanel,

  MoneyFiveHFifteenNopayUserGridPanel
} from "./router";

export default new Router({
  linkActiveClass: 'action',
  linkExactActiveClass: '',
  mode: 'history',
  routes: [
    {path: '/', redirect: '/index', name: ['默认']},
    {path: '/login', component: login, name: ['登录']},
    {path: '/password', component: password, name: ['用户'], meta: {requireAuth: true}},
    {
      path: '/index',
      component: index,
      name: [],
      meta: {requireAuth: true},
      children:[
        {
          path:'/',
          component:home,
          name:'',
        },
        {
          path:'/CarManUserGridPanel1214',
          component:CarManUserGridPanel,
          name:[' 车逍客后台','车逍客总汇'],
        },
        {
          path:'/PayRfmModelTabPanel653',
          component:PayRfmModelTabPanel,
          name:[' 日常工作表','REM模型'],
        },
        {
          path:'/RechargeCheckPanel653',
          component:RechargeCheckPanel,
          name:[' 日常工作表','充值检查'],
        },
        {
          path:'/CaiwuRuzhangNoCheckGridPanel653',
          component:CaiwuRuzhangNoCheckGridPanel,
          name:[' 日常工作表','未审核入账管理'],
        },
        {
          path:'/RechargeNoCheckPanel653',
          component:RechargeNoCheckPanel,
          name:[' 日常工作表','未审核充值检查'],
        },
        {
          path:'/PaymentUserTabPanel653',
          component:PaymentUserTabPanel,
          name:[' 日常工作表','操作网上充值成功用户'],
        },
        {
          path:'/CarModuleInterfaceTabPanel756',
          component:CarModuleInterfaceTabPanel,
          name:[' 车辆撮合','华夏服务统计'],
        },
        {
          path:'/CarRequireChuJiaGridPanel756',
          component:CarRequireChuJiaGridPanel,
          name:[' 车辆撮合','联系卖家批发'],
        },
        {
          path:'/CarRequireChuJiaTwoGridPanel756',
          component:CarRequireChuJiaTwoGridPanel,
          name:[' 车辆撮合','出价撮合'],
        },
        {
          path:'/CarRequireCountTabPanel756',
          component:CarRequireCountTabPanel,
          name:[' 车辆撮合','出价统计'],
        },
        {
          path:'/CarRequireNoContactGridPanel756',
          component:CarRequireNoContactGridPanel,
          name:[' 车辆撮合','电话未接通'],
        },
        {
          path:'/PersonalAssitantTabPanel756',
          component:PersonalAssitantTabPanel,
          name:[' 车辆撮合','私人助理（新）'],
        },
        {
          path:'/GroupCarRecordGridPanel784',
          component:GroupCarRecordGridPanel,
          name:[' 群管理','群内交易跟踪'],
        },
        {
          path:'/GroupMoneyCostStatisticsGridPanel784',
          component:GroupMoneyCostStatisticsGridPanel,
          name:[' 群管理','群消费月度记录'],
        },
        {
          path:'/GroupMoneyCostRecordGridPanel784',
          component:GroupMoneyCostRecordGridPanel,
          name:[' 群管理','群消费日记录'],
        },
        {
          path:'/GroupAssistantStatisticsGridPanel784',
          component:GroupAssistantStatisticsGridPanel,
          name:[' 群管理','群助数据'],
        },
        {
          path:'/ContactUserBigUserGridPanel784',
          component:ContactUserBigUserGridPanel,
          name:[' 群管理','大客户'],
        },
        {
          path:'/AppSearchRequireGridPanel784',
          component:AppSearchRequireGridPanel,
          name:[' 群管理','app条件订阅'],
        },
        {
          path:'/YkjCarGridPanel784',
          component:YkjCarGridPanel,
          name:[' 群管理','一口价车辆管理'],
        },
        {
          path:'/ContactUserSaleTypeTabPanel784',
          component:ContactUserSaleTypeTabPanel,
          name:[' 群管理','零售 和零售与批发用户'],
        },
        {
          path:'/AppUserGroupGridPanel784',
          component:AppUserGroupGridPanel,
          name:[' 群管理','群管理'],
        },
        {
          path:'/SirenzhuliTabPanel784',
          component:SirenzhuliTabPanel,
          name:[' 群管理','私人助理'],
        },
        {
          path:'/GroupFinanceTabPanel784',
          component:GroupFinanceTabPanel,
          name:[' 群管理','群员账户'],
        },
        {
          path:'/SubscribeGridPanel784',
          component:SubscribeGridPanel,
          name:[' 群管理','推送记录'],
        },
        {
          path:'/GroupMobileTabPanel784',
          component:GroupMobileTabPanel,
          name:[' 群管理','群成员'],
        },
        {
          path:'/SirenzhuliByManagerGridPanel784',
          component:SirenzhuliByManagerGridPanel,
          name:[' 群管理','客服私人助理'],
        },
        {
          path:'/GroupMoneyCostTabPanel784',
          component:GroupMoneyCostTabPanel,
          name:[' 群管理','群成员消费记录'],
        },
        {
          path:'/BargJdCheckGridPanel784',
          component:BargJdCheckGridPanel,
          name:[' 群管理','交易金解冻审核'],
        },
        {
          path:'/GroupMoneyRechargeTabPanel784',
          component:GroupMoneyRechargeTabPanel,
          name:[' 群管理','群成员充值记录'],
        },
        {
          path:'/SuperUserStatisticsTabPanel784',
          component:SuperUserStatisticsTabPanel,
          name:[' 群管理','超级用户'],
        },
        {
          path:'/GroupRecordTabPanel784',
          component:GroupRecordTabPanel,
          name:[' 群管理','群成交记录'],
        },
        {
          path:'/GroupCountGridPanel784',
          component:GroupCountGridPanel,
          name:[' 群管理','群财务统计'],
        },
        {
          path:'/YkjContactPaiHangGridPanel784',
          component:YkjContactPaiHangGridPanel,
          name:[' 群管理','车辆交易统计'],
        },
        {
          path:'/RefundCheckGridPanel784',
          component:RefundCheckGridPanel,
          name:[' 群管理','退保审核'],
        },
        {
          path:'/TcmoneyClearlogConfirmGridPanel824',
          component:TcmoneyClearlogConfirmGridPanel,
          name:[' 冻结华币管理','华币冻结上传确认'],
        },
        {
          path:'/TcmoneyClearlogHb100GridPanel824',
          component:TcmoneyClearlogHb100GridPanel,
          name:[' 冻结华币管理','华币冻结需处理'],
        },
        {
          path:'/TcmoneyClearlogUntreatTabPanel824',
          component:TcmoneyClearlogUntreatTabPanel,
          name:[' 冻结华币管理','冻结华币未处理'],
        },
        {
          path:'/CaiwuConfirmMoneyFormPanel824',
          component:CaiwuConfirmMoneyFormPanel,
          name:[' 冻结华币管理','确认收入'],
        },
        {
          path:'/TcmoneyClearlogGridPanel824',
          component:TcmoneyClearlogGridPanel,
          name:[' 冻结华币管理','华币冻结'],
        },
        {
          path:'/UserRolePanel22',
          component:UserRolePanel,
          name:[' 人员角色管理','人员管理'],
        },
        {
          path:'/RolePermitionPanel22',
          component:RolePermitionPanel,
          name:[' 人员角色管理','角色管理'],
        },
        {
          path:'/PermitionMenuPanel22',
          component:PermitionMenuPanel,
          name:[' 人员角色管理','权限管理'],
        },
        {
          path:'/MenutreePanel22',
          component:MenutreePanel,
          name:[' 人员角色管理','菜单管理'],
        },
        {
          path:'/UserCommentGridPanel47',
          component:UserCommentGridPanel,
          name:[' 人员角色管理','留言管理'],
        },
        {
          path:'/ManagerGridPanel47',
          component:ManagerGridPanel,
          name:[' 人员角色管理','客服经理管理'],
        },
        {
          path:'/MoneyFiveHFifteenNopayUserGridPanel1330',
          component:MoneyFiveHFifteenNopayUserGridPanel,
          name:[' 检查管理','华币余额大于500超15天未消费'],
        }
      ]
    },
  ]
})
