<template>
  <div class="p-4">
    <a-spin :spinning="spinning" tip="Loading...">
      <div class="card shadow-sm">
        <a-form
          class="p-4"
          :model="daylight"
          v-bind="{
            labelCol: {
              span: 7
            },
            wrapperCol: {
              span: 30
            }
          }"
        >
          <a-form-item name="enable" :label="$t('turnOn')">
            <a-switch
              v-model:checked="daylight.enable"
              :unCheckedValue="0"
              :checkedValue="1"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren><close-outlined /></template>
            </a-switch>
          </a-form-item>

          <a-form-item :label="$t('startAndEndTime')" name="range-picker">
            <a-range-picker
              class="select-picker"
              :disabled="daylight.enable === 0"
              :value-format="dateFormat"
              :format="dateFormat"
              v-model:value="daylight['range-picker']"
              :show-time="{ format: 'HH:mm' }"
              :minuteStep="30"
              @openChange="changeRange"
            />
          </a-form-item>
          <a-form-item :label="$t('adjustmentTime')" name="time">
            <a-time-picker
              :disabled="daylight.enable === 0"
              v-model:value="daylight.adjust_time"
              valueFormat="HH:mm"
              format="HH:mm"
              :showNow="false"
              @select="changeDuration"
            />
          </a-form-item>
          <a-form-item name="submit" :wrapper-col="{ span: 30, offset: 7 }">
            <a-button type="primary" @click="onSubmit">
              {{ $t('submit') }}
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-spin>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
export default {
  components: {
    CheckOutlined,
    CloseOutlined
  },
  data () {
    return {
      daylight: {
        adjust_time: '01:30',
        dt_end: '12-25 18:30',
        dt_start: '07-01 12:00',
        enable: 0,
        id: 1
      },
      dateFormat: 'MM-DD HH:mm',
      spinning: false
    }
  },
  methods: {
    changeRange (open) {
      const day = document.querySelectorAll('.select-picker input')
      if (!day[0].value || !day[1].value) return
      if (!open) {
        this.daylight.dt_start = day[0].value
        this.daylight.dt_end = day[1].value
        this.daylight['range-picker'] = [
          dayjs(day[0].value, this.dateFormat),
          dayjs(day[1].value, this.dateFormat)
        ]
      }
    },
    changeDuration (val) {
      this.daylight.adjust_time = dayjs(val).format('HH:mm')
    },
    getData () {
      this.daylight['range-picker'] = [
        dayjs(this.daylight.dt_start, this.dateFormat),
        dayjs(this.daylight.dt_end, this.dateFormat)
      ]
    },
    handleChange (val) {
      if (!val) return
      this.daylight.dt_start = val[0]
      this.daylight.dt_end = val[1]
    },

    onSubmit () {
      message.success(this.$t('update') + this.$t('success'))
    }
  },

  created () {
    this.getData()
  }
}
</script>
