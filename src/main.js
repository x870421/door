import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import 'bootstrap/dist/js/bootstrap.bundle'

const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(i18n)
app.mount('#app')
