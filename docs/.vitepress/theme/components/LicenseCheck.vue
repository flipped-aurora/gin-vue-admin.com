<template>
  <div class="lc-page">
    <!-- 头部:图标 + 标题 + 搜索 -->
    <section class="lc-hero">
      <div class="lc-hero__icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none" stroke="#e8efff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M38 21v-9.5a3.5 3.5 0 0 0-3.5-3.5h-21A3.5 3.5 0 0 0 10 11.5v25a3.5 3.5 0 0 0 3.5 3.5H22" />
          <path d="M16 15h16M16 21h16M16 27h8" />
          <circle cx="33" cy="32" r="5" />
          <path d="M30.5 36.2 29 43l4-2.1 4 2.1-1.5-6.8" />
        </svg>
      </div>
      <h1 class="lc-hero__title">Gin-Vue-Admin 官方授权查询系统</h1>
      <p class="lc-hero__sub">输入网站域名，实时查询该站点是否获得官方正版授权</p>

      <form class="lc-search" @submit.prevent="query">
        <input
          v-model="keyword"
          class="lc-search__input"
          type="text"
          aria-label="要查询的域名"
          placeholder="请输入要查询的域名，如：demo.gin-vue-admin.com"
          :disabled="loading"
        />
        <button type="submit" class="gva-btn gva-btn--primary lc-search__btn" :disabled="loading">
          {{ loading ? '查询中…' : '点击查询' }}
        </button>
      </form>
      <p v-if="errorMsg" class="lc-feedback">{{ errorMsg }}</p>
    </section>

    <!-- 查询结果:正版授权证书 -->
    <section v-if="result && result.authorized" class="lc-result">
      <div class="lc-cert">
        <div class="lc-cert__paper">
          <!-- 底纹:青海波(祥云水波)图案,同心圆错行排布、下行遮叠上行,只露出上沿弧 -->
          <svg class="lc-cert__sea" aria-hidden="true">
            <defs>
              <pattern id="lc-seigaiha" :width="SEA_R * 2" :height="SEA_R" patternUnits="userSpaceOnUse">
                <g v-for="(s, i) in SEA_SCALES" :key="i" :transform="`translate(${s.x} ${s.y})`">
                  <circle class="lc-sea__cap" :r="SEA_R" />
                  <circle class="lc-sea__ring" :r="SEA_R * 0.75" />
                  <circle class="lc-sea__ring" :r="SEA_R * 0.5" />
                  <circle class="lc-sea__ring" :r="SEA_R * 0.25" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lc-seigaiha)" />
          </svg>

          <!-- 内框:双线描边 + 四角回纹角饰 + 上下菱形宝相点 -->
          <div class="lc-cert__frame" aria-hidden="true">
            <svg
              v-for="c in ['tl', 'tr', 'bl', 'br']"
              :key="c"
              class="lc-cert__corner"
              :class="`lc-cert__corner--${c}`"
              viewBox="0 0 44 44"
            >
              <path d="M44 2H10Q2 2 2 10V44" fill="none" stroke="currentColor" stroke-width="2.5" />
              <path d="M44 8.5H14Q8.5 8.5 8.5 14V44" fill="none" stroke="currentColor" stroke-width="1.2" />
              <path d="M30 14H14V30" fill="none" stroke="currentColor" stroke-width="1.2" />
              <path d="M25.5 18.5H18.5V25.5" fill="none" stroke="currentColor" stroke-width="1.2" />
              <rect x="20.5" y="20.5" width="3.5" height="3.5" fill="currentColor" />
            </svg>
            <span class="lc-cert__gem lc-cert__gem--top" />
            <span class="lc-cert__gem lc-cert__gem--bottom" />
          </div>

          <div class="lc-cert__body">
            <!-- 正版授权徽章 -->
            <div class="lc-badge">
              <span class="lc-badge__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="12" cy="9" r="5.2" />
                  <circle cx="12" cy="9" r="2" fill="#fff" stroke="none" />
                  <path d="M8.9 13.3 7.2 20.6l4.8-2.5 4.8 2.5-1.7-7.3" />
                </svg>
              </span>
              <span class="lc-badge__main">
                <span class="lc-badge__text">正版授权</span>
                <span class="lc-badge__stars" aria-hidden="true">
                  <span class="lc-badge__eq" />
                  <svg v-for="n in 4" :key="n" viewBox="0 0 24 24">
                    <path d="M12 2.5l2.95 5.98 6.6.96-4.78 4.65 1.13 6.58L12 17.57l-5.9 3.1 1.13-6.58L2.45 9.44l6.6-.96z" />
                  </svg>
                  <span class="lc-badge__eq" />
                </span>
              </span>
            </div>

            <!-- 证书标题:两侧桂枝拢括 -->
            <div class="lc-cert__titlebar">
              <svg class="lc-cert__laurel" viewBox="0 0 34 64" aria-hidden="true">
                <path class="lc-laurel__stem" d="M26 6C12 20 12 44 26 58" />
                <g v-for="(leaf, i) in LAUREL_LEAVES" :key="i" :transform="`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r})`">
                  <path class="lc-laurel__leaf" d="M0 0Q-5.5-4.5-13-2Q-6.5 4.5 0 0Z" />
                </g>
              </svg>
              <h2 class="lc-cert__title">网站授权认定证书</h2>
              <svg class="lc-cert__laurel lc-cert__laurel--right" viewBox="0 0 34 64" aria-hidden="true">
                <path class="lc-laurel__stem" d="M26 6C12 20 12 44 26 58" />
                <g v-for="(leaf, i) in LAUREL_LEAVES" :key="i" :transform="`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r})`">
                  <path class="lc-laurel__leaf" d="M0 0Q-5.5-4.5-13-2Q-6.5 4.5 0 0Z" />
                </g>
              </svg>
            </div>

            <p class="lc-cert__domain">{{ result.domain || queriedDomain }}</p>

            <!-- 认证基本信息 -->
            <div class="lc-info">
              <h3 class="lc-info__title">认证基本信息</h3>
              <dl class="lc-info__grid">
                <template v-for="row in infoRows" :key="row.label">
                  <dt>{{ row.label }}</dt>
                  <dd>{{ row.value }}</dd>
                </template>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <p class="lc-result__note">查询结果由 Gin-Vue-Admin 官方授权数据库实时返回</p>
    </section>

    <!-- 查询结果:未查询到授权 -->
    <section v-else-if="result" class="lc-result">
      <div class="lc-miss">
        <span class="lc-miss__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 3l7 3v5c0 4.4-3 8.2-7 9.5C8 19.2 5 15.4 5 11V6z" />
            <path d="M12 8.5v4" />
            <circle cx="12" cy="15.8" r=".9" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <h2 class="lc-miss__title">未查询到正版授权</h2>
        <p class="lc-miss__domain">{{ result.domain || queriedDomain }}</p>
        <p class="lc-miss__desc">
          该域名暂未查询到 Gin-Vue-Admin 官方正版授权记录，请注意甄别盗版风险。
          如果您已购买授权但查询不到，请联系官方客服核实绑定信息。
        </p>
        <div class="lc-miss__actions">
          <a class="gva-btn gva-btn--primary" href="https://plugin.gin-vue-admin.com/license" target="_blank" rel="noopener">
            购买正版授权
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 代理地址：见 docs/vite.config.ts 中 /pluginApi -> plugin.gin-vue-admin.com/api
// 统一前缀 pluginApi 会在代理转发时去除。
const CHECK_URL = '/pluginApi/licenseQuery/check'

