# 自定义图标【菜单以及直接使用】

### 说明
在2023/12/10后下载的版本即可使用，之前的版本请自行升级

### 使用
我们以文件 `web/assets/icons/customer-gva.svg` 为例，

只需要把svg文件放入前端 web/assets/icons/ 目录下即可自动注册，然后在菜单配置中选择使用或者直接使用标签`<customer-gva></customer-gva>`即可使用

svg文件不可以有宽和高，如果需要自动适配颜色，需要在svg文件中添加`fill="currentColor"`属性，如果使用特定颜色svg自行填充fill即可

> 实现代码
> /web/core/global.js
```javascript

const createIconComponent = (svgContent) => ({
    name: 'SvgIcon',
    props: {
        iconClass: {
            type: String,
            default: '',
        },
        className: {
            type: String,
            default: '',
        },
    },
    render() {
        const { className } = this
        return h('span', {
            class: className,
            ariaHidden: true,
            innerHTML: svgContent,
        })
    },
})

const registerIcons = async(app) => {
    const iconModules = import.meta.glob('@/assets/icons/**/*.svg')
    for (const path in iconModules) {
        const response = await fetch(path)
        const svgContent = await response.text()
        const iconName = path.split('/').pop().replace(/\.svg$/, '')
        const iconComponent = createIconComponent(svgContent)
        config.logs.push({
            'key': iconName,
            'label': iconName,
        })
        app.component(iconName, iconComponent)
    }
}

```
