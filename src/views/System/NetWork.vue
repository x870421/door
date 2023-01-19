<template>
  <div class="p-4">
    <a-spin :spinning="spinning" tip="Loading...">
      <div class="card shadow-sm">
        <a-form
          ref="networkFormRef"
          class="p-4"
          :model="network"
          v-bind="{
            labelCol: {
              span: 7
            },
            wrapperCol: {
              span: 30
            }
          }"
        >
          <a-form-item
            name="ip"
            width="250px"
            label="IP"
            :rules="[
              {
                pattern: new RegExp(
                  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
                ),
                message: $t('invalidIP')
              },
              {
                required: true,
                message: $t('IPFeedBack')
              }
            ]"
          >
            <a-input
              :placeholder="$t('IPFeedBack')"
              :maxlength="16"
              v-model:value="network.ip"
              style="max-width: 350px"
            />
          </a-form-item>
          <a-form-item
            name="port"
            label="PORT"
            :rules="[
              {
                required: true,
                message: $t('portFeedBack')
              }
            ]"
          >
            <div style="max-width: 350px">
              <a-input-number
                :placeholder="$t('portFeedBack')"
                :maxlength="16"
                v-model:value="network.port"
                :controls="false"
                :max="65535"
                :min="0"
                :precision="0"
                class="w-100"
              />
            </div>
          </a-form-item>
          <a-form-item
            name="sub_mask"
            width="250px"
            :label="$t('subnetMask')"
            :rules="[
              {
                pattern: new RegExp(
                  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
                ),
                message: $t('invalidSubnetMask')
              },
              { required: true, message: $t('subnetMaskFeedBack') }
            ]"
          >
            <a-input
              :placeholder="$t('subnetMaskFeedBack')"
              :maxlength="16"
              v-model:value="network.sub_mask"
              style="max-width: 350px"
            />
          </a-form-item>

          <a-form-item name="submit" :wrapper-col="{ span: 30, offset: 7 }">
            <a-button type="primary" @click.prevent="onCheck">
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

export default {
  data () {
    return {
      network: {
        ip: '172.16.1.10',
        port: '4660',
        sub_mask: '255.255.0.0'
      },
      spinning: false
    }
  },
  methods: {
    onCheck () {
      this.$refs.networkFormRef
        .validateFields()
        .then(() => {
          this.saveData()
        })
        .catch(() => {
          this.$refs.networkFormRef.scrollToField()
        })
    },

    saveData () {
      message.success(
        this.$t('comm.IP') + ' ' + this.$t('update') + this.$t('success'),
        5
      )
    }
  },
  created () {}
}
</script>

<style></style>
