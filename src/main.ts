/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
 */
import 'virtual:uno.css';
import 'ant-design-vue/dist/reset.css';
import '/@/design/index.less';

import App from './App.vue';
import { createApp } from 'vue';
import { registerGlobComp } from '/@/components/registerGlobComp';
import { initAppConfigStore } from '/@/logics/initAppConfig';
import { setupErrorHandle } from '/@/logics/error-handle';
import { setupGlobDirectives } from '/@/directives';
import { setupI18n } from '/@/locales/setupI18n';
import { setupRouter, router } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupStore } from '/@/store';
import { isDevMode } from '/@/utils/env';

async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  // Initialize internal system configuration
  initAppConfigStore();

  // Register global components
  registerGlobComp(app);

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);

  // Configure routing
  setupRouter(app);

  // router-guard
  setupRouterGuard(router);

  // Register global directive
  setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app');
}

// 仅开发模式显示
if (!isDevMode()) {
  console.log(
    '%c thingsboard %c Vue \n%c 。\n 您的一个关注，就是对我们最大的支持：  https://gitee.com/oliver225/thingsboard-ui-vue3  （请点 star 收藏我们）\n 1069035666@qq.com 17621315188 %c\n ',
    'font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:39px;color:#0f87e8;-webkit-text-fill-color:#0f87e8;-webkit-text-stroke:1px #0f87e8;',
    'font-size:24px;color:#aaa;',
    'font-size:14px;color:#888;',
    'font-size:12px;',
  );
}
bootstrap();
