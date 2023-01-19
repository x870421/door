<template>
  <div class="p-4">
    <a-row :gutter="24">
      <a-col
        :xs="24"
        :sm="24"
        :md="12"
        :xl="8"
        :style="{ marginBottom: '24px' }"
      >
        <a-card
          class="border h-100"
          :bodyStyle="{ height: '100%' }"
          hoverable
          :loading="loading"
        >
          <div class="d-flex align-items-center h-100">
            <team-outlined
              :style="{ fontSize: '54px', color: 'rgb(143, 201, 251)' }"
            />
            <a-statistic
              class="ms-4"
              :title="$t('totalLigalCard')"
              :value="sysinfo.total_ligal_card"
              style="margin-right: 50px"
            />
          </div>
        </a-card>
      </a-col>
      <a-col
        :xs="24"
        :sm="24"
        :md="12"
        :xl="8"
        :style="{ marginBottom: '24px' }"
      >
        <a-card
          class="border h-100"
          :bodyStyle="{ height: '100%' }"
          hoverable
          :loading="loading"
        >
          <div class="d-flex align-items-center h-100">
            <profile-outlined
              :style="{ fontSize: '54px', color: 'rgb(216, 151, 235)' }"
            />
            <a-statistic
              class="ms-4"
              :title="$t('totalRecordCard')"
              :value="sysinfo.total_record_card"
              style="margin-right: 50px"
            />
          </div>
        </a-card>
      </a-col>
      <a-col
        :xs="24"
        :sm="24"
        :md="12"
        :xl="8"
        :style="{ marginBottom: '24px' }"
      >
        <a-card class="border h-100" hoverable :loading="loading">
          <div class="d-flex align-items-center">
            <clock-circle-outlined
              :style="{ fontSize: '54px', color: 'rgb(100, 234, 145)' }"
            />
            <a-statistic
              class="ms-4"
              :title="$t('datetime')"
              :value="dayjs(sysinfo.datetime).format('YYYY-MM-DD HH:mm:ss')"
              style="margin-right: 50px"
            />
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import {
  TeamOutlined,
  ProfileOutlined,
  ClockCircleOutlined
} from '@ant-design/icons-vue'
export default {
  components: { TeamOutlined, ProfileOutlined, ClockCircleOutlined },
  data () {
    return {
      sysinfo: {
        datetime: '',
        total_ligal_card: 23003,
        total_record_card: 100
      },
      timer: null,
      loading: true
    }
  },
  methods: {
    dayjs
  },
  mounted () {},
  created () {
    this.sysinfo.datetime = new Date()
    setTimeout(() => {
      this.sysinfo.datetime = new Date()

      this.loading = false
      this.timer = setInterval(() => {
        this.sysinfo.datetime = new Date()
      }, 1000)
    }, 500)
  },
  unmounted () {
    clearInterval(this.timer)
  }
}
</script>

<style>
.ant-statistic-title {
  font-size: 16px;
  /* color: rgba(0, 0, 0, 0.85); */
  color: #666;
}
</style>
