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
              <template v-if="allTime && allTime.length > 0">
                <a-menu-item
                  v-for="(timedata, index) in allTime"
                  :key="timedata.week_name"
                  ><a href="#" @click.prevent="changeTemp(timedata, index)"
                    >{{ timedata.week_name }}
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
            v-if="temp && temp.week_name"
            class="ms-2"
            :trigger="['click']"
          >
            <a class="ant-dropdown-link setting-link" @click.prevent>
              <setting-filled />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <edit-outlined class="me-1" />
                  <a @click.prevent="visible = true">
                    {{ $t('修改星期表名稱') }}
                  </a>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item>
                  <delete-outlined class="me-1" style="color: red" />
                  <a @click.prevent="deleteWeek" style="color: red">
                    {{ $t('刪除此星期表') }}
                  </a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>

        <div class="p-4">
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
              v-if="!temp.week_name && !visible"
            >
              {{ $t('請先點選左側新增') }}
            </div>
            <div class="mb-1">{{ $t('time') }} :</div>
            <a-tabs
              v-model:activeKey="activeKey"
              tab-position="top"
              size="small"
              animated
              style="min-height: 275px; width: auto"
            >
              <a-tab-pane
                :tab="$t(day)"
                v-for="(day, index) in renderDay"
                :key="'day' + `${index + 1}`"
              >
                <range-slider
                  @copyto="copyTo"
                  :rangeday="formState[day]"
                  :options="renderDay"
                ></range-slider>
              </a-tab-pane>
            </a-tabs>
            <div class="my-2 d-flex justify-content-center">
              <a-button
                v-if="temp && temp.week_name"
                type="primary"
                @click.prevent="saveTime"
                >{{ $t('save') }}</a-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-modal
      v-model:visible="visible"
      :title="$t('weekTableFeedBack')"
      :ok-text="$t('save')"
      :cancel-text="$t('cancel')"
      @ok="onOk"
      @cancel="onCancel"
    >
      <a-form :model="temp" ref="weekdayFormRef">
        <a-form-item
          class="mb-2"
          style="max-width: 350px"
          :label="$t('shiftname')"
          name="week_name"
          :rules="[
            {
              required: true,
              validator: validateName,
              trigger: 'change'
            }
          ]"
        >
          <a-input v-model:value="temp.week_name" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {
  ExclamationCircleOutlined,
  SettingFilled,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons-vue'
import RangeSlider from '@/components/AccessControl/RangeSlider.vue'
import { message, Modal } from 'ant-design-vue'
import { createVNode, h } from 'vue'

export default {
  components: { RangeSlider, SettingFilled, DeleteOutlined, EditOutlined },
  emits: ['copyto'],
  data () {
    return {
      renderDay: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'HOL'],
      selectedKeys: [],
      formState: {
        MON: [],
        TUE: [],
        WED: [],
        THU: [],
        FRI: [],
        SAT: [],
        SUN: [],
        HOL: []
      },
      temp: { week_name: ' ' },
      activeKey: 'day1',
      allTime: [
        {
          id: 1,
          on_duty_time: {
            FRI: [
              {
                end: '12:00',
                start: '08:00'
              },
              {
                end: '24:00',
                start: '3:00'
              }
            ],
            HOL: [
              {
                end: '18:00',
                start: '08:00'
              }
            ],
            MON: [
              {
                end: '08:00',
                start: '07:45'
              }
            ],
            SAT: [],
            SUN: [],
            THU: [
              {
                end: '18:00',
                start: '08:00'
              }
            ],
            TUE: [
              {
                end: '12:00',
                start: '08:00'
              }
            ],
            WED: [
              {
                end: '18:00',
                start: '08:00'
              }
            ]
          },
          week_id: '1',
          week_name: '正常班'
        },
        {
          id: 2,
          on_duty_time: {
            FRI: [
              {
                end: '24:00',
                start: '14:00'
              },
              {
                end: '10:00',
                start: '03:00'
              }
            ],
            HOL: [
              {
                end: '18:00',
                start: '08:00'
              }
            ],
            MON: [
              {
                end: '24:00',
                start: '14:00'
              }
            ],
            SAT: [],
            SUN: [],
            THU: [
              {
                end: '24:00',
                start: '14:00'
              }
            ],
            TUE: [
              {
                end: '24:00',
                start: '14:00'
              }
            ],
            WED: [
              {
                end: '24:00',
                start: '14:00'
              }
            ]
          },
          week_id: '2',
          week_name: '小夜班'
        }
      ],
      isNew: false,
      selectName: '',
      selectIndex: 0,
      visible: false
    }
  },

  methods: {
    onCancel () {
      if (this.allTime.length === 0) {
        this.selectedKeys = []
        this.temp = {}
        this.formState = {
          MON: [],
          TUE: [],
          WED: [],
          THU: [],
          FRI: [],
          SAT: [],
          SUN: [],
          HOL: []
        }
        this.selectIndex = 0
        return
      }

      this.selectedKeys = [this.allTime[0].week_name]
      this.changeTemp(this.allTime[0], 0)
    },
    onOk () {
      this.$refs.weekdayFormRef
        .validateFields()
        .then(() => {
          this.visible = false
          this.selectName = this.temp.week_name
          if (this.selectedKeys[0] !== 'add') {
            this.saveTime()
          }
        })
        .catch(() => {
          this.$refs.weekdayFormRef.scrollToField()
        })
    },
    updateName () {
      this.visible = true
    },
    async validateName (rule, value) {
      if (!value) {
        return Promise.reject(this.$t('requiredFeedback'))
      }
      const found = this.allTime.find((item) => {
        if (this.isNew) {
          return item.week_name === value
        } else {
          return item.week_name === value && value !== this.selectName
        }
      })
      if (found) {
        return Promise.reject(new Error(this.$t('nameRepeat')))
      } else {
        return Promise.resolve()
      }
    },

    getData (first) {
      if (this.allTime.length === 0) {
        this.temp = {}
        this.formState = {
          MON: [],
          TUE: [],
          WED: [],
          THU: [],
          FRI: [],
          SAT: [],
          SUN: [],
          HOL: []
        }
        this.selectName = ''
        this.selectIndex = 0

        return
      }
      if (first) {
        this.selectedKeys = [this.allTime[0].week_name]
        this.changeTemp(this.allTime[0], 0)
      }
      if (this.isNew === true) {
        const last = this.allTime.length - 1
        this.changeTemp(this.allTime[last], last)
        this.isNew = false
      }
    },

    deleteWeek () {
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
              this.$t('time') + `：${this.temp.week_name}`
            )
          ]),

        onOk: () => {
          this.allTime.splice(this.selectIndex, 1)

          message.success(
            this.temp.week_name + ' ' + this.$t('delete') + this.$t('success'),
            5
          )
          this.getData('first')
        },

        onCancel () {}
      })
    },
    saveTime () {
      const saveData = JSON.parse(JSON.stringify(this.formState))

      for (const day in saveData) {
        const last = saveData[day].length - 1
        if (last < 0) continue
        if (!saveData[day][last].start || !saveData[day][last].end) {
          saveData[day].splice(last, 1)
          this.formState[day].splice(last, 1)
        }

        for (const item in saveData[day]) {
          delete saveData[day][item].startTime
          delete saveData[day][item].endTime
        }
      }

      const saveObj = { ...this.temp }
      const text = this.isNew ? 'add' : 'update'
      saveObj.on_duty_time = saveData

      if (this.isNew) {
        this.allTime.push(saveObj)
      } else {
        this.allTime[this.selectIndex] = saveObj
      }

      message.success(
        saveObj.week_name + ' ' + this.$t(text) + this.$t('success'),
        5
      )
      this.getData()
      this.selectedKeys = [saveObj.week_name]
    },
    changeTemp (temp, index) {
      if (temp === 'add') {
        this.visible = true
        if (this.$refs.weekdayFormRef) {
          this.$refs.weekdayFormRef.clearValidate()
        }
      }

      this.temp =
        temp === 'add'
          ? { week_name: 'New Template', on_duty_time: [] }
          : { ...temp }

      this.selectName = temp.week_name
      this.selectIndex = temp === 'add' ? '' : index
      this.isNew = temp === 'add'
      this.formState =
        temp === 'add'
          ? {
              MON: [{ start: '', end: '' }],
              TUE: [{ start: '', end: '' }],
              WED: [{ start: '', end: '' }],
              THU: [{ start: '', end: '' }],
              FRI: [{ start: '', end: '' }],
              SAT: [{ start: '', end: '' }],
              SUN: [{ start: '', end: '' }],
              HOL: [{ start: '', end: '' }]
            }
          : JSON.parse(JSON.stringify(temp.on_duty_time))
    },
    copyTo (copy, to) {
      const last = copy.length - 1
      if (copy[last].start === '' || copy[last].end === '') copy.splice(last, 1)

      to.forEach((item) => {
        this.formState[item] = JSON.parse(JSON.stringify(copy))
      })
      message.success(this.$t('copy') + this.$t('success'), 5)
    }
  },

  mounted () {},
  created () {
    this.getData('first')
  }
}
</script>
