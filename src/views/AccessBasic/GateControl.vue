<template>
  <div class="p-sm-4 p-2">
    <a-spin :spinning="spinning" tip="Loading...">
      <div class="card shadow-sm p-0">
        <a-form
          class="p-4"
          :model="gate_control"
          :label-col="labelCol"
          :wrapper-col="{
            span: 12
          }"
        >
          <a-form-item
            :help="$t('weekTableIndex')"
            :label="$t('continuousUnlock')"
            name="keepOpen_week_id"
          >
            <a-input-group compact style="max-width: 350px">
              <a-select
                class="w-100"
                :class="{ select_week_width: weekTable.length === 0 }"
                v-model:value="gate_control.keepOpen_week_id"
              >
                <a-select-option :value="0">
                  {{ $t('noContinuousUnlockFeature') }}
                </a-select-option>
                <a-select-option
                  v-for="week in weekTable"
                  :key="week.id"
                  :value="week.id"
                >
                  {{ week.week_name }}
                </a-select-option>
              </a-select>
              <a-tooltip
                v-if="weekTable.length === 0"
                :title="$t('goToSetWeektable')"
              >
                <a-button>
                  <template #icon>
                    <router-link to="/accesscontrol/weektable">
                      <calendar-filled style="color: #384893" />
                    </router-link>
                  </template>
                </a-button>
              </a-tooltip>
            </a-input-group>
          </a-form-item>
          <a-form-item
            :label="$t('continuousUnlockFirstCardUnlock')"
            name="keepOpen_1stcard"
          >
            <a-switch
              :checkedValue="1"
              :unCheckedValue="0"
              v-model:checked="gate_control.keepOpen_1stcard"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren><close-outlined /></template>
            </a-switch>
          </a-form-item>
          <a-form-item
            :label="$t('saveIllegalCards')"
            name="illegal_card_saved"
          >
            <a-switch
              :checkedValue="1"
              :unCheckedValue="0"
              v-model:checked="gate_control.illegal_card_saved"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren><close-outlined /></template>
            </a-switch>
          </a-form-item>
          <a-form-item
            :label="$t('holidayClosuresContinuousUnlock')"
            name="hol_gate_closed"
          >
            <a-switch
              :checkedValue="1"
              :unCheckedValue="0"
              v-model:checked="gate_control.hol_gate_closed"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren><close-outlined /></template>
            </a-switch>
          </a-form-item>
          <a-form-item
            :help="$t('weekTableIndex')"
            :label="$t('buttonFeatureOff')"
            name="close_btn_func"
          >
            <a-input-group compact style="max-width: 350px">
              <a-select
                class="w-100"
                :class="{ select_week_width: weekTable.length === 0 }"
                v-model:value="gate_control.close_btn_func"
              >
                <a-select-option :value="0">
                  {{ $t('buttonOn') }}
                </a-select-option>
                <a-select-option
                  v-for="week in weekTable"
                  :key="week.id"
                  :value="week.id"
                >
                  {{ week.week_name }}
                </a-select-option>
              </a-select>
              <a-tooltip
                v-if="weekTable.length === 0"
                :title="$t('goToSetWeektable')"
              >
                <a-button>
                  <template #icon>
                    <router-link to="/accesscontrol/weektable">
                      <calendar-filled style="color: #384893" />
                    </router-link>
                  </template>
                </a-button>
              </a-tooltip>
            </a-input-group>
          </a-form-item>
          <a-form-item
            :help="$t('weekTableIndex')"
            :label="$t('secReaderUnrestrictedTime')"
            name="sec_week_id_disable"
          >
            <a-input-group compact style="max-width: 350px">
              <a-select
                class="w-100"
                :class="{ select_week_width: weekTable.length === 0 }"
                v-model:value="gate_control.sec_week_id_disable"
              >
                <a-select-option :value="0">
                  {{ $t('secReaderRestrictedTime') }}
                </a-select-option>
                <a-select-option
                  v-for="week in weekTable"
                  :key="week.id"
                  :value="week.id"
                >
                  {{ week.week_name }}
                </a-select-option>
              </a-select>
              <a-tooltip
                v-if="weekTable.length === 0"
                :title="$t('goToSetWeektable')"
              >
                <a-button>
                  <template #icon>
                    <router-link to="/accesscontrol/weektable">
                      <calendar-filled style="color: #384893" />
                    </router-link>
                  </template>
                </a-button>
              </a-tooltip>
            </a-input-group>
          </a-form-item>
          <a-form-item
            :help="$t('weekTableIndex')"
            :label="$t('secReaderPasswordCheck')"
            name="sec_pw_enable"
          >
            <a-input-group compact style="max-width: 350px">
              <a-select
                class="w-100"
                :class="{ select_week_width: weekTable.length === 0 }"
                v-model:value="gate_control.sec_pw_enable"
              >
                <a-select-option :value="0">
                  {{ $t('secReaderNoPassword') }}
                </a-select-option>
                <a-select-option
                  v-for="week in weekTable"
                  :key="week.id"
                  :value="week.id"
                >
                  {{ week.week_name }}
                </a-select-option>
              </a-select>
              <a-tooltip
                v-if="weekTable.length === 0"
                :title="$t('goToSetWeektable')"
              >
                <a-button>
                  <template #icon>
                    <router-link to="/accesscontrol/weektable">
                      <calendar-filled style="color: #384893" />
                    </router-link>
                  </template>
                </a-button>
              </a-tooltip>
            </a-input-group>
          </a-form-item>
          <a-form-item
            :label="$t('accessControlCardContent')"
            name="access_control_card"
          >
            <a-input
              v-model:value="gate_control.access_control_card"
              style="max-width: 350px"
            />
          </a-form-item>
          <a-form-item :label="$t('unlockCodeContent')" name="lift_no">
            <a-input
              v-model:value="gate_control.lift_no"
              style="max-width: 350px"
            />
          </a-form-item>
          <a-form-item :label="$t('coerceCodeContent')" name="coercion_no">
            <a-input
              v-model:value="gate_control.coercion_no"
              style="max-width: 350px"
            />
          </a-form-item>
          <a-form-item
            :label="$t('coerceActivatesALARMRelay')"
            name="coercion_enable_alarm"
          >
            <a-switch
              :checkedValue="1"
              :unCheckedValue="0"
              v-model:checked="gate_control.coercion_enable_alarm"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren>
                <close-outlined />
              </template>
            </a-switch>
          </a-form-item>
          <a-form-item
            :label="$t('forceUnlockToAcceptCoerceCode')"
            name="close_accept_coercion"
          >
            <a-switch
              :checkedValue="1"
              :unCheckedValue="0"
              v-model:checked="gate_control.close_accept_coercion"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren>
                <close-outlined />
              </template>
            </a-switch>
          </a-form-item>
          <a-form-item
            :label="$t('activateAntiPassback')"
            name="en_anti_passback"
          >
            <a-switch
              :checkedValue="1"
              :unCheckedValue="0"
              v-model:checked="gate_control.en_anti_passback"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren>
                <close-outlined />
              </template>
            </a-switch>
          </a-form-item>
          <a-form-item :label="$t('authenticationMode')" name="auth_mode">
            <a-select
              style="max-width: 350px"
              v-model:value="gate_control.auth_mode"
            >
              <a-select-option :value="0">
                {{ $t('swipeCardOnly') }}
              </a-select-option>
              <a-select-option :value="1">
                {{ $t('swipeOrKey') }}
              </a-select-option>
              <a-select-option :value="2">
                {{ $t('SwipeAndPassword') }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            :help="$t('weekTableIndex')"
            :label="$t('ReaderPasswordCheckTime')"
            name="pri_pw_chkweek_id"
          >
            <a-input-group compact style="max-width: 350px">
              <a-select
                class="w-100"
                :class="{ select_week_width: weekTable.length === 0 }"
                v-model:value="gate_control.pri_pw_chkweek_id"
              >
                <a-select-option
                  v-for="week in weekTable"
                  :key="week.id"
                  :value="week.id"
                  >{{ week.week_name }}</a-select-option
                >
              </a-select>
              <a-tooltip
                v-if="weekTable.length === 0"
                :title="$t('goToSetWeektable')"
              >
                <a-button>
                  <template #icon>
                    <router-link to="/accesscontrol/weektable">
                      <calendar-filled style="color: #384893" />
                    </router-link>
                  </template>
                </a-button>
              </a-tooltip>
            </a-input-group>
          </a-form-item>
          <a-form-item
            :help="$t('input0ToDisableChecking')"
            :label="$t('repeatCardCheckTime')"
            name="repeat_swipe"
          >
            <a-input-number
              :precision="0"
              :max="60"
              :min="0"
              v-model:value="gate_control.repeat_swipe"
            >
            </a-input-number>
            <span class="ant-form-text">{{ $t('sec') }}</span>
          </a-form-item>
          <a-form-item
            :label="$t('secReaderDecodingInterface')"
            name="sec_decoding_if"
          >
            <a-select
              style="max-width: 350px"
              v-model:value="gate_control.sec_decoding_if"
              :options="[
                { value: 0, label: 'T2' },
                { value: 1, label: 'W26(8碼)' },
                { value: 2, label: 'W26(補為10碼)' },
                { value: 3, label: 'W34(10碼)' },
                { value: 5, label: '依照維根解碼設置' }
              ]"
            >
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('setReaderInOrOut')" name="pri_in_OR_out">
            <a-select
              :help="$t('當沒有主副讀頭之分時，以ID小的為主讀頭')"
              style="max-width: 350px"
              v-model:value="gate_control.pri_in_OR_out"
              :options="[
                { value: 0, label: $t('regardlessOfInOrOut') },
                { value: 1, label: $t('in') },
                { value: 2, label: $t('out') }
              ]"
            >
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('setSecReaderInOrOut')" name="sec_in_OR_out">
            <a-select
              :help="$t('當沒有主副讀頭之分時，以ID大的為副讀頭')"
              style="max-width: 350px"
              v-model:value="gate_control.sec_in_OR_out"
              :options="[
                { value: 0, label: $t('regardlessOfInOrOut') },
                { value: 1, label: $t('in') },
                { value: 2, label: $t('out') }
              ]"
            >
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('pushButtonSound')" name="pushbtn_sound">
            <a-switch
              :checkedValue="1"
              :unCheckedValue="0"
              v-model:checked="gate_control.pushbtn_sound"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren>
                <close-outlined />
              </template>
            </a-switch>
          </a-form-item>
          <a-form-item
            :label="$t('invalidCardAlarm')"
            name="invalid_card_alarm"
          >
            <a-switch
              :checkedValue="1"
              :unCheckedValue="0"
              v-model:checked="gate_control.invalid_card_alarm"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren>
                <close-outlined />
              </template>
            </a-switch>
          </a-form-item>
          <a-form-item name="submit" :wrapper-col="wrapperCol">
            <a-button type="primary" @click="saveData">
              {{ $t('submit') }}
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-spin>
  </div>
