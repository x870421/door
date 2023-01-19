<template>
  <a-modal
    v-model:visible="showModal.visible"
    width="500px"
    :title="(showModal.isNew ? $t('add') : $t('modify')) + $t('information')"
  >
    <template #footer>
      <a-button key="back" @click="showModal.visible = false">
        {{ $t('cancel') }}
      </a-button>
      <a-button
        key="submit"
        type="primary"
        @click="onCheck"
        :loading="setModal.loading"
      >
        {{ $t('submit') }}
      </a-button>
    </template>
    <a-form
      autocomplete="off"
      ref="dutystatusFormRef"
      name="duty-status-modal"
      :model="dutystatus"
      v-bind="{
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 24
        }
      }"
    >
      <div class="container">
        <div class="row justify-content-between">
          <a-form-item
            :label="$t('shiftCode')"
            name="shift_code"
            :rules="[{ required: true, message: $t('shiftCodeFeedBack') }]"
          >
            <a-input
              disabled
              :placeholder="$t('shiftCodeFeedBack')"
              v-model:value="dutystatus.shift_code"
            />
          </a-form-item>

          <a-form-item :label="$t('dutyShift')" name="shiftname">
            <a-input
              :placeholder="$t('shiftCodeFeedBack')"
              v-model:value="dutystatus.shiftname"
            />
          </a-form-item>
          <a-form-item
            :label="$t('startTime')"
            name="time_start"
            :rules="[{ required: true, message: $t('startTimeFeedBack') }]"
          >
            <a-time-picker
              value-format="HH:mm"
              v-model:value="dutystatus.time_start"
              format="HH:mm"
              placeholder="HH:mm"
              @select="changeDuration"
            />
          </a-form-item>
        </div>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
// import dayjs from 'dayjs'
import dayjs from 'dayjs'

export default {
  props: ['modal', 'setmodal'],
  data () {
    return {
      showModal: {},
      dutystatus: {},
      shift: [
        { name: '上班', code: '1' },
        { name: '下班', code: '2' },
        { name: '外出', code: '3' },
        { name: '歸回', code: '4' },
        { name: '加班開始', code: '5' },
        { name: '加班結束', code: '6' }
      ],
      setModal: {}
    }
  },
  watch: {
    modal: {
      handler () {
        this.showModal = this.modal
        this.dutystatus = { ...this.showModal.temp }
      },
      deep: true
    },
    setmodal: {
      handler () {
        this.setModal = this.setmodal
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    changeDuration (val) {
      this.dutystatus.time_start = dayjs(val).format('HH:mm')
      this.$refs.dutystatusFormRef.validateFields(['time_start'])
    },
    changeName (val) {
      const code = this.shift.find((i) => {
        return i.code === val
      })
      this.dutystatus.shiftname = code.name
    },
    onCheck () {
      this.$refs.dutystatusFormRef
        .validateFields()
        .then(() => {
          this.$emit('update-dutystatus', this.dutystatus, this.showModal.isNew)
        })
        .catch(() => {
          this.$refs.dutystatusFormRef.scrollToField()
        })
    }
  },

  created () {}
}
</script>
