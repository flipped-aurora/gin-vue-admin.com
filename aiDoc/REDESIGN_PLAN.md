# 首页视觉重构 · 实施计划 (REDESIGN_PLAN)

> 配套简报:`./REDESIGN_BRIEF.md`,设计源:`./design.pdf` / `./design.png`。
> 分支:`newPage`。技术栈:**VitePress 1.3.4 + Vue 3 + TailwindCSS 3.4(已接入)+ SASS**,默认主题被 `gvaLayout.vue` 包裹。

## 0. 关键事实(探索结论)

- 首页 = `docs/index.md`(`layout: home`)+ 默认 VitePress Hero + 注入组件 `Quicks` / `Liuliang` / `HomeCompanyGroup`。
- **没有 i18n**:站点 `lang: 'zh-CN'`,无 `locales`,全站中文硬编码。设计稿也是中文 → **保持中文静态文案即符合现有方案**(简报 §1.7 的 i18n 要求是「如果项目有 i18n」的条件句,此处不适用,不新建 i18n 体系)。
- 主题色当前 `--vp-c-brand: #128FD0` 家族(`vars.css`)。设计主蓝 `#2264F2` → 落到该变量。
- Tailwind 工具类可用(`postcss.config.cjs` + `@tailwind` in `global.scss`)。暗色走原生 `.dark`。
- 资产:`/logo.svg`、`/user/*.svg`(明星用户 logo:ali/zijie/tengxun/huashu…)、`/icons/gitee.png`、`/icons/gitcode.svg`、`/tabler--ai.svg`。**缺**:AI 工具 logo(Claude/Cursor/Codex/Trae/Windsurf/OpenClaw)、GVA 后台真实截图、视频文件 → 用内联 SVG / HTML-CSS mockup 还原。

## 1. 设计区块 ↔ 现有代码 映射

| # | 设计区块 | 现有代码 | 处理 |
|---|---|---|---|
| 1 | 导航栏 | VitePress `VPNav`(`config.ts` nav + socialLinks + search) | 保留(链接/社交/搜索全留),CSS 已白色吸顶 |
| 2 | Hero | `index.md` frontmatter hero(3 CTA) | 重写为自定义 Hero;CTA→立即体验(demo)+查看文档(guide);加播放按钮→视频弹窗(新交互) |
| 3 | 构建 引子 | 无 | 新增静态 |
| 4 | 工具兼容(2×3 工具网格) | 无 | 新增静态,工具图标用内联 SVG |
| 5 | Skills(终端+标签) | 无 | 新增静态,HTML 终端 |
| 6 | 实时生成(对话面板+表格) | 无 | 新增静态,HTML mockup |
| 7 | API CLI 化(四步流程) | 无 | 新增静态 |
| 8 | 调用依赖(双终端) | 无 | 新增静态 |
| 9 | 权限管控(权限表) | 无 | 新增静态 |
| 10 | 核心功能(3卡→演示向导) | 无 | 新增,**带交互**(分步向导弹窗) |
| 11 | 社区口碑(数据+证言轮播) | 无 | 新增,**带交互**(轮播) |
| 12 | 明星用户(logo 轮播) | `HomeCompanyGroup` 星用户网格 | 复用 `/user/*.svg`,重做为轮播 |
| 13 | 值得信赖(3卡) | `Quicks`(6卡,信息近似) | 新建,吸收 Quicks 信息点 |
| 14 | 框架生态(文案+3×3渐变网格) | 无 | 新增静态,链接插件市场 |
| 15 | 结尾 CTA | 无 | 新增静态 |
| 16 | Footer(深色) | `config.ts` footer + `IndexMounted`(ICP)+ `LegalFooterLinks` | 重建深色页脚,**保留** ICP/法务/社交链接 |

**必须保留的功能/外链/收益位:**
- VPNav 菜单 + 社交(GitHub/Gitee/GitCode)+ 本地搜索。
- Hero 外链:在线体验 `demo.gin-vue-admin.com`、文档 `/guide/...`、插件市场、购买授权(后两者仍在 nav)。
- `Liuliang.vue` 浮动广告(fixed)→ 继续渲染。
- `HomeCompanyGroup.vue` 官方合作链接(EasySearch/Cuiliang/VForm)+ **wwads 广告位 `data-id=260`** → 保留(`:showUsers="false"` 去重星用户后渲染于生态/页脚附近)。
- 法务页 `/terms` `/privacy` `/refund`(`LegalFooterLinks`)→ 页脚内保留。
- ICP 备案(`IndexMounted` 注入 VPFooter)→ 仍随默认页脚机制;新页脚自带备案号链接。

## 2. Token 落地(阶段 1)

