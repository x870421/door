<template>
  <div class="d-flex" ref="toggle">
    <aside
      class="sidebar vh-100 border-end d-flex flex-column pt-3"
      style="z-index: 5"
    >
      <div class="px-4">
        <strong>HI! </strong>
      </div>

      <div class="overflow-auto mt-3 scrollbar">
        <router-link @click="toggleRWD" to="/home/records" class="sidebar-link">
          <div class="d-flex justify-content-between px-4">
            <p class="mb-0">{{ $t('systemMess') }}</p>
          </div>
        </router-link>

        <router-link @click="toggleRWD" to="/home/person" class="sidebar-link">
          <div class="d-flex justify-content-between px-4">
            <p class="mb-0">{{ $t('personTitle') }}</p>
          </div>
        </router-link>

        <div>
          <router-link
            to="/system"
            href="#system"
            class="sidebar-link side-title"
            data-bs-toggle="collapse"
            @click.prevent="toggleShow"
          >
            <div class="d-flex align-items-center justify-content-between px-4">
              <p class="mb-0">{{ $t('system') }}</p>
              <caret-up-filled
                v-if="active.system"
                :style="{ fontSize: '16px' }"
              />
              <caret-down-filled v-else :style="{ fontSize: '16px' }" />
            </div>
          </router-link>

          <div class="collapse" id="system">
            <div>
              <router-link
                @click="toggleRWD"
                to="/system/commIP"
                class="sidebar-link sidebar-child"
              >
                <div class="ps-5">{{ $t('comm.IP') }}</div>
              </router-link>
            </div>
            <div>
              <router-link
                @click="toggleRWD"
                to="/system/paramsetting"
                class="sidebar-link sidebar-child"
              >
                <div class="ps-5">
                  {{ $t('paramSetting') }}
                </div>
              </router-link>
            </div>
            <div>
              <router-link
                @click="toggleRWD"
                to="/system/featureInformation"
                class="sidebar-link sidebar-child"
              >
                <div class="ps-5">
                  {{ $t('featureInformation') }}
                </div>
              </router-link>
            </div>

            <div>
              <router-link
                @click="toggleRWD"
                to="/system/UIParam"
                class="sidebar-link sidebar-child"
              >
                <div class="ps-5">{{ $t('UIParam') }}</div>
              </router-link>
            </div>
            <div>
              <router-link
                to="/system/systemInit"
                @click="toggleRWD"
                class="sidebar-link sidebar-child"
              >
                <div class="ps-5">
                  {{ $t('systemInit') }}
                </div>
              </router-link>
            </div>

            <div>
              <router-link
                to="/system/displayText"
                @click="toggleRWD"
                class="sidebar-link sidebar-child"
              >
                <div class="ps-5">
                  {{ $t('displayTextParam') }}
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div>
          <router-link
            to="/accessbasic"
            href="#accessBasic"
            class="sidebar-link align-items-center side-title"
            data-bs-toggle="collapse"
            @click.prevent="toggleShow"
          >
            <div class="d-flex justify-content-between px-4">
              <p class="mb-0">{{ $t('accessBasic') }}</p>
              <caret-up-filled
                v-if="active.accessBasic"
                :style="{ fontSize: '16px' }"
              />
              <caret-down-filled v-else :style="{ fontSize: '16px' }" />
            </div>
          </router-link>

          <div class="collapse" id="accessBasic">
            <div>
              <router-link
                @click="toggleRWD"
                to="/accessbasic/gateIOParam"
                class="sidebar-link sidebar-child"
              >
                <div class="ps-5">
                  {{ $t('gateI/OParam') }}
                </div>
              </router-link>
            </div>
            <div>
              <router-link
                @click="toggleRWD"
                to="/accessbasic/gateControl"
                class="sidebar-link sidebar-child"
              >
                <div class="ps-5">
                  {{ $t('gateControlSetting') }}
                </div>
              </router-link>
            </div>

            <div>
              <router-link
                @click="toggleRWD"
                to="/accessbasic/MIFAREParam"
                class="sidebar-link sidebar-child"
              >
                <div class="ps-5">
                  {{ $t('setMIFAREParam') }}
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div>
          <router-link
            to="/accesscontrol"
            href="#accessControl"
            class="sidebar-link side-title"
            data-bs-toggle="collapse"
            @click.prevent="toggleShow"
          >
            <div class="d-flex align-items-center justify-content-between px-4">
              <p class="mb-0">{{ $t('accessControl') }}</p>
              <caret-up-filled
                v-if="active.accessControl"
                :style="{ fontSize: '16px' }"
              />
              <caret-down-filled v-else :style="{ fontSize: '16px' }" />
            </div>
          </router-link>

          <div class="collapse" id="accessControl">
            <div>
              <router-link
                @click="toggleRWD"
                to="/accesscontrol/recordshistory"
                class="sidebar-link sidebar-child"
              >
                <div class="ps-5">
                  {{ $t('recordsHistory') }}
                </div>
              </router-link>
            </div>
            <div>
              <router-link
                @click="toggleRWD"
                to="/accesscontrol/weektable"
                class="sidebar-link sidebar-child"
              >
                <div class="ps-5">
                  {{ $t('weekTable') }}
                </div>
              </router-link>
            </div>
            <div>
              <router-link
                @click="toggleRWD"
                to="/accesscontrol/holidaytable"
                class="sidebar-link sidebar-child"
              >
                <div class="ps-5">
                  {{ $t('holidayTable') }}
                </div>
              </router-link>
            </div>
            <div>
              <router-link
                @click="toggleRWD"
                to="/accesscontrol/make-upTable"
                class="sidebar-link sidebar-child"
              >
                <div class="ps-5">
                  {{ $t('make-upWorkdayTable') }}
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <div>
          <router-link
            to="/attendance"
            href="#attendance"
            class="sidebar-link side-title"
            data-bs-toggle="collapse"
            @click.prevent="toggleShow"
          >
            <div class="d-flex align-items-center justify-content-between px-4">
              <p class="mb-0">{{ $t('Attendance') }}</p>
              <caret-up-filled
                v-if="active.attendance"
                :style="{ fontSize: '16px' }"
              />
              <caret-down-filled v-else :style="{ fontSize: '16px' }" />
            </div>
          </router-link>

          <div class="collapse" id="attendance">
            <div>
              <router-link
                @click="toggleRWD"
                to="/attendance/SirenTime"
                class="sidebar-link sidebar-child"
              >
                <div class="ps-5">{{ $t('SirenTimetable') }}</div>
              </router-link>
            </div>
            <div>
              <router-link
                @click="toggleRWD"
                to="/attendance/daylight"
                class="sidebar-link sidebar-child"
              >
                <div class="ps-5">
                  {{ $t('DaylightSavingTime') }}
                </div>
              </router-link>
            </div>
            <div>
              <router-link
                @click="toggleRWD"
                to="/attendance/attendanceparam"
                class="sidebar-link sidebar-child"
              >
                <div class="ps-5">
                  {{ $t('AttendanceParam') }}
                </div>
              </router-link>
            </div>
            <div>
              <router-link
                @click="toggleRWD"
                to="/attendance/dutystatus"
                class="sidebar-link sidebar-child"
              >
                <div class="ps-5">
                  {{ $t('WorkShiftTable') }}
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <a href="#" class="mt-auto sidebar-link" @click.prevent="logout">
        <div class="px-4">{{ $t('logout') }}</div>
      </a>
    </aside>

    <div class="main">
      <div
        class="border-bottom shadow-sm w-100 d-flex position-fixed bg-white"
        style="z-index: 5"
      >
        <div class="border-end d-inline-flex">
          <div class="icon icon-toggle icon-open" ref="icon" @click="toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <nav
          class="d-flex justify-content-center align-items-center mx-3 menu"
          style="--bs-breadcrumb-divider: '>'"
          aria-label="breadcrumb"
        >
          <ol class="breadcrumb mb-0">
            <li
              class="breadcrumb-item"
              v-for="(item, index) in myRoute"
              :key="item.path + item.name + index"
            >
              <router-link :to="item.path">{{ $t(item.name) }}</router-link>
            </li>
          </ol>
        </nav>

        <div class="my-auto ms-auto local-change">
          <a-select
            v-model:value="this.$i18n.locale"
            @change="changeSession"
            style="width: 120px"
          >
            <a-select-option
              style="width: 120px"
              v-for="lang in langs"
              :key="`lang-${lang}`"
              :value="lang.id"
            >
              {{ lang.name }}
            </a-select-option>
          </a-select>
          {{ this }}
        </div>
      </div>
      <div class="main-content" style="margin-top: 41px; z-index: -3">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons-vue'
