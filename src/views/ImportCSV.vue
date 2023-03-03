<template>
  <div class="p-5">
    <a-steps :current="current">
      <a-step title="上傳CSV" />
      <a-step title="欄對應" />
      <a-step title="匯入" />
      <a-step title="完成" />
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
          <div class="d-flex justify-content-end">
            <a-button
              class="me-2"
              type="primary"
              @click="current = current + 1"
            >
              繼續
            </a-button>
          </div>
        </template>
      </a-card>
      <a-card
        v-if="current === 1"
        :bodyStyle="{ padding: 0 }"
        class="my-4 p-0"
        title="CSV對應欄位"
      >
        <a-table size="small" :data-source="renderData" :pagination="false">
          <a-table-column
            class="text-nowrap ps-4"
            key="columnName"
            title="欄位名稱"
            data-index="name"
          />

          <a-table-column
            :width="'40%'"
            key="action"
            title="對應至欄位"
            data-index="action"
          />
          <template #bodyCell="{ column, text, record }">
            <template v-if="column && column.key === 'columnName'">
              <div class="ps-4">{{ text }}</div>
            </template>

            <template v-else-if="column && column.key === 'action'">
              <a-select v-model:value="list[record.name]" style="width: 100%">
                <a-select-option
                  allowClear="true"
                  v-for="item in importTitle"
                  :key="item"
                  :value="item"
                  >{{ item }}</a-select-option
                >
              </a-select>
            </template>
          </template>
        </a-table>
        <template #actions>
          <div class="d-flex justify-content-end">
            <a-button class="me-2" @click="current = current - 1">
              返回
            </a-button>
            <a-button class="me-2" type="primary" @click="upload">
              繼續
            </a-button>
          </div>
        </template>
      </a-card>
      <a-card v-if="current === 2" class="my-4" title="匯入中">
        人員資料正在匯入...
        <a-divider />
        <a-progress
          :stroke-color="'#384893'"
          :showInfo="false"
          :percent="defaultPercent"
        ></a-progress>
      </a-card>
      <a-card v-if="current === 3" class="my-4" title="完成!">
        <a-result
          status="success"
          title="匯入完成!"
          :sub-title="`${total}名人員匯入成功!已上傳檔案${name}`"
        >
        </a-result>
        <template #actions>
          <router-link to="/home/person">
            <div class="d-flex justify-content-end">
              <a-button class="me-2" type="primary"> 前往人員資料 </a-button>
            </div>
          </router-link>
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
      defaultPercent: 10,
      list: {},
      renderData: [
        { name: 'username' },
        { name: 'person_id' },
        { name: 'card_id' },
        { name: 'email' },
        { name: 'created_since' },
        { name: 'valid_till' }
      ],
      current: 0,
      name: '',
      dataString: '',
      importTitle: '',
      total: 0
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
      vm.name = e.file.name
      reader.readAsText(uploadedFile)
      reader.onload = function () {
        const dataString = reader.result
          .replace(/\r\n[\r\n]+/g, '\r\n')
          .replace(/\r\n$/, '')
        vm.dataString = dataString
        vm.importTitle = dataString.split('\r\n')[0].split(',')
      }
    },
    upload () {
      this.current = 2

      setInterval(() => {
        this.defaultPercent += 15
      }, 500)
      const t0 = performance.now()
      const person = JSON.parse(sessionStorage.getItem('person'))
      const index = person[person.length - 1].id

      const arr = this.dataString.split('\r\n')
      const data = {}
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
            default:
              temp += `"${i}":"${data[list[i]][num]}",`
              break
          }
        }
        temp += `"id":"${index + num}"`
        temp = `{${temp}}`
        arrtemp.push(JSON.parse(temp))
      }
      this.total = arrtemp.length

      const persondata = person.concat(arrtemp)
      sessionStorage.setItem('person', JSON.stringify(persondata))
      const t1 = performance.now()
      console.log(t1 - t0)
      if (t1 - t0 > 3000) {
        this.current = 3
      } else {
        setTimeout(() => {
          this.current = 3
        }, 3000)
      }
    }
  },
  created () {}
}
</script>

<style>
.ant-progress-success-bg,
.ant-progress-bg {
  height: 35px !important;
  border-radius: 5px;
}
.ant-progress-inner {
  border-radius: 5px;
}
</style>
