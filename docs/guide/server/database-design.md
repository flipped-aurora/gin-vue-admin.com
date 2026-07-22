# 数据库设计文档

本文档详细介绍了 Gin-Vue-Admin 项目的数据库设计，包括表结构、关系设计、索引优化等内容。

## 数据库架构概览

### 1. 数据库选择

Gin-Vue-Admin 支持多种数据库：

- **MySQL 8.0+** (推荐)
- **PostgreSQL 12+**
- **SQLite 3** (开发环境)
- **SQL Server 2019+**

### 2. 核心模块

```
数据库架构
├── 系统管理模块
│   ├── 用户管理 (sys_users)
│   ├── 角色管理 (sys_authorities)
│   ├── 菜单管理 (sys_base_menus)
│   ├── API管理 (sys_apis)
│   └── 权限规则 (casbin_rule)
├── 基础功能模块
│   ├── 字典管理 (sys_dictionaries)
│   ├── 操作历史 (sys_operation_records)
│   └── JWT黑名单 (jwt_blacklists)
├── 媒体库模块
│   ├── 文件上传 (media_file_upload_and_downloads)
│   ├── 附件分类 (media_attachment_category)
│   ├── 上传会话 (media_uploads)
│   └── 分片记录 (media_upload_chunks)
├── 定时任务模块
│   ├── 定时任务 (sys_timed_tasks)
│   └── 执行日志 (sys_timed_task_logs)
├── 代码生成模块
│   ├── 模板包 (sys_auto_code_packages)
│   └── 代码历史 (sys_auto_code_histories)
└── 示例模块
    └── 客户管理 (exa_customers)
```

## 核心表结构

### 1. 用户管理表

#### sys_users (用户表)

