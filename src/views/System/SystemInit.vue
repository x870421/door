<template>
  <div class="p-4">
    <div class="card shadow-sm">
      <div class="d-flex justify-content-center">
        <a-form class="p-4 systeminit-width" :model="systemInit">
          <a-form-item
            style="margin-bottom: 0.75rem"
            name="systemOption"
            :label="$t('param')"
            v-bind="{
              labelCol: {
                span: 4
              },
              wrapperCol: {
                span: 15
              }
            }"
          >
            <a-checkbox-group v-model:value="systemInit.systemOption">
              <a-row>
                <a-col :span="24">
                  <a-checkbox value="card">{{ $t('clearCard') }}</a-checkbox>
                </a-col>
                <a-col :span="24">
                  <a-checkbox value="logger">
                    {{ $t('clearRecords') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="24">
                  <a-checkbox value="parm"> {{ $t('clearParam') }} </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item>

          <a-form-item name="submit" :wrapper-col="{ span: 15, offset: 4 }">
            <a-button type="primary" @click.prevent="onSubmit">
              {{ $t('submit') }}
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { message, Modal } from 'ant-design-vue'
import { createVNode, h } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

export default {
  data () {
    return {
      systemInit: {
        systemOption: []
      }
    }
  },
  methods: {
    onSubmit () {
      if (this.systemInit.systemOption.length === 0) {
        this.sum = 0
        return
      }

      const options = {
        card: this.$t('clearCard'),
        logger: this.$t('clearRecords'),
        parm: this.$t('clearParam')
      }
      const systemInit = {
        card: 0,
        logger: 0,
        parm: 0
      }

      const arr = []
      for (const item in this.systemInit.systemOption) {
        arr.push(options[this.systemInit.systemOption[item]])
        systemInit[this.systemInit.systemOption[item]] = 1
      }

      Modal.confirm({
        title: this.$t('wannaDelete'),
        icon: createVNode(ExclamationCircleOutlined),
        okText: this.$t('confirm'),

        cancelText: this.$t('cancel'),
        content: () =>
          h('div', {}, [
            h('strong', this.$t('noticeDele') + this.$t('deleteItem') + '：'),
            h('div', { class: 'py-1' }, arr.join(','))
          ]),

        onOk: () => {
          message.success(
            this.$t('param') + this.$t('clear') + this.$t('success'),
            5
          )
        },

        onCancel () {}
      })
    }
  }
}
</script>
