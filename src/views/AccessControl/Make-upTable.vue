<template>
  <div>
    <div class="d-flex">
      <div class="vh-100 time-bar-group">
        <div class="ps-3 time-title py-2 border-bottom border-end">
          {{ $t('time') }}
        </div>
        <div class="time-menu-height">
          <div class="time-menu border-end bg-white">
            <a-menu
              class="border-end-0"
              v-model:selectedKeys="selectedKeys"
              mode="inline"
            >
              <a-menu-item key="add"
                ><a href="#" @click.prevent="changeTemp('add')">
                  {{ $t('add') }}
                </a>
              </a-menu-item>
              <template v-if="data && data.length > 0">
                <a-menu-item
                  v-for="(item, index) in data"
                  :key="item.makeup_name"
                  ><a href="#" @click.prevent="changeTemp(item, index)">
                    {{ item.makeup_name }}
                  </a>
                </a-menu-item>
              </template>
            </a-menu>
          </div>
        </div>
      </div>
      <div class="time-group">
        <div
          class="ps-3 d-flex align-items-center time-title py-2 border-bottom w-100"
        >
          <span> {{ selectName }} </span>
          <a-dropdown
            :trigger="['click']"
            v-if="temp && temp.makeup_name"
            class="ms-2"
          >
            <a class="ant-dropdown-link setting-link" @click.prevent>
              <setting-filled />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <edit-outlined class="me-1" />
                  <a @click.prevent="visible = true">
                    {{ $t('修改補班表名稱') }}
                  </a>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item>
                  <delete-outlined class="me-1" style="color: red" />
                  <a @click.prevent="deleteMakeup" style="color: red">
                    {{ $t('刪除此補班表') }}
                  </a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>

        <div class="p-sm-4 p-2">
          <div class="position-relative">
            <div
              class="position-absolute text-white d-flex align-items-center justify-content-center"
              style="
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: rgba(0, 0, 0, 0.55);
                z-index: 100;
              "
              v-if="!temp.makeup_name && !visible"
            >
              {{ $t('請先點選左側新增') }}
            </div>
            <a-button class="mb-auto" type="primary" @click="addNew">
              {{ $t('add') }}</a-button
            >
            <a-table
              v-if="temp"
              :data-source="temp.make_up_date"
              class="mt-2"
              size="small"
              :pagination="{
                size: 'middle',
                'show-quick-jumper': true,
                defaultPageSize: 15,
                position: ['bottomLeft']
              }"
              bordered
            >
              <a-table-column
                class="ps-3 text-nowrap table-bg-primary"
                :width="'5%'"
                title="#"
                key="index"
                data-index="index"
              />
              <a-table-column
                class="text-nowrap table-bg-primary"
                key="date"
                :title="$t('date')"
                data-index="date"
                :sorter="
                  (a, b) =>
                    dayjs(a.date, 'YYYY-MM-DD') - dayjs(b.date, 'YYYY-MM-DD')
                "
              />
              <a-table-column
                class="text-nowrap table-bg-primary"
                key="weekday"
                :title="$t('make-upDay')"
                data-index="weekday"
                :filters="[
                  { text: $t('MON'), value: 'MON' },
                  { text: $t('TUE'), value: 'TUE' },
                  { text: $t('WED'), value: 'WED' },
                  { text: $t('THU'), value: 'THU' },
                  { text: $t('FRI'), value: 'FRI' },
                  { text: $t('SAT'), value: 'SAT' },
                  { text: $t('SUN'), value: 'SUN' }
                ]"
                :onFilter="
                  (value, record) => record.weekday.indexOf(value) === 0
                "
              />
              <a-table-column
                :width="'22%'"
                class="text-nowrap table-bg-primary"
                :title="$t('action')"
                key="action"
                data-index="action"
              />
              <template #bodyCell="{ column, record, index }">
                <template v-if="column.key === 'index'">
                  <span class="ms-2"> {{ index + 1 }} </span>
                </template>
                <template v-if="column.key === 'date'">
                  <div>
                    <a-date-picker
                      v-if="editableData[record.date]"
                      valueFormat="YYYY-MM-DD"
                      v-model:value="editableData[record.date].date"
                    />
                    <template v-else>
                      {{ record.date }}
                    </template>
                  </div>
                </template>
                <template v-else-if="column.key === 'weekday'">
                  <div>
                    <a-select
                      v-if="editableData[record.date]"
                      v-model:value="editableData[record.date].weekday"
                      style="width: 120px"
                    >
                      <a-select-option
                        v-for="day in renderDay"
                        :key="day"
                        :value="day"
                        >{{ $t(day) }}</a-select-option
                      >
                    </a-select>
                    <template v-else>
                      {{ $t(record.weekday) }}
                    </template>
                  </div>
                </template>
                <template v-else-if="column.key === 'action'">
                  <div class="editable-row-operations">
                    <span
                      v-if="
                        editableData[record.date] ||
                        editableData[record.date] === ''
                      "
                    >
                      <a-typography-link @click="save(record.date, index)">
                        {{ $t('confirm') }}
                      </a-typography-link>
                      <a-divider type="vertical" />
                      <a-typography-link
                        @click="cancel(record.date, index)"
                        type="link"
                      >
                        {{ $t('cancel') }}</a-typography-link
                      >
                    </span>
                    <span v-else>
                      <a-button
                        :title="$t('modify')"
                        type="text"
                        @click="edit(record)"
                        ><template #icon><edit-outlined /></template
                      ></a-button>
                      <a-popconfirm
                        :title="$t('wannaDelete')"
                        @confirm="del(record.date, index)"
                      >
                        <a-typography-link type="danger">
                          <a-button :title="$t('Delete')" type="text">
                            <template #icon><delete-outlined /></template>
                          </a-button>
                        </a-typography-link>
                      </a-popconfirm>
                    </span>
                  </div>
                </template>
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 時段名稱Modal -->
    <a-modal
      v-model:visible="visible"
      :title="$t('make-upTableFeedBack')"
      :ok-text="$t('save')"
      :cancel-text="$t('cancel')"
      @ok="onOk"
      @cancel="onCancel"
    >
      <a-form :model="temp" ref="makeupFormRef">
        <a-form-item
          class="mb-2"
          :label="$t('shiftname')"
          :rules="[
            {
              required: true,
              validator: validate,
              trigger: 'change'
            }
          ]"
          name="makeup_name"
        >
          <a-input v-model:value="temp.makeup_name" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {
  EditOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  SettingFilled
} from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'
import { createVNode, h } from 'vue'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'

