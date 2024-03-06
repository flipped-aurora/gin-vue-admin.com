<template>
  <div class="gvaaside-ad" >
    <div class="wwads-cn wwads-vertical wwads-sticky" data-id="260" style="max-width:180px;z-index:9999;"></div>
    <div class="company-box">
      <a  class="company-box-item" v-for="(item , index) in ad" :key="index" :href="item.href" target="_blank" style="padding: 0">
        <img :src="item.img" alt="geelevel" class="rounded overflow-hidden">
        <div v-if="item.meta" style="margin-left: 10px">
          <div class="company-box-item-title" >{{item.meta.title}}</div>
          <div class="company-box-item-description">{{item.meta.description}}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import daili from '/advertising/daili.jpg'
import liuliang from '/advertising/liuliang.jpg'
import  vform from '/advertising/vform-banner.png'
const ad = [
  {
    img : liuliang,
    href :'https://ym.ksjhaoka.com/?s=srtGcMEo83371'
  }

  ,{
    img : daili,
    href :'https://ym.ksjhaoka.com/invite?s=srtGcMEo83371'
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
    max-height: 80px;
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
