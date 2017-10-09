// 获取时间类型
export function getTimeType(status) {
  switch (status)
  {
    case 0:
      return "个月";
    case 1:
      return "天";
    case 2:
      return "季度";
  }
  return "";
}

// 获取还款方式
export function getBackType(status) {
  switch (status)
  {
    case 1:
      return "等额本息";
    case 2:
      return "到期还本按月付息";
    case 3:
      return "到期还本息";
    case 4:
      return "按季度付息到期还本";
  }
  return "";
}

// 获取项目类型
export function getProjectType(status) {
  switch (status)
  {
    case 0:
      return "普通标";
    case 1:
      return "抵押标";
    case 2:
      return "活动标";
    case 3:
      return "新手标";
    case 4:
      return "聚票盆";
    case 5:
      return "供应链";
    case 6:
      return "供应链";
    case 7:
      return "供应链";
}
  return "";
}

// MoldType码表
export function getMoldType(status) {
  switch (status)
  {
    case 0:
      return "icon_mobile.png";
    case 1:
      return "icon_mobile.png";
    case 2:
      return "icon_mobile.png";
    case 3:
      return "icon_mobile.png";
    case 4:
      return "icon_mobile.png";
  }
  return "";
}

// 优惠券状态码
export function getCouponType(status) {
  switch (status)
  {
    case 0:
      return "btnBg.png";
    case 1:
      return "btnBg2.png";
    case 2:
      return "btnBg3.png";
    case 3:
      return "btnBg2.png";
  }
  return "";
}

// 优惠券状态码
export function getCouponString(status) {
  switch (status)
  {
    case 0:
      return "立即使用";
    case 1:
      return "已使用";
    case 2:
      return "未完成";
    case 3:
      return "已过期";
  }
  return "";
}

// 银行卡码表
export function getBankUrl(bankStr) {
  switch (bankStr)
  {
    case "ABC":
      return "ABC.png";
    case "BCCB":
      return "BCCB.png";
    case "BJRCB":
      return "BJRCB.png";
    case "BOC":
      return "BOC.png";
    case "BOS":
      return "BOS.png";
    case "CBHB":
      return "CBHB.png";
    case "CCB":
      return "CCB.png";
    case "CCQTGB":
      return "CCQTGB.png";
    case "CEB":
      return "CEB.png";
    case "CIB":
      return "CIB.png";
    case "CITIC":
      return "CITIC.png";
    case "CMB":
      return "CMB.png";
    case "CMBC":
      return "CMBC.png";
    case "COMM":
      return "COMM.png";
    case "CSCB":
      return "CSCB.png";
    case "CZB":
      return "CZB.png";

    case "CZCB":
      return "CZCB.png";
    case "GDB":
      return "GDB.png";
    case "GNXS":
      return "GNXS.png";
    case "GZCB":
      return "GZCB.png";
    case "HCCB":
      return "HCCB.png";
    case "HKBCHINA":
      return "HKBCHINA.png";
    case "HSBANK":
      return "HSBANK.png";
    case "HXB":
      return "HXB.png";
    case "ICBC":
      return "ICBC.png";
    case "NBCB":
      return "NBCB.png";
    case "NJCB":
      return "NJCB.png";
    case "PSBC":
      return "PSBC.png";
    case "SHRCB":
      return "SHRCB.png";
    case "SNXS":
      return "SNXS.png";
    case "SPDB":
      return "SPDB.png";
    case "SXJS":
      return "SXJS.png";
    case "SZPAB":
      return "SZPAB.png";
    case "UPOP":
      return "UPOP.png";
    case "WZCB":
      return "WZCB.png";
  }
  return "";
}

// 银行卡码表
export function getBankCode(bankStr) {
  switch (bankStr)
  {
    case "农业银行":
      return "ABC";
    case "北京银行":
      return "BCCB";
    case "北京农商行":
      return "BJRCB";
    case "中国银行":
      return "BOC";
    case "上海银行":
      return "BOS";
    case "渤海银行":
      return "CBHB";
    case "建设银行":
      return "CCB";
    case "重庆三峡银行":
      return "CCQTGB";
    case "光大银行":
      return "CEB";
    case "兴业银行":
      return "CIB";
    case "中信银行":
      return "CITIC";
    case "招商银行":
      return "CMB";
    case "民生银行":
      return "CMBC";
    case "交通银行":
      return "COMM";
    case "长沙银行":
      return "CSCB";
    case "浙商银行":
      return "CZB";

    case "浙江稠州商业银行":
      return "CZCB";
    case "广东发展银行":
      return "GDB";
    case "广州市农信社":
      return "GNXS";
    case "广州市商业银行":
      return "GZCB";
    case "杭州银行":
      return "HCCB";
    case "汉口银行":
      return "HKBCHINA";
    case "徽商银行":
      return "HSBANK";
    case "华夏银行":
      return "HXB";
    case "工商银行":
      return "ICBC";
    case "宁波银行":
      return "NBCB";
    case "南京银行":
      return "NJCB";
    case "中国邮储银行":
      return "PSBC";
    case "上海农村商业银行":
      return "SHRCB";
    case "深圳农村商业银行":
      return "SNXS";
    case "浦东发展银行":
      return "SPDB";
    case "晋城市商业银行":
      return "SXJS";
    case "平安银行":
      return "SZPAB";
    case "银联在线支付":
      return "UPOP";
    case "温州市商业银行":
      return "WZCB";
  }
  return "";
}
