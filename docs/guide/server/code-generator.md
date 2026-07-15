# 代码生成器

Gin-Vue-Admin 提供强大的代码生成器，支持根据数据库表结构自动生成完整的 CRUD 代码，包括后端 API、前端页面、路由配置等，大幅提升开发效率。

## 功能概述

### 生成内容

- **后端代码**：Model、Service、API、Router
- **前端代码**：Vue 页面、API 接口、路由配置
- **数据库**：自动建表、字段验证
- **权限配置**：API 权限、菜单权限

### 支持特性

- **增删改查**：完整的 CRUD 操作
- **条件查询**：支持多字段条件筛选
- **分页查询**：自动分页处理
- **文件上传**：支持文件字段处理
- **关联查询**：支持表关联操作
- **自定义模板**：可自定义代码模板

## 使用方式

### 1. Web 界面生成

访问系统管理 → 代码生成器，通过可视化界面配置：

```
系统工具 → 代码生成器 → 新增
```

#### 配置步骤

1. **基础信息配置**
   - 表名称
   - 表描述
   - 结构体名称
   - 包名
   - 文件名

2. **字段配置**
   - 字段名称
   - 字段类型
   - 数据库类型
   - 字段描述
   - 是否必填
   - 查询条件
   - 字典类型

3. **生成选项**
   - 生成模块
   - 生成路径
   - 是否覆盖

### 2. 命令行生成

```bash
# 进入项目目录
cd server

# 运行代码生成器
go run main.go -c=config.yaml -gva=gen
```

### 3. API 接口生成

```bash
# 使用 curl 调用生成接口
curl -X POST "http://localhost:8888/autoCode/createTemp" \
  -H "Content-Type: application/json" \
  -d '{
    "structName": "User",
    "tableName": "sys_users",
    "packageName": "system",
    "fields": [
      {
        "fieldName": "Name",
        "fieldDesc": "用户名",
        "fieldType": "string",
        "dataType": "varchar(255)",
        "fieldJson": "name",
        "require": true,
        "errorText": "请输入用户名"
      }
    ]
  }'
```

## 配置详解

### 基础配置结构

```go
type AutoCodeStruct struct {
    StructName         string                 `json:"structName"`         // 结构体名称
    TableName          string                 `json:"tableName"`          // 表名
    PackageName        string                 `json:"packageName"`        // 包名
    HumpPackageName    string                 `json:"humpPackageName"`    // 驼峰包名
    Abbreviation       string                 `json:"abbreviation"`       // 缩写
    Description        string                 `json:"description"`        // 描述
    AutoCreateApiToSql bool                   `json:"autoCreateApiToSql"` // 自动创建API
    AutoCreateResource bool                   `json:"autoCreateResource"` // 自动创建资源
    AutoMoveFile       bool                   `json:"autoMoveFile"`       // 自动移动文件
    Fields             []Field                `json:"fields"`             // 字段列表
    DictTypes          []string               `json:"dictTypes"`          // 字典类型
    Package            string                 `json:"package"`            // 完整包路径
    PackageT           string                 `json:"packageT"`           // 模板包路径
    NeedValid          bool                   `json:"needValid"`          // 需要验证
    HasTimer           bool                   `json:"hasTimer"`           // 包含时间字段
    NeedSort           bool                   `json:"needSort"`           // 需要排序
    HasSearchTimer     bool                   `json:"hasSearchTimer"`     // 包含搜索时间
    HasFile            bool                   `json:"hasFile"`            // 包含文件字段
    HasDataSource      bool                   `json:"hasDataSource"`      // 包含数据源
    HasRichText        bool                   `json:"hasRichText"`        // 包含富文本
    HasPic             bool                   `json:"hasPic"`             // 包含图片
    LogicDelete        bool                   `json:"logicDelete"`        // 逻辑删除
    MenuID             string                 `json:"menuID"`             // 菜单ID
}
```

### 字段配置结构