```sql
CREATE TABLE `sys_users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(3) DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT '删除时间',
  `uuid` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户UUID',
  `username` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户登录名',
  `password` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户登录密码',
  `nick_name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT '系统用户' COMMENT '用户昵称',
  `side_mode` varchar(191) COLLATE utf8mb4_general_ci DEFAULT 'dark' COMMENT '主题模式',
  `header_img` varchar(191) COLLATE utf8mb4_general_ci DEFAULT 'https://qmplusimg.henrongyi.top/gva_header.jpg' COMMENT '用户头像',
  `base_color` varchar(191) COLLATE utf8mb4_general_ci DEFAULT '#fff' COMMENT '基础颜色',
  `active_color` varchar(191) COLLATE utf8mb4_general_ci DEFAULT '#1890ff' COMMENT '活跃颜色',
  `authority_id` bigint unsigned DEFAULT '888' COMMENT '用户角色ID',
  `phone` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户手机号',
  `email` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户邮箱',
  `enable` tinyint(1) DEFAULT '1' COMMENT '用户是否被冻结 1正常 2冻结',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_sys_users_username` (`username`),
  UNIQUE KEY `idx_sys_users_uuid` (`uuid`),
  KEY `idx_sys_users_deleted_at` (`deleted_at`),
  KEY `idx_sys_users_authority_id` (`authority_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户表';
```

#### sys_authorities (角色表)

```sql
CREATE TABLE `sys_authorities` (
  `created_at` datetime(3) DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(3) DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT '删除时间',
  `authority_id` bigint unsigned NOT NULL COMMENT '角色ID',
  `authority_name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '角色名',
  `parent_id` bigint unsigned DEFAULT NULL COMMENT '父角色ID',
  `default_router` varchar(191) COLLATE utf8mb4_general_ci DEFAULT 'dashboard' COMMENT '默认菜单',
  PRIMARY KEY (`authority_id`),
  UNIQUE KEY `idx_sys_authorities_authority_id` (`authority_id`),
  KEY `idx_sys_authorities_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='角色表';
```

#### sys_user_authority (用户角色关联表)

```sql
CREATE TABLE `sys_user_authority` (
  `sys_user_id` bigint unsigned NOT NULL COMMENT '用户ID',
  `sys_authority_authority_id` bigint unsigned NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`sys_user_id`,`sys_authority_authority_id`),
  KEY `fk_sys_user_authority_sys_authority` (`sys_authority_authority_id`),
  CONSTRAINT `fk_sys_user_authority_sys_authority` FOREIGN KEY (`sys_authority_authority_id`) REFERENCES `sys_authorities` (`authority_id`),
  CONSTRAINT `fk_sys_user_authority_sys_user` FOREIGN KEY (`sys_user_id`) REFERENCES `sys_users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户角色关联表';
```

### 2. 权限管理表

#### casbin_rule (权限规则表)

```sql
CREATE TABLE `casbin_rule` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ptype` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '策略类型',
  `v0` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '角色ID',
  `v1` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '资源路径',
  `v2` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '请求方法',
  `v3` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `v4` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `v5` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_casbin_rule` (`ptype`,`v0`,`v1`,`v2`,`v3`,`v4`,`v5`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Casbin权限规则表';
```

#### sys_apis (API管理表)

```sql
CREATE TABLE `sys_apis` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'API ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(3) DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT '删除时间',
  `path` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'API路径',
  `description` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'API描述',
  `api_group` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'API分组',
  `method` varchar(191) COLLATE utf8mb4_general_ci DEFAULT 'POST' COMMENT '请求方法',
  PRIMARY KEY (`id`),
  KEY `idx_sys_apis_deleted_at` (`deleted_at`),
  KEY `idx_sys_apis_path_method` (`path`,`method`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='API管理表';
```

#### sys_authority_menus (角色菜单关联表)

```sql
CREATE TABLE `sys_authority_menus` (
  `sys_authority_authority_id` bigint unsigned NOT NULL COMMENT '角色ID',
  `sys_base_menu_id` bigint unsigned NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`sys_authority_authority_id`,`sys_base_menu_id`),
  KEY `fk_sys_authority_menus_sys_base_menu` (`sys_base_menu_id`),
  CONSTRAINT `fk_sys_authority_menus_sys_authority` FOREIGN KEY (`sys_authority_authority_id`) REFERENCES `sys_authorities` (`authority_id`),
  CONSTRAINT `fk_sys_authority_menus_sys_base_menu` FOREIGN KEY (`sys_base_menu_id`) REFERENCES `sys_base_menus` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='角色菜单关联表';
```

### 3. 菜单管理表

#### sys_base_menus (基础菜单表)

```sql
CREATE TABLE `sys_base_menus` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(3) DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT '删除时间',
  `menu_level` bigint unsigned DEFAULT NULL COMMENT '菜单层级',
  `parent_id` bigint unsigned DEFAULT NULL COMMENT '父菜单ID',
  `path` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '路由路径',
  `name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '路由名称',
  `hidden` tinyint(1) DEFAULT NULL COMMENT '是否隐藏',
  `component` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '组件路径',
  `sort` bigint DEFAULT NULL COMMENT '排序',
  `active_name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '高亮菜单',
  `keep_alive` tinyint(1) DEFAULT NULL COMMENT '是否缓存',
  `default_menu` tinyint(1) DEFAULT NULL COMMENT '是否默认菜单',
  `title` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '菜单标题',
  `icon` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '菜单图标',
  `close_tab` tinyint(1) DEFAULT NULL COMMENT '是否关闭标签',
  PRIMARY KEY (`id`),
  KEY `idx_sys_base_menus_deleted_at` (`deleted_at`),
  KEY `idx_sys_base_menus_parent_id` (`parent_id`),
  KEY `idx_sys_base_menus_sort` (`sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='基础菜单表';
```

#### sys_base_menu_btns (菜单按钮表)

```sql
CREATE TABLE `sys_base_menu_btns` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '按钮ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(3) DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT '删除时间',
  `name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '按钮名称',
  `desc` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '按钮描述',
  `sys_base_menu_id` bigint unsigned DEFAULT NULL COMMENT '菜单ID',
  PRIMARY KEY (`id`),
  KEY `idx_sys_base_menu_btns_deleted_at` (`deleted_at`),
  KEY `idx_sys_base_menu_btns_sys_base_menu_id` (`sys_base_menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='菜单按钮表';
```

### 4. 系统功能表

#### sys_dictionaries (字典表)

```sql
CREATE TABLE `sys_dictionaries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '字典ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(3) DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT '删除时间',
  `name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '字典名称',
  `type` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '字典类型',
  `status` tinyint(1) DEFAULT NULL COMMENT '状态',
  `desc` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_sys_dictionaries_type` (`type`),
  KEY `idx_sys_dictionaries_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='字典表';
```

#### sys_dictionary_details (字典详情表)

```sql
CREATE TABLE `sys_dictionary_details` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '字典详情ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(3) DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT '删除时间',
  `label` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '展示值',
  `value` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '字典值',
  `extend` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '扩展值',
  `status` tinyint(1) DEFAULT NULL COMMENT '启用状态',
  `sort` bigint DEFAULT NULL COMMENT '排序标记',
  `sys_dictionary_id` bigint unsigned DEFAULT NULL COMMENT '关联字典ID',
  PRIMARY KEY (`id`),
  KEY `idx_sys_dictionary_details_deleted_at` (`deleted_at`),
  KEY `idx_sys_dictionary_details_sys_dictionary_id` (`sys_dictionary_id`),
  KEY `idx_sys_dictionary_details_sort` (`sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='字典详情表';
```

#### sys_operation_records (操作记录表)

```sql
CREATE TABLE `sys_operation_records` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(3) DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT '删除时间',
  `ip` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '请求IP',
  `method` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '请求方法',
  `path` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '请求路径',
  `status` bigint DEFAULT NULL COMMENT '请求状态',
  `latency` bigint DEFAULT NULL COMMENT '延迟时间',
  `agent` text COLLATE utf8mb4_general_ci COMMENT '代理信息',
  `error_message` text COLLATE utf8mb4_general_ci COMMENT '错误信息',
  `body` text COLLATE utf8mb4_general_ci COMMENT '请求Body',
  `resp` text COLLATE utf8mb4_general_ci COMMENT '响应Body',
  `user_id` bigint unsigned DEFAULT NULL COMMENT '用户ID',
  PRIMARY KEY (`id`),
  KEY `idx_sys_operation_records_deleted_at` (`deleted_at`),
  KEY `idx_sys_operation_records_user_id` (`user_id`),
  KEY `idx_sys_operation_records_created_at` (`created_at`),
  KEY `idx_sys_operation_records_method_path` (`method`,`path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='操作记录表';
```

### 5. 媒体库表

#### media_file_upload_and_downloads (文件上传下载表)

v3.0 起由 example 组的 `exa_file_upload_and_downloads` 迁入 media 组并更名，新增 `size`、`mime`、`md5`、`user_id` 字段。

```sql
CREATE TABLE `media_file_upload_and_downloads` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '文件ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(3) DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT '删除时间',
  `name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '文件名',
  `class_id` bigint DEFAULT '0' COMMENT '分类id',
  `url` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '文件地址',
  `tag` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '文件标签',
  `key` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '编号',
  `size` bigint DEFAULT '0' COMMENT '文件大小(字节)',
  `mime` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'MIME类型',
  `md5` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '文件MD5',
  `user_id` bigint unsigned DEFAULT NULL COMMENT '上传者ID',
  PRIMARY KEY (`id`),
  KEY `idx_media_file_upload_and_downloads_deleted_at` (`deleted_at`),
  KEY `idx_media_file_upload_and_downloads_md5` (`md5`),
  KEY `idx_media_file_upload_and_downloads_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='文件上传下载表';
```

#### media_attachment_category (附件分类表)

```sql
CREATE TABLE `media_attachment_category` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(3) DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT '删除时间',
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '分类名称',
  `pid` bigint DEFAULT '0' COMMENT '父节点ID',
  PRIMARY KEY (`id`),
  KEY `idx_media_attachment_category_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='附件分类表';
```

#### media_uploads (大文件上传会话表)

```sql
CREATE TABLE `media_uploads` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '会话ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(3) DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT '删除时间',
  `user_id` bigint unsigned DEFAULT NULL COMMENT '上传者',
  `file_name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '文件名',
  `file_hash` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '整文件MD5',
  `file_size` bigint DEFAULT NULL COMMENT '总字节',
  `chunk_size` bigint DEFAULT NULL COMMENT '分片字节',
  `chunk_total` bigint DEFAULT NULL COMMENT '分片总数',
  `status` varchar(191) COLLATE utf8mb4_general_ci DEFAULT 'uploading' COMMENT '状态 uploading/merging/completed/failed',
  `storage_key` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '最终对象key',
  `media_id` bigint unsigned DEFAULT NULL COMMENT '媒体库记录ID',
  PRIMARY KEY (`id`),
  KEY `idx_media_uploads_deleted_at` (`deleted_at`),
  KEY `idx_media_uploads_user_id` (`user_id`),
  KEY `idx_media_uploads_file_hash` (`file_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='大文件上传会话表';
```

#### media_upload_chunks (分片收讫记录表)

```sql
CREATE TABLE `media_upload_chunks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '分片ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(3) DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT '删除时间',
  `upload_id` bigint unsigned DEFAULT NULL COMMENT '上传会话ID',
  `chunk_index` bigint DEFAULT NULL COMMENT '分片索引',
  `chunk_hash` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '分片MD5',
  `size` bigint DEFAULT NULL COMMENT '分片字节',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_upload_chunk` (`upload_id`,`chunk_index`),
  KEY `idx_media_upload_chunks_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='分片收讫记录表';
```

### 6. 代码生成表

#### sys_auto_code_packages (代码模板包表)

v3.0 起原 `sys_auto_codes` 表调整为模板包表 `sys_auto_code_packages`。

```sql
CREATE TABLE `sys_auto_code_packages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '模板包ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(3) DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT '删除时间',
  `desc` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '描述',
  `label` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '展示名',
  `template` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '模版',
  `package_name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '包名',
  PRIMARY KEY (`id`),
  KEY `idx_sys_auto_code_packages_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='代码模板包表';
```

#### sys_auto_code_histories (代码生成历史表)

```sql
CREATE TABLE `sys_auto_code_histories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '历史ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(3) DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT '删除时间',
  `table_name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '表名',
  `package` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '模块名/插件名',
  `request` text COLLATE utf8mb4_general_ci COMMENT '前端传入的结构化信息',
  `struct_name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '结构体名称',
  `abbreviation` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '结构体名称缩写',
  `business_db` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '业务库',
  `description` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Struct中文名称',
  `templates` text COLLATE utf8mb4_general_ci COMMENT '模板信息',
  `injections` text COLLATE utf8mb4_general_ci COMMENT '注入路径',
  `flag` bigint DEFAULT NULL COMMENT '标记 0:创建 1:回滚',
  `api_ids` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'api表注册内容',
  `menu_id` bigint unsigned DEFAULT NULL COMMENT '菜单ID',
  `export_template_id` bigint unsigned DEFAULT NULL COMMENT '导出模板ID',
  `package_id` bigint unsigned DEFAULT NULL COMMENT '包ID',
  PRIMARY KEY (`id`),
  KEY `idx_sys_auto_code_histories_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='代码生成历史表';
```

## 表关系设计

### 1. 用户权限关系图

```
用户 (sys_users)
    ↓ (1:N)
用户角色关联 (sys_user_authority)
    ↓ (N:1)
角色 (sys_authorities)
    ↓ (1:N)
角色菜单关联 (sys_authority_menus)
    ↓ (N:1)
菜单 (sys_base_menus)
    ↓ (1:N)
菜单按钮 (sys_base_menu_btns)

角色 (sys_authorities)
    ↓ (通过Casbin)
权限规则 (casbin_rule)
    ↓ (关联)
API (sys_apis)
```

### 2. 核心关系说明

#### 用户-角色关系

```go
// 用户结构体
type SysUser struct {
    global.GVA_MODEL
    UUID        uuid.UUID      `json:"uuid" gorm:"index;comment:用户UUID"`
    Username    string         `json:"userName" gorm:"index;comment:用户登录名"`
    Password    string         `json:"-" gorm:"comment:用户登录密码"`
    NickName    string         `json:"nickName" gorm:"default:系统用户;comment:用户昵称"`
    SideMode    string         `json:"sideMode" gorm:"default:dark;comment:用户侧边主题"`
    HeaderImg   string         `json:"headerImg" gorm:"default:https://qmplusimg.henrongyi.top/gva_header.jpg;comment:用户头像"`
    BaseColor   string         `json:"baseColor" gorm:"default:#fff;comment:基础颜色"`
    ActiveColor string         `json:"activeColor" gorm:"default:#1890ff;comment:活跃颜色"`
    AuthorityId uint           `json:"authorityId" gorm:"default:888;comment:用户角色ID"`
    Authority   SysAuthority   `json:"authority" gorm:"foreignKey:AuthorityId;references:AuthorityId;comment:用户角色"`
    Authorities []SysAuthority `json:"authorities" gorm:"many2many:sys_user_authority;"`
    Phone       string         `json:"phone" gorm:"comment:用户手机号"`
    Email       string         `json:"email" gorm:"comment:用户邮箱"`
    Enable      int            `json:"enable" gorm:"default:1;comment:用户是否被冻结 1正常 2冻结"`
}
```

#### 角色-菜单关系

```go
// 角色结构体
type SysAuthority struct {
    CreatedAt     time.Time       `json:"createdAt"`
    UpdatedAt     time.Time       `json:"updatedAt"`
    DeletedAt     *gorm.DeletedAt `json:"-" gorm:"index"`
    AuthorityId   uint            `json:"authorityId" gorm:"not null;unique;primary_key;comment:角色ID"`
    AuthorityName string          `json:"authorityName" gorm:"comment:角色名"`
    ParentId      *uint           `json:"parentId" gorm:"comment:父角色ID"`
    DataAuthorityId []SysAuthority `json:"dataAuthorityId" gorm:"many2many:sys_data_authority_id"`
    Children      []SysAuthority  `json:"children" gorm:"-"`
    SysBaseMenus  []SysBaseMenu   `json:"menus" gorm:"many2many:sys_authority_menus;"`
    Users         []SysUser       `json:"-" gorm:"many2many:sys_user_authority;"`
    DefaultRouter string          `json:"defaultRouter" gorm:"comment:默认菜单"`
}
```

#### 菜单层级关系

```go
// 菜单结构体
type SysBaseMenu struct {
    global.GVA_MODEL
    MenuLevel     uint                                     `json:"-"`
    ParentId      *uint                                    `json:"parentId" gorm:"comment:父菜单ID"`
    Path          string                                   `json:"path" gorm:"comment:路由path"`
    Name          string                                   `json:"name" gorm:"comment:路由name"`
    Hidden        *bool                                    `json:"hidden" gorm:"comment:是否在列表隐藏"`
    Component     string                                   `json:"component" gorm:"comment:对应前端文件路径"`
    Sort          int                                      `json:"sort" gorm:"comment:排序标记"`
    ActiveName    string                                   `json:"activeName" gorm:"comment:高亮菜单"`
    KeepAlive     *bool                                    `json:"keepAlive" gorm:"comment:是否缓存"`
    DefaultMenu   *bool                                    `json:"defaultMenu" gorm:"comment:是否是基础路由(开发中)"`
    Title         string                                   `json:"title" gorm:"comment:菜单名"`
    Icon          string                                   `json:"icon" gorm:"comment:菜单图标"`
    CloseTab      *bool                                    `json:"closeTab" gorm:"comment:自动关闭tab"`
    Authorities   []SysAuthority                           `json:"authorities" gorm:"many2many:sys_authority_menus;"`
    Children      []SysBaseMenu                            `json:"children" gorm:"-"`
    MenuBtn       []SysBaseMenuBtn                         `json:"menuBtn"`
    Parameters    []SysBaseMenuParameter                   `json:"parameters"`
}
```

## 索引优化策略

### 1. 主要索引设计

#### 用户表索引

```sql
-- 主键索引
PRIMARY KEY (`id`)

-- 唯一索引
UNIQUE KEY `idx_sys_users_username` (`username`)
UNIQUE KEY `idx_sys_users_uuid` (`uuid`)

-- 普通索引
KEY `idx_sys_users_deleted_at` (`deleted_at`)
KEY `idx_sys_users_authority_id` (`authority_id`)
KEY `idx_sys_users_email` (`email`)
KEY `idx_sys_users_phone` (`phone`)

-- 复合索引
KEY `idx_sys_users_enable_deleted` (`enable`, `deleted_at`)
```

#### 操作记录表索引

```sql
-- 时间范围查询索引
KEY `idx_sys_operation_records_created_at` (`created_at`)

-- 用户操作查询索引
KEY `idx_sys_operation_records_user_id` (`user_id`)

-- API路径查询索引
KEY `idx_sys_operation_records_method_path` (`method`, `path`)

-- 状态查询索引
KEY `idx_sys_operation_records_status` (`status`)

-- 复合查询索引
KEY `idx_operation_user_time` (`user_id`, `created_at`, `method`)
```

#### 权限规则表索引

```sql
-- Casbin查询优化索引
UNIQUE KEY `idx_casbin_rule` (`ptype`,`v0`,`v1`,`v2`,`v3`,`v4`,`v5`)

-- 角色权限查询索引
KEY `idx_casbin_rule_v0` (`v0`)

-- 资源权限查询索引
KEY `idx_casbin_rule_v1_v2` (`v1`, `v2`)
```

### 2. 查询优化示例

#### 用户列表查询优化

```sql
-- 优化前：全表扫描
SELECT * FROM sys_users 
WHERE deleted_at IS NULL 
AND enable = 1 
ORDER BY created_at DESC 
LIMIT 10 OFFSET 0;

-- 优化后：使用复合索引
SELECT id, username, nick_name, email, phone, created_at 
FROM sys_users 
WHERE enable = 1 AND deleted_at IS NULL 
ORDER BY created_at DESC 
LIMIT 10 OFFSET 0;

-- 对应索引
KEY `idx_users_enable_deleted_created` (`enable`, `deleted_at`, `created_at`)
```

#### 操作日志查询优化

```sql
-- 按用户和时间范围查询
SELECT * FROM sys_operation_records 
WHERE user_id = 1 
AND created_at BETWEEN '2023-01-01' AND '2023-12-31'
AND deleted_at IS NULL
ORDER BY created_at DESC;

-- 对应索引
KEY `idx_operation_user_time_deleted` (`user_id`, `created_at`, `deleted_at`)
```

#### 权限验证查询优化

```sql
-- Casbin权限验证查询
SELECT * FROM casbin_rule 
WHERE ptype = 'p' 
AND v0 = '888' 
AND v1 = '/user/getUserList' 
AND v2 = 'POST';

-- 已有唯一索引覆盖此查询
UNIQUE KEY `idx_casbin_rule` (`ptype`,`v0`,`v1`,`v2`,`v3`,`v4`,`v5`)
```

## 数据库配置

### 1. GORM 配置

```go
// config/gorm.go
type Mysql struct {
    GeneralDB `yaml:",inline" mapstructure:",squash"`
}

type GeneralDB struct {
    Path         string `mapstructure:"path" json:"path" yaml:"path"`
    Port         string `mapstructure:"port" json:"port" yaml:"port"`
    Config       string `mapstructure:"config" json:"config" yaml:"config"`
    Dbname       string `mapstructure:"db-name" json:"db-name" yaml:"db-name"`
    Username     string `mapstructure:"username" json:"username" yaml:"username"`
    Password     string `mapstructure:"password" json:"password" yaml:"password"`
    Prefix       string `mapstructure:"prefix" json:"prefix" yaml:"prefix"`
    Singular     bool   `mapstructure:"singular" json:"singular" yaml:"singular"`
    Engine       string `mapstructure:"engine" json:"engine" yaml:"engine" default:"InnoDB"`
    MaxIdleConns int    `mapstructure:"max-idle-conns" json:"max-idle-conns" yaml:"max-idle-conns"`
    MaxOpenConns int    `mapstructure:"max-open-conns" json:"max-open-conns" yaml:"max-open-conns"`
    LogMode      string `mapstructure:"log-mode" json:"log-mode" yaml:"log-mode"`
    LogZap       bool   `mapstructure:"log-zap" json:"log-zap" yaml:"log-zap"`
}
```

### 2. 连接池配置

```go
// initialize/gorm.go
func GormMysql() *gorm.DB {
    m := global.GVA_CONFIG.Mysql
    if m.Dbname == "" {
        return nil
    }
    mysqlConfig := mysql.Config{
        DSN:                       m.Dsn(),
        DefaultStringSize:         191,
        SkipInitializeWithVersion: false,
    }
    if db, err := gorm.Open(mysql.New(mysqlConfig), internal.Gorm.Config(m.Prefix, m.Singular)); err != nil {
        return nil
    } else {
        db.InstanceSet("gorm:table_options", "ENGINE="+m.Engine)
        sqlDB, _ := db.DB()
        sqlDB.SetMaxIdleConns(m.MaxIdleConns)
        sqlDB.SetMaxOpenConns(m.MaxOpenConns)
        return db
    }
}
```

### 3. 数据库迁移

```go
// initialize/gorm.go
func RegisterTables() {
	if global.GVA_CONFIG.System.DisableAutoMigrate {
		logger.Bg().Mod("system").Info("auto-migrate is disabled, skipping table registration")
		return
	}

	db := global.GVA_DB
	err := db.AutoMigrate(

		system.SysApi{},
		system.SysIgnoreApi{},
		system.SysUser{},
		system.SysBaseMenu{},
		system.JwtBlacklist{},
		system.SysAuthority{},
		system.SysDepartment{},
		system.SysPosition{},
		system.SysDataAccessLog{},
		system.SysAuthorityDepartment{},
		system.SysDictionary{},
		system.SysOperationRecord{},
		system.SysAutoCodeHistory{},
		system.SysDictionaryDetail{},
		system.SysBaseMenuParameter{},
		system.SysBaseMenuBtn{},
		system.SysAuthorityBtn{},
		system.SysAutoCodePackage{},
		system.SysExportTemplate{},
		system.Condition{},
		system.JoinTemplate{},
		system.SysParams{},
		system.SysSecurityConfig{},
		system.SysVersion{},
		system.SysError{},
		system.SysApiToken{},
		system.SysLoginLog{},
		system.SysTimedTask{},
		system.SysTimedTaskLog{},

		example.ExaCustomer{},
		media.MediaUpload{},
		media.MediaUploadChunk{},
		media.FileUploadAndDownload{},
		media.AttachmentCategory{},
	)
	if err != nil {
		logger.Bg().Mod("system").Err(err).Error("register table failed")
		os.Exit(1)
	}
	// ...
}
```

## 数据库维护

### 1. 备份策略

#### 全量备份脚本

```bash
#!/bin/bash
# backup_full.sh

DB_NAME="gin_vue_admin"
DB_USER="root"
DB_PASS="password"
BACKUP_DIR="/backup/mysql"
DATE=$(date +"%Y%m%d_%H%M%S")

# 创建备份目录
mkdir -p $BACKUP_DIR

# 全量备份
mysqldump -u$DB_USER -p$DB_PASS \
  --single-transaction \
  --routines \
  --triggers \
  --events \
  --hex-blob \
  $DB_NAME > $BACKUP_DIR/full_backup_$DATE.sql

# 压缩备份文件
gzip $BACKUP_DIR/full_backup_$DATE.sql

# 删除7天前的备份
find $BACKUP_DIR -name "full_backup_*.sql.gz" -mtime +7 -delete

echo "Full backup completed: full_backup_$DATE.sql.gz"
```

#### 增量备份脚本

```bash
#!/bin/bash
# backup_incremental.sh

DB_NAME="gin_vue_admin"
DB_USER="root"
DB_PASS="password"
BACKUP_DIR="/backup/mysql/incremental"
DATE=$(date +"%Y%m%d_%H%M%S")

# 创建备份目录
mkdir -p $BACKUP_DIR

# 增量备份（基于binlog）
mysqlbinlog --start-datetime="$(date -d '1 hour ago' '+%Y-%m-%d %H:%M:%S')" \
  --stop-datetime="$(date '+%Y-%m-%d %H:%M:%S')" \
  /var/lib/mysql/mysql-bin.* > $BACKUP_DIR/incremental_$DATE.sql

# 压缩备份文件
gzip $BACKUP_DIR/incremental_$DATE.sql

echo "Incremental backup completed: incremental_$DATE.sql.gz"
```

### 2. 性能监控

#### 慢查询监控

```sql
-- 开启慢查询日志
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;
SET GLOBAL log_queries_not_using_indexes = 'ON';

-- 查看慢查询统计
SELECT 
    SCHEMA_NAME,
    DIGEST_TEXT,
    COUNT_STAR,
    AVG_TIMER_WAIT/1000000000 AS avg_time_seconds,
    MAX_TIMER_WAIT/1000000000 AS max_time_seconds
FROM performance_schema.events_statements_summary_by_digest 
WHERE SCHEMA_NAME = 'gin_vue_admin'
ORDER BY AVG_TIMER_WAIT DESC 
LIMIT 10;
```

#### 索引使用情况

```sql
-- 查看未使用的索引
SELECT 
    t.TABLE_SCHEMA,
    t.TABLE_NAME,
    t.INDEX_NAME,
    t.NON_UNIQUE,
    t.COLUMN_NAME
FROM information_schema.STATISTICS t
LEFT JOIN performance_schema.table_io_waits_summary_by_index_usage i
    ON t.TABLE_SCHEMA = i.OBJECT_SCHEMA
    AND t.TABLE_NAME = i.OBJECT_NAME
    AND t.INDEX_NAME = i.INDEX_NAME
WHERE t.TABLE_SCHEMA = 'gin_vue_admin'
    AND i.INDEX_NAME IS NULL
    AND t.INDEX_NAME != 'PRIMARY'
ORDER BY t.TABLE_NAME, t.INDEX_NAME;

-- 查看索引使用频率
SELECT 
    OBJECT_SCHEMA,
    OBJECT_NAME,
    INDEX_NAME,
    COUNT_READ,
    COUNT_WRITE,
    COUNT_FETCH,
    COUNT_INSERT,
    COUNT_UPDATE,
    COUNT_DELETE
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE OBJECT_SCHEMA = 'gin_vue_admin'
ORDER BY COUNT_READ DESC;
```

### 3. 数据清理

#### 操作日志清理

```sql
-- 清理30天前的操作日志
DELETE FROM sys_operation_records 
WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);

-- 清理软删除的数据（谨慎操作）
DELETE FROM sys_users 
WHERE deleted_at IS NOT NULL 
AND deleted_at < DATE_SUB(NOW(), INTERVAL 90 DAY);
```

#### 定期维护脚本

```sql
-- 优化表
OPTIMIZE TABLE sys_operation_records;
OPTIMIZE TABLE sys_users;
OPTIMIZE TABLE casbin_rule;

-- 分析表
ANALYZE TABLE sys_operation_records;
ANALYZE TABLE sys_users;
ANALYZE TABLE casbin_rule;

-- 检查表
CHECK TABLE sys_operation_records;
CHECK TABLE sys_users;
CHECK TABLE casbin_rule;
```

## 数据字典

### 1. 状态码定义

| 字段 | 值 | 说明 |
|------|----|----- |
| enable | 1 | 用户启用 |
| enable | 2 | 用户冻结 |
| status | 1 | 字典启用 |
| status | 0 | 字典禁用 |
| hidden | true | 菜单隐藏 |
| hidden | false | 菜单显示 |

### 2. 默认数据

#### 默认角色

```sql
INSERT INTO `sys_authorities` VALUES 
('2023-01-01 00:00:00.000','2023-01-01 00:00:00.000',NULL,888,'普通用户',0,'dashboard'),
('2023-01-01 00:00:00.000','2023-01-01 00:00:00.000',NULL,8881,'普通用户子角色',888,'dashboard'),
('2023-01-01 00:00:00.000','2023-01-01 00:00:00.000',NULL,9528,'测试角色',0,'dashboard');
```

#### 默认用户

```sql
INSERT INTO `sys_users` VALUES 
(1,'2023-01-01 00:00:00.000','2023-01-01 00:00:00.000',NULL,'a303176530-3dda-4a33-b261-61809d378a34','admin','$2a$10$2XLuViXqLcn18zyGHU.9COFYqI16yGHjs6pXU5klUkdOKWjjceYUC','超级管理员','dark','https://qmplusimg.henrongyi.top/gva_header.jpg','#fff','#1890ff',888,'17611111111','333333333@qq.com',1);
```

## 相关文档

- [GORM官方文档](https://gorm.io/zh_CN/docs/)
- [MySQL性能优化](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [Casbin权限模型](https://casbin.org/docs/zh-CN/overview)
- [数据库设计规范](/guide/best-practices/development-standards)