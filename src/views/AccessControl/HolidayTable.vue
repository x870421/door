<template>
  <div>
    <div class="d-flex">
      <div class="vh-100 time-bar-group">
        <div class="ps-3 time-title py-2 border-bottom border-end">
          {{ $t('holidayGroup') }}
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
              <template v-if="holidayData && holidayData.length > 0">
                <a-menu-item
                  v-for="(holiday, index) in holidayData"
                  :key="holiday.holiday_name"
                  ><a href="#" @click.prevent="changeTemp(holiday, index)">
                    {{ holiday.holiday_name }}
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
            v-if="temp && temp.holiday_name"
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
                    {{ $t('修改假日表名稱') }}</a
                  >
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item>
                  <delete-outlined class="me-1" style="color: red" />
                  <a @click.prevent="deleteHoliday" style="color: red">
                    {{ $t('刪除此假日表') }}</a
                  >
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>

        <div class="py-3 px-4">
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
              v-if="!temp.holiday_name && !visible"
            >
              {{ $t('請先點選左側新增') }}
            </div>
            {{ $t('holidayTable') }}:

            <div :class="{ 'px-2 py-1': new Date().getMonth() < 9 }">
              <div class="d-flex align-items-center holiday-table-width">
                <a-button
                  style="width: 25px"
                  v-if="new Date().getMonth() + 1 >= 11"
                  type="link"
                  @click="currentPage = 1"
                  :disabled="currentPage === 1"
                  :title="
                    currentPage === 2
                      ? this.$t('goto') +
                        ' ' +
                        new Date().getFullYear() +
                        ' ' +
                        this.$t('year')
                      : ''
                  "
                >
                  <left-outlined
                /></a-button>
                <div v-show="currentPage === 1" class="ms-3 year-table-width">
                  <div class="text-center fw-bold fs-6 lh-1 text-primary">
                    {{ new Date().getFullYear() }}
                  </div>
                  <div style="max-width: 730px"></div>
                  <div class="container-fluid">
                    <div v-if="temp && temp.holiday_date" class="row">
                      <div
                        class="col-6 col-sm-4 col-md-3 col-month-width g-2"
                        v-for="month in 12"
                        :key="month"
                      >
                        <Month
                          :month="month"
                          :year="new Date().getFullYear()"
                          @add-date="addDate"
                          @reduce-date="reduceDate"
                          :select="temp.holiday_date"
                        ></Month>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="new Date().getMonth() + 1 >= 11"
                  v-show="currentPage === 2"
                  class="ms-3 year-table-width"
                >
                  <div class="text-center fw-bold fs-6 lh-1 text-primary">
                    {{ new Date().getFullYear() + 1 }}
                  </div>
                  <div class="container-fluid">
                    <div v-if="temp && temp.holiday_date" class="row">
                      <div
                        class="col-6 col-sm-4 col-md-3 col-month-width g-2"
                        v-for="month in 12"
                        :key="month"
                      >
                        <Month
                          :month="month"
                          :year="new Date().getFullYear() + 1"
                          @add-date="addDate"
                          @reduce-date="reduceDate"
                          :select="temp.holiday_date"
                        ></Month>
                      </div>
                    </div>
                  </div>
                </div>
                <a-button
                  style="width: 25px"
                  v-if="new Date().getMonth() + 1 >= 11"
                  type="link"
                  @click="currentPage = 2"
                  :disabled="currentPage === 2"
                  :title="
                    currentPage === 1
                      ? this.$t('goto') +
                        ' ' +
                        (new Date().getFullYear() + 1) +
                        ' ' +
                        this.$t('year')
                      : ''
                  "
                  ><right-outlined
                /></a-button>
              </div>
            </div>
            <div class="my-2 d-flex justify-content-center holiday-table-width">
              <a-button
                type="primary"
                v-if="temp && temp.holiday_name"
                @click.prevent="saveData"
              >
                {{ $t('save') }}
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-modal
      v-model:visible="visible"
      :title="$t('holidayTableFeedBack')"
      :ok-text="$t('save')"
      :cancel-text="$t('cancel')"
      @ok="onOk"
      @cancel="onCancel"
    >
      <a-form :model="temp" ref="holidayFormRef">
        <a-form-item
          style="max-width: 350px"
          class="mb-2"
          :label="$t('shiftname')"
          :rules="[
            {
              required: true,
              validator: validate,
              trigger: 'change'
            }
          ]"
          name="holiday_name"
        >
          <a-input @keyup.enter="onOk" v-model:value="temp.holiday_name" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Month from '@/components/AccessControl/MonthPicker.vue'
import { message, Modal } from 'ant-design-vue'
import { createVNode, h } from 'vue'
import {
  LeftOutlined,
  EditOutlined,
  RightOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SettingFilled
} from '@ant-design/icons-vue'