```go
type Field struct {
    FieldName       string `json:"fieldName"`       // 字段名
    FieldDesc       string `json:"fieldDesc"`       // 字段描述
    FieldType       string `json:"fieldType"`       // Go字段类型
    FieldJson       string `json:"fieldJson"`       // JSON标签
    DataType        string `json:"dataType"`        // 数据库字段类型
    ColumnName      string `json:"columnName"`      // 数据库列名
    Comment         string `json:"comment"`         // 注释
    Require         bool   `json:"require"`         // 是否必填
    ErrorText       string `json:"errorText"`       // 错误提示
    Clearable       bool   `json:"clearable"`       // 是否可清空
    Sort            bool   `json:"sort"`            // 是否排序字段
    PrimaryKey      bool   `json:"primaryKey"`      // 是否主键
    DefaultValue    string `json:"defaultValue"`    // 默认值
    DictType        string `json:"dictType"`        // 字典类型
    Front           bool   `json:"front"`           // 前端显示
    Desc            bool   `json:"desc"`            // 降序
    SearchType      string `json:"searchType"`      // 搜索类型
    FieldSearchType string `json:"fieldSearchType"` // 字段搜索类型
    FieldSearchHide bool   `json:"fieldSearchHide"` // 隐藏搜索
    FieldIndexType  string `json:"fieldIndexType"`  // 索引类型
    CheckDataSource bool   `json:"checkDataSource"` // 检查数据源
    DataSource      struct {
        Association int    `json:"association"` // 关联类型
        Table       string `json:"table"`       // 关联表
        Label       string `json:"label"`       // 显示字段
        Value       string `json:"value"`       // 值字段
    } `json:"dataSource"` // 数据源配置
}
```

## 模板系统

### 模板目录结构

```
server/resource/template/
├── web/
│   ├── api.js.tpl           # 前端API模板
│   ├── form.vue.tpl         # 表单页面模板
│   ├── table.vue.tpl        # 列表页面模板
│   └── ...
└── server/
    ├── api.go.tpl           # 后端API模板
    ├── model.go.tpl         # 模型模板
    ├── request.go.tpl       # 请求结构模板
    ├── router.go.tpl        # 路由模板
    ├── service.go.tpl       # 服务模板
    └── ...
```

### 自定义模板

#### 后端模板示例

```go
// model.go.tpl
package {{.PackageName}}

import (
    "github.com/flipped-aurora/gin-vue-admin/server/global"
    {{- if .HasTimer}}
    "time"
    {{- end}}
)

// {{.StructName}} 结构体  {{.Description}}
type {{.StructName}} struct {
    global.GVA_MODEL {{- range .Fields}}
    {{- if .PrimaryKey}}
    {{.FieldName}} {{.FieldType}} `json:"{{.FieldJson}}" form:"{{.FieldJson}}" gorm:"primarykey{{- if .Comment}};comment:{{.Comment}}{{- end}}"`
    {{- else}}
    {{.FieldName}} {{.FieldType}} `json:"{{.FieldJson}}" form:"{{.FieldJson}}" gorm:"{{- if .ColumnName}}column:{{.ColumnName}};{{- end}}{{- if .Comment}}comment:{{.Comment}};{{- end}}{{- if .DataType}}type:{{.DataType}};{{- end}}{{- if .DefaultValue}}default:{{.DefaultValue}};{{- end}}"`
    {{- end}}{{- end}}
}

// TableName {{.StructName}} 表名
func ({{.StructName}}) TableName() string {
    return "{{.TableName}}"
}
```

#### 前端模板示例

```vue
<!-- table.vue.tpl -->
<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="elSearchFormRef" :inline="true" :model="searchInfo" class="demo-form-inline" :rules="searchRule" @keyup.enter="onSubmit">
        {{- range .Fields}}
        {{- if .FieldSearchType}}
        <el-form-item label="{{.FieldDesc}}" prop="{{.FieldJson}}">
          {{- if eq .FieldSearchType "LIKE" }}
          <el-input v-model="searchInfo.{{.FieldJson}}" placeholder="搜索条件" />
          {{- else if eq .FieldSearchType "BETWEEN" }}
          <template v-if="searchInfo.{{.FieldJson}} && searchInfo.{{.FieldJson}}.length === 2">
            <el-date-picker
              v-model="searchInfo.{{.FieldJson}}"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </template>
          {{- end}}
        </el-form-item>
        {{- end}}
        {{- end}}
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="openDialog">新增</el-button>
        <el-button icon="delete" style="margin-left: 10px;" :disabled="!multipleSelection.length" @click="onDelete">删除</el-button>
      </div>
      <el-table
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="ID"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        {{- range .Fields}}
        {{- if .Front}}
        <el-table-column align="left" label="{{.FieldDesc}}" prop="{{.FieldJson}}" width="120" />
        {{- end}}
        {{- end}}
        <el-table-column align="left" label="操作">
          <template #default="scope">
            <el-button type="primary" link class="table-button" @click="getDetails(scope.row)"><icon name="edit" />变更</el-button>
            <el-button type="primary" link class="table-button" @click="deleteRow(scope.row)"><icon name="delete" />删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>
```

