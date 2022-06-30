# 多数据库支持

## 文件配置
在配置文件中新增`db-list`选项
db-list是文件中`mysql`与`pymysql`的一个超集,为了兼容低版本,目前没有在页面初始化的时候直接生成到db-list中
```yaml
db-list: [
  {
    disabled: true, # 是否启用
    type: "", # 数据库的类型,目前支持mysql、pgsql
    alias-name: "", # 数据库的名称,注意: alias-name 需要在db-list中唯一
    path: '',
    port: '',
    config: '',
    db-name: '',
    username: '',
    password: '',
    max-idle-conns: 10,
    max-open-conns: 100,
    log-mode: "",
    log-zap: false,
  }
]
```

## 使用
在正确配置db-list后,代码启动后可以根据配置的`alias-name`从 `global.GetGlobalDBByDBName(alias-name)`或者`global.MustGetGlobalDBByDBName(alias-name)`获取`db`对象
方法区别是`MustGetGlobalDBByDBName`会在`alias-name`不存在时panic

## 注意
不要直接操作 global.GVA_DBList
