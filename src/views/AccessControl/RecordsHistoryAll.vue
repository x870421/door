<template>
  <div class="p-sm-4 p-2">
    <a-card>
      <a-form :model="search" class="ant-advanced-search-form">
        <a-row :gutter="24">
          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item :label="$t('startAndEndTime')">
              <a-range-picker
                class="w-100"
                :ranges="ranges"
                v-model:value="search['date-picker']"
              />
            </a-form-item>
          </a-col>
          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item :label="$t('cardID')">
              <a-input
                v-model:value="search.card_id"
                :placeholder="$t('cardIDFeedBack')"
              />
            </a-form-item>
          </a-col>
          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item :label="$t('name')">
              <a-input
                v-model:value="search.username"
                :placeholder="$t('nameFeedBack')"
              />
            </a-form-item>
          </a-col>
          <a-col :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item :label="$t('event')">
              <a-select
                option-label-prop="children"
                allowClear
                label-in-value
                show-search
                v-model:value="search.event_code"
                :placeholder="$t('eventFeedBack')"
                class="w-100"
              >
                <a-select-opt-group :label="$t('cardEvent')">
                  <a-select-option
                    v-for="(item, index) in cardType"
                    :key="index"
                    :value="$t(item)"
                    >{{ $t(item) }}</a-select-option
                  >
                </a-select-opt-group>
                <a-select-opt-group :label="$t('hardwareEvent')">
                  <a-select-option
                    v-for="(item, index) in eventType"
                    :key="index"
                    :value="$t(item)"
                    >{{ $t(item) }}</a-select-option
                  >
                </a-select-opt-group>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="16" :md="24" :sm="24" :xs="24">
            <span
              class="table-page-search-submitButtons"
              :style="{ float: 'right', overflow: 'hidden' }"
            >
              <a-button @click="searchData" type="primary">
                {{ $t('search') }}
              </a-button>
              <a-button style="margin-left: 8px" @click="resetData">
                {{ $t('reset') }}
              </a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>

      <br />

      <a-button @click="exportCSV" :title="$t('add')" type="primary">
        ??????excel
      </a-button>

      <a-spin :spinning="spinning" tip="Loading...">
        <a-table
          id="table"
          class="mt-2"
          size="small"
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
            class="ps-4 table-bg-primary"
            key="event_time"
            :title="$t('date')"
            data-index="event_time"
            :sorter="
              (a, b) =>
                dayjs(a.event_time, 'YYYY/MM/DD') -
                dayjs(b.event_time, 'YYYY/MM/DD')
            "
          />
          <a-table-column
            class="table-bg-primary"
            key="card_id"
            :title="$t('cardID')"
            data-index="card_id"
            :ellipsis="true"
            :responsive="['md']"
          />
          <a-table-column
            class="table-bg-primary"
            key="username"
            :title="$t('name')"
            data-index="username"
            :ellipsis="true"
          />
          <a-table-column
            class="table-bg-primary"
            key="shift_code_name"
            :title="$t('shift')"
            data-index="shift_code_name"
            :ellipsis="true"
            :responsive="['md']"
            :filters="[
              { text: '??????', value: '1' },
              { text: '??????', value: '2' },
              { text: '??????', value: '3' },
              { text: '??????', value: '4' },
              { text: '????????????', value: '5' },
              { text: '????????????', value: '6' }
            ]"
            :onFilter="(value, record) => record.shift_code === value"
          />

          <a-table-column
            class="table-bg-primary text-nowrap"
            key="event_class_name"
            :title="$t('eventClass')"
            :width="'7.5rem'"
            data-index="event_class_name"
            :responsive="['lg']"
          />
          <a-table-column
            class="table-bg-primary text-nowrap"
            key="event_code_name"
            :title="$t('event')"
            :width="'25%'"
            data-index="event_code_name"
          />
          <a-table-column
            :width="'5rem'"
            class="table-bg-primary"
            key="action"
            :title="$t('photo')"
            data-index="action"
          />
          <template #bodyCell="{ column, record }">
            <template v-if="column && column.key === 'event_time'">
              <div class="ps-2">
                {{ dayjs(record.event_time).format('YYYY-MM-DD HH:mm:ss') }}
              </div>
            </template>
            <template v-else-if="column && column.key === 'event_class_name'">
              {{ $t(record.event_class_name) }}
            </template>
            <template v-else-if="column && column.key === 'event_code_name'">
              {{ $t(record.event_code_name) }}
            </template>
            <template v-else-if="column && column.key === 'action'">
              <a-button
                :title="record.avatar_url"
                type="text"
                @click="openPic(record)"
                ><template #icon><user-outlined /></template
              ></a-button>
            </template>
          </template>
        </a-table>
      </a-spin>
    </a-card>
    <FacePic :temp="temp" :modal="modal"></FacePic>
  </div>
