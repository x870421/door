<template>
  <div class="p-sm-4 p-2">
    <a-upload :showUploadList="false" name="file" :customRequest="readFile">
      <a-button>
        <upload-outlined></upload-outlined>
        Upload CSV
      </a-button>
      {{ name ? name : $t('noFileSelected') }}
    </a-upload>
    <div class="py-3">
      <a-card size="small" title="標題對應名稱">
        <a-form ref="importRef" :model="list" class="ant-advanced-search-form">
          <a-row :gutter="24">
            <a-col
              v-for="(title, index) in renderTitle"
              :key="index"
              :lg="8"
              :md="12"
              :sm="24"
              :xs="24"
            >
              <a-form-item
                :name="title.value"
                :rules="[
                  {
                    required: title.required,
                    message: $t('requiredSelectFeedback')
                  }
                ]"
                :label="$t(title.label)"
              >
                <a-select v-model:value="list[title.value]" style="width: 100%">
                  <a-select-option
                    allowClear="true"
                    v-for="item in importTitle"
                    :key="item"
                    :value="item"
                    >{{ item }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <!-- <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item :label="$t('personID')">
                <a-select v-model:value="list.person_id" style="width: 100%">
                  <a-select-option
                    v-for="item in importTitle"
                    :key="item"
                    :value="item"
                    >{{ item }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item :label="$t('cardID')">
                <a-select v-model:value="list.card_id" style="width: 100%">
                  <a-select-option
                    v-for="item in importTitle"
                    :key="item"
                    :value="item"
                    >{{ item }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item :label="$t('email')">
                <a-select v-model:value="list.email" style="width: 100%">
                  <a-select-option
                    v-for="item in importTitle"
                    :key="item"
                    :value="item"
                    >{{ item }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item :label="$t('holidayID')">
                <a-select v-model:value="list.holiday_id" style="width: 100%">
                  <a-select-option
                    v-for="item in importTitle"
                    :key="item"
                    :value="item"
                    >{{ item }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item :label="$t('weekID')">
                <a-select v-model:value="list.week_id" style="width: 100%">
                  <a-select-option
                    v-for="item in importTitle"
                    :key="item"
                    :value="item"
                    >{{ item }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item :label="$t('startTime')">
                <a-select
                  v-model:value="list.created_since"
                  style="width: 100%"
                >
                  <a-select-option
                    v-for="item in importTitle"
                    :key="item"
                    :value="item"
                    >{{ item }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item :label="$t('endTime')">
                <a-select v-model:value="list.valid_till" style="width: 100%">
                  <a-select-option
                    v-for="item in importTitle"
                    :key="item"
                    :value="item"
                    >{{ item }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col> -->
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item
                :rules="[
                  {
                    required: true,
                    message: $t('cardTypeFeedback')
                  }
                ]"
                name="card_type"
                :label="$t('cardType')"
              >
                <a-select
                  v-model:value="list.card_type"
                  style="width: 100%"
                  :options="[
                    { label: $t('一般卡'), value: '81' },
                    { label: $t('黑名單發警報'), value: '03' },
                    { label: $t('黑名單不發警報'), value: '05' },
                    { label: $t('不受Anti管制卡'), value: '88' }
                  ]"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item :label="$t('comparisonMode')">
                <a-select
                  v-model:value="list.authentication_type"
                  style="width: 100%"
                  :options="[
                    { value: 0, label: $t('swipeCard') },
                    {
                      value: 1,
                      label: $t('swipeCard') + ' & ' + $t('photograph')
                    }
                  ]"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="24" :md="24" :sm="24" :xs="24">
              <span
                class="table-page-search-submitButtons"
                :style="{ float: 'right', overflow: 'hidden' }"
              >
                <a-button
                  :disabled="data && data.length === 0"
                  @click="onCheck"
                  type="primary"
                  style="margin-left: 8px"
                >
                  上傳
                </a-button>
                <a-button @click="reset" style="margin-left: 8px">
                  {{ $t('reset') }}
                </a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
    </div>
    <a-spin :spinning="spinning" tip="Loading...">
      <div class="py-3">
        <a-card :bodyStyle="{ padding: 0 }" size="small" title="預覽">
          <a-table
            size="small"
            :data-source="data"
            :pagination="{
              size: 'middle',
              'show-quick-jumper': true,
              defaultPageSize: 20,
              position: ['bottomLeft'],
              pageSizeOptions: ['10', '20', '30', '40'],
              style: { 'margin-left': '12px' }
            }"
          >
            <a-table-column
              v-for="(item, index) in importTitle"
              :key="index"
              :class="{ 'ps-4': index === 0 }"
              class="table-bg-primary"
              :title="item"
              :data-index="item"
              :ellipsis="true"
            />
            <template #bodyCell="{ text, column }">
              <template v-if="column.key === 0">
                <span class="ms-3"> {{ text }} </span>
              </template>
            </template>
          </a-table>
        </a-card>
      </div>

      <!-- <div v-else-if="finalData && finalData.length !== 0" class="py-3">
        <a-card :bodyStyle="{ padding: 0 }" size="small" title="上傳預覽">
          <a-table
            size="small"
            :data-source="finalData"
            :pagination="{
              size: 'middle',
              'show-quick-jumper': true,
              defaultPageSize: 20,
              position: ['bottomLeft'],
              pageSizeOptions: ['10', '20', '30', '40'],
              style: { 'margin-left': '12px' }
            }"
          >
            <a-table-column
              class="ps-4 text-nowrap table-bg-primary"
              key="username"
              :title="$t('name')"
              data-index="username"
            />

            <a-table-column
              class="table-bg-primary"
              key="person_id "
              :title="$t('personID')"
              data-index="person_id"
              :ellipsis="true"
            />
            <a-table-column
              class="table-bg-primary"
              key="card_id"
              :title="$t('cardID')"
              data-index="card_id"
              :ellipsis="true"
            />
            <a-table-column
              class="text-nowrap table-bg-primary"
              key="week_name"
              :title="$t('weekTable')"
              width="5rem"
              data-index="week_name"
              :ellipsis="true"
            />
            <a-table-column
              class="text-nowrap table-bg-primary"
              key="holiday_name"
              width="5rem"
              :title="$t('holidayTable')"
              data-index="holiday_name"
              :ellipsis="true"
            />
            <a-table-column
              class="text-nowrap table-bg-primary"
              key="makeup_name"
              :title="$t('make-upWorkdayTable')"
              data-index="makeup_name"
              :ellipsis="true"
            />
            <a-table-column
              class="table-bg-primary"
              key="email"
              :ellipsis="true"
              :title="$t('email')"
              data-index="email"
            />
            <a-table-column
              class="table-bg-primary"
              :ellipsis="true"
              key="created_since"
              :title="$t('startTime')"
              data-index="created_since"
            />
            <a-table-column
              class="table-bg-primary"
              :ellipsis="true"
              key="valid_till"
              :title="$t('endTime')"
              data-index="valid_till"
            />

            <template #bodyCell="{ column, record }">
              <template v-if="column && column.key === 'username'">
                <div class="ms-3">{{ record.username }}</div>
              </template>

              <template v-else-if="column && column.key === 'email'">
                <a :title="record.email" :href="`mailto:${record.email}`"
                  >{{ record.email }}
                </a>
              </template>
              <template v-else-if="column && column.key === 'created_since'">
                <span>
                  {{
                    record.created_since
                      ? dayjs(record.created_since).format(dateFormat)
                      : ''
                  }}
                </span>
              </template>
              <template v-else-if="column && column.key === 'valid_till'">
                <span>
                  {{
                    record.valid_till
                      ? dayjs(record.valid_till).format(dateFormat)
                      : ''
                  }}
                </span>
              </template>
            </template>
          </a-table>
        </a-card>
      </div> -->
    </a-spin>
  </div>
</template>

<script>
import { UploadOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'
export default {
  components: {
    UploadOutlined
  },
  data () {
    return {
      spinning: false,
      list: {
        authentication_type: 0,
        card_id: 'card_id',
        card_type: '81',
        created_since: 'created_since',
        email: 'email',
        holiday_name: 'holiday_id',
        person_id: 'person_id',
        username: 'username',
        valid_till: 'valid_till',
        week_name: 'week_id',
        makeup_name: 'makeup_id',
        password_hash: 'password_hash'
      },
      name: '',
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      finalData: [],
      data: [],
      dataString: '',
      renderTitle: [
        { label: 'name', value: 'username', required: true },
        { label: 'personID', value: 'person_id' },
        { label: 'cardID', value: 'card_id', required: true },
        { label: 'email', value: 'email', required: true },
        { label: 'holidayTable', value: 'holiday_name' },
        { label: 'weekTable', value: 'week_name' },
        { label: 'make-upWorkdayTable', value: 'makeup_name' },
        { label: 'startTime', value: 'created_since' },
        { label: 'endTime', value: 'valid_till' },
        { label: 'password', value: 'password_hash' }
      ],
      importTitle: [],
      weekList: [],
      holidayList: [],
      makeupList: []
    }
  },

  methods: {
    dayjs,
    readFile (e) {
      const vm = this
      const uploadedFile = e.file

      if (uploadedFile.type !== 'text/csv') {
        message.error('請選擇csv檔')
        return
      }
      const reader = new FileReader()
      vm.spinning = true
      vm.importTitle = [' ']
      vm.data = [{}]
      vm.name = e.file.name
      reader.readAsText(uploadedFile)
      reader.onload = function () {
        if (reader.result.includes('�')) {
          message.error('編碼格式錯誤，請上傳 UTF-8 格式文件')
          vm.spinning = false
          return
        }

        const dataString = reader.result
          .replaceAll('\r\n', '\n')
          .replace(/\n[\n]+/g, '\n')
          .replace(/\n$/, '')

        vm.dataString = dataString
        vm.importTitle = []
        const arr = dataString.split('\n')

        let temp = ''
        const arrtemp = []

        arr.forEach((i, index) => {
          const sep1 = i.split('"').filter((el) => el)
          let item = []
          sep1.forEach((sep1Item, sep1Index) => {
            if (sep1.length === 1) {
              item = i.split(',')
              return
            }
            if (sep1Item[0] === ',') {
              const sep2 = sep1Item.split(',')
              sep2.shift()
              item = item.concat(sep2)
            } else if (sep1Item.substr(-1) === ',') {
              const sep2 = sep1Item.split(',')
              sep2.pop()
              item = item.concat(sep2)
            } else {
              item = item.concat(sep1Item)
            }
          })
          if (index === 0) {
            item.forEach((i) => {
              vm.importTitle.push(i)
            })
          } else {
            temp = ''
            item.forEach((i, index) => {
              temp += `"${vm.importTitle[index]}":"${i.replaceAll('"', '')}",`
            })
            temp = `{${temp.slice(0, -1)}}`
            arrtemp.push(JSON.parse(temp))
          }
        })
        vm.data = arrtemp
        vm.finalData = []
        vm.spinning = false
      }
    },
    reset () {
      this.list = {}

      this.$refs.importRef.clearValidate()
    },
    preview () {
      this.spinning = true
      const arr = this.dataString.split('\r\n')
      const data = {}
      const cardType = this.list.card_type || null
      const authenticationType =
        this.list.authentication_type === 0
          ? 0
          : this.list.authentication_type || null
      const list = { ...this.list }
      const arrtemp = []
      let temp = ''
      let titleArr = []
      arr.forEach((row, index) => {
        const item = row.split(',')
        if (index === 0) {
          titleArr = item
          titleArr.forEach((row) => {
            data[row] = []
          })
          return false
        } else {
          for (let i = 0; i < titleArr.length - 1; i++) {
            data[titleArr[i]].push(item[i])
          }
        }
      })
      for (let num = 0; num < arr.length - 1; num++) {
        temp = ''
        for (const i in list) {
          switch (i) {
            case 'created_since':
              temp += `"${i}":"${dayjs(data[list[i]][num]).format(
                'YYYY-MM-DDTHH:mm:ss.000001'
              )}",`
              break
            case 'valid_till':
              temp += `"${i}":"${dayjs(data[list[i]][num]).format(
                'YYYY-MM-DDTHH:mm:ss.999999'
              )}",`
              break

            case 'card_type':
              break
            case 'authentication_type':
              break
            default:
              temp += `"${i}":"${data[list[i]][num]}",`
              break
          }
        }
        temp += `"authentication_type":${authenticationType},"card_type":${cardType}`
        temp = `{${temp}}`
        arrtemp.push(JSON.parse(temp))
      }
      this.finalData = arrtemp
      this.spinning = false
    },
    onCheck () {
      this.$refs.importRef
        .validateFields()
        .then((res) => {
          this.upload()
        })
        .catch(() => {
          this.$refs.importRef.scrollToField()
        })
    },

    upload () {
      const arr = this.dataString.split('\n')
      const data = {}
      const cardType = this.list.card_type || null
      const authenticationType =
        this.list.authentication_type === 0
          ? 0
          : this.list.authentication_type || null
      const list = { ...this.list }
      const arrtemp = []
      let temp = ''
      let titleArr = []

      arr.forEach((row, index) => {
        const sep1 = row.split('"').filter((el) => el)
        let item = []
        sep1.forEach((sep1Item, sep1Index) => {
          if (sep1.length === 1) {
            item = row.split(',')
            return
          }
          if (sep1Item[0] === ',') {
            const sep2 = sep1Item.split(',')
            sep2.shift()
            item = item.concat(sep2)
          } else if (sep1Item.substr(-1) === ',') {
            const sep2 = sep1Item.split(',')
            sep2.pop()
            item = item.concat(sep2)
          } else {
            item = item.concat(sep1Item)
          }
        })
        // const item = row.split(',')
        if (index === 0) {
          titleArr = item
          titleArr.forEach((row) => {
            data[row] = []
          })
          return false
        } else {
          for (let i = 0; i < titleArr.length; i++) {
            data[titleArr[i]].push(item[i])
          }
        }
      })

      for (let num = 0; num < arr.length - 1; num++) {
        temp = ''
        for (const i in list) {
          switch (i) {
            case 'created_since':
              temp += `"${i}":"${dayjs(data[list[i]][num]).format(
                'YYYY-MM-DDTHH:mm:ss.000001'
              )}",`
              break
            case 'valid_till':
              temp += `"${i}":"${dayjs(data[list[i]][num]).format(
                'YYYY-MM-DDTHH:mm:ss.999999'
              )}",`
              break
            case 'password_hash':
              if (data[list[i]][num]) {
                temp += `"${i}":"${data[list[i]][num]}",`
              }
              break
            case 'authentication_type':
              break
            case 'card_type':
              break
            case 'week_name': {
              const findWeek = this.weekList.find(
                (week) => week.week_name === data[list[i]][num]
              )
              temp += '"week_id":'
              temp += findWeek ? `"${findWeek.week_id}",` : '"0",'
              break
            }
            case 'holiday_name': {
              const findHoliday = this.holidayList.find(
                (day) => day.holiday_name === data[list[i]][num]
              )
              temp += '"holiday_id":'
              temp += findHoliday ? `"${findHoliday.holiday_id}",` : '"0",'
              break
            }
            case 'makeup_name': {
              const findMakeup = this.makeupList.find(
                (day) => day.makeup_name === data[list[i]][num]
              )
              temp += '"makeup_id":'
              temp += findMakeup ? `"${findMakeup.makeup_id}",` : '"0",'
              break
            }

            default:
              temp += `"${i}":"${data[list[i]][num]}",`
              break
          }
        }
        temp += `"authentication_type":${authenticationType},"card_type":"${cardType}"`
        temp = `{${temp}}`
        arrtemp.push(JSON.parse(temp))
      }
      console.log(arrtemp)
    },
    getWeekList () {
      const api = 'onduty'
      return this.$http.get(api)
    },
    getHoliday () {
      const api = 'holiday'
      return this.$http.get(api)
    },
    getMakeupday () {
      const api = 'makeup'
      return this.$http.get(api)
    }
  },
  created () {
    Promise.all([this.getWeekList(), this.getHoliday(), this.getMakeupday()])
      .then(([{ data: week }, { data: holiday }, { data: makeup }]) => {
        this.weekList = week.on_dutiess
        this.weekList.push({ week_id: 0, week_name: '不檢查' })

        this.holidayList = holiday.holidays
        this.holidayList.push({ holiday_id: 0, holiday_name: '不檢查' })

        this.makeupList = makeup.makeups
        this.makeupList.push({ makeup_id: 0, makeup_name: '不檢查' })
      })
      .catch((err) => err)
  }
}
</script>

<style></style>
