<template>
  <div class="p-sm-4 p-2">
    <div class="d-flex flex-wrap justify-content-between">
      <div>
        <a-button
          class="me-2 mb-2"
          :title="$t('add')"
          type="primary"
          @click="showModal(true)"
        >
          {{ $t('add') }}
        </a-button>
        <a-button
          class="me-2 mb-2"
          :title="$t('add')"
          type="primary"
          @click="deleteAll"
        >
          {{ $t('delete') }}
        </a-button>
        <a-button
          class="me-2 mb-2"
          @click="exportCSV"
          :title="$t('exportCSV')"
          type="primary"
        >
          {{ $t('exportCSV') }}
        </a-button>
        <a-button
          @click="modalupload.visible = true"
          class="me-2 mb-2"
          :title="$t('importCSV')"
          type="primary"
        >
          {{ $t('importCSV') }}
        </a-button>
      </div>

      <a-input-search
        v-model:value="search"
        :placeholder="$t('searchText')"
        style="width: 200px"
        @search="onSearch"
      />
    </div>

    <a-spin :spinning="spinning" tip="Loading...">
      <a-table
        class="mt-2"
        size="small"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :row-key="(record) => record.person_id"
        :data-source="renderData"
        :pagination="{
          size: 'middle',
          'show-quick-jumper': true,
          defaultPageSize: 20,
          position: ['bottomLeft'],
          pageSizeOptions: ['10', '20', '30', '40']
        }"
      >
        <a-table-column
          class="text-nowrap"
          key="username"
          :title="$t('name')"
          data-index="username"
        />

        <a-table-column
          key="person_id "
          :title="$t('personID')"
          data-index="person_id"
          :ellipsis="true"
        />
        <a-table-column
          key="card_id"
          :title="$t('cardID')"
          data-index="card_id"
          :ellipsis="true"
          :responsive="['lg']"
        />

        <a-table-column
          key="email"
          :ellipsis="true"
          :title="$t('email')"
          data-index="email"
        />
        <a-table-column
          :ellipsis="true"
          key="created_since"
          :title="$t('startTime')"
          data-index="created_since"
          :responsive="['lg']"
          :sorter="
            (a, b) =>
              dayjs(a.created_since, 'YYYY/MM/DD') -
              dayjs(b.created_since, 'YYYY/MM/DD')
          "
        />
        <a-table-column
          :ellipsis="true"
          :responsive="['md']"
          key="valid_till"
          :title="$t('endTime')"
          data-index="valid_till"
          :sorter="
            (a, b) =>
              dayjs(a.valid_till, 'YYYY/MM/DD') -
              dayjs(b.valid_till, 'YYYY/MM/DD')
          "
        />
        <a-table-column
          :width="'90px'"
          key="action"
          :title="$t('action')"
          data-index="action"
        />
        <template #bodyCell="{ column, record, index }">
          <template v-if="column && column.key === 'email'">
            <a :title="record.email" :href="`mailto:${record.email}`"
              >{{ record.email }}
            </a>
          </template>
          <template v-else-if="column && column.key === 'created_since'">
            <span :title="$d(new Date(record.created_since), 'short')">
              {{ dayjs(record.created_since).format(dateFormat) }}
            </span>
          </template>
          <template v-else-if="column && column.key === 'valid_till'">
            <span :title="$d(new Date(record.valid_till), 'short')">
              {{ dayjs(record.valid_till).format(dateFormat) }}
            </span>
          </template>

          <template v-else-if="column && column.key === 'action'">
            <a-button
              :title="$t('modify')"
              type="text"
              @click="showModal(false, record, index)"
              ><template #icon><edit-outlined /></template
            ></a-button>
            <a-button
              :title="$t('Delete')"
              type="text"
              @click="deleteModal(record, index)"
              ><template #icon><delete-outlined /></template>
              <!-- :style="{ color: '#FF4D4F' }" -->
            </a-button>
          </template>
        </template>
      </a-table>
    </a-spin>
  </div>
  <EditModal
    ref="editModel"
    :person-data="personData"
    @update-person="updatePerson"
    :modal="modal"
    :setmodal="setmodal"
    :temp="temp"
  ></EditModal>
  <UploadModal
    @upload-person="uploadPerson"
    ref="UploadModal"
    :modalupload="modalupload"
  ></UploadModal>
