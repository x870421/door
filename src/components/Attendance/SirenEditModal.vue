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
      <a-button key="submit" type="primary" @click="onCheck">
        {{ $t('submit') }}
      </a-button>
    </template>
    <a-form
      autocomplete="off"
      ref="sirenFormRef"
      name="siren-time-modal"
      :model="sirenTime"
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
            :label="$t('actionTime')"
            name="actionTime"
            :rules="[{ required: true, message: $t('actionTimeFeedback') }]"
            help="HHmm"
          >
            <a-time-picker
              value-format="HHmm"
              v-model:value="sirenTime.actionTime"
              format="HH:mm"
              placeholder="HH:mm"
              @select="(value) => changeDuration(value, 'actionTime', 'HH:mm')"
            />
          </a-form-item>
          <a-form-item
            :label="$t('duration')"
            name="duration"
            :rules="[{ required: true, message: $t('durationFeedback') }]"
            help="mmss"
          >
            <a-time-picker
              value-format="mmss"
              v-model:value="sirenTime.duration"
              ref="duration"
              format="mm:ss"
              placeholder="mm:ss"
              :showNow="false"
              @select="(value) => changeDuration(value, 'duration', 'mm:ss')"
            />
          </a-form-item>

          <a-form-item
            :label="$t('turnOn')"
            name="tags"
            :rules="[{ required: true, message: $t('turnOnFeedback') }]"
          >
            <a-select
              v-model:value="sirenTime.tags"
              mode="multiple"
              style="width: 100%"
              @change="handleChange"
              :placeholder="$t('turnOnFeedback')"
              :filterOption="false"
            >
              <a-select-option
                v-for="day in option"
                :key="day.value"
                :value="day.value"
                >{{ $t(day.value) }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </div>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: ['modal', 'option'],
  data () {
    return {
      showModal: {},
      sirenTime: { duration: '', actionTime: '' }
    }
  },
  watch: {
    modal: {
      handler () {
        this.showModal = this.modal
        this.sirenTime = { ...this.showModal.temp }
      },
      deep: true
    }
  },
  methods: {
    changeDuration (val, item, format) {
      this.sirenTime[item] = dayjs(val).format(format)
      this.$refs.sirenFormRef.validateFields([item])
    },
    handleChange (val) {
      this.option.forEach((i) => {
        this.sirenTime[i.value] = val.includes(i.value) ? 1 : 0
      })
    },
    onCheck () {
      this.$refs.sirenFormRef
        .validateFields()
        .then(() => {
          this.$emit(
            'update-time',
            this.sirenTime,
            this.showModal.isNew,
            this.showModal.index
          )
        })
        .catch(() => {
          this.$refs.sirenFormRef.scrollToField()
        })
    }
  }
}
</script>
