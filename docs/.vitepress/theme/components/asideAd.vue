<template>
  <div class="gvaaside-ad" >
    <div class="company-box">
      <a  class="company-box-item" v-for="(item , index) in ad" :key="index" :href="item.href" target="_blank" style="padding: 0">
        <img :src="item.img" alt="geelevel">
        <div v-if="item.meta" style="margin-left: 10px">
          <div class="company-box-item-title" >{{item.meta.title}}</div>
          <div class="company-box-item-description">{{item.meta.description}}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import miaodian from '/guanwang/miaodian.png'
import flippedaurora from '/guanwang/flipped-aurora.svg'
import mingdao from '/guanwang/mingdao.png'
import  vform from '/advertising/vform-banner.png'
const ad = [
  {
    img : miaodian,
    href :'https://www.geelevel.com/'
  }
  ,{
    img : mingdao,
    href :'https://www.mingdao.com?s=utm_83&utm_source=gin-vue-admin&utm_medium=banner&utm_campaign=IT%E7%BD%91%E7%AB%99&utm_content=IT%E8%B5%8B%E8%83%BD%E4%B8%9A%E5%8A%A1'
  }
  ,{
    img : flippedaurora,
    href :'https://github.com/flipped-aurora'
  },


//{
   // img : 'https://webcdn.madlocker.cn/wp-content/uploads/2022/06/cropped-madlocker%C2%B7logo-01.jpg',
  //  href :'https://www.madlocker.cn',
  //  meta:{
 //     title : '深圳疯柜科技',
  //    description : '盡量别開生靣'
  //  }
 // },
  // ,{
  //   img : vform,
  //   href :'https://gitee.com/test-instructor/yangfan'
  // }
]
</script>

<style lang="scss" scoped>
.gvaaside-ad{
  margin-top: 40px;
  font-size: 12px;
  --max-width : 160px;
  .company-title{
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 1em;
  }


  .company-box{
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(var(--max-width),1fr));
    column-gap: 4px;
  }
 .company-box .company-box-item{
    margin-bottom: 12px;
    margin-right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color .2s ease;
    height: calc(var(--max-width) / 2 - 6px);
    background-color: var(--vp-c-bg-soft);
    border-radius: 4px;
    padding: 4px;
  }

  .company-box .company-box-item img{
    max-width: 100% ;
    max-height: 60px;
    object-fit: cover;
  }

  .company-box .company-box-item .company-box-item-title{
    font-size: 18px;
    font-weight: 600;
    width: 120px;
    max-width: 120px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .company-box .company-box-item .company-box-item-description{
    font-size: 12px;
    font-weight: 400;
    overflow: hidden;
    max-width: 80px;
    width: 80px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
