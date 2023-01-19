<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script>
import zhTW from 'ant-design-vue/es/locale/zh_TW'
import enUS from 'ant-design-vue/es/locale/en_US'
import 'dayjs/locale/zh-tw'

export default {
  data () {
    return {
      locale: zhTW,
      date: ''
    }
  },
  watch: {
    '$i18n.locale': {
      handler (newValue) {
        switch (newValue) {
          case 'en':
            this.locale = enUS
            break
          case 'zh-TW':
            this.locale = zhTW
            break
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
@import './assets/all.scss';
</style>
