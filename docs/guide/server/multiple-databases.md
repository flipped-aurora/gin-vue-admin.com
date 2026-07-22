# 多数据库支持

## 文件配置
在配置文件中新增`db-list`选项
db-list中每一项与主库配置结构一致（同为 GeneralDB），在此基础上多出`type`、`alias-name`、`disable`三个字段
```yaml
db-list:
  - disable: false # 是否禁用,填true将不被初始化
    type: "" # 数据库的类型,目前支持mysql、pgsql、mssql、oracle
    alias-name: "" # 数据库的名称,注意: alias-name 需要在db-list中唯一
    path: ''
    port: ''
    config: ''
    db-name: ''
    username: ''
    password: ''
    max-idle-conns: 10
    max-open-conns: 100
    conn-max-lifetime: 0 # 连接最长复用时间,单位秒
    log-mode: ""
    log-zap: false
```

## 使用
在`config.yaml`中正确配置`db-list`参数后，`main.go`的初始化流程会自动调用`initialize.DBList()`完成多数据库初始化，无需手动添加。

初始化后的`db`对象存放在`global.GVA_DBList`（类型为`map[string]*gorm.DB`）中，使用时根据配置的`alias-name`从 `global.GetGlobalDBByDBName(alias-name)`或者`global.MustGetGlobalDBByDBName(alias-name)`方法中获取，两个方法的区别是`MustGetGlobalDBByDBName`会在`alias-name`对应`db`对象不存在时panic

## 注意
- 不要直接操作 global.GVA_DBList
- 数据权限 GORM 回调会同时注册到主库与`db-list`中的全部连接（见`initialize/data_scope.go`的`RegisterDataScopeCallbacks`）