export default {
  components: { EditOutlined, DeleteOutlined, SettingFilled },
  emits: ['copyto'],
  data () {
    return {
      selectedKeys: [],
      data: [
        {
          id: 1,
          make_up_date: [
            {
              date: '2023-01-07',
              weekday: 'FRI'
            },
            {
              date: '2023-02-04',
              weekday: 'FRI'
            },
            {
              date: '2023-02-18',
              weekday: 'MON'
            },
            {
              date: '2023-03-25',
              weekday: 'MON'
            }
          ],
          makeup_id: '1',
          makeup_name: '正常班'
        }
      ],
      editableData: {},
      renderDay: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      temp: { makeup_name: ' ' },
      isNew: false,
      selectIndex: 0,
      selectName: '',
      visible: false
    }
  },

  methods: {
    onCancel () {
      if (this.data.length === 0) {
        this.selectedKeys = []
        this.temp = {}
        this.selectIndex = 0

        return
      }

      this.selectedKeys = [this.data[0].makeup_name]
      this.changeTemp(this.data[0], 0)
    },
    onOk () {
      this.$refs.makeupFormRef
        .validateFields()
        .then(() => {
          this.visible = false
          this.selectName = this.temp.makeup_name
          if (this.selectedKeys[0] !== 'add') {
            this.saveData()
          }
        })
        .catch(() => {
          this.$refs.makeupFormRef.scrollToField()
        })
    },
    updateName () {
      this.visible = true
    },
    async validate (rule, value, callback) {
      if (!value) {
        return Promise.reject(this.$t('requiredFeedback'))
      }
      const found = this.data.find((item) => {
        if (this.isNew) {
          return item.makeup_name === value
        } else {
          return (
            item.makeup_name === value &&
            value !== this.data[this.selectIndex].makeup_name
          )
        }
      })
      if (found) {
        return Promise.reject(new Error(this.$t('nameRepeat')))
      } else {
        return Promise.resolve()
      }
    },
    dayjs,
    saveData () {
      const saveTemp = { ...this.temp }
      const text = this.isNew ? 'added' : 'update'
      if (this.isNew) {
        this.data.push(saveTemp)
      } else {
        this.data[this.selectIndex] = saveTemp
      }

      this.getData()
      message.success(
        this.temp.makeup_name + ' ' + this.$t(text) + this.$t('success'),
        5
      )
      this.selectedKeys = [saveTemp.makeup_name]
    },
    deleteMakeup () {
      console.log(this.selectIndex)
      if (this.selectedKeys[0] === 'add') {
        this.onCancel()
        return
      }

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
              this.$t('holidayGroup') + `：${this.temp.makeup_name}`
            )
          ]),

        onOk: () => {
          this.data.splice(this.selectIndex, 1)
          this.getData('first')
          message.success(
            this.temp.makeup_name +
              ' ' +
              this.$t('delete') +
              this.$t('success'),
            5
          )
        },

        onCancel () {}
      })
    },
    addNew () {
      if (this.editableData.new) {
        return
      }

      this.temp.make_up_date.unshift({ date: 'new', weekday: 'MON' })
      this.editableData.new = { date: '', weekday: 'MON' }
    },
    edit (key) {
      this.editableData[key.date] = { ...key }
    },
    save (key, index) {
      if (!this.editableData[key].date) {
        alert(this.$t('dateFeedBack'))
        return
      }

      const find = this.temp.make_up_date.find((i, fIndex) => {
        return i.date === this.editableData[key].date && fIndex !== index
      })

      if (find) {
        alert(this.$t('dateRepeat'))
        return
      }
      this.temp.make_up_date.splice(index, 1, this.editableData[key])
      delete this.editableData[key]

      this.saveData()
    },
    del (key, index) {
      this.temp.make_up_date.splice(index, 1)
      delete this.editableData[key]
      this.saveData()
    },
    cancel (key, index) {
      if (key === 'new') {
        this.temp.make_up_date.splice(index, 1)
      }
      delete this.editableData[key]
    },

    changeTemp (temp, index) {
      this.editableData = {}

      this.temp =
        temp === 'add'
          ? { makeup_name: 'New Template', make_up_date: [] }
          : JSON.parse(JSON.stringify(temp))
      this.selectName = temp.makeup_name
      this.isNew = temp === 'add'
      this.selectIndex = index

      if (temp === 'add') {
        this.visible = true
        this.addNew()
        if (this.$refs.makeupFormRef) {
          this.$refs.makeupFormRef.clearValidate()
        }
      }
    },
    getData (first) {
      if (this.data.length === 0) {
        this.temp = {}
        this.selectName = ''
        this.selectIndex = 0

        return
      }

      if (first) {
        this.selectedKeys = [this.data[0].makeup_name]
        this.changeTemp(this.data[0], 0)
      }
      if (this.isNew) {
        const last = this.data.length - 1
        this.changeTemp(this.data[last], last)
        this.isNew = false
      }
    }
  },
  created () {
    this.getData('first')
  }
}
</script>
