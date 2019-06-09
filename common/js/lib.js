const $ = {
  el: function (str) {
    return document.querySelectorAll(str)
  },
  serialize: function(obj) {
    let str = []
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
      }
    }
    return str.join('&')
  },
  ajax: function (obj) {
    let xhr, openUrl, sendData
    // 为get请求并且参数不为空的时候，访问的url为参数拼接
    openUrl = obj.type.toLowerCase() === 'get' && this.serialize(obj.data) ? obj.url + '?' + this.serialize(obj.data) : obj.url
    // 为get请求时，不需要发送参数
    sendData = obj.type.toLowerCase() === 'get' ? '' : JSON.stringify(obj.data)
    // 在不同浏览器下的xhr构造
    if (window.XMLHttpRequest) {
      // code for IE7, Firefox, Opera, etc.
      xhr = new XMLHttpRequest()
    } else if (window.ActiveXObject) {
      // code for IE6, IE5
      xhr = new ActiveXObject("Microsoft.XMLHTTP")
    }
    // 三个参数，请求类型，请求路径，是否异步
    xhr.open(obj.type, openUrl, obj.async || true)
    //发送合适的请求头信息
    xhr.setRequestHeader('Content-type', obj.contentType)
    // 发送的数据
    xhr.send(sendData)
    // 监听请求状态的改变
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          obj.success(xhr.response)
        } else {
          obj.error(xhr)
        }
      }
    }
  }
}