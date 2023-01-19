<template>
  <div class="month-table-width" @keyup="keyupSelect">
    <table
      class="h-100 month-picker w-100 border border-primary bg-"
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
            :title="'點擊選取 ' + $t(`${week.toUpperCase()}`)"
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

<style lang="scss">
// .month-picker {
//   font-size: 12px;
//   user-select: none;
//   table-layout: fixed;
//   thead {
//     th {
//       color: #384893;
//       text-align: center;
//       line-height: 14px;
//       cursor: default;
//       background: #fff;
//       padding: 4px 0;
//     }
//   }
//   tbody {
//     tr {
//       height: 19.5px;
//       text-align: center;
//       th {
//         color: #384893;
//         font-family: 'Times New Roman', Times, serif;
//         line-height: 13px;
//         padding: 4px 1px;
//         font-weight: 500;
//         cursor: pointer;
//       }

//       th.select {
//         border: 1px solid #384893;
//         border-block-color: #384893;
//       }

//       td {
//         padding: 3px 2px;
//         cursor: pointer;
//         line-height: 13px;
//       }
//       td.select {
//         background: #384893;
//         color: #fff;
//       }
//       td.empty {
//         cursor: default !important;
//       }
//     }
//   }
// }

// .month-table-width {
//   width: 153px;
// }

// @media (max-width: 500px) {
//   .month-table-width {
//     width: 180px;
//   }
//   .month-picker {
//     tbody {
//       tr {
//         th {
//           padding: 5px 0;
//         }
//         td {
//           padding: 6px 2px;
//           cursor: pointer;
//           line-height: 13px;
//         }
//         td.empty {
//           cursor: default !important;
//           height: 25px;
//         }
//       }
//     }
//   }
// }
</style>
