import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import home from '@/components/home'
import investment from '@/components/investment'
import activity from '@/components/activity'
import account from '@/components/account'
import investmentDetail from '@/components/investment_detail'
import personalInformation from '@/components/admin/personal_information'
import investmentRecord from '@/components/admin/investment_record'
import capitalRecord from '@/components/admin/capital_record'
import coupon from '@/components/admin/coupon'
import bank from '@/components/admin/bank'
import property from '@/components/admin/property'
import changePayPass from '@/components/admin/changePayPass'
import feedback from '@/components/admin/feedback'
import recharge from '@/components/admin/recharge'
import withdraw from '@/components/admin/withdraw'
import withdraw_record from '@/components/admin/withdraw_record'
import recharge_record from '@/components/admin/recharge_record'
import addBank from '@/components/admin/addBank'
import agreement from '@/components/admin/agreement'
import projectDetail from '@/components/projectDetail'
import projectAgreement from '@/components/projectAgreement'
import projectRecord from '@/components/projectRecord'
import help from '@/components/help'
import media from '@/components/media'
import mediaDetail from '@/components/mediaDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/investment',
      name: 'investment',
      component: investment
    },
    {
      path: '/investment/detail/:id',
      name: 'investmentDetail',
      component: investmentDetail,
    },
    {
      path: '/activity',
      name: 'activity',
      component: activity
    },
    {
      path: '/account',
      name: 'account',
      component: account,
    },
    {
      path: '/account/personal',
      name: 'personalInformation',
      component: personalInformation
    },
    {
      path: '/account/investmentRecord',
      name: 'investmentRecord',
      component: investmentRecord
    },
    {
      path: '/account/capitalRecord',
      name: 'capitalRecord',
      component: capitalRecord
    },
    {
      path: '/account/coupon',
      name: 'coupon',
      component: coupon
    },
    {
      path: '/account/bank',
      name: 'bank',
      component: bank
    },
    {
      path: '/account/property',
      name: 'property',
      component: property
    },
    {
      path: '/changePayPass',
      name: 'changePayPass',
      component: changePayPass
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: feedback
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: recharge
    },
    {
      path: '/recharge/record',
      name: 'recharge_record',
      component: recharge_record
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: withdraw
    },
    {
      path: '/withdraw/record',
      name: 'withdraw_record',
      component: withdraw_record
    },
    {
      path: '/account/addBank',
      name: 'addBank',
      component: addBank
    },
    {
      path: '/project/detail',
      name: 'projectDetail',
      component: projectDetail
    },
    {
      path: '/project/agreement',
      name: 'projectAgreement',
      component: projectAgreement
    },
    {
      path: '/project/record',
      name: 'projectRecord',
      component: projectRecord
    },
    {
      path: '/help',
      name: 'help',
      component: help
    },
    {
      path: '/media',
      name: 'media',
      component: media
    },
    {
      path: '/media/detail/:id',
      name: 'mediaDetail',
      component: mediaDetail
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: agreement
    },
  ]
})