## 生成器核心代码

### 代码生成服务

```go
type AutoCodeService struct{}

// CreateTemp 创建代码
func (autoCodeService *AutoCodeService) CreateTemp(autoCode system.AutoCodeStruct, ids ...uint) (err error) {
    // 1. 创建基础目录
    basePath := "autocode_template/"
    if autoCode.AutoMoveFile {
        basePath = ""
    }
    
    // 2. 生成后端代码
    for _, value := range autoCode.Fields {
        if value.FieldType == "time.Time" {
            autoCode.HasTimer = true
        }
        if value.FieldSearchType != "" {
            autoCode.NeedSort = true
        }
        if value.DictType != "" {
            autoCode.DictTypes = append(autoCode.DictTypes, value.DictType)
        }
    }
    
    // 3. 解析模板并生成文件
    templates := []string{
        "server/api.go.tpl",
        "server/model.go.tpl", 
        "server/request.go.tpl",
        "server/router.go.tpl",
        "server/service.go.tpl",
        "web/api.js.tpl",
        "web/table.vue.tpl",
        "web/form.vue.tpl",
    }
    
    for _, tmpl := range templates {
        if err = autoCodeService.generateFile(tmpl, autoCode, basePath); err != nil {
            return err
        }
    }
    
    // 4. 自动注入路由和API
    if autoCode.AutoCreateApiToSql {
        if err = autoCodeService.AutoCreateApi(&autoCode); err != nil {
            return err
        }
    }
    
    return nil
}

// generateFile 生成单个文件
func (autoCodeService *AutoCodeService) generateFile(templatePath string, data system.AutoCodeStruct, basePath string) error {
    // 读取模板文件
    templateContent, err := ioutil.ReadFile("resource/template/" + templatePath)
    if err != nil {
        return err
    }
    
    // 解析模板
    tmpl, err := template.New("autocode").Parse(string(templateContent))
    if err != nil {
        return err
    }
    
    // 生成目标文件路径
    outputPath := autoCodeService.getOutputPath(templatePath, data, basePath)
    
    // 创建目录
    if err = os.MkdirAll(filepath.Dir(outputPath), 0755); err != nil {
        return err
    }
    
    // 生成文件
    file, err := os.Create(outputPath)
    if err != nil {
        return err
    }
    defer file.Close()
    
    // 执行模板
    return tmpl.Execute(file, data)
}
```

### 自动注入功能

```go
// AutoCreateApi 自动创建API
func (autoCodeService *AutoCodeService) AutoCreateApi(autoCode *system.AutoCodeStruct) error {
    apis := []system.SysApi{
        {
            Path:        "/" + autoCode.Abbreviation + "/create" + autoCode.StructName,
            Description: "新增" + autoCode.Description,
            ApiGroup:    autoCode.Description,
            Method:      "POST",
        },
        {
            Path:        "/" + autoCode.Abbreviation + "/delete" + autoCode.StructName,
            Description: "删除" + autoCode.Description,
            ApiGroup:    autoCode.Description,
            Method:      "DELETE",
        },
        {
            Path:        "/" + autoCode.Abbreviation + "/delete" + autoCode.StructName + "ByIds",
            Description: "批量删除" + autoCode.Description,
            ApiGroup:    autoCode.Description,
            Method:      "DELETE",
        },
        {
            Path:        "/" + autoCode.Abbreviation + "/update" + autoCode.StructName,
            Description: "更新" + autoCode.Description,
            ApiGroup:    autoCode.Description,
            Method:      "PUT",
        },
        {
            Path:        "/" + autoCode.Abbreviation + "/find" + autoCode.StructName,
            Description: "根据ID获取" + autoCode.Description,
            ApiGroup:    autoCode.Description,
            Method:      "GET",
        },
        {
            Path:        "/" + autoCode.Abbreviation + "/get" + autoCode.StructName + "List",
            Description: "获取" + autoCode.Description + "列表",
            ApiGroup:    autoCode.Description,
            Method:      "GET",
        },
    }
    
    for _, api := range apis {
        if err := apiService.CreateApi(api); err != nil {
            return err
        }
    }
    
    return nil
}

// AutoCreateMenu 自动创建菜单
func (autoCodeService *AutoCodeService) AutoCreateMenu(autoCode *system.AutoCodeStruct) error {
    menu := system.SysBaseMenu{
        ParentId:  "0",
        Path:      autoCode.Abbreviation,
        Name:      autoCode.StructName,
        Component: "view/" + autoCode.PackageName + "/" + autoCode.PackageName + ".vue",
        Sort:      999,
        Meta: system.Meta{
            Title: autoCode.Description,
            Icon:  "setting",
        },
    }
    
    return menuService.AddBaseMenu(menu)
}
```

