<template>
  <div class="p-4">
    <a-spin :spinning="spinning" tip="Loading...">
      <div class="card shadow-sm">
        <a-form
          class="p-4"
          :model="param"
          :wrapper-col="{
            span: 30
          }"
          :label-col="labelCol"
        >
          <a-form-item name="IR_det" :label="$t('InfraredDetection')">
            <a-switch
              v-model:checked="param.IR_det"
              :checkedValue="'true'"
              :unCheckedValue="'false'"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren><close-outlined /></template>
            </a-switch>
          </a-form-item>

          <a-form-item name="device_out_door" :label="$t('IndoorOrOutdoor')">
            <a-radio-group class="ms-3" v-model:value="param.device_out_door">
              <a-radio :value="'true'">
                {{ $t('hostSettingsOutdoor') }}
              </a-radio>
              <a-radio :value="'false'">
                {{ $t('hostSettingsIndoor') }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item name="face_shot" :label="$t('swipeCardAndTakePhoto')">
            <a-switch
              v-model:checked="param.face_shot"
              :checkedValue="1"
              :unCheckedValue="0"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren><close-outlined /></template>
            </a-switch>
          </a-form-item>

          <a-form-item name="standby_time" :label="$t('standbyTime')">
            <div style="max-width: 350px">
              <a-input-number
                :max="60"
                :min="0"
                v-model:value="param.standby_time"
                :placeholder="$t('standbyTimeFeedback')"
                class="w-100"
                :stringMode="true"
              />
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
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
export default {
  components: {
    CheckOutlined,
    CloseOutlined
  },
  data () {
    return {
      param: {
        '2nd_reader_chktime': 'false',
        IR_det: 'true',
        anti_passback: 'off',
        coercion_no: '111',
        device_out_door: 'true',
        face_shot: 'true',
        master_card: '30191000',
        standby_time: '10'
      },
      spinning: false,
      wrapperCol: { span: 30, offset: 7 },
      labelCol: {
        span: 8
      }
    }
  },
  watch: {
    '$i18n.locale': {
      handler (newValue) {
        switch (newValue) {
          case 'en':
            this.labelCol = {
              span: 10
            }
            this.wrapperCol = { span: 30, offset: 10 }
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
        this.$t('param') + ' ' + this.$t('update') + this.$t('success'),
        5
      )
    }
  }
}
</script>

<style></style>
