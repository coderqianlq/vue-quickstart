export default {
  dateFormat: function(timestamp) {
    return new Date(parseInt(timestamp)).toLocaleString();
  },
  handleStatus: function(status) {
    return status == 1 ? "是" : "否";
  },
  handleBillMonth: function(billMonth) {
    return new Date(parseInt(billMonth)).toLocaleDateString().replace('/', '年').replace('/', '月') + '日';
  },
  handleAlipayRegistrationDatetime: function(alipayRegistrationDatetime) {
    return new Date(parseInt(alipayRegistrationDatetime)).toLocaleString().replace(/:\d{1,2}$/, ' ');
  },
  handleHuabeiStatus: function(huabeiStatus) {
    return huabeiStatus == 0 ? "未冻结" : "冻结";
  },
  handleType: function(callType, type) {
    if (type == 1) {
      if (callType == 3) {
        return '呼叫转移';
      }
      return callType == 1 ? '主叫' : '被叫';
    } else if (type == 2) {
      return callType == 1 ? '发送' : '接收';
    }
  },
  checkParams: function(merchantId, userId, name, idCard, mobile) {
    if(merchantId == "" && userId == "" && name == "" && idCard == "" && mobile == ""){
      return false;
    }
    return true;
  }
}
