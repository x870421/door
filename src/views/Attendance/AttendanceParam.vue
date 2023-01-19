<template>
  <div class="p-4">
    <a-spin :spinning="spinning" tip="Loading...">
      <div class="card shadow-sm">
        <a-form
          ref="attendanceFormRef"
          :model="attendance"
          class="p-4"
          :label-col="{
            span: 10
          }"
          :wrapper-col="{
            span: 30
          }"
        >
          <a-form-item name="record_mode" :label="$t('cardSwipeRecord')">
            <a-switch
              v-model:checked="attendance.record_mode"
              :checkedValue="1"
              :unCheckedValue="0"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren><close-outlined /></template>
            </a-switch>
          </a-form-item>

          <a-form-item :label="$t('shiftAuto-reply')" name="autoshift_ans">
            <a-switch
              v-model:checked="attendance.autoshift_ans"
              :checkedValue="1"
              :unCheckedValue="0"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren><close-outlined /></template>
            </a-switch>
          </a-form-item>

          <a-form-item name="submit" :wrapper-col="{ span: 30, offset: 10 }">
            <a-button type="primary" @click="onCheck">
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
      attendance: {
        autoshift_ans: 1,
        id: 1,
        record_mode: 1
      },
      spinning: false
    }
  },

  methods: {
    onCheck () {
      this.$refs.attendanceFormRef
        .validateFields()
        .then(() => {
          this.saveData()
        })
        .catch(() => {
          this.$refs.attendanceFormRef.scrollToField()
        })
    },
    saveData () {
      message.success(this.$t('update') + this.$t('success'), 5)
    }
  }
}
</script>