// ---- 青海波底纹几何 ----
// 半径 R 的同心圆按"行距 R/2、隔行横移 R"错排,后画的行遮住上一行的下半部,
// 只露出上沿弧线,即传统水波(鱼鳞)纹。pattern 图块为 2R x R,把所有与图块
// 相交的圆(含相邻行列)按自上而下的次序画进来,保证四方连续无接缝。
const SEA_R = 26
const SEA_SCALES = (() => {
  const DY = SEA_R / 2
  const scales = []
  for (let row = -1; row <= 3; row++) {
    const y = row * DY
    const xs = row % 2 === 0 ? [0, SEA_R * 2] : [-SEA_R, SEA_R, SEA_R * 3]
    xs.forEach((x) => scales.push({ x, y }))
  }
  return scales
})()

// 桂枝叶片沿茎弧 M26 6 C12 20 12 44 26 58 的锚点与朝向(手工定位)
const LAUREL_LEAVES = [
  { x: 21.6, y: 11.4, r: -38 },
  { x: 17.2, y: 20.8, r: -18 },
  { x: 15.5, y: 32.0, r: 0 },
  { x: 17.2, y: 43.2, r: 18 },
  { x: 21.6, y: 52.6, r: 38 },
]

// 授权类型接口返回英文枚举(实测 unlimited/self),映射为中文展示,未知值原样透出
const AUTH_LEVEL_TEXT = { unlimited: '无限制', self: '自营' }