- 改 `vars.css`:`--vp-c-brand*` → `#2264F2` 家族;`--vp-home-hero-name-background` 渐变改蓝。
- 新增 landing 设计 token(放 `vars.css` `:root`):`--gva-primary:#2264F2`、`--gva-text-strong:#0B0B0F`、`--gva-text-body:#5A5F6B`、`--gva-text-muted:#8A8F99`、`--gva-bg-alt:#F7F7F7`、`--gva-bg-dark:#0A0E1A`、`--gva-success:#16A34A`、`--gva-danger:#EF4444`、圆角/阴影/容器宽度。暗色模式在 `.dark` 下给替代值。
- 共享类放新文件 `theme/styles/landing.scss`(`@import` 进 `global.scss` 或 theme index):区块容器、`●`标签、标题高亮、卡片、终端、按钮等。

## 3. 组件结构

```
theme/components/home/
  HomeLanding.vue        // 编排 16 区块 + 视频弹窗 + 向导弹窗 state
  AdminMock.vue          // 复用的后台表格 mockup(hero & §6)
  sections/
    HeroSection.vue, BuildIntro.vue, ToolCompat.vue, SkillsSystem.vue,
    LiveGenerate.vue, ApiCli.vue, CallDeps.vue, Permissions.vue,
    CoreFeatures.vue, Community.vue, StarUsers.vue, Trust.vue,
    Ecosystem.vue, FinalCta.vue, SiteFooter.vue
  ui/ SectionLabel.vue, HighlightTitle.vue, Terminal.vue, ...(按需)
```
- `index.md` → `layout: page`,`footer:false`,body = `<HomeLanding/>` + `<Liuliang/>`。
- `gvaLayout.vue`:首页隐藏全局 `LegalFooterLinks`(已并入新页脚),其余页面不变。

## 4. 实施顺序

1. ✅ 阶段0 探索 + 本计划。
2. 阶段1 Token + landing.scss 共享类 + UI 基元。
3. 阶段2 自上而下建区块(Hero→Footer),每块渲染自检。
4. 阶段3 响应式(§5,移动单列/可滑轮播/汉堡导航)。
5. 阶段4 起 `pnpm docs:dev` 截图核对 §7 验收 + 控制台零报错。

## 5. 已决策的取舍(不阻塞)

- i18n:不新建,保持中文静态(无现有体系)。
- Hero 视频:无现成视频资产 → 播放按钮打开可关闭的灯箱弹窗(ESC/遮罩关闭),内嵌在线 demo iframe 作为真实可用内容(不杜撰视频 URL)。
- AI 工具 logo / 后台截图:用内联 SVG / HTML-CSS mockup 还原,不引入新图片依赖。
- wwads 广告与官方合作:设计稿无对应区,但属现有收益/合作位,按硬约束「功能零回退」保留,低调置于生态区附近。
- 主题色全站变蓝(doc 页一并):属预期 rebrand,仅颜色,无逻辑变更。
- 不新增第三方依赖(轮播/弹窗均轻量自实现)。

## 6. 验收结果(自检,基于 headless Chrome + CDP 实测)

**功能**
- [x] 路由/外链全部保留:Nav 菜单、社交(GitHub/Gitee/GitCode)、搜索;Hero(立即体验→demo、查看文档→/guide);页脚法务 /terms /privacy /refund、ICP 备案、demo、插件市场;wwads 广告位 `data-id=260` 均在首页 DOM 中确认存在。
- [x] 无 i18n 体系 → 保持中文静态(站点本就 zh-CN 单语)。
- [x] 交互实测通过:Hero 视频弹窗(iframe demo,ESC/遮罩关闭)、核心功能分步向导(第1步→下一步→关闭)、证言轮播(李工→王敏)、明星用户/生态可点。
- [x] 控制台无 Vue 报错/警告;唯一报错为外部统计脚本(沙箱内 ERR_CONNECTION_REFUSED),非本次改动;本地资源全部 200。
- [x] 其他页面(/guide、/terms、/privacy、/refund、/about)均 200;LegalFooterLinks 在非首页保留、首页由深色页脚承接(无重复)。

**视觉**
- [x] 16 区块顺序/文案/布局与 §4 一致;● 标签、标题关键词蓝色高亮、浅灰/白交替、卡片圆角阴影、幽灵数字、深色终端/页脚到位。
- [x] 主蓝 `#2264F2` 落到 `--vp-c-brand*` 与 landing token,Nav/按钮/链接同步变蓝。
- [x] 终端块、权限表、四步流程、彩色生态 3×3 网格特殊视觉还原。

**响应式 / 工程**
- [x] 桌面(1440)+ 移动(390 真值 emulation)两套断点;390px 实测**零横向溢出**(权限表为有意横向滚动);两栏→单栏、表格→横向滚动、四步→纵向、轮播→单卡。
- [x] 暗色模式实测未破坏(深色 token 生效,后台 mock 适配)。
- [x] 未引入任何新第三方依赖。

> 验证手段:VitePress dev server + headless Chrome 截图(desk1-3 / mob 全页 / dark)+ CDP 量测溢出、控制台、交互、DOM 链路。