</template>

<script>
import FacePic from '@/components/AccessControl/FacePic.vue'
import { UserOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import isBetween from 'dayjs/plugin/isBetween'
export default {
  components: { UserOutlined, FacePic },
  data () {
    return {
      cardType: {
        '0x01': '?????????',
        '0x02': '????????????',
        '0x03': '?????????????????????????????????,?????????????????????',
        '0x04': '???????????????',
        '0x05': '?????????????????????',
        '0x06': '??????????????????',
        '0x07': '????????????',
        '0x08': '???????????????????????????',
        '0x09': '??????????????????????????????',
        '0xa': '?????????',
        '0xb': '??????????????????',
        '0xc': '????????????',
        '0xd': '????????????????????????????????????',
        '0xe': '??????????????????',
        '0xf': '????????????????????????',
        '0x10': '???????????????',
        '0x11': '??????????????????',
        '0x12': '????????????????????????????????????',
        '0x13': '???????????????',
        '0x14': '??????????????????????????????????????????',
        '0x15': '?????????',
        '0x16': '?????????????????????',
        '0x17': 'anti????????????',
        '0x18': '?????????????????????',
        '0x19': '???????????????',
        '0x1a': '???????????????',
        '0x1b': '?????????????????????????????????????????????',
        '0x1d': '??????????????????????????????',
        '0x1e': '????????????',
        '0x20': '??????????????????(??????)',
        '0x21': '??????????????????',
        '0x22': '??????????????????',
        '0x30': '?????????',
        '0x31': '?????????',
        '0x32': '????????????????????????',
        '0x33': '?????????????????????',
        '0x34': '????????????????????????????????????',
        '0x35': '???????????????????????????????????????',
        '0x36': '???????????????????????????',
        '0x37': '???????????????????????????'
      },
      eventType: {
        '0101': '???????????????',
        '0102': '????????????',
        '0103': '????????????/??????????????????',
        '012a': '????????????',
        '0201': '???????????????',
        '0202': '???????????????',
        '0203': '???????????????',
        '0204': '????????????????????????',
        '0205': '?????????????????????',
        '0206': '????????????????????????',
        '0301': 'Sensor ??????',
        '0302': 'Relay ??????',
        '0401': '??????????????????',
        '0402': '????????????????????????',
        '0403': '??????????????????',
        '0404': '????????????',
        '0405': '????????????/????????????????????????',
        '0406': '??????',
        '0407': '??????',
        '0408': '??????????????????',
        '0501': '???????????????',
        '0502': '????????????????????????'
      },
      search: {},
      renderData: [],
      loggers: [
        {
          avatar_url: 'dummy3.jpg',
          card_id: '5073374112063',
          door_id: 1,
          event_class: 1,
          event_code: '03010101',
          event_time: '2022-03-05T06:45:31.151164',
          id: 1,
          index_pointer: 200,
          input_mode: 0,
          is_fatched: 0,
          person_id: '0496126852386',
          reader_id: 2,
          shift_code: '4',
          username: '?????????'
        },
        {
          avatar_url: 'dummy1.jpg',
          card_id: '4260086275457',
          door_id: 1,
          event_class: 0,
          event_code: '0x34',
          event_time: '2021-11-21T06:45:31.161071',
          id: 2,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '9240346421256',
          reader_id: 4,
          shift_code: '2',
          username: '?????????'
        },
        {
          avatar_url: 'dummy1.jpg',
          card_id: '7080763352212',
          door_id: 1,
          event_class: 1,
          event_code: '01030000',
          event_time: '2021-10-01T06:45:31.162283',
          id: 3,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '0717202637773',
          reader_id: 3,
          shift_code: '6',
          username: '?????????'
        },
        {
          avatar_url: 'dummy3.jpg',
          card_id: '6282060700470',
          door_id: 1,
          event_class: 1,
          event_code: '02040000',
          event_time: '2021-01-15T06:45:31.162911',
          id: 4,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '7874979522039',
          reader_id: 4,
          shift_code: '1',
          username: '?????????'
        },
        {
          avatar_url: 'dummy3.jpg',
          card_id: '5179031160504',
          door_id: 1,
          event_class: 1,
          event_code: '04020000',
          event_time: '2020-09-25T06:45:31.163612',
          id: 5,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '3230744151288',
          reader_id: 1,
          shift_code: '5',
          username: '?????????'
        },
        {
          avatar_url: 'dummy1.jpg',
          card_id: '6636711846398',
          door_id: 1,
          event_class: 0,
          event_code: '0x22',
          event_time: '2022-05-02T06:45:31.164327',
          id: 6,
          index_pointer: null,
          input_mode: 0,
          is_fatched: 0,
          person_id: '2965731468155',
          reader_id: 3,
          shift_code: '5',
          username: '?????????'
        },
        {
          avatar_url: 'dummy3.jpg',
          card_id: '0138589512161',
          door_id: 1,
          event_class: 1,
          event_code: '04080000',
          event_time: '2022-05-02T06:45:31.164953',
          id: 7,
          index_pointer: null,
          input_mode: 0,
          is_fatched: 0,
          person_id: '7672964755215',
          reader_id: 5,
          shift_code: '3',
          username: '?????????'
        },
        {
          avatar_url: 'dummy1.jpg',
          card_id: '9109500297475',
          door_id: 1,
          event_class: 1,
          event_code: '012A0000',
          event_time: '2021-10-30T06:45:31.165579',
          id: 8,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '7530416960801',
          reader_id: 1,
          shift_code: '1',
          username: '?????????'
        },
        {
          avatar_url: 'dummy2.jpg',
          card_id: '2040424459891',
          door_id: 1,
          event_class: 1,
          event_code: '01020000',
          event_time: '2021-04-06T06:45:31.166203',
          id: 9,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '4180373733371',
          reader_id: 5,
          shift_code: '5',
          username: '?????????'
        },
        {
          avatar_url: 'dummy2.jpg',
          card_id: '3318777206523',
          door_id: 1,
          event_class: 0,
          event_code: '0x1a',
          event_time: '2021-03-07T06:45:31.166829',
          id: 10,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '0093016531446',
          reader_id: 4,
          shift_code: '1',
          username: '?????????'
        },
        {
          avatar_url: 'dummy3.jpg',
          card_id: '1775602299150',
          door_id: 1,
          event_class: 1,
          event_code: '02010000',
          event_time: '2022-08-12T06:45:31.167458',
          id: 11,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '3459775878388',
          reader_id: 2,
          shift_code: '3',
          username: '??????'
        },
        {
          avatar_url: 'dummy3.jpg',
          card_id: '2916414139855',
          door_id: 1,
          event_class: 1,
          event_code: '04030000',
          event_time: '2020-06-13T06:45:31.168084',
          id: 12,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '0866137336739',
          reader_id: 3,
          shift_code: '5',
          username: '?????????'
        },
        {
          avatar_url: 'dummy1.jpg',
          card_id: '4185218461044',
          door_id: 1,
          event_class: 0,
          event_code: '0x22',
          event_time: '2022-03-13T06:45:31.168706',
          id: 13,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '9561015662283',
          reader_id: 2,
          shift_code: '3',
          username: '?????????'
        },
        {
          avatar_url: 'dummy2.jpg',
          card_id: '4843889065922',
          door_id: 1,
          event_class: 1,
          event_code: '03010000',
          event_time: '2021-08-16T06:45:31.169414',
          id: 14,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '5143098787202',
          reader_id: 4,
          shift_code: '3',
          username: '?????????'
        },
        {
          avatar_url: 'dummy3.jpg',
          card_id: '2267814667579',
          door_id: 1,
          event_class: 0,
          event_code: '0x07',
          event_time: '2022-11-10T06:45:31.170037',
          id: 15,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '2240343225151',
          reader_id: 3,
          shift_code: '3',
          username: '?????????'
        },
        {
          avatar_url: 'dummy3.jpg',
          card_id: '9729206175619',
          door_id: 1,
          event_class: 1,
          event_code: '04020000',
          event_time: '2022-02-09T06:45:31.170696',
          id: 16,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '8220911440340',
          reader_id: 5,
          shift_code: '2',
          username: '?????????'
        },
        {
          avatar_url: 'dummy2.jpg',
          card_id: '5732880726590',
          door_id: 1,
          event_class: 1,
          event_code: '02050000',
          event_time: '2022-01-12T06:45:31.171320',
          id: 17,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '2058298065117',
          reader_id: 5,
          shift_code: '3',
          username: '?????????'
        },
        {
          avatar_url: 'dummy3.jpg',
          card_id: '9223917405701',
          door_id: 1,
          event_class: 0,
          event_code: '0x10',
          event_time: '2021-01-30T06:45:31.171943',
          id: 18,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '2032249788454',
          reader_id: 3,
          shift_code: '4',
          username: '?????????'
        },
        {
          avatar_url: 'dummy3.jpg',
          card_id: '9223917405701',
          door_id: 1,
          event_class: 1,
          event_code: '04070000',
          event_time: '2020-04-16T06:45:31.172051',
          id: 19,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '2032249788454',
          reader_id: 1,
          shift_code: '3',
          username: '?????????'
        },
        {
          avatar_url: 'dummy1.jpg',
          card_id: '2539125588264',
          door_id: 1,
          event_class: 0,
          event_code: '0x34',
          event_time: '2021-11-08T06:45:31.172730',
          id: 20,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '7904363701266',
          reader_id: 2,
          shift_code: '1',
          username: '?????????'
        },
        {
          avatar_url: 'dummy2.jpg',
          card_id: '6772637300931',
          door_id: 1,
          event_class: 1,
          event_code: '02030000',
          event_time: '2022-05-16T06:45:31.173354',
          id: 21,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '0858436650272',
          reader_id: 3,
          shift_code: '6',
          username: '?????????'
        },
        {
          avatar_url: 'dummy3.jpg',
          card_id: '4843889065922',
          door_id: 1,
          event_class: 1,
          event_code: '01020000',
          event_time: '2021-07-26T06:45:31.173977',
          id: 22,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '5143098787202',
          reader_id: 1,
          shift_code: '5',
          username: '?????????'
        },
        {
          avatar_url: 'dummy2.jpg',
          card_id: '4336378978457',
          door_id: 1,
          event_class: 1,
          event_code: '01010000',
          event_time: '2020-11-10T06:45:31.174601',
          id: 23,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '3556905039524',
          reader_id: 1,
          shift_code: '3',
          username: '?????????'
        },
        {
          avatar_url: 'dummy3.jpg',
          card_id: '9378651515800',
          door_id: 1,
          event_class: 1,
          event_code: '02020000',
          event_time: '2022-08-23T06:45:31.175225',
          id: 24,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '4521255086268',
          reader_id: 1,
          shift_code: '6',
          username: '?????????'
        },
        {
          avatar_url: 'dummy1.jpg',
          card_id: '2355680262827',
          door_id: 1,
          event_class: 0,
          event_code: '0x16',
          event_time: '2022-01-30T06:45:31.175847',
          id: 25,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '0471264595241',
          reader_id: 3,
          shift_code: '4',
          username: '?????????'
        },
        {
          avatar_url: 'dummy3.jpg',
          card_id: '2723417085160',
          door_id: 1,
          event_class: 1,
          event_code: '01020000',
          event_time: '2020-08-11T06:45:31.176548',
          id: 26,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '8676225632405',
          reader_id: 2,
          shift_code: '1',
          username: '?????????'
        },
        {
          avatar_url: 'dummy1.jpg',
          card_id: '2723417085160',
          door_id: 1,
          event_class: 0,
          event_code: '0x08',
          event_time: '2021-03-02T06:45:31.176659',
          id: 27,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '8676225632405',
          reader_id: 5,
          shift_code: '4',
          username: '?????????'
        },
        {
          avatar_url: 'dummy2.jpg',
          card_id: '4687784695057',
          door_id: 1,
          event_class: 1,
          event_code: '01030000',
          event_time: '2022-03-06T06:45:31.177340',
          id: 28,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '7032270418370',
          reader_id: 4,
          shift_code: '4',
          username: '?????????'
        },
        {
          avatar_url: 'dummy2.jpg',
          card_id: '9275888907173',
          door_id: 1,
          event_class: 1,
          event_code: '05020000',
          event_time: '2021-04-26T06:45:31.177965',
          id: 29,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '7688164371520',
          reader_id: 5,
          shift_code: '6',
          username: '?????????'
        },
        {
          avatar_url: 'dummy1.jpg',
          card_id: '3992987896813',
          door_id: 1,
          event_class: 1,
          event_code: '02040000',
          event_time: '2021-11-06T06:45:31.178588',
          id: 30,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '8519564917850',
          reader_id: 5,
          shift_code: '6',
          username: '?????????'
        },
        {
          avatar_url: 'dummy2.jpg',
          card_id: '9109500297475',
          door_id: 1,
          event_class: 0,
          event_code: '0x34',
          event_time: '2022-01-23T06:45:31.179212',
          id: 31,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '7530416960801',
          reader_id: 2,
          shift_code: '2',
          username: '?????????'
        },
        {
          avatar_url: 'dummy1.jpg',
          card_id: '2355680262827',
          door_id: 1,
          event_class: 0,
          event_code: '0x16',
          event_time: '2022-01-06T06:45:31.179902',
          id: 32,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '0471264595241',
          reader_id: 4,
          shift_code: '5',
          username: '?????????'
        },
        {
          avatar_url: 'dummy1.jpg',
          card_id: '4572780816479',
          door_id: 1,
          event_class: 1,
          event_code: '04060000',
          event_time: '2022-08-26T06:45:31.180529',
          id: 33,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '4386556033133',
          reader_id: 2,
          shift_code: '4',
          username: '?????????'
        },
        {
          avatar_url: 'dummy3.jpg',
          card_id: '3340572105251',
          door_id: 1,
          event_class: 0,
          event_code: '0x01',
          event_time: '2020-09-22T06:45:31.181193',
          id: 34,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '9212264801694',
          reader_id: 3,
          shift_code: '6',
          username: '?????????'
        },
        {
          avatar_url: 'dummy2.jpg',
          card_id: '0613617479598',
          door_id: 1,
          event_class: 1,
          event_code: '04070000',
          event_time: '2021-02-05T06:45:31.181817',
          id: 35,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '4613316129103',
          reader_id: 2,
          shift_code: '1',
          username: '?????????'
        },
        {
          avatar_url: 'dummy3.jpg',
          card_id: '4648052796739',
          door_id: 1,
          event_class: 0,
          event_code: '0x16',
          event_time: '2020-06-27T06:45:31.182440',
          id: 36,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '1527872297837',
          reader_id: 3,
          shift_code: '6',
          username: '?????????'
        },
        {
          avatar_url: 'dummy3.jpg',
          card_id: '0469553026842',
          door_id: 1,
          event_class: 1,
          event_code: '02060000',
          event_time: '2022-10-27T06:45:31.183065',
          id: 37,
          index_pointer: null,
          input_mode: 0,
          is_fatched: 0,
          person_id: '4652947407310',
          reader_id: 5,
          shift_code: '3',
          username: '?????????'
        },
        {
          avatar_url: 'dummy2.jpg',
          card_id: '5452750479158',
          door_id: 1,
          event_class: 1,
          event_code: '01020000',
          event_time: '2021-03-09T06:45:31.183687',
          id: 38,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '2878561460001',
          reader_id: 2,
          shift_code: '5',
          username: '?????????'
        },
        {
          avatar_url: 'dummy3.jpg',
          card_id: '6636711846398',
          door_id: 1,
          event_class: 1,
          event_code: '02060000',
          event_time: '2021-11-27T06:45:31.184338',
          id: 39,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '2965731468155',
          reader_id: 5,
          shift_code: '2',
          username: '?????????'
        },
        {
          avatar_url: 'dummy3.jpg',
          card_id: '4336378978457',
          door_id: 1,
          event_class: 0,
          event_code: '0x01',
          event_time: '2022-07-27T06:45:31.184970',
          id: 40,
          index_pointer: null,
          input_mode: 1,
          is_fatched: 0,
          person_id: '3556905039524',
          reader_id: 2,
          shift_code: '6',
          username: '?????????'
        }
      ],
      ranges: {},
      modal: {
        visible: false
      },
      temp: {},
      spinning: false
    }
  },
  watch: {
    '$i18n.locale': {
      handler (newValue) {
        switch (newValue) {
          case 'en':
            this.ranges = {
              Today: [dayjs(), dayjs()],
              'This Week': [dayjs().startOf('week'), dayjs().endOf('week')],
              'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
              'This Year': [dayjs().startOf('year'), dayjs().endOf('year')]
            }
            break
          case 'zh-TW':
            this.ranges = {
              ??????: [dayjs(), dayjs()],
              ??????: [dayjs().startOf('week'), dayjs().endOf('week')],
              ??????: [dayjs().startOf('month'), dayjs().endOf('month')],
              ??????: [dayjs().startOf('year'), dayjs().endOf('year')]
            }

            break
        }
      },
      immediate: true
    }
  },
  methods: {
    dayjs,

    resetData () {
      this.search = {
        card_id: '',
        username: '',
        start: '',
        end: '',
        event_code: null
      }
      this.getData()
    },

    exportCSV () {
      let title = []
      const dataArr = []
      this.loggers.forEach((row, index) => {
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

    openPic (record) {
      this.modal.visible = true
      this.temp = record
    },
    searchData () {
      this.renderData = this.loggers.filter((i) => {
        return (
          i.card_id.match(this.search.card_id) &&
          i.username.match(this.search.username)
        )
      })
      if (this.search.event_code) {
        this.renderData = this.renderData.filter((i) => {
          return i.event_code.slice(0, 4).trim() === this.search.event_code.key
        })
      }
      if (this.search['date-picker']) {
        dayjs.extend(isBetween)
        const start = this.search['date-picker'][0]
        const end = this.search['date-picker'][1]

        this.renderData = this.renderData.filter((i) => {
          return dayjs(i.event_time).isBetween(
            dayjs(start),
            dayjs(end),
            null,
            '[]'
          )
        })
      }
    },

    getData () {
      this.loggers.forEach((i) => {
        i.event_code_name =
          this.cardType[i.event_code.slice(0, 4).trim()] ||
          this.eventType[i.event_code.slice(0, 4).trim()] ||
          ''
        i.event_class_name =
          i.event_class === 0
            ? 'cardEvent'
            : i.event_class === 1
              ? 'hardwareEvent'
              : i.event_class

        switch (i.shift_code) {
          case '1':
            i.shift_code_name = '??????'
            break
          case '2':
            i.shift_code_name = '??????'
            break
          case '3':
            i.shift_code_name = '??????'
            break
          case '4':
            i.shift_code_name = '??????'
            break
          case '5':
            i.shift_code_name = '????????????'
            break
          case '6':
            i.shift_code_name = '????????????'
            break
        }
      })
      this.renderData = JSON.parse(JSON.stringify(this.loggers))
    }
  },
  created () {
    this.getData()
  }
}
</script>