const keyword = ref('')
const loading = ref(false)
const errorMsg = ref('')
const result = ref(null)
// 本次查询的规整域名:接口偶发返回空 domain 时作展示兜底
const queriedDomain = ref('')

// 证书信息行:值为空的字段自动隐藏(企业/个人主体各取所需)
const infoRows = computed(() => {
  const r = result.value
  if (!r) return []
  return [
    { label: '主体类型', value: r.subjectType },
    { label: '主办单位名称', value: r.companyName },
    { label: '统一社会信用代码', value: r.uscc },
    { label: '授权人姓名', value: r.holderName },
    { label: '身份证号', value: r.idNo },
    { label: '授权类型', value: AUTH_LEVEL_TEXT[r.authLevel] || r.authLevel },
    { label: '证书编号', value: r.certNo },
  ].filter((row) => row.value)
})

// 宽松规整:全角句点转半角、去协议、路径、端口,小写,中文域名转 punycode。
// 最终以接口返回的 domain 为准展示。
const normalizeDomain = (raw) => {
  let domain = raw
    .trim()
    .replace(/[。．｡]/g, '.')
    .replace(/^[a-z]+:\/\//i, '')
    .split(/[/?#]/)[0]
    .replace(/:\d+$/, '')
    .toLowerCase()
  try {
    // URL 会做 IDNA 规整(例:例子.com -> xn--fsqu00a.com);非法输入保持原样交给接口判断
    if (domain) domain = new URL(`http://${domain}`).hostname
  } catch (e) {}
  return domain
}

const query = async () => {
  const domain = normalizeDomain(keyword.value)
  if (!domain) {
    errorMsg.value = '请输入要查询的域名'
    result.value = null
    return
  }
  loading.value = true
  errorMsg.value = ''
  result.value = null
  queriedDomain.value = domain

  // 查询前就同步地址栏(只改 domain 参数,保留其余参数与 hash),方便分享;
  // 也保证失败后刷新重试的是本次输入,而不是上一次成功的域名
  const url = new URL(window.location.href)
  url.searchParams.set('domain', domain)
  history.replaceState(null, '', url)

  // 上游挂起时最多等 15s,避免输入框和按钮永久锁死
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)
  try {
    const res = await fetch(`${CHECK_URL}?domain=${encodeURIComponent(domain)}`, {
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`接口返回 ${res.status}`)
    const json = await res.json()
    if (json.code !== 0) throw new Error(json.msg || '查询失败')
    if (!json.data) throw new Error('接口未返回数据')
    result.value = json.data
  } catch (e) {
    if (e && e.name === 'AbortError') {
      errorMsg.value = '查询超时，请稍后重试'
    } else if (e instanceof TypeError || e instanceof SyntaxError) {
      // fetch 网络错误 / 代理返回非 JSON,不把英文技术报错抛给用户
      errorMsg.value = '网络异常，请稍后重试'
    } else {
      errorMsg.value = `查询失败：${e.message || e}`
    }
  } finally {
    clearTimeout(timer)
    loading.value = false
  }
}

// 支持 /empower/check?domain=xxx 直达查询
onMounted(() => {
  const domain = new URLSearchParams(window.location.search).get('domain')
  if (domain) {
    keyword.value = domain
    query()
  }
})
</script>

<style scoped lang="scss">
.lc-page {
  min-height: calc(100vh - 140px);
  background: var(--gva-bg-base);
  color: var(--gva-text-body);
  font-family: var(--vp-font-family-base);
  -webkit-font-smoothing: antialiased;
}

/* ---- 头部 ---- */
.lc-hero {
  position: relative;
  padding: 84px 24px 8px;
  text-align: center;
}
.lc-hero::before {
  content: '';
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 560px;
  max-width: 90vw;
  height: 340px;
  background: radial-gradient(closest-side, var(--gva-primary-soft), transparent 70%);
  pointer-events: none;
}
.lc-hero__icon {
  position: relative;
  width: 78px;
  height: 78px;
  margin: 0 auto;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(165deg, #1b2740, #0a0e1a 70%);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 18px 40px rgba(10, 14, 26, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08);

  svg {
    width: 42px;
    height: 42px;
  }
}
.lc-hero__title {
  position: relative;
  margin: 26px 0 0;
  font-size: clamp(26px, 3vw, 34px);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--gva-text-strong);
}
.lc-hero__sub {
  position: relative;
  margin: 12px 0 0;
  font-size: 16px;
  color: var(--gva-text-body);
}

/* ---- 搜索条 ---- */
.lc-search {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 660px;
  margin: 36px auto 0;
  padding: 7px 7px 7px 20px;
  background: #fff;
  border: 1px solid var(--gva-border);
  border-radius: var(--gva-radius-sm);
  box-shadow: var(--gva-shadow);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.lc-search:focus-within {
  border-color: var(--gva-primary);
  box-shadow: 0 0 0 3px var(--gva-primary-ring);
}
.lc-search__input {
  flex: 1;
  min-width: 0;
  height: 43px;
  border: 0;
  outline: 0;
  background: transparent;
  font-size: 16px;
  font-family: inherit;
  color: var(--gva-text-strong);

  &::placeholder {
    color: var(--gva-text-muted);
  }
}
.lc-search__btn {
  flex: none;
}
:global(html.dark .lc-search) {
  background: var(--gva-bg-dark-soft);
}

.lc-feedback {
  position: relative;
  margin: 14px auto 0;
  max-width: 660px;
  font-size: 16px;
  color: var(--gva-danger);
}

/* ---- 结果区 ---- */
.lc-result {
  padding: 0 24px 48px;
}
.lc-result__note {
  margin: 18px auto 0;
  text-align: center;
  font-size: 16px;
  color: var(--gva-text-muted);
}

/* ---- 证书:外层蓝青渐变厚框 ---- */
.lc-cert {
  max-width: 780px;
  margin: 40px auto 0;
  padding: 18px;
  border-radius: 8px;
  background: linear-gradient(45deg, var(--gva-primary-hover) 0%, var(--gva-primary) 38%, #38bdf8 100%);
  box-shadow: var(--gva-shadow-lg);
}

/* 证书纸面:恒为浅色,内部配色属于"画面"而非 UI,不随暗色模式翻转。
   画面内的品牌蓝同理按"印刷色"固定(--lc-brand-ink),不用会翻转的 --gva-primary */
.lc-cert__paper {
  --lc-brand-ink: #2264f2;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  background: #edf4fd;
  padding: 64px 56px 56px;
}
.lc-cert__sea {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.lc-sea__cap {
  fill: #edf4fd;
  stroke: #d2e2f6;
  stroke-width: 1;
}
.lc-sea__ring {
  fill: none;
  stroke: #d2e2f6;
  stroke-width: 1;
}

/* 内框双线 + 角饰 */
.lc-cert__frame {
  position: absolute;
  inset: 20px;
  border: 1.5px solid #a3c2ec;
  pointer-events: none;
}
.lc-cert__frame::before {
  content: '';
  position: absolute;
  inset: 5px;
  border: 1px solid #bcd3f1;
}
.lc-cert__corner {
  position: absolute;
  width: 40px;
  height: 40px;
  color: #5f8fd8;
}
.lc-cert__corner--tl { top: -2px; left: -2px; }
.lc-cert__corner--tr { top: -2px; right: -2px; transform: scaleX(-1); }
.lc-cert__corner--bl { bottom: -2px; left: -2px; transform: scaleY(-1); }
.lc-cert__corner--br { bottom: -2px; right: -2px; transform: scale(-1, -1); }
.lc-cert__gem {
  position: absolute;
  left: 50%;
  width: 9px;
  height: 9px;
  background: #edf4fd;
  border: 1.5px solid #5f8fd8;
  transform: translateX(-50%) rotate(45deg);
}
.lc-cert__gem--top { top: -6px; }
.lc-cert__gem--bottom { bottom: -6px; }

.lc-cert__body {
  position: relative;
  text-align: center;
}

/* 正版授权徽章 */
.lc-badge {
  display: inline-flex;
  align-items: stretch;
  overflow: hidden;
  background: #fff;
  border: 1.5px solid var(--lc-brand-ink);
  border-radius: 6px;
  box-shadow: 0 6px 18px rgba(34, 100, 242, 0.18);
}
.lc-badge__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  background: var(--lc-brand-ink);

  svg {
    width: 30px;
    height: 30px;
  }
}
.lc-badge__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 10px 20px;
}
.lc-badge__text {
  font-size: 21px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.18em;
  text-indent: 0.18em;
  color: var(--lc-brand-ink);
}
.lc-badge__stars {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--lc-brand-ink);

  svg {
    width: 11px;
    height: 11px;
    fill: currentColor;
  }
}
.lc-badge__eq {
  width: 11px;
  height: 7px;
  border-top: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
}

/* 证书标题 + 桂枝 */
.lc-cert__titlebar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;
}
.lc-cert__title {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.12em;
  text-indent: 0.12em;
  color: #16294d;
}
.lc-cert__laurel {
  flex: none;
  width: 30px;
  height: 56px;
  color: #7f9fd0;
}
.lc-cert__laurel--right {
  transform: scaleX(-1);
}
.lc-laurel__stem {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
}
.lc-laurel__leaf {
  fill: currentColor;
}

.lc-cert__domain {
  margin: 20px 0 0;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: 0.02em;
  word-break: break-all;
  color: #1a2f57;
}

/* 认证基本信息面板 */
.lc-info {
  max-width: 520px;
  margin: 30px auto 0;
  padding: 24px 34px 26px;
  text-align: left;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #dbe8f8;
  border-radius: 8px;
}
.lc-info__title {
  margin: 0 0 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid #e4edf9;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #1c2f52;
}
.lc-info__grid {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 24px;
  row-gap: 12px;
  margin: 0;

  dt {
    font-size: 15px;
    font-weight: 400;
    white-space: nowrap;
    color: #7d8ba6;
  }
  dd {
    margin: 0;
    font-size: 15px;
    font-weight: 500;
    word-break: break-all;
    color: #263a5e;
  }
}

/* ---- 未查询到授权 ---- */
.lc-miss {
  max-width: 560px;
  margin: 40px auto 0;
  padding: 44px 36px;
  text-align: center;
  background: var(--gva-bg-base);
  border: 1px solid var(--gva-border);
  border-radius: var(--gva-radius);
  box-shadow: var(--gva-shadow-sm);
}
.lc-miss__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(245, 158, 11, 0.12);
  color: var(--gva-amber);

  svg {
    width: 30px;
    height: 30px;
  }
}
.lc-miss__title {
  margin: 18px 0 0;
  padding: 0;
  border: 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--gva-text-strong);
}
.lc-miss__domain {
  display: inline-block;
  max-width: 100%;
  margin: 14px auto 0;
  padding: 4px 14px;
  border-radius: 999px;
  background: var(--gva-primary-soft);
  color: var(--gva-primary);
  font-family: var(--vp-font-family-mono);
  font-size: 16px;
  font-weight: 500;
  word-break: break-all;
}
.lc-miss__desc {
  margin: 14px 0 0;
  font-size: 16px;
  line-height: 1.7;
  color: var(--gva-text-body);
}
.lc-miss__actions {
  margin-top: 26px;
}

/* ---- 移动端 ---- */
@media (max-width: 860px) {
  .lc-hero {
    padding: 64px 20px 4px;
  }
  .lc-hero__title {
    font-size: 24px;
  }
  .lc-search {
    margin-top: 28px;
    padding-left: 14px;
  }
  .lc-result {
    padding: 0 16px 72px;
  }
  .lc-cert {
    margin-top: 32px;
    padding: 10px;
    border-radius: 6px;
  }
  .lc-cert__paper {
    padding: 44px 18px 36px;
  }
  .lc-cert__frame {
    inset: 10px;
  }
  .lc-cert__corner {
    width: 30px;
    height: 30px;
  }
  .lc-cert__titlebar {
    gap: 10px;
  }
  .lc-cert__title {
    font-size: 22px;
    letter-spacing: 0.06em;
  }
  .lc-cert__laurel {
    width: 22px;
    height: 44px;
  }
  .lc-cert__domain {
    font-size: 20px;
  }
  .lc-badge__text {
    font-size: 18px;
  }
  .lc-info {
    padding: 20px 18px;
  }
  .lc-info__grid {
    column-gap: 14px;
  }
}
</style>
