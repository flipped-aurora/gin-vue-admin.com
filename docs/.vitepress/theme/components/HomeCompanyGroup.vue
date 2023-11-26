<template>
  <section id="company-group">
    <div class="container">
      <div class="company-title">
        明星用户
      </div>
      <div class="grid grid-cols-3">
        <a class="flex items-center justify-center" href="#">
          <img :width="240" src="/user/ali.jpg" alt="阿里云">
        </a>
        <a class="flex items-center justify-center" href="#">
          <img :width="240" src="/user/zijie.jpg" alt="zijie">
        </a>
        <a class="flex items-center justify-center" href="#">
          <img :width="240" src="/user/tengxun.png" alt="腾讯">
        </a>
        <a class="flex items-center justify-center" href="#">
          <img :width="240" src="/user/ea.jpg" alt="EA">
        </a>
        <a class="flex items-center justify-center" href="#">
          <img :width="240" src="/user/douyu.jpg" alt="斗鱼直播">
        </a>

        <a class="flex items-center justify-center" href="#">
         <img :width="220" src="/user/qianxun.svg" alt="qianxun">
        </a>
        <a class="flex items-center justify-center" href="#">
<!--          <img :width="240" src="/user/ea.jpg" alt="EA">-->
        </a>
        <a class="flex items-center justify-center min-h-[173px]" href="#">
          <img :width="240" src="/user/shenxinfu.png" alt="深信服">
        </a>

        <a class="flex items-center justify-center" href="#">
<!--          <img :width="220" src="/user/qianxun.svg" alt="qianxun">-->
        </a>

      </div>
      <div class="company-title mt-14">
        合作企业
      </div>
      <div class="company-box">
        <a class="company-box-item" target="_blank" v-for="(item , index) in ad" :key="index" :href="item.href">
          <img :src="item.img" :alt="item.href">
          <div v-if="item.meta" style="margin-left: 20px">
            <div class="company-box-item-title" >{{item.meta.title}}</div>
            <div class="company-box-item-description">{{item.meta.description}}</div>
          </div>
        </a>
      </div>

      <div class="company-title">
        广告
      </div>
      <div class="flex justify-center">
        <div class="wwads-cn wwads-horizontal" data-id="260" style="max-width:350px"></div>
      </div>
    </div>


  </section>
</template>

<script lang="ts" setup>
import miaodian from '/guanwang/miaodian.png'
import  vform from '/advertising/vform-banner.png'
import  yangfan from '/advertising/yangfan.jpg'

const ad = [
  {
    img : miaodian,
    href :'https://www.geelevel.com/'
  }
  // ,{
  //   img : 'https://webcdn.madlocker.cn/wp-content/uploads/2022/06/cropped-madlocker%C2%B7logo-01.jpg',
  //   href :'https://www.madlocker.cn',
  //   meta:{
  //     title : '深圳疯柜科技',
  //     description : '盡量别開生靣'
  //   }
  // }
  ,{
    img : yangfan,
    href :'https://github.com/test-instructor/yangfan',
     meta:{
      title : '扬帆测试平台',
      description : `扬帆测试平台`
    }
  }
  ,{
    img : vform,
    href :'https://www.vform666.com'
  }
]

</script>

<style scoped>
#company-group {
  padding: 12px 24px;
  text-align: center;
  margin-top: 20px;
  --max-width : 240px;
  border-top: 1px solid var(--vp-c-bg-soft);
}
#company-group .container{
  margin: 10px auto;
  max-width: 1152px;
}
#company-group .company-title{
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1em;
}
#company-group .company-box{
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(var(--max-width),1fr));
  column-gap: 4px;
}
#company-group .company-box .company-box-item{
  margin-bottom: 12px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color .2s ease;
  height: calc(var(--max-width) / 2 - 6px);
  background-color: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 10px;
}

#company-group .company-box .company-box-item img{
  max-height: 100% ;
}


#company-group .company-box .company-box-item .company-box-item-title{
  font-size: 20px;
  font-weight: 600;
  width: 80px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#company-group .company-box .company-box-item .company-box-item-description{
  font-size: 12px;
  font-weight: 400;
  overflow: hidden;
  max-width: 80px;
  width: 80px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
