<template>
  <div class="p-sm-4 p-2" v-cloak>
    <div class="card shadow-sm">
      <a-spin :spinning="spinning" tip="Loading...">
        <a-form class="p-4 mx-auto gate-io-width" :model="door">
          <div class="d-flex flex-wrap">
            <a-form-item
              :label="$t('doorRelayAction')"
              name="dr_rel_time"
              :help="$t('timeUnit')"
            >
              <a-radio-group
                :options="[
                  { label: this.$t('toggleMode'), value: 65535 },
                  { label: this.$t('latchMode'), value: 0 },
                  { label: this.$t('pulseMode'), value: 'on' }
                ]"
                v-model:value="door.dr_rel_time"
              />
            </a-form-item>

            <div
              class="input-margin"
              :class="{ 'drrel-en-input-margin': locale === 'en' }"
            >
              <a-input-number
                v-model:value="door.dr_number"
                :min="0"
                :max="6000"
                v-show="door.dr_rel_time === 'on'"
                :placeholder="$t('inputTime')"
                :precision="0"
                :stringMode="true"
              />
            </div>
          </div>

          <div class="d-flex flex-wrap">
            <a-form-item
              :label="$t('alarmOutputAction')"
              name="dr_alarm_time"
              :help="$t('timeUnit')"
            >
              <a-radio-group
                :options="[
                  { label: this.$t('toggleMode'), value: 65535 },
                  { label: this.$t('latchMode'), value: 0 },
                  { label: this.$t('pulseMode'), value: 'on' }
                ]"
                v-model:value="door.dr_alarm_time"
              />
            </a-form-item>

            <div
              class="input-margin"
              :class="{ 'alarm-en-input-margin': locale === 'en' }"
            >
              <a-input-number
                v-model:value="door.alarm_time"
                :min="0"
                :max="6000"
                v-show="door.dr_alarm_time === 'on'"
                :placeholder="$t('inputTime')"
                :precision="0"
                :stringMode="true"
              />
            </div>
          </div>

          <a-form-item label="DoorSensor" name="door_sensor">
            <a-select
              v-model:value="door.door_sensor"
              :options="[
                { value: '0', label: $t('doorSensor-label1') },
                { value: '1', label: $t('doorSensor-label2') },
                { value: '2', label: $t('doorSensor-label3') },
                { value: '3', label: $t('doorSensor-label4') },
                { value: '255', label: $t('doorSensor-label5') }
              ]"
              style="max-width: 350px"
            >
            </a-select>
          </a-form-item>

          <a-form-item label="CaseSensor" name="door.case_sensor">
            <a-switch
              :checkedValue="'0'"
              :unCheckedValue="'255'"
              v-model:checked="door.case_sensor"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren><close-outlined /></template>
            </a-switch>
          </a-form-item>
          <a-form-item
            :help="$t('timeUnit')"
            :label="$t('doorSensorDetectionTime')"
            name="dr_sen_time"
          >
            <a-input-number
              v-model:value="door.dr_sen_time"
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
            name="dr_alarm_mode"
          >
            <a-select
              v-model:value="door.dr_alarm_mode"
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
          <a-form-item name="submit" :wrapper-col="{ span: 20, offset: 3 }">
            <a-button type="primary" @click.prevent="saveData">
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
        case_sensor: '255',
        door_sensor: '255',
        dr_alarm_mode: '1',
        dr_alarm_time: '1000',
        dr_rel_time: '1000',
        dr_sen_time: '1000'
      },
      spinning: false,
      locale: ''
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
