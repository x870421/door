<template>
  <div class="p-4">
    <div class="d-flex justify-content-between">
      <a-button
        :title="$t('add')"
        type="primary"
        @click.prevent="showModal(true)"
      >
        {{ $t('add') }}
      </a-button>
    </div>

    <a-spin :spinning="spinning" tip="Loading...">
      <a-table
        :data-source="renderData"
        class="mt-2"
        size="small"
        :row-key="(record) => record.id"
        :pagination="{
          size: 'middle',
          'show-quick-jumper': true,
          defaultPageSize: 5,
          'show-size-changer': true,
          position: ['bottomLeft'],
          pageSizeOptions: ['5', '10', '15', '20']
        }"
      >
        <a-table-column
          class="ps-4 text-nowrap table-bg-primary"
          key="actionTime"
          :title="$t('actionTime')"
          data-index="actionTime"
          :width="'10%'"
          :sorter="
            (a, b) => dayjs(a.actionTime, 'HHmm') - dayjs(b.actionTime, 'HHmm')
          "
        />

        <a-table-column
          class="text-nowrap table-bg-primary"
          key="duration"
          :title="$t('duration')"
          data-index="duration"
          :width="'10%'"
        />

        <a-table-column
          class="table-bg-primary"
          key="tags"
          :title="$t('turnOn')"
          data-index="tags"
          :filters="[
            { text: $t('MON'), value: 'MON' },
            { text: $t('TUE'), value: 'TUE' },
            { text: $t('WED'), value: 'WED' },
            { text: $t('THU'), value: 'THU' },
            { text: $t('FRI'), value: 'FRI' },
            { text: $t('SAT'), value: 'SAT' },
            { text: $t('SUN'), value: 'SUN' }
          ]"
          :onFilter="(value, record) => record[value] === 1"
        />
        <a-table-column
          class="table-bg-primary"
          key="action"
          :title="$t('action')"
          data-index="action"
        />
        <template #bodyCell="{ column, record, index }">
          <template v-if="column && column.key === 'actionTime'">
            <span class="ps-3">
              {{ dayjs(record.actionTime, 'HHmm').format('HH:mm') }}
            </span>
          </template>
          <template v-else-if="column && column.key === 'duration'">
            <span>
              {{ dayjs(record.duration, 'mmss').format('mm:ss') }}
            </span>
          </template>
          <template v-else-if="column && column.key === 'tags'">
            <span>
              <a-tag
                :title="$t(tag)"
                v-for="tag in record.tags"
                :key="tag"
                color="geekblue"
                class="mb-1 mt-1"
                >{{ $t(tag) }}</a-tag
              >
            </span>
          </template>
          <template v-else-if="column && column.key === 'action'">
            <a-button
              :title="$t('modify')"
              type="text"
              @click.prevent="showModal(false, record, index)"
            >
              <template #icon><edit-outlined /> </template>
            </a-button>
            <a-button
              :title="$t('delete')"
              type="text"
              @click="deleteModal(record, index)"
            >
              <template #icon><delete-outlined /></template>
            </a-button>
          </template>
        </template>
      </a-table>
    </a-spin>
  </div>
  <SirenEditModal
    @update-time="updateTime"
    ref="sirenEditModal"
    :modal="modal"
    :option="option"
  ></SirenEditModal>
  <router-view></router-view>
</template>

<script>
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
import SirenEditModal from '@/components/Attendance/SirenEditModal.vue'
import { message, Modal } from 'ant-design-vue'
import { createVNode, h } from 'vue'
import dayjs from 'dayjs'
export default {
  components: { SirenEditModal, EditOutlined, DeleteOutlined },
  data () {
    return {
      option: [
        { value: 'MON' },
        { value: 'TUE' },
        { value: 'WED' },
        { value: 'THU' },
        { value: 'FRI' },
        { value: 'SAT' },
        { value: 'SUN' }
      ],
      spinning: false,
      modal: {
        visible: false,
        temp: {},
        isNew: false,
        index: null
      },
      search: '',
      data: [
        {
          FRI: 1,
          MON: 0,
          SAT: 1,
          SUN: 1,
          THU: 1,
          TUE: 1,
          WED: 1,
          actionTime: '0220',
          duration: '3000',
          id: 1
        },
        {
          FRI: 0,
          MON: 1,
          SAT: 1,
          SUN: 1,
          THU: 1,
          TUE: 0,
          WED: 0,
          actionTime: '0230',
          duration: '0000',
          id: 2
        }
      ],
      renderData: []
    }
  },

  methods: {
    dayjs,
    sorterDate (a, b) {},
    alldataChange () {
      this.search = ''
      this.handleChange()
    },
    handleChange (input) {
      if (this.search) {
        this.renderData = this.data.filter((i) => {
          return i[input]
        })
      } else {
        this.renderData = this.data
      }
    },
    deleteModal (item, index) {
      Modal.confirm({
        title: this.$t('wannaDelete'),
        icon: createVNode(ExclamationCircleOutlined),
        okText: this.$t('confirm'),
        cancelText: this.$t('cancel'),
        content: () =>
          h('div', {}, [
            h('strong', this.$t('deleteItem')),
            h(
              'div',
              { class: 'py-1' },
              this.$t('actionTime') + `：${item.actionTime}`
            ),
            h('div', this.$t('duration') + `：${item.duration}`)
          ]),

        onOk: () => {
          this.data.splice(index, 1)
          this.renderData = JSON.parse(JSON.stringify(this.data))
          message.success(
            this.$t('belltime') + this.$t('delete') + this.$t('success'),
            5
          )
        },

        onCancel () {}
      })
    },
    createTag () {
      this.data.forEach((i) => {
        i.tags = []
        this.option.forEach((item) => {
          if (i[item.value] === 1) {
            i.tags.push(item.value)
          }
        })
      })
    },
    showModal (isNew, time, index) {
      if (this.data.length > 30) {
        alert(this.t('max30'))
        return
      }

      if (this.$refs.sirenEditModal.$refs.sirenFormRef) {
        this.$refs.sirenEditModal.$refs.sirenFormRef.clearValidate()
      }

      this.modal.visible = true
      this.modal.isNew = isNew
      this.modal.index = index

      this.modal.temp = isNew ? {} : time
    },
    updateTime (time, isNew, index) {
      const timeTemp = { ...time }
      delete timeTemp.id
      delete timeTemp.tags
      const text = isNew ? this.$t('added') : this.$t('update')
      if (isNew) {
        this.data.push(timeTemp)
      } else {
        this.data[index] = timeTemp
      }

      message.success(this.$t('belltime') + text + this.$t('success'), 5)
      this.modal.visible = false
      this.createTag()
      this.renderData = JSON.parse(JSON.stringify(this.data))
    }
  },
  mounted () {},
  created () {
    this.createTag()
    this.renderData = JSON.parse(JSON.stringify(this.data))
  }
}
</script>
