
<div class="license-section">

## 📋 开源许可协议

> **Apache License 2.0** - 商业友好的开源许可证

### 🔓 使用条款说明

**2.4.5版本之前：**
- ✅ 闭源项目：无任何限制
- ✅ 开源项目：需保留原始协议声明
- ✅ 商业使用：无需额外授权

**2.4.5版本及以后：**
- ✅ 个人学习项目：完全免费
- ✅ 企业内部系统（不对外开放，不接入公网）：完全免费
- ⚠️ 外包项目/对外开放系统：必须获得商业授权
- 💼 商业盈利项目：必须获得商业授权

</div>

<div class="contact-section">

## 💬 技术交流社区

### QQ技术交流群

| 群组 | 群号 | 状态 |
|------|------|------|
| 技术交流1群 | `622360840` | 🔴 已满 |
| 技术交流2群 | `650421081` | 🔴 已满 |
| 技术交流3群 | `470239250` | 🔴 已满 |
| 技术交流4群 | `971857775` | 🟢 可加入 |

### 微信联系

**项目负责人微信：** `shouzi_1994`

*欢迎技术交流与合作洽谈*

</div>
<div class="author-intro">

## 👨‍💻 项目创始人

### <span style="color:var(--vp-c-brand)">Mr.奇淼</span> - 全栈架构师

**🏢 职业背景**
- 现任北京知名科技企业前端技术负责人
- 拥有丰富的企业级项目架构与管理经验
- 专注于现代化Web应用开发与技术创新

**💡 项目起源**

Gin-Vue-Admin诞生于2020年疫情期间，作为一个技术探索项目，凭借其优秀的架构设计和完善的功能体系，迅速在开源社区获得广泛认可，成为众多企业和开发者的首选开发框架。

**🛠 技术专长**

**前端技术栈：**
- 现代化框架：`Vue.js` `React` `Angular`
- 移动端开发：`Uni-app` `React Native` `Weex`
- 工程化工具：`Vite` `Webpack` `TypeScript`

**后端技术栈：**
- 服务端语言：`Golang` `Python` `Node.js`
- 微服务架构：`Gin` `Kratos` `gRPC`
- 数据库技术：`MySQL` `Redis` `MongoDB`

**🌟 开源理念**

致力于构建高质量的开源生态，帮助开发者提升效率，推动技术社区发展。欢迎更多志同道合的技术伙伴加入Gin-Vue-Admin开源社区，共同打造更优秀的开发工具。

</div>


<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      核心开发小组
    </template>
    <template #lead>
      The development of Gin-Vue-admin is guided by an international
      team, some of whom have chosen to be featured below.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers size="small" :members="memberList"/>
    <VPTeamPageSection>
        <template #title>鸣谢</template>
        <template #members>
          <VPTeamMembers size="small" :members="memberList2" />
        </template>
    </VPTeamPageSection>
</VPTeamPage>






<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme';
import hongyi from '/guanwang/hongyi.jpg'
import djl from '/guanwang/djl.jpg'
import GL from '/guanwang/GL.jpg'
import jianguo from '/guanwang/jianguo.jpg'
import bin from '/guanwang/bin.jpg'
import jjz from '/guanwang/jjz.jpg'
import lw from '/guanwang/lw.jpg'
import ph from '/guanwang/ph.jpg'
import sc from '/guanwang/sc.jpg'
import sh from '/guanwang/sh.jpg'
import ll from '/guanwang/LL.jpg'
import yr from '/guanwang/YR.jpg'
import tscuite from '/guanwang/tscuite.jpg'
import azir from '/guanwang/azir.jpeg'