export default {
  components: { CaretDownFilled, CaretUpFilled },
  data () {
    return {
      myRoute: [],
      langs: [
        { name: '中文', id: 'zh-TW' },
        { name: 'English', id: 'en' }
      ],
      active: {
        system: false,
        accessBasic: false,
        accessControl: false,
        attendance: false
      }
    }
  },
  watch: {
    $route: {
      handler (n) {
        this.myRoute = n.meta.breadcrumb || n.matched
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    changeSession (n) {
      sessionStorage.setItem('lang', n)
    },
    toggleRWD () {
      if (window.innerWidth <= 768) {
        this.$refs.toggle.classList.toggle('sidebar-toggled')
        this.$refs.icon.classList.toggle('icon-open')
      }
    },
    logout () {
      const key = 'updatable'
      message.loading({
        content: this.$t('loggingOut'),
        key
      })
      setTimeout(() => {
        message.success({
          content: this.$t('logoutSuccessful'),
          key,
          duration: 1
        })
      }, 1000)

      setTimeout(() => {
        this.$router.push('/')
      }, 2500)
    },
    toggleShow (e) {
      const hash = e.currentTarget.hash.slice(1)
      this.active[hash] = !this.active[hash]
    },
    toggle () {
      this.$refs.icon.classList.toggle('icon-open')
      this.$refs.toggle.classList.toggle('sidebar-toggled')
    }
  },
  mounted () {
    if (window.innerWidth <= 768) {
      this.$refs.toggle.classList.add('sidebar-toggled')
      this.$refs.icon.classList.toggle('icon-open')
    }
  },
  created () {
    this.route = this.$route.matched
  }
}
</script>