export default {
  components: {
    Month,
    DeleteOutlined,
    EditOutlined,
    LeftOutlined,
    RightOutlined,
    SettingFilled
  },

  data () {
    return {
      currentPage: 1,
      selectedKeys: [],
      temp: { holiday_name: ' ' },
      holidayData: [
        {
          holiday_date: [
            '2023-01-02',
            '2023-01-20',
            '2023-01-23',
            '2023-01-24',
            '2023-01-25',
            '2023-01-26',
            '2023-01-27',
            '2023-04-03',
            '2023-04-04',
            '2023-04-05'
          ],
          holiday_id: '1',
          holiday_name: '年休假',
          id: 1
        }
      ],
      isNew: false,
      selectName: '',
      selectIndex: 0,
      clickDay: '',
      visible: false
    }
  },
  methods: {
    onCancel () {
      if (this.holidayData.length === 0) {
        this.temp = { holiday_date: [] }
        this.selectIndex = 0
        this.selectedKeys = []
        return
      }
      this.selectedKeys = [this.holidayData[0].holiday_name]
      this.changeTemp(this.holidayData[0], 0)
    },
    onOk () {
      this.$refs.holidayFormRef
        .validateFields()
        .then(() => {
          this.visible = false
          this.selectName = this.temp.holiday_name
          if (this.selectedKeys[0] !== 'add') {
            this.saveData()
          }
        })
        .catch(() => {
          this.$refs.holidayFormRef.scrollToField()
        })
    },
    addDate (day) {
      this.clickDay = day
      const holiday = JSON.parse(JSON.stringify(this.temp.holiday_date))
      holiday.push(day)
      this.temp.holiday_date = holiday
    },
    reduceDate (day) {
      this.clickDay = day
      this.temp.holiday_date = this.temp.holiday_date.filter((i) => i !== day)
    },
    async validate (rule, value, callback) {
      if (!value) {
        return Promise.reject(this.$t('requiredFeedback'))
      }
      const found = this.holidayData.find((item) => {
        if (this.isNew) {
          return item.holiday_name === value
        } else {
          return (
            item.holiday_name === value &&
            value !== this.holidayData[this.selectIndex].holiday_name
          )
        }
      })
      if (found) {
        return Promise.reject(new Error(this.$t('nameRepeat')))
      } else {
        return Promise.resolve()
      }
    },

    changeTemp (temp, index) {
      this.clickDay = ''
      // this.$refs.holidayFormRef.clearValidate()
      if (temp === 'add') {
        this.visible = true
        if (this.$refs.holidayFormRef) {
          this.$refs.holidayFormRef.clearValidate()
        }
      }
      this.temp =
        temp === 'add'
          ? { holiday_name: 'New Template', holiday_date: [] }
          : JSON.parse(JSON.stringify(temp))
      this.selectIndex = temp === 'add' ? '' : index
      this.isNew = temp === 'add'

      this.selectName = temp.holiday_name
    },

    saveData () {
      this.temp.holiday_date = [...new Set(this.temp.holiday_date)]
      const saveTemp = { ...this.temp }

      const text = this.isNew ? 'added' : 'update'
      if (this.isNew) {
        this.holidayData.push(saveTemp)
      } else {
        this.holidayData[this.selectIndex] = saveTemp
      }
      this.getData()
      message.success(
        this.temp.holiday_name + ' ' + this.$t(text) + this.$t('success'),
        5
      )
      this.selectedKeys = [saveTemp.holiday_name]
    },
    keyUp (e) {
      if (!this.clickDay) return
      const keyCode = e.keyCode
      let day = ''
      switch (keyCode) {
        case 37:
          day = dayjs(this.clickDay).subtract(1, 'day').format('YYYY-MM-DD')
          break
        case 38:
          day = dayjs(this.clickDay).subtract(7, 'day').format('YYYY-MM-DD')
          break
        case 39:
          day = dayjs(this.clickDay).add(1, 'day').format('YYYY-MM-DD')
          break
        case 40:
          day = dayjs(this.clickDay).add(7, 'day').format('YYYY-MM-DD')
          break
        default:
          return
      }

      if (dayjs(day).month() !== dayjs(this.clickDay).month()) {
        return
      }
      if (this.temp.holiday_date.includes(day)) {
        this.reduceDate(day)
      } else {
        this.addDate(day)
      }
    },
    getData (first) {
      if (this.holidayData.length === 0) {
        this.temp = { holiday_date: [] }
        this.selectName = ''
        this.selectIndex = 0

        return
      }
      if (first) {
        this.selectedKeys = [this.holidayData[0].holiday_name]
        this.changeTemp(this.holidayData[0], 0)
      }
      if (this.isNew) {
        const last = this.holidayData.length - 1
        this.changeTemp(this.holidayData[last], last)
        this.isNew = false
      }
    },
    deleteHoliday () {
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
              this.$t('holidayGroup') + `：${this.temp.holiday_name}`
            )
          ]),

        onOk: () => {
          this.holidayData.splice(this.selectIndex, 1)

          message.success(
            this.temp.holiday_name +
              ' ' +
              this.$t('delete') +
              this.$t('success'),
            5
          )
          this.getData('first')
        },

        onCancel () {}
      })
    }
  },
  mounted () {
    this.getData('first')
    addEventListener('keyup', this.keyUp, false)
  },

  beforeUnmount () {
    removeEventListener('keyup', this.keyUp)
  }
}
</script>