const memberList = [
    { 
        avatar: jjz, 
        name: '奇淼' ,
        org : '全栈开发· 北京' , 
        desc :'用魔法打败魔法， 用代码打败代码， 一个普普通通的IT从业者， 一台无情的编码机器。gin-vue-admin项目发起者， 团队一块砖， 随便用， 随便搬， 负责gin - vue - admin的整体功能开发， 基础设施建设。' , 
        sponsor : 'https://www.gin-vue-admin.com/coffee/'
    },
    { 
        avatar: sc, 
        name: 'krank' ,
        org : '前端开发· 北京' , 
        desc :'风暴中出生的krank， vue使用者， go学习者， 前端开发， 奇淼的马仔。负责gin-vue-admin的前端页面开发， 功能完善， 基础前端工具开发。 辅助进行前端基础架构建设， 通用功能组件封装。' , 
        sponsor : 'https://github.com/krank666'
    },
    { 
        avatar: sh, 
        name: 'SliverHorn' ,
        org : '后端开发· 广州' , 
        desc :'任何时候，绝不骄傲，绝不轻敌，摸清对方心里，使劲浑身解数，保持笑容和品行，无论发生什么，千万不要忘记扑克脸。负责gin-vue-admin的新功能研发测试与改进,kratos-vue-admin微服务开发与维护, gf-vue-admin的后端维护, 社区日常维护管理等工作。' , 
        sponsor : 'https://github.com/SliverHorn'
    },
    { 
        avatar: ll, 
        name: 'LLemonGreen' ,
        org : '创业· 深圳' , 
        desc :' 敲代码， 做潮牌， 玩音乐， 拍视频。 目前在代码外包、潮牌同步发展阶段。github缝合怪。参与gin-vue-admin的一些功能测试和文档维护， 参与社区吹水' , 
        sponsor : 'https://github.com/LLemonGreen'
    },
    { 
        avatar: lw, 
        name: 'LeonardWang' ,
        org : '开发· 杭州' , 
        desc :'跟着gva大佬们打怪升级， 喜欢搞一些底层骚操作， 乐于“ 折腾” 的垃圾佬.负责gin-vue-admin的静态文件打包功能开发， 搬砖工程师。' , 
        sponsor : 'https://github.com/WangLeonard'
    },
    { 
        avatar: bin, 
        name: '卷彬' ,
        org : '后端开发·北京' , 
        desc :'永远不要高看自己，leetcode 活跃者，我的世界只有卷，天天吃卷饼。口头禅：卷不死我的终将成为我的手下败将' , 
        sponsor : 'https://github.com/songzhibin97'
    },
    { 
        avatar: ph, 
        name: '胖虎' ,
        org : '前端开发·苏州' , 
        desc :'No talking ,Show me code。 负责gva前端开发。gva周边开发，社区日常维护' , 
        sponsor : 'https://github.com/bypanghu'
    },
    { 
        avatar: tscuite, 
        name: 'tscuite' ,
        org : '运维·北京' , 
        desc :'奇淼的小迷弟二号，(英文名全称：The sun comes up in the east)，负责项目的devops，不学习就会焦虑的萌新' , 
        sponsor : 'https://github.com/tscuite'
    },
    {
        avatar: azir, 
        name: 'Azir' ,
        org : '全栈开发·广东' , 
        desc :'负责 gva 前端部分内容开发迭代，UI 美化。对开源与技术充满热情，喜欢折腾各种新技术。' , 
        sponsor : 'https://github.com/Azir-11',
    }

]



const memberList2 = [
    { 
        avatar: djl, 
        name: 'djl' ,
        org : '前端研发· 北京' , 
        desc :'vue使用者， go学习者， 前端开发。 负责gin - vue - admin的前端页面开发， UI样式维护' , 
        sponsor : 'https://github.com/piexlmax'
    },
    { 
        avatar: yr, 
        name: 'rainyan' ,
        org : '架构师· 深圳' , 
        desc :'架构设计， 前沿技术探索， 技术应用.武大本硕， 鹅厂员工， 单身没颜缺钱。 善于人际交往， 有领导能力， 喜欢体验新鲜的事物， 喜欢旅游， 口才很好。 雅思7 .5， 喜欢学习各种语言和各种方言.' , 
        sponsor : 'https://github.com/Ruio9244'
    },
    { 
        avatar: GL, 
        name: 'Granty1' ,
        org : '服务器开发· 上海' , 
        desc :'编写部分服务端代码。' , 
        sponsor : 'https://github.com/piexlmax'
    },
    { 
        avatar: hongyi, 
        name: '弘一' ,
        org : 'UE设计师·长沙' , 
        desc :' 行走在路上的UE， PM学习者， 佛学爱好者。' , 
        sponsor : 'https://github.com/piexlmax'
    },
    { 
        avatar: jianguo, 
        name: '坚果' ,
        org : '移动端开发·北京' , 
        desc :'写博客，敲代码，吹水，奇淼的小跟班。 负责gin - vue - admin的推广与社区的维护 ' , 
        sponsor : 'https://github.com/piexlmax'
    },
]
</script>
<style>
.avatar-img{
    height : 100%
}
</style>

