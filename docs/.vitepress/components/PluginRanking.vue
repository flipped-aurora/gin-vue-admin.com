<template>
  <div class="_wrapper">
    <div class="_line" :key="item.name" v-for="(item, index) in PLUGINS">
      <div class="_left">
        <div :class="['_rank', ...getRankClass(index)]" v-if="index !== 0">
          {{ getRank(index - 1) }}
        </div>
        <div :class="['_content', getContentCls(index)]" >
          <img
            :src="getGithubAvatar(item.name)"
            :alt="item.name"
            class="_avatar"
            v-if="index !== 0"
          />
          <a class="_name" target="_blank" :href="getGithubIndex(item.name)">{{
            item.name
          }}</a>
        </div>
      </div>
      <div class="_right">
        {{ item.count || 0 }}
      </div>

      <div class="tips">
        {{item.tips}}
      </div>
    </div>
  </div>
</template>

<script>
import { PLUGINS } from '../ranking'

const MEDAL = ['🥇', '🥈', '🥉']
export default {
  data() {
    return {
      PLUGINS: Object.freeze(PLUGINS),
    }
  },
  methods: {
    getGithubAvatar(name) {
      return `https://avatars.githubusercontent.com/${name}`
    },
    getGithubIndex(name) {
      return `https://github.com/${name}`
    },
    getRank(num) {
      return MEDAL[num] || num + 1
    },
    getRankClass(index) {
      const cls = []
      if (index < 3) {
        cls.push('_expand')
      } else {
        cls.push('_offset')
      }
      if (index >= 9) {
        cls.push('_transform_rank')
      }
      return cls
    },
    getContentCls(idx) {
      if (idx >= 9) {
        return '_transform_content'
      }
      return ''
    },
  },
}
</script>

<style lang="scss" scoped>
._wrapper {
  padding: 25px;
  border-radius: 3px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.15);
  display: inline-flex;
  flex-direction: column;
  max-width: 650px;
  width: 80vw;
}

.x_flex {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
}

._line {
  & + & {
    margin-top: 18px;
  }
  width: 100%;
  overflow: hidden;

  @extend .x_flex;
  justify-content: flex-start;
}

._rank {
  padding-right: 10px;
  width: 40px;
  text-align: center;
  min-width: 40px;
}

._content {
  @extend .x_flex;

  padding-left: 5px;
  font-size: 15px;
}

._left {
  @extend .x_flex;
  width: 40%;
}
._right{
  text-align: left;
}
.tips{
  margin-left: auto;
  max-width: 30%;
  width: 30%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
}
._avatar {
  $size: 25px;

  width: $size;
  height: $size;
  max-width: 100%;
  border-radius: 50%;

  user-select: none;
  pointer-events: none;
  cursor: default;
}

._name {
  padding-left: 10px;
  color: inherit;
  text-decoration: none !important;

  &:hover {
    color: #259bd9;
  }
}



@media (max-width: 750px) {
  .tips{
    display: none;
  }
}
</style>
