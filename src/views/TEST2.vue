<template>
  <div class="p-5">
    <a-steps :current="current">
      <a-step title="上傳CSV" />
      <a-step title="欄對應" />
      <a-step title="預覽" />
      <a-step title="匯入" />
    </a-steps>
    <div class="steps-content">
      <a-card v-if="current === 0" class="my-4" title="從CSV檔匯入人員資料">
        <span class="me-5"> 選擇一個CSV檔案： </span>
        <a-upload :showUploadList="false" name="file" :customRequest="readFile">
          <a-button>
            <upload-outlined></upload-outlined>
            Upload CSV
          </a-button>
          {{ name ? name : $t('noFileSelected') }}
        </a-upload>
        <template #actions>
          <a-button type="primary" @click="current = current + 1">
            繼續
          </a-button>
        </template>
      </a-card>
      <a-card v-if="current === 1" class="my-4" title="CSV對應欄位">
        <span class="me-5"> 選擇一個CSV檔案： </span>
        <a-upload :showUploadList="false" name="file" :customRequest="readFile">
          <a-button>
            <upload-outlined></upload-outlined>
            Upload CSV
          </a-button>
          {{ name ? name : $t('noFileSelected') }}
        </a-upload>
        <template #actions>
          <a-button type="primary" @click="current = current + 1">
            繼續
          </a-button>
        </template>
      </a-card>
    </div>
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
      current: 0,
      name: ''
    }
  },
  watch: {
    list: {
      handler (n) {
        console.log(n)
      },
      immediate: true,
      deep: true
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
        const dataString = reader.result
          .replace(/\r\n[\r\n]+/g, '\r\n')
          .replace(/\r\n$/, '')
        vm.dataString = dataString

        vm.importTitle = []
        const arr = dataString.split('\r\n')
        let temp = ''
        const arrtemp = []
        arr.forEach((i, index) => {
          const item = i.split(',')
          if (index === 0) {
            item.forEach((i) => {
              vm.importTitle.push(i)
            })
          } else {
            temp = ''
            item.forEach((i, index) => {
              temp += `"${vm.importTitle[index]}":"${i}",`
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
    preview () {
      this.spinning = true
      setTimeout(() => {
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
      }, 50)
    },
    upload () {
      const data = JSON.parse(JSON.stringify(this.finalData))
      data.forEach((i) => {
        const findWeek = this.weekList.find(
          (week) => week.week_name === i.week_name
        )
        const findHoliday = this.holidayList.find(
          (week) => week.holiday_name === i.holiday_name
        )
        const findMakeup = this.makeupList.find(
          (week) => week.makeup_name === i.makeup_name
        )

        i.week_id = findWeek ? findWeek.week_id : 0
        i.holiday_id = findHoliday ? findHoliday.holiday_id : 0
        i.makeup_id = findMakeup ? findMakeup.makeup_id : 0

        delete i.week_name
        delete i.holiday_name
        delete i.makeup_name
      })
      console.log(data)
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
