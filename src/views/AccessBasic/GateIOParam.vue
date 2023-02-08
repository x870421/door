<template>
  <div class="p-4" v-cloak>
    <div class="card shadow-sm">
      <a-spin :spinning="spinning" tip="Loading...">
        <a-form
          ref="gateIOForm"
          :label-col="labelCol"
          :wrapper-col="{
            span: 20
          }"
          class="p-4 mx-auto"
          :model="door"
        >
          <a-form-item :label="$t('doorRelayAction')" name="dr_rel_time">
            <a-radio-group
              :options="[
                { label: this.$t('toggleMode'), value: '65535' },
                { label: this.$t('latchMode'), value: '0' },
                { label: this.$t('pulseMode'), value: 'on' }
              ]"
              v-model:value="door.dr_rel_time"
            />
          </a-form-item>
          <a-form-item
            :label="$t('doorRelayTime')"
            name="dr_number"
            :help="$t('timeUnit')"
            v-show="door.dr_rel_time === 'on'"
            :rules="[{ required: true, message: '你好!' }]"
          >
            <a-input-number
              v-model:value="door.dr_number"
              :min="0"
              :max="6000"
              :placeholder="$t('inputTime')"
              :precision="0"
              :stringMode="true"
            />
          </a-form-item>

          <a-form-item :label="$t('alarmOutputAction')" name="dr_alarm_time">
            <a-radio-group
              :options="[
                { label: this.$t('toggleMode'), value: '65535' },
                { label: this.$t('latchMode'), value: '0' },
                { label: this.$t('pulseMode'), value: 'on' }
              ]"
              v-model:value="door.dr_alarm_time"
            />
          </a-form-item>

          <!-- <div
            class="input-margin"
            :class="{ 'alarm-en-input-margin': locale === 'en' }"
          ></div> -->
          <a-form-item
            :label="$t('alarmOutputTime')"
            name="alarm_time"
            :help="$t('timeUnit')"
            v-if="door.dr_alarm_time === 'on'"
            :rules="[{ required: true, message: '你好!' }]"
          >
            <a-input-number
              v-model:value="door.alarm_time"
              :min="0"
              :max="6000"
              :placeholder="$t('inputTime')"
              :precision="0"
              :stringMode="true"
            />
          </a-form-item>

          <a-form-item label="DoorSensor" name="dr_sen_mode">
            <a-select
              v-model:value="door.dr_sen_mode"
              :options="[
                { value: '0', label: $t('doorSensor-label1') },
                { value: '1', label: $t('doorSensor-label2') }
              ]"
              style="max-width: 350px"
            >
            </a-select>
          </a-form-item>

          <a-form-item
            :label="$t('doorSensorAlarm')"
            name="dr_sen_alarm_enable"
          >
            <a-switch
              :checkedValue="'1'"
              :unCheckedValue="'0'"
              v-model:checked="door.dr_sen_alarm_enable"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren><close-outlined /></template>
            </a-switch>
          </a-form-item>
          <a-form-item label="CaseSensor" name="door.case_sensor">
            <a-switch
              :checkedValue="'1'"
              :unCheckedValue="'0'"
              v-model:checked="door.case_sensor"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren><close-outlined /></template>
            </a-switch>
          </a-form-item>
          <a-form-item :label="$t('caseSensorAlarm')" name="case_alarm_mode">
            <a-select
              v-model:value="door.case_alarm_mode"
              :options="[
                { value: '1', label: 'Buzzer' },
                { value: '2', label: 'AlarmRelay' },
                { value: '3', label: $t('selectAll') }
              ]"
              style="max-width: 350px"
            >
            </a-select>
          </a-form-item>
          <a-form-item
            :help="$t('timeUnit')"
            :label="$t('doorSensorDetectionTime')"
            name="door_unclosed_time"
          >
            <a-input-number
              v-model:value="door.door_unclosed_time"
              :min="0"
              :max="6000"
              :placeholder="$t('inputTime')"
              :precision="0"
              :stringMode="true"
            />
            <span class="ant-form-text">{{ $t('sec') }} </span>
          </a-form-item>
          <a-form-item
            :label="$t('doorSensorTimeoutAlarmMode')"
            name="door_unclosed_alarm"
          >
            <a-select
              v-model:value="door.door_unclosed_alarm"
              :options="[
                { value: '1', label: 'Buzzer' },
                { value: '2', label: 'AlarmRelay' },
                { value: '3', label: $t('selectAll') }
              ]"
              style="max-width: 350px"
            >
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('built-inRelayMode')" name="buildin_rel_mode">
            <a-radio-group
              :options="[
                {
                  label: $t('built-inRelayMode-label1'),
                  value: '0'
                },
                { label: $t('built-inRelayMode-label2'), value: '1' }
              ]"
              v-model:value="door.buildin_rel_mode"
              style="max-width: 350px"
            />
          </a-form-item>

          <a-form-item name="submit" :wrapper-col="{ span: 20, offset: 8 }">
            <a-button type="primary" @click.prevent="onCheck">
              {{ $t('submit') }}
            </a-button>
          </a-form-item>
        </a-form>
      </a-spin>
    </div>
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
      door: {
        buildin_rel_mode: '0',
        case_alarm_mode: '1',
        case_sensor: '0',
        door_unclosed_alarm: '1',
        door_unclosed_time: '0',
        dr_alarm_time: '0',
        dr_rel_time: '40',
        dr_sen_alarm_enable: '0',
        dr_sen_mode: '1'
      },
      spinning: false,
      locale: '',
      labelCol: { span: 8 }
    }
  },
  watch: {
    '$i18n.locale': {
      handler (newValue) {
        this.locale = newValue
      },
      immediate: true
    }
  },

  methods: {
    onCheck () {
      this.$refs.gateIOForm
        .validateFields()
        .then(() => {
          this.saveData()
        })
        .catch(() => {
          this.$refs.gateIOForm.scrollToField()
        })
    },
    getData () {
      const drTime = this.door.dr_rel_time
      const alarmTime = this.door.dr_alarm_time

      this.door.dr_number =
        this.door.dr_rel_time !== 0 && this.door.dr_rel_time !== 65535
          ? drTime
          : ''

      this.door.alarm_time =
        this.door.dr_alarm_time !== 0 && this.door.dr_alarm_time !== 65535
          ? alarmTime
          : ''

      if (this.door.dr_rel_time !== 0 && this.door.dr_rel_time !== 65535) {
        this.door.dr_rel_time = 'on'
      }
      if (this.door.dr_alarm_time !== 0 && this.door.dr_alarm_time !== 65535) {
        this.door.dr_alarm_time = 'on'
      }
    },
    saveData () {
      message.success(
        this.$t('gateI/O') + ' ' + this.$t('update') + this.$t('success'),
        5
      )
    }
  },
  created () {
    this.getData()
  }
}
</script>
