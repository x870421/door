<template>
  <div class="p-sm-4 p-2">
    <div class="card shadow-sm">
      <a-form
        class="p-4"
        :model="text_parm"
        v-bind="{
          labelCol: {
            span: 4
          },
          wrapperCol: {
            span: 25
          }
        }"
      >
        <a-row class="form-row">
          <a-col :span="24" :lg="{ span: 11 }" :md="{ span: 24 }">
            <a-form-item :label="$t('lang')" name="lang">
              <a-radio-group v-model:value="text_parm.lang">
                <a-radio :value="1">English</a-radio>
                <a-radio :value="2">繁體</a-radio>
                <a-radio :value="3">简体</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col
            v-for="(item, index) in text_parm.text"
            :key="index"
            :span="24"
            :lg="{ span: 11 }"
            :md="{ span: 24 }"
          >
            <a-form-item :name="index + 1" :label="index + 1">
              <a-input
                style="max-width: 400px"
                v-model:value="item[index + 1]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :span="24" :lg="{ span: 11 }" :md="{ span: 24 }">
            <a-form-item name="submit" :wrapper-col="{ span: 25, offset: 4 }">
              <a-button type="primary" @click="saveData">
                {{ $t('submit') }}
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
export default {
  data () {
    return {
      text_parm: {
        lang: 2,
        text: [
          {
            1: '門被破壞開啟 !!'
          },
          {
            2: '記憶體1 Error !'
          },
          {
            3: '合法卡'
          },
          {
            4: '非法卡!'
          },
          {
            5: '黑名單!'
          },
          {
            6: '長度錯誤!'
          },
          {
            7: '時段錯誤!'
          },
          {
            8: '密碼 = '
          },
          {
            9: '防拆 Sensor !'
          },
          {
            10: '門未關妥'
          },
          {
            11: '反潛回錯誤'
          },
          {
            12: '刷卡紀錄已滿 !!'
          },
          {
            13: '重複刷卡 !'
          }
        ]
      }
    }
  },
  methods: {
    saveData () {
      message.success(
        this.$t('textParam') + ' ' + this.$t('update') + this.$t('success'),
        5
      )
    }
  }
}
</script>

<style></style>
