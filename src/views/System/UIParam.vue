<template>
  <div class="p-sm-4 p-2">
    <a-spin :spinning="spinning" tip="Loading...">
      <div v-cloak class="card shadow-sm">
        <a-form
          class="p-4"
          :model="ui_parms"
          :label-col="labelCol"
          :wrapper-col="{
            span: 30
          }"
        >
          <a-form-item :label="$t('lang')" name="lang">
            <a-select
              v-model:value="ui_parms.lang"
              :options="[
                { value: 0, label: 'English' },
                { value: 1, label: '繁體' },
                { value: 2, label: '简体' }
              ]"
              style="max-width: 350px"
            >
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('dateFormat')" name="date_format">
            <a-select
              v-model:value="ui_parms.date_format"
              :options="[
                { value: 0, label: 'YYYY/MM/DD' },
                { value: 1, label: 'MM/DD/YYYY' },
                { value: 2, label: 'DD/MM/YYYY' },
                { value: 3, label: 'YYYY-MM-DD' },
                { value: 4, label: 'MM-DD-YYYY' },
                { value: 5, label: 'DD-MM-YYYY' }
              ]"
              style="max-width: 350px"
            >
            </a-select>
          </a-form-item>
          <a-form-item
            :label="$t('LCDBacklightMode')"
            name="backlight_mode_panel"
          >
            <a-radio-group v-model:value="ui_parms.backlight_mode_panel">
              <a-radio :value="0">Auto(10{{ $t('s') }})</a-radio>
              <a-radio :value="1">{{ $t('turnOn') }}</a-radio>
              <a-radio :value="2">{{ $t('turnOff') }}</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            :label="$t('KeyBacklightMode')"
            name="backlight_mode_btn"
          >
            <a-radio-group v-model:value="ui_parms.backlight_mode_btn">
              <a-radio :value="0">Auto(10{{ $t('s') }})</a-radio>
              <a-radio :value="1">{{ $t('turnOn') }}</a-radio>
              <a-radio :value="2">{{ $t('turnOff') }}</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="$t('msgShowTime')" name="msg_showtime">
            <a-input-number
              v-model:value="ui_parms.msg_showtime"
              :min="0"
              :max="255"
            />
            <span class="ant-form-text">{{ $t('s') }}</span>
          </a-form-item>
          <a-form-item :label="$t('numberKeyLock')" name="no_key_lock">
            <a-switch
              :checkedValue="1"
              :unCheckedValue="0"
              v-model:checked="ui_parms.no_key_lock"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren><close-outlined /></template>
            </a-switch>
          </a-form-item>
          <a-form-item :label="$t('functionKeyLock')" name="func_key_lock">
            <a-switch
              :checkedValue="1"
              :unCheckedValue="0"
              v-model:checked="ui_parms.func_key_lock"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren><close-outlined /></template>
            </a-switch>
          </a-form-item>
          <a-form-item :label="$t('cardNumberDisplay')" name="show_card_no">
            <a-select
              v-model:value="ui_parms.show_card_no"
              :options="[
                { value: 0, label: $t('show*') },
                { value: 1, label: $t('showCardNumber') },
                { value: 2, label: $t('theLast3YardsShow*') }
              ]"
              style="max-width: 350px"
            >
            </a-select>
          </a-form-item>

          <a-form-item :label="$t('volume')" name="volumn">
            <div style="max-width: 350px">
              <a-slider
                :tooltip-visible="false"
                :min="0"
                :max="3"
                v-model:value="ui_parms.volumn"
                :marks="{
                  0: $t('mute'),
                  1: $t('low'),
                  2: $t('middle'),
                  3: {
                    style: {
                      color: '#f50'
                    },
                    label: $t('loudly')
                  }
                }"
              >
              </a-slider>
            </div>
          </a-form-item>
          <a-form-item name="submit" :wrapper-col="wrapperCol">
            <a-button type="primary" @click.prevent="saveData">
              {{ $t('submit') }}
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-spin>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    CheckOutlined,
    CloseOutlined
  },
  data () {
    return {
      ui_parms: {
        backlight_mode_btn: 0,
        backlight_mode_panel: 0,
        date_format: 0,
        door_number: 1,
        func_key_lock: 1,
        id: 1,
        lang: 0,
        msg_showtime: 0,
        no_key_lock: 1,
        show_card_no: 1,
        volumn: 3
      },
      spinning: false,
      labelCol: { span: 7 },
      wrapperCol: { span: 30, offset: 7 }
    }
  },
  watch: {
    '$i18n.locale': {
      handler (newValue) {
        switch (newValue) {
          case 'en':
            this.labelCol = {
              span: 9
            }
            this.wrapperCol = { span: 30, offset: 9 }
            break
          case 'zh-TW':
            this.labelCol = {
              span: 7
            }
            this.wrapperCol = { span: 30, offset: 7 }
            break
        }
      },
      immediate: true
    }
  },
  methods: {
    saveData () {
      message.success(
        this.$t('UIParam') + ' ' + this.$t('update') + this.$t('success'),
        5
      )
    }
  },
  created () {}
}
</script>

<style></style>
