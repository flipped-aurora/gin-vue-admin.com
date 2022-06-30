<template>
  <section id="company-group">
    <div class="container">
      <div class="company-title">
        合作企业
      </div>
      <div class="company-box">
        <a  class="company-box-item" v-for="(item , index) in ad" :key="index" :href="item.href">
          <img :src="item.img" alt="geelevel">
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import miaodian from '/guanwang/miaodian.png'
import flippedaurora from '/guanwang/flipped-aurora.svg'

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
    href :'https://www.madlocker.cn/about#blank'
  },
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
  margin-bottom: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: space-around;
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
</style>