## 高级功能

### 1. 关联表生成

```go
// 一对多关联配置
type Association struct {
    Type        string `json:"type"`        // 关联类型：hasOne, hasMany, belongsTo
    ForeignKey  string `json:"foreignKey"`  // 外键
    References  string `json:"references"`  // 引用字段
    Table       string `json:"table"`       // 关联表
    StructName  string `json:"structName"`  // 关联结构体
}

// 生成关联查询代码
func generateAssociationCode(associations []Association) string {
    var code strings.Builder
    
    for _, assoc := range associations {
        switch assoc.Type {
        case "hasMany":
            code.WriteString(fmt.Sprintf(
                "db.Preload(\"%s\").Find(&result)\n",
                assoc.StructName,
            ))
        case "belongsTo":
            code.WriteString(fmt.Sprintf(
                "db.Preload(\"%s\").Find(&result)\n",
                assoc.StructName,
            ))
        }
    }
    
    return code.String()
}
```

### 2. 字典类型支持

```go
// 字典字段处理
func processDictField(field Field) string {
    if field.DictType != "" {
        return fmt.Sprintf(`
        <el-select v-model="formData.%s" placeholder="请选择%s">
          <el-option
            v-for="item in %sOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>`,
            field.FieldJson,
            field.FieldDesc,
            field.DictType,
        )
    }
    return fmt.Sprintf(`<el-input v-model="formData.%s" placeholder="请输入%s" />`,
        field.FieldJson, field.FieldDesc)
}
```

### 3. 文件上传字段

```go
// 文件上传字段模板
const fileUploadTemplate = `
<el-upload
  class="upload-demo"
  :action="path"
  :headers="{ 'x-token': userStore.token }"
  :on-success="handleFileSuccess"
  :before-upload="beforeFileUpload"
>
  <el-button type="primary">点击上传</el-button>
  <template #tip>
    <div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </template>
</el-upload>
`

// 生成文件上传处理函数
func generateFileUploadMethods(fields []Field) string {
    var methods strings.Builder
    
    for _, field := range fields {
        if field.FieldType == "file" {
            methods.WriteString(fmt.Sprintf(`
// %s文件上传成功回调
const handle%sSuccess = (response) => {
  formData.value.%s = response.data.file.url
}

// %s文件上传前校验
const before%sUpload = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2
  
  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG/PNG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
  }
  return isJPG && isLt2M
}`,
                strings.Title(field.FieldJson),
                field.FieldJson,
                field.FieldDesc,
                strings.Title(field.FieldJson),
            ))
        }
    }
    
    return methods.String()
}
```

## 生成统计

### 代码生成记录

```go
type AutoCodeHistory struct {
    ID            uint      `json:"ID" gorm:"primarykey"`
    CreatedAt     time.Time `json:"CreatedAt"`
    UpdatedAt     time.Time `json:"UpdatedAt"`
    StructName    string    `json:"structName" gorm:"comment:结构体名称"`
    TableName     string    `json:"tableName" gorm:"comment:表名"`
    RequestMeta   string    `json:"requestMeta" gorm:"type:text;comment:请求meta信息"`
    AutoCodePath  string    `json:"autoCodePath" gorm:"comment:自动生成代码路径"`
    InjectionMeta string    `json:"injectionMeta" gorm:"type:text;comment:注入meta信息"`
    ApiIDs        string    `json:"apiIDs" gorm:"comment:api表注册内容"`
    Flag          int       `json:"flag" gorm:"comment:表示对应状态 0 代表创建, 1 代表回滚 ...."`
}

