<template>
  <div class="p-sm-4 p-2">
    <a-spin :spinning="spinning" tip="Loading...">
      <div class="card shadow-sm">
        <a-form
          class="p-4"
          :model="MIF"
          :label-col="labelCol"
          :wrapper-col="{
            span: 30
          }"
        >
          <a-form-item name="c_b" label="C/B">
            <a-select style="max-width: 350px" v-model:value="MIF.c_b">
              <a-select-option value="0">{{
                $t('readSerialNo')
              }}</a-select-option>
              <a-select-option value="1">{{ $t('useKeyA') }}</a-select-option>
              <a-select-option value="2"> {{ $t('useKeyB') }} </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            name="cardno_start"
            :label="$t('startDigitOfRetrievedCardNo')"
          >
            <a-input-number
              v-model:value="MIF.cardno_start"
              :precision="0"
              :stringMode="true"
              max="10"
              min="1"
            />
          </a-form-item>
          <a-form-item
            :help="$t('input0ToGetAll')"
            name="cardno_digit"
            :label="$t('theLengthToExtract')"
          >
            <a-input-number
              v-model:value="MIF.cardno_digit"
              min="0"
              :precision="0"
              :stringMode="true"
            />
          </a-form-item>
          <div v-show="MIF.c_b === '1' || MIF.c_b === '2'">
            <a-form-item name="compress" :label="$t('compression')">
              <a-switch
                v-model:checked="MIF.compress"
                checkedValue="1"
                unCheckedValue="0"
              >
                <template #checkedChildren><check-outlined /></template>
                <template #unCheckedChildren><close-outlined /></template>
              </a-switch>
            </a-form-item>
            <a-form-item name="block_no" label="Block">
              <a-input-number
                v-model:value="MIF.block_no"
                min="0"
                max="63"
                :precision="0"
                :stringMode="true"
              />
            </a-form-item>
          </div>

          <a-form-item name="submit" :wrapper-col="wrapperCol">
            <a-button
              :disabled="spinning"
              type="primary"
              @click.prevent="saveData"
            >
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
  components: { CheckOutlined, CloseOutlined },
  data () {
    return {
      MIF: {
        block_no: '0',
        c_b: '0',
        cardno_digit: '8',
        cardno_start: '1',
        compress: 'false',
        key: 'null'
      },
      spinning: false,
      labelCol: { span: 7 },
      wrapperCol: { span: 30, offset: 7 },
      loading: false
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
          default:
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
      message.success('Mifare' + this.$t('update') + this.$t('success'), 10)
    }
  },
  created () {}
}
</script>
