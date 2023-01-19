<template>
  <a-modal
    style="top: 30px"
    v-model:visible="showModal.visible"
    :bodyStyle="{ 'max-height': '625px', overflow: 'auto' }"
    width="650px"
    :title="(showModal.isNew ? $t('add') : $t('modify')) + $t('information')"
  >
    <template #footer>
      <a-button
        key="back"
        @click="
          {
            ;(showModal.visible = false), (imageUrl = '')
          }
        "
      >
        {{ $t('cancel') }}
      </a-button>
      <a-button
        key="submit"
        @click="onCheck"
        type="primary"
        :loading="setModal.loading"
      >
        {{ $t('submit') }}
      </a-button>
    </template>

    <a-form
      autocomplete="off"
      ref="formRef"
      :model="person"
      name="nest-messages"
      v-bind="{
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 30
        }
      }"
    >
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-11 col-md-8">
            <div style="margin-left: -0.5rem" class="pb-1 fw-semibold">
              {{ $t('basicInformation') }}
            </div>

            <a-form-item
              :label="$t('name')"
              name="username"
              :rules="[{ required: true, message: $t('nameFeedBack') }]"
            >
              <a-input
                v-model:value="person.username"
                :placeholder="$t('nameFeedBack')"
              />
            </a-form-item>
            <a-form-item
              :rules="[
                { required: true, validator: personID, trigger: 'blur' }
              ]"
              :label="$t('personID')"
              name="person_id"
            >
              <a-input
                :placeholder="$t('personIDFeedBack')"
                v-model:value="person.person_id"
              />
            </a-form-item>
            <a-form-item
              class="me-1"
              :label="$t('cardID')"
              name="card_id"
              :rules="[
                {
                  required: true,
                  validator: validateCardID,
                  trigger: 'blur'
                }
              ]"
            >
              <a-input
                class="w-100"
                v-model:value="person.card_id"
                :placeholder="$t('cardIDFeedBack')"
                :disabled="editCardNumber"
                autocomplete="off"
              >
                <template #addonAfter>
                  <a
                    class="bg-white"
                    href="#"
                    @click.prevent="editCardNumber = !editCardNumber"
                    type="primary"
                  >
                    {{ $t('modify') }}
                  </a>
                </template>
              </a-input>
            </a-form-item>
            <a-form-item
              name="card_type"
              style="min-width: 200px"
              :label="$t('cardType')"
              :rules="[
                {
                  required: true,
                  message: $t('cardTypeFeedback')
                }
              ]"
            >
              <a-select
                v-model:value="person.card_type"
                :placeholder="$t('cardTypeFeedback')"
              >
                <a-select-option
                  v-for="card in cardData"
                  :key="card.type"
                  :value="card.type"
                  >{{ card.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              name="email"
              :label="$t('email')"
              :rules="[
                {
                  type: 'email',
                  message: $t('invalidEmail')
                },
                {
                  required: true,
                  message: $t('emailFeedBack')
                }
              ]"
            >
              <a-auto-complete
                v-model:value="person.email"
                :placeholder="$t('emailFeedBack')"
                :options="options"
                @search="handleSearch"
              >
                <template #option="{ value: val }">
                  {{ val.split('@')[0] }} @
                  <span style="font-weight: bold">{{ val.split('@')[1] }}</span>
                </template>
              </a-auto-complete>
            </a-form-item>

            <a-form-item
              :label="$t('comparisonMode')"
              name="authentication_type"
            >
              <a-select
                v-model:value="person.authentication_type"
                :placeholder="$t('comparisonModeFeedBack')"
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
            <a-form-item
              :rules="[
                {
                  required: true,
                  message: $t('startAndEndTimeFeedBack')
                }
              ]"
              name="range-picker"
              :label="$t('startAndEndTime')"
            >
              <a-range-picker
                class="w-100"
                v-model:value="person['range-picker']"
                value-format="YYYY-MM-DD"
                :ranges="ranges"
                :format="dateFormat"
              />
            </a-form-item>

            <div style="margin-left: -0.5rem" class="pb-1 fw-semibold">
              {{ $t('passwordSetting') }}
            </div>

            <a-form-item
              :label="$t('password')"
              name="password"
              :rules="[
                {
                  validator: validatePass,
                  trigger: 'change'
                }
              ]"
            >
              <a
                href="#"
                v-if="!setModal.showPassword"
                @click.prevent="setModal.showPassword = true"
                >{{ $t('changePassword') }}</a
              >
              <a-input-password
                v-else
                v-model:value="person.password"
                :placeholder="$t('passwordFeedBack')"
                autocomplete="new-password"
              >
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item
              v-if="setModal.showPassword"
              :label="$t('confirmPassword')"
              name="checkPass"
              :rules="[
                {
                  validator: validatePass2,
                  trigger: 'change'
                }
              ]"
            >
              <a-input-password
                autocomplete="off"
                v-model:value="person.checkPass"
                :placeholder="$t('confirmPasswordFeedBack')"
              >
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>
          </div>
          <div class="col-10 col-md-4">
            <a-upload
              v-model:file-list="fileList"
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader ms-4 d-flex justify-content-center"
              :show-upload-list="false"
              :before-upload="beforeUpload"
              :customRequest="handleUpload"
            >
              <img v-if="person.imageUrl" :src="person.imageUrl" alt="avatar" />
              <div v-else>
                <plus-outlined></plus-outlined>
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </div>
        </div>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import { LockOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

export default {
  components: { LockOutlined, PlusOutlined },
  props: ['modal', 'setmodal', 'temp', 'personData'],
  data () {
    return {
      fileList: [], // 照片
      editCardNumber: false,
      dateFormat: 'YYYY/MM/DD',
      showModal: {},
      setModal: {},
      person: {},
      options: [],
      cardData: [
        { name: this.$t('一般卡'), type: '81' },
        {
          name: this.$t('黑名單發警報'),
          type: '03'
        },
        {
          name: this.$t('黑名單不發警報'),
          type: '05'
        },
        {
          name: this.$t('不受Anti管制卡'),
          type: '88'
        }
      ],
      ranges: {}
    }
  },
  watch: {
    temp: {
      handler () {
        this.showModal = this.modal
        this.person = { ...this.temp }
        if (this.person.created_since && this.person.valid_till) {
          this.person['range-picker'] = [
            dayjs(this.person.created_since, this.dateFormat),
            dayjs(this.person.valid_till, this.dateFormat)
          ]
        }
        this.editCardNumber = !this.showModal.isNew
      },
      deep: true,
      immediate: true
    },
    modal: {
      handler () {
        this.showModal = this.modal

        this.editCardNumber = !this.showModal.isNew
      },
      deep: true,
      immediate: true
    },
    setmodal: {
      handler (n) {
        this.setModal = this.setmodal
      },
      deep: true,
      immediate: true
    },
    '$i18n.locale': {
      handler (newValue) {
        switch (newValue) {
          case 'en':
            this.ranges = {
              'This Week': [dayjs().startOf('week'), dayjs().endOf('week')],
              'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
              'This Year': [dayjs().startOf('year'), dayjs().endOf('year')]
            }
            break
          case 'zh-TW':
            this.ranges = {
              當周: [dayjs().startOf('week'), dayjs().endOf('week')],
              當月: [dayjs().startOf('month'), dayjs().endOf('month')],
              當年: [dayjs().startOf('year'), dayjs().endOf('year')]
            }
            break
        }
      },
      immediate: true
    }
  },
  methods: {
    getBase64 (img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        callback(reader.result)
      })
      reader.readAsDataURL(img)
    },
    handleUpload (info) {
      // 超過512K不給傳
      this.getBase64(info.file, (base64Url) => {
        this.person.imageUrl = base64Url
      })
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'

      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!')
      }

      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }

      return isJpgOrPng && isLt2M
    },
    async validateCardID (rule, value, callback) {
      return new Promise((resolve, reject) => {
        if (!value) {
          return reject(this.$t('cardIDFeedBack'))
        }
        if (value === this.temp.card_id) {
          return resolve()
        }

        for (let i = 0; i < this.personData.length; i++) {
          if (this.personData[i].card_id === value) {
            return reject(this.$t('cardIDRepeat'))
          }
        }
        return resolve()
      })
    },
    async personID (rule, value, callback) {
      return new Promise((resolve, reject) => {
        if (!value) {
          return reject(this.$t('personIDFeedBack'))
        }
        if (value === this.temp.person_id) {
          return resolve()
        }

        for (let i = 0; i < this.personData.length; i++) {
          if (this.personData[i].person_id === value) {
            return reject(this.$t('personIDRepeat'))
          }
        }
        return resolve()
      })
    },

    async validatePass (rule, value, callback) {
      this.$refs.formRef.validateFields('checkPass')

      return Promise.resolve()
    },
    async validatePass2 (rule, value, callback) {
      if (value && value !== this.person.password) {
        return Promise.reject(this.$t('passwordNotMatch'))
      } else {
        return Promise.resolve()
      }
    },
    onCheck () {
      this.$refs.formRef
        .validateFields()
        .then(() => {
          this.$emit(
            'update-person',
            this.person,
            this.showModal.isNew,
            this.showModal.index
          )
        })
        .catch(() => {
          this.$refs.formRef.scrollToField()
        })
    },
    handleChange (val) {
      if (!val) return
      this.person.created_since = dayjs(val[0]).format('YYYY-MM-DD')
      this.person.valid_till = dayjs(val[1]).format('YYYY-MM-DD')
    },
    handleSearch (val) {
      let res
      if (!val || val.indexOf('@') >= 0) {
        res = []
      } else {
        res = [
          'gmail.com',
          'yahoo.com.tw',
          'hotmail.com',
          'msn.com',
          'facebook.com'
        ].map((domain) => ({
          value: `${val}@${domain}`
        }))
      }
      this.options = res
    }
  }
}
</script>

<style lang="scss">
.avatar-uploader > .ant-upload {
  width: 132px;
  height: 132px;
  overflow: hidden;
}
.avatar-uploader > .ant-upload.ant-upload-select-picture-card {
  width: 132px;
  height: 132px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.avatar-uploader > .ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.avatar-uploader {
  overflow: hidden;
}
.ant-modal-header {
  background: #384893;
}
.ant-modal-title,
.ant-modal-close-icon {
  color: #fff;
}
</style>
