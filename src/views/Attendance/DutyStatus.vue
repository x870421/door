<template>
  <div class="p-4">
    <a-spin :spinning="spinning" tip="Loading...">
      <a-table
        class="mt-2"
        size="small"
        :data-source="dutyData"
        :pagination="{
          size: 'middle',
          'show-quick-jumper': true,
          defaultPageSize: 20,
          position: ['bottomLeft'],
          pageSizeOptions: ['10', '20', '30', '40']
        }"
      >
        <a-table-column
          class="ps-4 text-nowrap table-bg-primary"
          key="shift_code"
          :title="$t('shiftCode')"
          data-index="shift_code"
        />
        <a-table-column
          class="text-nowrap table-bg-primary"
          key="shiftname"
          :title="$t('dutyShift')"
          data-index="shiftname"
        />

        <a-table-column
          class="table-bg-primary"
          key="time_start "
          :title="$t('startTime')"
          data-index="time_start"
          :sorter="sorterDate"
        />

        <a-table-column
          class="table-bg-primary"
          key="action"
          :title="$t('action')"
          data-index="action"
        />
        <template #bodyCell="{ column, record }">
          <template v-if="column && column.key === 'shift_code'">
            <span class="ps-2">
              {{ record.shift_code }}
            </span>
          </template>
          <template v-else-if="column && column.key === 'action'">
            <a-button
              :title="$t('modify')"
              type="text"
              @click="showModal(false, record)"
            >
              <template #icon><edit-outlined /></template>
            </a-button>
          </template>
        </template>
      </a-table>
    </a-spin>
  </div>
  <dutystatusModal
    @update-dutystatus="updateDutystatus"
    ref="dutyEditModel"
    :modal="modal"
    :setmodal="setmodal"
  ></dutystatusModal>
</template>

<script>
import { EditOutlined } from '@ant-design/icons-vue'
import dutystatusModal from '@/components/Attendance/DutystatusModal.vue'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
export default {
  components: { EditOutlined, dutystatusModal },

  data () {
    return {
      dutyData: [
        {
          id: 1,
          index: 1,
          shift_code: '1',
          shiftname: '上班',
          time_start: '08:00'
        },
        {
          id: 2,
          index: 2,
          shift_code: '2',
          shiftname: '下班',
          time_start: '18:00'
        },
        {
          id: 3,
          index: 3,
          shift_code: '3',
          shiftname: '外出',
          time_start: '14:00'
        },
        {
          id: 4,
          index: 4,
          shift_code: '4',
          shiftname: '返回',
          time_start: '16:00'
        },
        {
          id: 5,
          index: 5,
          shift_code: '5',
          shiftname: '加班開始',
          time_start: '19:00'
        },
        {
          id: 6,
          index: 6,
          shift_code: '6',
          shiftname: '加班結束',
          time_start: '22:00'
        }
      ],
      spinning: false,
      search: '',
      setmodal: { loading: false },
      modal: {
        visible: false,
        temp: {},
        isNew: false
      }
    }
  },
  methods: {
    sorterDate (a, b) {
      return dayjs(a.time_start, 'HH:mm') - dayjs(b.time_start, 'HH:mm')
    },
    updateDutystatus (item) {
      this.setmodal.loading = true
      const text = this.$t('update')

      this.dutyData[item.id - 1] = item
      message.success(text + this.$t('success'), 5)
      this.setmodal.loading = false
      this.modal.visible = false
    },
    showModal (isNew, temp) {
      if (this.$refs.dutyEditModel.$refs.dutystatusFormRef) {
        this.$refs.dutyEditModel.$refs.dutystatusFormRef.clearValidate()
      }

      this.modal.visible = true
      this.modal.isNew = isNew
      this.modal.temp = isNew ? {} : temp

      this.setmodal.loading = false
    }
  },
  created () {}
}
</script>
