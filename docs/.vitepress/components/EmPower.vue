<template>
  <main class="empower-page">
    <section class="empower-hero">
      <div class="empower-container">
        <p class="empower-eyebrow">GVA COMMERCIAL AUTHORIZATION</p>
        <h1 aria-label="授权不只是合规，更是缩短交付路径">
          授权不只是合规，<span class="empower-title-outcome">更是缩短交付路径</span>
        </h1>
        <p class="empower-lead">
          从本公司自营项目，到面向客户的源码交付，再到独立私有版本，GVA 提供与业务阶段匹配的授权方案。
        </p>
        <div class="empower-actions">
          <a class="empower-button empower-button--primary" href="https://plugin.gin-vue-admin.com/license" target="_blank" rel="noopener">查看授权方案</a>
          <a class="empower-button empower-button--secondary" href="#authorized-value">先了解授权价值</a>
        </div>
      </div>
    </section>

    <section id="authorized-value" class="empower-section empower-section--muted">
      <div class="empower-container">
        <div class="empower-section-heading">
          <div>
            <p class="empower-eyebrow">PRODUCT VALUE</p>
            <h2>把常见需求变成连续的交付能力</h2>
          </div>
          <p>授权版面向真实企业项目组织能力，把常用模块连接为可以继续开发和交付的业务链路。</p>
        </div>

        <div class="empower-value-grid">
          <article>
            <span>01</span>
            <h3>业务协作闭环</h3>
            <p>自定义表单、流程审批、站内通知与邮件 / Webhook 串联起来，让采集、审批和触达连续发生。</p>
          </article>
          <article>
            <span>02</span>
            <h3>数据分析闭环</h3>
            <p>用数据集组织查询，以看板和报表完成分析，再通过定时导出与发送持续交付结果。</p>
          </article>
          <article>
            <span>03</span>
            <h3>企业交付能力</h3>
            <p>授权版提供达梦、人大金仓适配，并与业务协作和数据分析能力一并交付。</p>
          </article>
        </div>
      </div>
    </section>

    <section class="empower-section">
      <div class="empower-container">
        <div class="empower-section-heading">
          <div>
            <p class="empower-eyebrow">CHOOSE YOUR PLAN</p>
            <h2>按交付方式选择，不为用不到的能力付费</h2>
          </div>
          <p>每种方案解决不同阶段的问题，购买前请以当前购买页展示的权益为准。</p>
        </div>

        <div class="empower-plan-grid">
          <article>
            <p class="empower-plan-label">内部运营</p>
            <h3>自用版授权</h3>
            <p>适合本公司运营项目，获得合规商用、授权用户专区、专属文档与支持、插件优惠等权益。</p>
            <a href="https://plugin.gin-vue-admin.com/license" target="_blank" rel="noopener">查看自用版</a>
          </article>
          <article class="empower-plan-featured">
            <p class="empower-plan-label">客户交付</p>
            <h3>无限制版授权</h3>
            <p>适合需要在方案约定范围内向客户出售或交付项目源码的团队，同时享有授权服务与生态权益。</p>
            <a href="https://plugin.gin-vue-admin.com/license" target="_blank" rel="noopener">查看无限制版</a>
          </article>
          <article>
            <p class="empower-plan-label">企业级建设</p>
            <h3>独立版</h3>
            <p>适合希望在客户环境部署专属私有仓库，并完成商标、Logo、产品名称等品牌定制的组织。底层功能保持 Gin-Vue-Admin 能力体系，但使用感受和长期维护归属于客户自己的框架。</p>
            <a href="https://plugin.gin-vue-admin.com/license" target="_blank" rel="noopener">咨询独立版</a>
          </article>
        </div>

        <p class="empower-disclaimer">
          上述业务、数据与国产数据库能力由授权版提供。独立版的差异在于客户专属私有仓库、商标与品牌定制及独立版本交付；具体权益与交付内容以购买页所选方案为准。
          <span>商业或生产使用，以及需要在授权范围内调整 Gin-Vue-Admin 与 flipped-aurora 技术支持标识时，必须先获得对应授权。项目保留版权与授权识别机制，取得授权后请按官方指引处理。</span>
        </p>
      </div>
    </section>

    <section class="empower-section empower-section--promise">
      <div class="empower-container empower-promise">
        <div>
          <p class="empower-eyebrow">OUR COMMITMENT</p>
          <h2>清晰授权，长期维护</h2>
        </div>
        <p>
          除必须联网的 AI 服务及部分插件外，Gin-Vue-Admin 不会主动请求外部 GVA 服务。如未来增加主动授权查询等能力，将提前在官网和代码托管平台公开通知。
        </p>
        <a class="empower-button empower-button--primary" href="https://plugin.gin-vue-admin.com/license" target="_blank" rel="noopener">前往购买页</a>
      </div>
    </section>
  </main>
</template>

<style scoped>
.empower-page {
  min-height: 100vh;
  background: #ffffff;
  color: #1b2430;
}