</template>

<script>
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue'
import EditModal from '@/components/Modal/EditModal.vue'
import UploadModal from '@/components/Modal/UploadModal.vue'
import { message, Modal } from 'ant-design-vue'
import { createVNode, h } from 'vue'
import dayjs from 'dayjs'
export default {
  components: { UploadModal, EditModal, EditOutlined, DeleteOutlined },
  data () {
    return {
      spinning: false,
      modal: {
        visible: false,
        temp: {},
        isNew: false
      },
      temp: {},
      modalupload: {
        visible: false
      },
      setmodal: { loading: false, showPassword: false },
      personData: [
        {
          authentication_type: 0,
          card_id: '3482219403839',
          card_type: '03',
          created_since: '2023-01-04T00:00:00.000001',
          email: 'Chloe_Gibson31135@msi.com.tw',
          holiday_id: '0',
          id: 1,
          makeup_id: '0',
          person_id: '987979874',
          username: '莫詩婷',
          valid_till: '2072-12-22T23:59:59.999999',
          week_id: '0'
        },
        {
          authentication_type: 0,
          card_id: '6971156457878',
          card_type: '81',
          created_since: '2023-01-04T00:00:00',
          email: 'Emily_Heath78606@facebook.com',
          holiday_id: '1',
          id: 2,
          makeup_id: '1',
          person_id: '2328031936623',
          username: '龍俊賢',
          valid_till: '2072-12-22T00:00:00',
          week_id: '1'
        },
        {
          authentication_type: 1,
          card_id: '2879334732127',
          card_type: '81',
          created_since: '2022-01-01T00:00:00.000001',
          email: 'JamesPorter150@yahoo.com.tw',
          holiday_id: '1',
          id: 3,
          makeup_id: '1',
          person_id: '3800121499740',
          username: '李婉婷',
          valid_till: '2022-12-26T23:59:59.999999',
          week_id: '1'
        },
        {
          authentication_type: 0,
          card_id: '8155781733851',
          card_type: '81',
          created_since: '2023-01-04T00:00:00',
          email: 'Michael_Garrison12788@msi.com.tw',
          holiday_id: '1',
          id: 4,
          makeup_id: '1',
          person_id: '2679200263218',
          username: '彭依婷',
          valid_till: '2072-12-22T00:00:00',
          week_id: '1'
        },
        {
          authentication_type: 0,
          card_id: '8812071689433',
          card_type: '05',
          created_since: '2023-01-04T00:00:00',
          email: 'Evelyn_Schwartz85561@hotmail.com',
          holiday_id: '1',
          id: 5,
          makeup_id: '1',
          person_id: '9962459555146',
          username: '麻佳玲',
          valid_till: '2072-12-22T00:00:00',
          week_id: '2'
        },
        {
          authentication_type: 0,
          card_id: '7244418131601',
          card_type: '81',
          created_since: '2023-01-04T00:00:00',
          email: 'Kimberly_Johnson28473@ebay.com',
          holiday_id: '1',
          id: 6,
          makeup_id: '1',
          person_id: '3932495178544',
          username: '蘇瑋婷',
          valid_till: '2072-12-22T00:00:00',
          week_id: '2'
        },
        {
          authentication_type: 0,
          card_id: '1537420604093',
          card_type: '81',
          created_since: '2023-01-04T00:00:00',
          email: 'Eddie_Randall39236@facebook.com',
          holiday_id: '1',
          id: 7,
          makeup_id: '1',
          person_id: '4902559747619',
          username: '吳俊賢',
          valid_till: '2072-12-22T00:00:00',
          week_id: '1'
        },
        {
          authentication_type: 0,
          card_id: '9285949599513',
          card_type: '05',
          created_since: '2023-01-04T00:00:00',
          email: 'Daniel_Ross87121@ebay.com',
          holiday_id: '1',
          id: 8,
          makeup_id: '1',
          person_id: '6923762985689',
          username: '王雅婷',
          valid_till: '2072-12-22T00:00:00',
          week_id: '2'
        },
        {
          authentication_type: 0,
          card_id: '7119878478651',
          card_type: '81',
          created_since: '2023-01-04T00:00:00',
          email: 'Gregory_Norton40595@aol.com',
          holiday_id: '1',
          id: 9,
          makeup_id: '1',
          person_id: '1563977615770',
          username: '張佳蓉',
          valid_till: '2072-12-22T00:00:00',
          week_id: '1'
        },
        {
          authentication_type: 0,
          card_id: '2838939917452',
          card_type: '81',
          created_since: '2023-01-04T00:00:00',
          email: 'William_Reese21783@msn.com',
          holiday_id: '1',
          id: 10,
          makeup_id: '1',
          person_id: '5145942108898',
          username: '胡惠如',
          valid_till: '2072-12-22T00:00:00',
          week_id: '2'
        },
        {
          authentication_type: 0,
          card_id: '8417546116546',
          card_type: '81',
          created_since: '2023-01-04T00:00:00',
          email: 'Jerry_Pena40218@asus.com',
          holiday_id: '1',
          id: 11,
          makeup_id: '1',
          person_id: '2056581770779',
          username: '謝懿',
          valid_till: '2072-12-22T00:00:00',
          week_id: '2'
        },
        {
          authentication_type: 0,
          card_id: '8674404358986',
          card_type: '88',
          created_since: '2023-01-04T00:00:00',
          email: 'Dwayne_Mcintosh21591@asus.com',
          holiday_id: '1',
          id: 12,
          makeup_id: '1',
          person_id: '5874787495435',
          username: '丁威廷',
          valid_till: '2072-12-22T00:00:00',
          week_id: '2'
        },
        {
          authentication_type: 0,
          card_id: '6319424685668',
          card_type: '81',
          created_since: '2023-01-04T00:00:00',
          email: 'Ann_Clements65511@gmail.com',
          holiday_id: '1',
          id: 13,
          makeup_id: '1',
          person_id: '6038176637274',
          username: '李傑克',
          valid_till: '2072-12-22T00:00:00',
          week_id: '1'
        },
        {
          authentication_type: 0,
          card_id: '2613163937311',
          card_type: '88',
          created_since: '2023-01-04T00:00:00',
          email: 'Brenda_Williams23659@esunbank.com.tw',
          holiday_id: '1',
          id: 14,
          makeup_id: '1',
          person_id: '2585209295023',
          username: '蔡佳樺',
          valid_till: '2072-12-22T00:00:00',
          week_id: '2'
        },
        {
          authentication_type: 0,
          card_id: '5020514549449',
          card_type: '81',
          created_since: '2023-01-04T00:00:00',
          email: 'Sheri_Watkins24@yahoo.com.tw',
          holiday_id: '1',
          id: 15,
          makeup_id: '1',
          person_id: '7601017767455',
          username: '寇雅玲',
          valid_till: '2072-12-22T00:00:00',
          week_id: '1'
        },
        {
          authentication_type: 0,
          card_id: '6001592172896',
          card_type: '05',
          created_since: '2023-01-04T00:00:00',
          email: 'John_Hart88528@msn.com',
          holiday_id: '1',
          id: 16,
          makeup_id: '1',
          person_id: '2859315791176',
          username: '申柏翰',
          valid_till: '2072-12-22T00:00:00',
          week_id: '2'
        },
        {
          authentication_type: 0,
          card_id: '7862800771343',
          card_type: '05',
          created_since: '2023-01-04T00:00:00',
          email: 'Brandon_Warren29349@aol.com',
          holiday_id: '1',
          id: 17,
          makeup_id: '1',
          person_id: '3776387722336',
          username: '王怡安',
          valid_till: '2072-12-22T00:00:00',
          week_id: '2'
        },
        {
          authentication_type: 0,
          card_id: '8883579417903',
          card_type: '81',
          created_since: '2023-01-04T00:00:00',
          email: 'Zachary_Ballard82334@aol.com',
          holiday_id: '1',
          id: 18,
          makeup_id: '1',
          person_id: '5689582101487',
          username: '王中山',
          valid_till: '2072-12-22T00:00:00',
          week_id: '1'
        },
        {
          authentication_type: 0,
          card_id: '4438484497638',
          card_type: '88',
          created_since: '2023-01-04T00:00:00',
          email: 'Austin_Parrish12271@msi.com.tw',
          holiday_id: '1',
          id: 19,
          makeup_id: '1',
          person_id: '3857624033405',
          username: '黃佳慧',
          valid_till: '2072-12-22T00:00:00',
          week_id: '1'
        },
        {
          authentication_type: 0,
          card_id: '8065823075804',
          card_type: '88',
          created_since: '2023-01-04T00:00:00',
          email: 'Danielle_Smith52503@ebay.com',
          holiday_id: '1',
          id: 20,
          makeup_id: '1',
          person_id: '0749271919085',
          username: '胡羽',
          valid_till: '2072-12-22T00:00:00',
          week_id: '2'
        }
      ],
      renderData: [],
      search: '',
      dateFormat: 'YYYY-MM-DD',
      selectedRowKeys: []
    }
  },

  methods: {
    dayjs,
    onSelectChange (val) {
      this.selectedRowKeys = val
    },

    onSearch () {
      this.renderData = this.personData.filter(
        (i) =>
          i.person_id.match(this.search) ||
          i.username.match(this.search) ||
          i.card_id.match(this.search) ||
          i.email.match(this.search)
      )
    },

    deleteAll () {
      Modal.confirm({
        title: this.$t('wannaDelete'),
        icon: createVNode(ExclamationCircleOutlined),
        okText: this.$t('confirm'),
        cancelText: this.$t('cancel'),

        onOk: () => {
          this.personData = this.personData.filter((item) => {
            return !this.selectedRowKeys.includes(item.person_id)
          })
          this.renderData = JSON.parse(JSON.stringify(this.personData))
        },

        onCancel () {}
      })
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
            h('div', { class: 'py-1' }, this.$t('name') + `：${item.username}`),
            h('div', this.$t('cardID') + `：${item.card_id}`)
          ]),

        onOk: () => {
          this.personData.splice(index, 1)
          this.renderData = JSON.parse(JSON.stringify(this.personData))

          message.success(this.$t('delete') + this.$t('success'), 10)
        },

        onCancel () {}
      })
    },

    showModal (isNew, person, index) {
      if (this.$refs.editModel.$refs.formRef) {
        this.$refs.editModel.$refs.formRef.clearValidate()
      }

      this.setmodal.loading = false
      this.modal.visible = true
      this.modal.isNew = isNew
      this.modal.index = index

      this.temp = isNew
        ? { password: '', email: '', authentication_type: 1 }
        : person
      this.setmodal.showPassword = isNew
    },
    updatePerson (user, isNew, index) {
      const userdata = { ...user }

      if (userdata['range-picker']) {
        userdata.created_since = dayjs(userdata['range-picker'][0]).format(
          'YYYY-MM-DD'
        )
        userdata.valid_till = dayjs(userdata['range-picker'][1]).format(
          'YYYY-MM-DD'
        )
      }

      delete userdata['range-picker']
      if (!userdata.password_hash) {
        delete userdata.password_hash
      }
      delete userdata.password
      delete userdata.checkPass
      const text = isNew ? this.$t('added') : this.$t('update')
      this.setmodal.loading = true
      console.log(userdata)
      if (isNew) {
        this.personData.push(userdata)
      } else {
        this.personData[index] = userdata
      }
      this.renderData = JSON.parse(JSON.stringify(this.personData))

      message.success(userdata.username + ' ' + text + this.$t('success'), 10)
      this.setmodal.loading = false
      this.modal.visible = false
    },
    exportCSV () {
      let title = []
      const dataArr = []

      this.personData.forEach((row, index) => {
        if (index === 0) {
          title = Object.keys(row)
          dataArr.push(title.join(','))
        }

        const temp = []
        title.forEach((item) => {
          temp.push(row[item])
        })
        dataArr.push(temp.join(','))
      })
      const data = dataArr.join('\r\n')
      const downloadLink = document.createElement('a')
      const code = encodeURIComponent(data)

      downloadLink.href = 'data:application/csv;charset=utf-8,%EF%BB%BF' + code
      downloadLink.setAttribute('download', 'data.csv')
      downloadLink.setAttribute('hidden', true)

      downloadLink.click()
    },
    uploadPerson (arr) {
      this.personData = this.personData.concat(arr)
      this.renderData = JSON.parse(JSON.stringify(this.personData))
      message.success('匯入成功')
    },
    getData () {
      this.renderData = JSON.parse(JSON.stringify(this.personData))
    }
  },

  created () {
    this.getData()
  }
}
</script>
<style lang="scss"></style>
