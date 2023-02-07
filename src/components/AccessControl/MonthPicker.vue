<template>
  <div class="month-table-width border-primary" @keyup="keyupSelect">
    <table
      class="h-100 month-picker w-100"
      @mouseup="mouseUp"
      @mouseleave.stop="mouseUp"
    >
      <thead>
        <th colspan="7" class="text-center">
          {{ $t(monthList[month - 1]) }}
        </th>
      </thead>

      <tbody>
        <tr class="text-center">
          <th
            v-for="(week, index) in weeks"
            :key="week"
            @click="selectWeek(index, $event)"
            :class="{
              select: filter(index)
            }"
            :title="$t('clickToSelect') + ' ' + $t(`${week.toUpperCase()}`)"
          >
            {{ $t(week) }}
          </th>
        </tr>
        <tr v-for="(day, index) in days" :key="'day' + index">
          <td
            @mousedown="mouseDown(item, $event)"
            @mouseover="dragDay(item, $event)"
            :class="[
              {
                select: select.includes(
                  `${year}-${month < 10 ? `0${month}` : month}-${item}`
                )
              },
              { empty: !item }
            ]"
            v-for="(item, index) in day"
            :key="index"
          >
            {{ parseInt(item) ? parseInt(item) : '' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  data () {
    return {
      weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      monthList: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      days: [],
      isMouseDown: false,
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      0: [] // 星期天
    }
  },
  props: ['month', 'select', 'year'],

  methods: {
    filter (index) {
      let flag = true
      this[index].every((i) => {
        if (!this.select.includes(i)) {
          flag = false
          return false
        }
        return flag
      })
      return flag
    },
    selectWeek (index, e) {
      this[index].forEach((i) => {
        const date = dayjs(i).format('DD')
        this.toggleSelect(date, e)
      })
    },
    toggleSelect (day, e) {
      const mm = this.month < 10 ? `0${this.month}` : this.month
      // const dd = day < 10 ? `0${day}` : day
      const className = e.target.className
      switch (className) {
        case 'empty':
          break
        case 'select':
          this.$emit('reduceDate', `${this.year}-${mm}-${day}`)
          break
        case '':
          this.$emit('addDate', `${this.year}-${mm}-${day}`)
          break
      }
    },

    countDay (year, month) {
      const lastDay = new Date(year, month, 0).getDate()
      let temp = []

      for (let i = 1; i <= lastDay; i++) {
        const date = dayjs(new Date(year, month - 1, i))

        if (date.day() === 0 && i !== 1) {
          this.days.push(temp)
          temp = []
        }
        this[date.day()].push(date.format('YYYY-MM-DD'))
        temp[date.day()] = date.format('DD')
        if (i === lastDay) {
          this.days.push(temp)
          temp = []
          if (this.days.length <= 5) {
            this.days.push([])
          }
        }
      }
    },
    mouseDown (day, e) {
      this.toggleSelect(day, e)
      this.isMouseDown = true
    },
    dragDay (day, e) {
      if (this.isMouseDown) {
        this.toggleSelect(day, e)
      }
    },
    mouseUp () {
      this.isMouseDown = false
    }
  },

  created () {
    this.countDay(this.year, this.month)
  }
}
</script>
