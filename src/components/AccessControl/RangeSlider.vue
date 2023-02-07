<template>
  <div>
    <div class="mb-3 d-flex align-item-center" v-cloak>
      <a-button
        type="primary"
        size="small"
        shape="circle"
        @click="addItem(sliderDay)"
        :title="$t('addTime')"
        class="me-3"
      >
        <template #icon><plus-outlined /></template>
      </a-button>

      <div class="position-relative" style="height: auto">
        <a-button type="link" size="small" @click="showCopy = true">{{
          $t('copyTo')
        }}</a-button>

        <div v-if="showCopy" class="position-absolute" style="z-index: 50">
          <a-card size="small" style="width: 240px">
            <a-checkbox-group v-model:value="day">
              <a-row>
                <a-col
                  v-for="(item, index) in options"
                  :key="item + index"
                  :span="12"
                >
                  <a-checkbox :value="item">
                    {{ $t(item) }}
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
            <div class="mt-3 d-flex justify-content-end">
              <a-button
                class="m-1"
                size="small"
                @click="
                  {
                    ;(showCopy = false), (day = [])
                  }
                "
              >
                {{ $t('cancel') }}
              </a-button>
              <a-button
                class="m-1"
                type="primary"
                size="small"
                @click="
                  {
                    ;(showCopy = false),
                      $emit('copyto', sliderDay, day),
                      (day = [])
                  }
                "
                >{{ $t('confirm') }}
              </a-button>
            </div>
          </a-card>
        </div>
      </div>
    </div>

    <div class="range-warpper">
      <div v-for="(time, index) in sliderDay" :key="time">
        <div class="container-fluid">
          <div class="my-1 row align-items-center">
            <div class="col-10 col-sm-10 col-md-10 col-xl-11">
              <input
                type="text"
                class="js-range-slider"
                name="my_range"
                :data-from="time.startTime"
                :data-to="time.endTime"
                :data-index="index"
              />
            </div>
            <div class="col-1 col-sm-2 col-md-2 col-xl-1">
              <a-button
                shape="circle"
                size="small"
                @click="deleItem(sliderDay, index)"
                :title="$t('delete')"
              >
                <template #icon><close-outlined /></template>
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PlusOutlined, CloseOutlined } from '@ant-design/icons-vue'
import $ from 'jquery'
import 'ion-rangeslider'
import 'ion-rangeslider/css/ion.rangeSlider.css'
export default {
  components: { PlusOutlined, CloseOutlined },
  data () {
    return {
      sliderDay: {},
      day: [],
      showCopy: false
    }
  },
  props: ['rangeday', 'options'],
  watch: {
    rangeday: {
      handler (n) {
        this.sliderDay = n
        this.switchTime()
        setTimeout(() => {
          this.enrolled()
        }, 0)
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    deleItem (sliderDay, index) {
      sliderDay.splice(index, 1)
    },
    addItem (sliderDay) {
      if (!sliderDay) {
        this.sliderDay = [{ start: '', end: '' }]
        setTimeout(() => {
          this.enrolled()
        }, 0)
        return
      }

      const last = sliderDay.length
      if (last === 8) {
        alert(this.$t('limitReached'))
        return
      }
      if (last !== 0) {
        if (
          sliderDay[last - 1].start === '' ||
          sliderDay[last - 1].end === ''
        ) {
          alert(this.$t('lastFeedBack'))
          return
        }
      }

      this.sliderDay.push({ start: '', end: '' })
    },
    switchTime () {
      if (this.sliderDay) {
        this.sliderDay.forEach((item, index) => {
          const startTime = item.start.split(':')
          const startMin = Number(startTime[0] * 60) + Number(startTime[1])
          const endTime = item.end.split(':')
          const endMin = Number(endTime[0] * 60) + Number(endTime[1])

          this.sliderDay[index].startTime = startMin
          this.sliderDay[index].endTime = endMin
        })
      }
    },
    enrolled () {
      $('.js-range-slider').ionRangeSlider({
        type: 'double',
        min: 0,
        max: 1440,
        prettify: myPrettify,
        to_max: 1439,
        grid: true,
        grid_num: 12,
        step: 5,
        hide_min_max: true,
        force_edges: true,

        onFinish: (data) => {
          const index = data.input[0].dataset.index
          this.sliderDay[index].start = data.from_pretty
          this.sliderDay[index].end = data.to_pretty
        }
      })
      function myPrettify (n) {
        const h = Math.floor(n / 60)
        const m = n % 60
        const hh = h >= 10 ? `${h}` : `0${h}`
        const mm = m >= 10 ? `${m}` : `0${m}`
        return hh + ':' + mm
      }
    },
    mounted () {},
    created () {}
  }
}
</script>
