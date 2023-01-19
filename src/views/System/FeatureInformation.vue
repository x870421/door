<template>
  <div class="p-4">
    <a-spin :spinning="spinning" tip="Loading...">
      <div class="card shadow-sm">
        <a-descriptions
          bordered
          :column="{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }"
        >
          <a-descriptions-item :label="$t('deviceModel')">
            {{ func_collect.device_model }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('firmwareVersion')">
            {{ func_collect.fw_version }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('apiVersion')">
            {{ func_collect.api_version }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('dbVersion')">
            {{ func_collect.db_version }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('totalCards')">
            {{ func_collect.total_cards }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('totalCardRecord')">
            {{ func_collect.total_card_record }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('netPorts')">
            {{ func_collect.net_ports }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('rs485Ports')">
            {{ func_collect.rs485_ports }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('rs232Ports')">
            {{ func_collect.rs232_ports }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('numberOfDoor')">
            {{ func_collect.door_no }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('numberOfReader')">
            {{ func_collect.reader_no }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('numberOfWeektable')">
            {{ func_collect.on_duty_tab_nos }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('numberOfHolidaytable')">
            {{ func_collect.holiday_tab_nos }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('cardMaxDigits')">
            {{ func_collect.card_no_max_digits }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('passworMaxDigits')">
            {{ func_collect.passwd_max_digits }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('cardDisplayMessageCapacity')">
            {{ func_collect.card_message_content }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('cardSupportExpiryDate')">
            {{
              func_collect.card_validate_date === 0
                ? $t('No')
                : func_collect.card_validate_date === 1
                ? $t('Yes')
                : ''
            }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('numberOfRelay')">
            {{ func_collect.relay_count }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('firmwareDate')">
            {{ func_collect.fw_date }}
          </a-descriptions-item>
        </a-descriptions>
        <div class="d-flex justify-content-center my-3">
          <a-button :loading="loading" type="primary" @click="reload">
            {{ $t('reload') }}
          </a-button>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
export default {
  data () {
    return {
      func_collect: {
        api_version: '0.97',
        card_message_content: 16,
        card_no_max_digits: 16,
        card_validate_date: 0,
        db_version: '0.96',
        device_model: 'HAC-990PM',
        door_no: 1,
        fw_date: '2023-01-01',
        fw_version: 'V1.0',
        holiday_tab_nos: 1,
        id: 1,
        net_ports: 1,
        on_duty_tab_nos: 2,
        passwd_max_digits: 4,
        reader_no: 1,
        relay_count: 1,
        rs232_ports: 0,
        rs485_ports: 1,
        total_card_record: 86,
        total_cards: 139982
      },
      loading: false,
      spinning: false
    }
  },
  methods: {
    getData () {
      this.func_collect = {
        api_version: '0.97',
        card_message_content: 16,
        card_no_max_digits: 16,
        card_validate_date: 0,
        db_version: '0.96',
        device_model: 'HAC-990PM',
        door_no: 1,
        fw_date: '2023-01-01',
        fw_version: 'V1.0',
        holiday_tab_nos: 1,
        id: 1,
        net_ports: 1,
        on_duty_tab_nos: 2,
        passwd_max_digits: 4,
        reader_no: 1,
        relay_count: 1,
        rs232_ports: 0,
        rs485_ports: 1,
        total_card_record: 86,
        total_cards: 139982
      }
    },
    reload () {
      this.loading = true
      this.spinning = true
      setTimeout(() => {
        this.getData()
        this.loading = false
        this.spinning = false
      }, 1000)
    }
  },

  created () {}
}
</script>