// 记录生成历史
func (autoCodeService *AutoCodeService) CreateAutoCodeHistory(meta, path, injectionMeta, apiIDs string, autoCode system.AutoCodeStruct) error {
    return global.GVA_DB.Create(&system.SysAutoCodeHistory{
        RequestMeta:   meta,
        AutoCodePath:  path,
        InjectionMeta: injectionMeta,
        StructName:    autoCode.StructName,
        TableName:     autoCode.TableName,
        ApiIDs:        apiIDs,
        Flag:          0,
    }).Error
}
```

## 代码回滚

```go
// RollBack 回滚自动生成的代码
func (autoCodeService *AutoCodeService) RollBack(id uint) error {
    var history system.SysAutoCodeHistory
    if err := global.GVA_DB.First(&history, id).Error; err != nil {
        return err
    }
    
    // 删除生成的文件
    var meta system.AutoCodeStruct
    if err := json.Unmarshal([]byte(history.RequestMeta), &meta); err != nil {
        return err
    }
    
    // 删除后端文件
    serverFiles := []string{
        fmt.Sprintf("app/%s/model/%s.go", meta.PackageName, meta.PackageName),
        fmt.Sprintf("app/%s/request/%s.go", meta.PackageName, meta.PackageName),
        fmt.Sprintf("app/%s/service/%s.go", meta.PackageName, meta.PackageName),
        fmt.Sprintf("app/%s/api/%s.go", meta.PackageName, meta.PackageName),
        fmt.Sprintf("app/%s/router/%s.go", meta.PackageName, meta.PackageName),
    }
    
    for _, file := range serverFiles {
        if err := os.Remove(file); err != nil && !os.IsNotExist(err) {
            return err
        }
    }
    
    // 删除前端文件
    webFiles := []string{
        fmt.Sprintf("../web/src/api/%s.js", meta.PackageName),
        fmt.Sprintf("../web/src/view/%s/%s.vue", meta.PackageName, meta.PackageName),
        fmt.Sprintf("../web/src/view/%s/%sForm.vue", meta.PackageName, meta.PackageName),
    }
    
    for _, file := range webFiles {
        if err := os.Remove(file); err != nil && !os.IsNotExist(err) {
            return err
        }
    }
    
    // 删除API记录
    var apiIDs []uint
    if err := json.Unmarshal([]byte(history.ApiIDs), &apiIDs); err == nil {
        global.GVA_DB.Delete(&system.SysApi{}, apiIDs)
    }
    
    // 更新历史记录状态
    return global.GVA_DB.Model(&history).Update("flag", 1).Error
}
```

## 前端集成

### 代码生成器页面

```vue
<template>
  <div class="auto-code">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>代码生成器</span>
        </div>
      </template>
      
      <el-form ref="autoCodeForm" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="结构体名称" prop="structName">
          <el-input v-model="form.structName" placeholder="请输入结构体名称" />
        </el-form-item>
        
        <el-form-item label="表名" prop="tableName">
          <el-input v-model="form.tableName" placeholder="请输入表名" />
        </el-form-item>
        
        <el-form-item label="包名" prop="packageName">
          <el-input v-model="form.packageName" placeholder="请输入包名" />
        </el-form-item>
        
        <el-form-item label="结构体描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入结构体描述" />
        </el-form-item>
        
        <!-- 字段配置 -->
        <el-form-item label="字段配置">
          <el-table :data="form.fields" border>
            <el-table-column label="字段名" prop="fieldName" />
            <el-table-column label="字段描述" prop="fieldDesc" />
            <el-table-column label="字段类型" prop="fieldType" />
            <el-table-column label="数据库类型" prop="dataType" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button @click="editField(scope.$index)">编辑</el-button>
                <el-button @click="deleteField(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          
          <el-button @click="addField" style="margin-top: 10px;">添加字段</el-button>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="generateCode">生成代码</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { createTemp } from '@/api/autoCode'
import { ElMessage } from 'element-plus'

const form = reactive({
  structName: '',
  tableName: '',
  packageName: '',
  description: '',
  fields: []
})

const rules = {
  structName: [{ required: true, message: '请输入结构体名称', trigger: 'blur' }],
  tableName: [{ required: true, message: '请输入表名', trigger: 'blur' }],
  packageName: [{ required: true, message: '请输入包名', trigger: 'blur' }]
}

const generateCode = async () => {
  try {
    const res = await createTemp(form)
    if (res.code === 0) {
      ElMessage.success('代码生成成功')
    }
  } catch (error) {
    ElMessage.error('代码生成失败')
  }
}
</script>
```

## 常见问题

### Q: 生成的代码编译失败？
A: 检查字段类型配置是否正确，确保 Go 类型和数据库类型匹配。

### Q: 前端页面显示异常？
A: 检查字段的前端显示配置，确保必要的字段已设置为前端显示。

### Q: 如何自定义生成模板？
A: 修改 `server/resource/template/` 目录下的模板文件，重启服务即可生效。

### Q: 生成后如何添加自定义逻辑？
A: 在生成的代码基础上添加自定义方法，避免直接修改生成的核心 CRUD 方法。

## 相关文档

- [数据库设计](./database-design.md)
- [服务端配置](./config.md)
- [前端开发指南](../web/index.md)
- [代码生成器](../generator/server.md)