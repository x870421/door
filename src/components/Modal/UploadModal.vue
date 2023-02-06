<template>
  <div>
    <a-modal v-model:visible="showModal.visible" :title="$t('importCSV')">
      <template #footer>
        <a-button key="submit" type="primary" @click="showModal.visible = false"
          >{{ $t('cancel') }}
        </a-button>
      </template>
      <a-upload
        :disabled="loading"
        :showUploadList="false"
        name="file"
        :customRequest="readFile"
      >
        <a-button :loading="loading"> Upload CSV </a-button>
        {{ name ? name : $t('noFileSelected') }}
      </a-upload>
      <span>
        <a-button @click="exampleCSV" type="link">範例下載</a-button>
      </span>
      <div class="mt-3 mb-1">
        <a-typography-paragraph>
          <ul>
            <li>
              <a-typography-text>
                欄位名稱請與範例一致，並且每個欄位都必須存在
              </a-typography-text>
            </li>
            <li>
              <a-typography-text>
                person_id、username、email、card_type為必填
              </a-typography-text>
            </li>
            <li>
              <a-typography-text>
                card_type：請參考以下對應的數字填入
              </a-typography-text>
            </li>
          </ul>
        </a-typography-paragraph>
      </div>

      <a-descriptions :column="{ xs: 1, sm: 1, md: 1 }" bordered>
        <a-descriptions-item
          v-for="item in cardData"
          :key="item"
          :label="$t(item.name)"
          >{{ item.type }}
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>
<script>
import { message } from 'ant-design-vue'

export default {
  props: ['modalupload'],

  data () {
    return {
      showModal: {},
      name: '',
      loading: false,
      cardData: [
        { name: '一般卡', type: '81' },
        {
          name: '黑名單發警報',
          type: '03'
        },
        {
          name: '黑名單不發警報',
          type: '05'
        },
        {
          name: '不受Anti管制卡',
          type: '88'
        }
      ]
    }
  },

  watch: {
    modalupload: {
      handler (n) {
        this.showModal = this.modalupload
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    exampleCSV () {
      const dataArr = [
        'person_id,username,email,card_type,card_id,password_hash,authentication_type,created_since,valid_till',
        '7275065026,秦哲瑋,Christopher_Jones76540d@tp.gov.tw,88,57836545052426,,0,2023-01-06,2072-12-24',
        '5590422543,楊雅筑,Rebecca_Mckinney50654d@acer.com,81,41863570849595,,0,2023-01-06,2072-12-24',
        '9268567396,張哲瑋,Robert_Compton74589sd71@hotmail.com,81,4866540015871,,0,2023-01-06,2072-12-24'
      ]
      const data = dataArr.join('\r\n')
      const downloadLink = document.createElement('a')
      const code = encodeURIComponent(data)

      downloadLink.href = 'data:application/csv;charset=utf-8,%EF%BB%BF' + code
      downloadLink.setAttribute('download', 'example.csv')
      downloadLink.setAttribute('hidden', true)

      downloadLink.click()
    },
    readFile (e) {
      const vm = this
      const uploadedFile = e.file

      if (uploadedFile.type !== 'text/csv') {
        message.error('請選擇csv檔')
        return
      }
      vm.loading = true
      vm.name = e.file.name

      const reader = new FileReader()
      reader.readAsText(uploadedFile)
      reader.onload = function () {
        const dataString = reader.result
          .replaceAll('\r\n', '\n')
          .replace(/\n[\n]+/g, '\n')
          .replace(/\n$/, '')
        const arr = dataString.split('\n')
        let title = []
        const arrTemp = []
        arr.forEach((row, index) => {
          if (index === 0) {
            title = row.split(',')
          } else {
            const temp = {}
            for (let i = 0; i < title.length; i++) {
              const item = row.split(',')
              temp[title[i]] = item[i]
            }
            arrTemp.push(temp)
          }
        })
        vm.$emit('upload-person', arrTemp)

        vm.loading = false
      }
    }
  }
}
</script>
