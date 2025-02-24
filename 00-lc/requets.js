const http = axios.create({
  timeout: 1000 * system.ajaxTimeout, // 超时时间ms
  withCredentials: false, // 当前请求为跨域类型时是否在请求中协带cookie
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});
// 请求时的拦截
// 回调里面不能获取错误信息
http.interceptors.request.use(
  function (config) {
    // 发送请求之前做一些处理
    // console.log('请求url：' + config.url)
    // 处理无需超时的情况
    let data = config.data || {};
    let geetest = {};
    console.log(
      `=> axios请求【${config.url}】参数`,
      JSON.stringify(data, null, 2)
    );
    if (config.url.indexOf("uplus-auth/v1/login") !== -1) {
      geetest = {
        geetest_challenge: data.msgBody.challenge,
        geetest_validate: data.msgBody.validate,
        geetest_seccode: data.msgBody.seccode,
        geetest_status: "1",
      };
      delete data.msgBody.challenge;
      delete data.msgBody.validate;
      delete data.msgBody.seccode;
    }
    const reqId =
      "0000000000000000" +
      Date.parse(new Date()) +
      Math.floor(Math.random() * (999 - 100 + 1) + 100);
    data = JSON.stringify(
      Object.assign(data, {
        msgHead: {
          charSet: "UTF-8",
          versionID: "001",
          orgReceiverID: system.orgReceiverID,
          orgSenderID: system.orgSenderID,
          orgSendDate: dateUtil.getDate(new Date(), "long", ""),
          orgSendTime: dateUtil.getTime(new Date(), "long", ""),
          orgSendTransID: reqId,
          ...geetest,
        },
      })
    );
    let sign = encryptUtil.getSign(data);
    config.headers.post["X-Authorization"] = "SIGN-TYPE=SM3;SIGN=" + sign;
    config.headers.post["X-Token"] = store.getters.token || "";
    // config.headers.post['X-Menu-Id'] = config.permissionId || ''
    // delete config.permissionId
    // console.log('请求：', config)
    return config;
  },
  function (error) {
    // 当请求异常时做一些处理
    console.warn(t("msg.requestError") + ": " + JSON.stringify(error));
    return Promise.reject(error);
  }
);