.empower-container {
  width: min(calc(100% - 48px), 1180px);
  margin: 0 auto;
}

.empower-hero {
  padding: 128px 0 104px;
  border-bottom: 1px solid #e3e8ef;
  background: #f7f9fc;
  text-align: center;
}

.empower-eyebrow {
  margin: 0 0 16px;
  color: #1f8f68;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0;
}

.empower-hero h1 {
  max-width: 860px;
  margin: 0 auto;
  color: #151d28;
  font-size: 54px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.2;
}

.empower-title-outcome {
  display: inline-block;
  white-space: nowrap;
}

.empower-lead {
  max-width: 720px;
  margin: 28px auto 0;
  color: #5d6877;
  font-size: 18px;
  line-height: 1.9;
}

.empower-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: 36px;
}

.empower-button {
  display: inline-flex;
  min-width: 152px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0 24px;
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
  transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
}

.empower-button:hover {
  transform: translateY(-1px);
}

.empower-button--primary {
  background: #2264f2;
  color: #ffffff;
}

.empower-button--primary:hover {
  background: #174fc8;
  color: #ffffff;
}

.empower-button--secondary {
  border-color: #cbd4e1;
  background: #ffffff;
  color: #334155;
}

.empower-button--secondary:hover {
  border-color: #2264f2;
  color: #2264f2;
}

.empower-section {
  padding: 96px 0;
}

.empower-section--muted {
  background: #f4f7fb;
}

.empower-section-heading {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
  align-items: end;
  gap: 70px;
}

.empower-section-heading h2,
.empower-promise h2 {
  margin: 0;
  color: #18212f;
  font-size: 38px;
  font-weight: 680;
  letter-spacing: 0;
  line-height: 1.3;
}

.empower-section-heading > p,
.empower-promise > p {
  margin: 0;
  color: #626f80;
  font-size: 15px;
  line-height: 1.85;
}

.empower-value-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 52px;
  border-top: 1px solid #d8e0e9;
  border-bottom: 1px solid #d8e0e9;
}

.empower-value-grid article {
  padding: 34px 32px 36px 0;
}

.empower-value-grid article + article {
  border-left: 1px solid #d8e0e9;
  padding-left: 32px;
}

.empower-value-grid span {
  color: #2264f2;
  font-size: 13px;
  font-weight: 700;
}

.empower-value-grid h3,
.empower-plan-grid h3 {
  margin: 13px 0 12px;
  color: #18212f;
  font-size: 21px;
  font-weight: 680;
  letter-spacing: 0;
}

.empower-value-grid p,
.empower-plan-grid article > p:last-of-type {
  margin: 0;
  color: #657182;
  font-size: 14px;
  line-height: 1.8;
}

.empower-plan-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 48px;
}

.empower-plan-grid article {
  display: flex;
  min-height: 294px;
  flex-direction: column;
  border: 1px solid #dfe5ed;
  border-radius: 8px;
  padding: 30px;
  background: #ffffff;
}

.empower-plan-grid .empower-plan-featured {
  border-color: #2264f2;
  box-shadow: 0 14px 36px rgba(34, 100, 242, 0.11);
}

.empower-plan-label {
  margin: 0;
  color: #1f8f68;
  font-size: 13px;
  font-weight: 700;
}

.empower-plan-grid a {
  margin-top: auto;
  padding-top: 24px;
  color: #2264f2;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.empower-disclaimer {
  margin: 24px 0 0;
  color: #7a8492;
  font-size: 13px;
  line-height: 1.8;
  text-align: center;
}

.empower-disclaimer span {
  display: block;
  margin-top: 6px;
}

.empower-section--promise {
  border-top: 1px solid #dfe5ed;
  background: #101923;
}

.empower-promise {
  display: grid;
  grid-template-columns: minmax(240px, 0.8fr) minmax(320px, 1.4fr) auto;
  align-items: center;
  gap: 50px;
}

.empower-promise h2 {
  color: #f3f6fb;
  font-size: 30px;
}

.empower-promise > p {
  color: #aeb9c7;
}

@media (max-width: 860px) {
  .empower-container {
    width: min(calc(100% - 32px), 1180px);
  }

  .empower-hero {
    padding: 80px 0 68px;
  }

  .empower-hero h1 {
    font-size: 36px;
  }

  .empower-lead {
    font-size: 16px;
  }

  .empower-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .empower-section {
    padding: 68px 0;
  }

  .empower-section-heading,
  .empower-promise {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .empower-section-heading h2 {
    font-size: 30px;
  }

  .empower-value-grid,
  .empower-plan-grid {
    grid-template-columns: 1fr;
  }

  .empower-value-grid {
    margin-top: 34px;
  }

  .empower-value-grid article,
  .empower-value-grid article + article {
    padding: 26px 0;
    border-left: 0;
  }

  .empower-value-grid article + article {
    border-top: 1px solid #d8e0e9;
  }

  .empower-plan-grid article {
    min-height: 250px;
  }

  .empower-promise .empower-button {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .empower-button {
    transition: none;
  }
}
</style>
