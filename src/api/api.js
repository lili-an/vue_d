import axios from 'axios'
import qs from 'qs'

import {encrypt,decrypt} from '../util/tool'

// axios 配置
axios.defaults.timeout = 8000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = true
//本地环境
axios.defaults.baseURL = 'http://192.168.2.224:8080/p2p/app/'	
// 生产环境

export function fetch(method, url, params) {
    return new Promise((resolve, reject) => {
        switch (method){ 
            case 'post' :
                axios.post(url, encrypt(params))
                    .then(response => {
                        var str= JSON.parse(decrypt(response.data));
                        resolve(str);
                        // resolve(response.data);
                    }, err => {
                        reject(err);
                    })
                    .catch((error) => {
                        reject(error)
                })
                break;
            case 'get' :
                axios.get(url)
                    .then(response => {
                        resolve(response.data);
                    }, err => {
                        reject(err);
                    })
                    .catch((error) => {
                        reject(error)
                })
                break;  
            default : 
                Message.error('method出错！');
                break; 
        }     
    })
}

export default {
    /**
     * banner获取
     */
    Banner(params) {
        return fetch('post','content/banner', params)
    },
    /**
     * 用户登录
     */
    Login(params) {
        return fetch('post','user/login', params)
    },
    /**
     * 用户注册
     */
    Register(params) {
        return fetch('post','user/register', params)
    },
    /**
     * 发送手机验证码
     */
    RegisterCode(params) {
         return fetch('post','user/registerCode', params)
    },
     /**
     *  验证注册手机号
     */
    Validate(params) {
        return fetch('post', 'user/validate', params)
    },
    /**
     *  忘记密码 1、账号验证
     */
    CheckPassword(params) {
        return fetch('post', 'user/forget/check', params)
    },
     /**
     *  忘记密码 2、设置新密码
     */
    SetPassword(params) {
        return fetch('post', 'user/forget/pwd', params)
    },
    /**
     *  获取用户资金
     */
    GetUserMoney(params) {
        return fetch('post','assets/user', params);
    },
    /**
     * 获取项目列表
     */
    ProtectList(params) {
        return fetch('post', 'project/list', params);
    },
     /**
     * 获取项目详情
     */
    ProtectDetail(params) {
        return fetch('post', 'project/detail', params);
    },
    /**
     * 充值列表
     */
    RechargeList(params) {
       return fetch('post', '/assets/rechargelist', params);
    },
    /**
     * 充值
     */
    Recharge(params) {
       return fetch('post', 'assets/recharge', params);
    },
    /**
     * 提现列表
     */
    WithdrawList(params) {
        return fetch('post','assets/cashlist',params);
    },
    /**
     * 提现
     */
    Withdraw(params) {
        return fetch('post','assets/cash',params);
    },
    /**
     * 银行卡
     */
    Bank(params) {
      return fetch('post','assets/bank',params);
    },
    /**
     * 绑定银行卡
     */
    AddBank(params) {
      return fetch('post','assets/bindbank',params);  
    },
    /**
     * 解绑银行卡
     */
    DeleteBank(params) {
      return fetch('post','assets/delbank',params);  
    },
    /**
     * 实名认证
     */
    Real(params) {
      return fetch('post','user/real',params);
    },
    /**
     * 用户已投资列表
     */
    UserOrder(params) {
      return fetch('post','project/userorder',params);
    },
    /**
     * 修改登录密码
     */
    ChangePassword(params) {
      return fetch('post','user/changepass',params);
    },
    /**
     * 修改支付密码
     */
    ChangePayPass(params) {
      return fetch('post','user/changepaypass',params);
    },
    /**
     * 我要投资
     */
    Order(params) {
      return fetch('post','project/order',params);
    },
    /**
     * 优惠券
     */
    Coupon(params) {
      return fetch('post','project/award',params);
    },
    /**
     * 资金记录
     */
    BillList(params) {
      return fetch('post','assets/billlist',params);
    },
    /**
     * 用户反馈
     */
    Feedback(params) {
      return fetch('post','user/back',params);
    },
    /**
     * 帮助中心
     */
    Article(params) {
      return fetch('post','article/list',params);
    },
    /**
     * 帮助中心
     */
    articleDetail(params) {
      return fetch('post','/article/detail',params);
    }
} 