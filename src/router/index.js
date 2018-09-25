import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index/index.vue'
import User from '../views/User/index.vue'
import SaveDecision from '../views/Decision/SaveDecision/index.vue'
import QueryDecision from '../views/Decision/QueryDecision/index.vue'
import SaveCreative from '../views/Creative/SaveCreative/index.vue'
import MyCreative from '../views/Creative/MyCreative/index.vue'
import CreativeList from '../views/Creative/CreativeList/index.vue'
import CreativeDetails from '../views/Creative/CreativeDetails/index.vue'
import Remind from '../views/Creative/Remind/index.vue'
import Over from '../views/Over/index.vue'
import DecisionDetails from '../views/Decision/DecisionDetails/index.vue'
import BindUser from '../views/BindUser/index.vue'
import ReviewList from '../views/Creative/ReviewList/index.vue'
import OverInfo from '../views/OverInfo/index.vue'
import OverList from '../views/OverList/index.vue'
import ReviewDicyList from '../views/Creative/ReviewDicyList/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta:{
        title:'首页'
      }
    },
    {
      path: '/User',
      name: 'User',
      component: User,
      meta:{
        title:'我的'
      }
    },
    {
      path: '/SaveDecision',
      name: 'SaveDecision',
      component: SaveDecision,
      meta:{
        title:'发起决策'
      }
    },
    {
      path: '/BindUser',
      name: 'BindUser',
      component: BindUser,
      meta:{
        title:'用户绑定'
      }
    },
    {
      path: '/QueryDecision',
      name: 'QueryDecision',
      component: QueryDecision,
      meta:{
        title:'我的决策'
      }
    },
    {
      path: '/DecisionDetails',
      name: 'DecisionDetails',
      component: DecisionDetails,
      meta:{
        title:'决策信息'
      }
    },
    {
      path: '/SaveCreative',
      name: 'SaveCreative',
      component: SaveCreative,
      meta:{
        title:'发起创意提案'
      }
    },
    {
      path: '/CreativeList',
      name: 'CreativeList',
      component: CreativeList,
      meta:{
        title:'发起提案'
      }
    },
    {
      path: '/MyCreative',
      name: 'MyCreative',
      component: MyCreative,
      meta:{
        title:'我的提案'
      }
    },
    {
      path: '/CreativeDetails',
      name: 'CreativeDetails',
      component: CreativeDetails,
      meta:{
        title:'提案详情'
      }
    },
    {
      path: '/Over',
      name: 'Over',
      component: Over,
      meta:{
        title:'结案'
      }
    },
    {
      path:'/OverInfo',
      name:'OverInfo',
      component:OverInfo,
      mate:{
        title:"决策明细"
      }
    },
    {
      path:'/OverList',
      name:'OverList',
      component:OverList,
      mate:{
        title:'结案信息'
      }
    },
    {
      path: '/Remind',
      name: 'Remind',
      component: Remind,
      meta:{
        title:'提案提醒'
      }
    },
    {
      path: '/ReviewList',
      name: 'ReviewList',
      component: ReviewList,
      meta:{
        title:'创意评审'
      }
    },
    {
      path: '/ReviewDicyList',
      name: 'ReviewDicyList',
      component: ReviewDicyList,
      meta:{
        title:'创意评审'
      }
    }
  ]
})
