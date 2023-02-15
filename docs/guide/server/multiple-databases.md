# 多数据库支持

## 文件配置
在配置文件中新增`db-list`选项
db-list是文件中`mysql`与`pymysql`的一个超集,为了兼容低版本,目前没有在页面初始化的时候直接生成到db-list中
```yaml
db-list: [
  {
    disabled: false, # 是否禁用,填ture将不被初始化
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
在`config.yaml`中正确配置`db-list`参数后，在`main`文件中添加初始化方法
```
initialize.DBList()   # 初始化多数据库列表
```

使用时根据配置的`alias-name`从 `global.GetGlobalDBByDBName(alias-name)`或者`global.MustGetGlobalDBByDBName(alias-name)`方法中获取`db`对象，两个方法的区别是`MustGetGlobalDBByDBName`会在`alias-name`对应`db`对象不存在时panic

## 注意
不要直接操作 global.GVA_DBList
