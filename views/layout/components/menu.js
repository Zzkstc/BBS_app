const menuComponents = {
  // 基本数据
  data: [
    {name: '阅读', icon: '', href: '../reading/index.html'},
    {name: '问答', icon: '', href: '../questions/index.html'},
    {name: '讲堂', icon: '', href: '../classroom/index.html'},
    {name: '发现', icon: '', href: '../found/index.html'},
    {name: '我的', icon: '', href: '../user/index.html'}
  ],
  // 初始化
  init: function () {
    this.render()
    this.click(this.data[0], $.el('.menu-item')[0])
  },
  // 渲染dom
  render: function () {
    const menuBox = $.el('.menu')[0]
    const _this = this
    this.data.forEach(function (item, index) {
      const node = document.createElement('li')
      node.className = 'menu-item'
      node.innerHTML = `
      <img src="${item.icon}">
      <span>${item.name}</span>
      `
      node.addEventListener('click', function () {
        _this.click(item, node)
      }, false)
      menuBox.appendChild(node)
    })
  },
  // 点击事件
  click: function (data, node) {
    // 修改iframe的src
    const iframe = $.el('.app-main')[0]
    iframe.src = data.href
    // 当前点击高亮
    const menuItem = $.el('.menu-item')
    menuItem.forEach(function (item) {
      item.className = 'menu-item'
    })
    node.className = 'active-menu menu-item'
  }
}

menuComponents.init()