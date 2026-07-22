# Captcha 验证码配置

登录验证码与防爆破配置，是安全中心默认配置的来源：`source/system/security_config.go` 与 `service/system/sys_security_config.go` 在初始化时用 `DefaultSecurityConfig(global.GVA_CONFIG.Captcha)` 生成数据库中的安全配置。

### yaml

```yaml
# captcha configuration
captcha:
  key-long: 6
  img-width: 240
  img-height: 80
  open-captcha: 0
  open-captcha-timeout: 3600
```

### struct

```go
type Captcha struct {
	KeyLong            int `mapstructure:"key-long" json:"key-long" yaml:"key-long"`                                     // 验证码长度
	ImgWidth           int `mapstructure:"img-width" json:"img-width" yaml:"img-width"`                                  // 验证码宽度
	ImgHeight          int `mapstructure:"img-height" json:"img-height" yaml:"img-height"`                               // 验证码高度
	OpenCaptcha        int `mapstructure:"open-captcha" json:"open-captcha" yaml:"open-captcha"`                         // 防爆破验证码开启此数，0代表每次登录都需要验证码，其他数字代表错误密码次数，如3代表错误三次后出现验证码
	OpenCaptchaTimeOut int `mapstructure:"open-captcha-timeout" json:"open-captcha-timeout" yaml:"open-captcha-timeout"` // 防爆破验证码超时时间，单位：s(秒)
}
```

### description

| 配置名                | 类型 | 默认值 | 说明                                                         |
| --------------------- | ---- | ------ | ------------------------------------------------------------ |
| key-long              | int  | 6 | 验证码长度                                                   |
| img-width             | int  | 240 | 验证码宽度                                                   |
| img-height            | int  | 80 | 验证码高度                                                   |
| open-captcha          | int  | 0 | 防爆破验证码开启此数，0代表每次登录都需要验证码，其他数字代表错误密码次数 |
| open-captcha-timeout  | int  | 3600 | 防爆破验证码超时时间，单位：s(秒)，open-captcha 大于 0 时才生效 |

### 注意事项

- 本节只是安全中心（数据库表 `sys_security_config`）默认值的来源：首次初始化或配置缺失时由 `DefaultSecurityConfig` 落库，之后以后台"安全中心"页面的配置为准，修改 yaml 不会覆盖已落库的值。