</template>

<script>
import {
  CheckOutlined,
  CloseOutlined,
  CalendarFilled
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

export default {
  components: {
    CheckOutlined,
    CloseOutlined,
    CalendarFilled
  },
  data () {
    return {
      gate_control: {
        access_control_card: '30191000',
        auth_mode: 2,
        close_accept_coercion: 1,
        close_btn_func: 0,
        coercion_enable_alarm: 1,
        coercion_no: null,
        en_anti_passback: 0,
        gate_no: 1,
        hol_gate_closed: 1,
        id: 1,
        illegal_card_saved: 1,
        invalid_card_alarm: 0,
        keepOpen_1stcard: 1,
        keepOpen_week_id: 0,
        lift_no: '0000',
        pri_in_OR_out: 1,
        pri_pw_chkweek_id: 0,
        pushbtn_sound: 0,
        repeat_swipe: 0,
        sec_decoding_if: 0,
        sec_in_OR_out: 2,
        sec_pw_enable: 0,
        sec_week_id_disable: 0
      },
      weekTable: [],
      spinning: false,
      labelCol: { span: 7 },
      wrapperCol: { span: 30, offset: 7 }
    }
  },
  watch: {
    '$i18n.locale': {
      handler (newValue) {
        switch (newValue) {
          case 'en':
            this.labelCol = { span: 10 }
            this.wrapperCol = { span: 30, offset: 10 }
            break
          default:
            this.labelCol = { span: 7 }
            this.wrapperCol = { span: 30, offset: 7 }
            break
        }
      },
      immediate: true
    }
  },
  methods: {
    saveData () {
      message.success(this.$t('update') + this.$t('success'), 5)
    }
  },
  created () {}
}
</script>
