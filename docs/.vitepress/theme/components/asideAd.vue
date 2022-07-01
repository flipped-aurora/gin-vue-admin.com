<template>
  <div class="gvaaside-ad" >
    <div class="company-box">
      <a  class="company-box-item" v-for="(item , index) in ad" :key="index" :href="item.href" target="_blank">
        <img :src="item.img" alt="geelevel">
      </a>
    </div>
  </div>
</template>

<script setup>
import miaodian from '/guanwang/miaodian.png'
import flippedaurora from '/guanwang/flipped-aurora.svg'
import huoxian from '/guanwang/huoxian.png'
const ad = [
  {
    img : miaodian,
    href :'https://www.geelevel.com/'
  }
  ,{
    img : flippedaurora,
    href :'https://github.com/flipped-aurora'
  },{
    img : 'https://webcdn.madlocker.cn/wp-content/uploads/2022/06/cropped-madlocker%C2%B7logo-01.jpg',
    href :'https://www.madlocker.cn'
  },{
    img : huoxian,
    href :'https://zone.huoxian.cn/'
  },
]
</script>

<style lang="scss" scoped>
.gvaaside-ad{
  margin-top: 40px;
  font-size: 12px;
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
    justify-content: space-around;
    align-items: center;
    transition: background-color .2s ease;
    height: calc(var(--max-width) / 2 - 6px);
    background-color: var(--vp-c-bg-soft);
    border-radius: 4px;
    //padding: 10px;
  }

  .company-box .company-box-item img{
    max-width: 100% ;
    max-height: 60px;
  }
}
</style>
