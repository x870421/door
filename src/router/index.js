import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    redirect: '/home/records',
    children: [
      {
        path: 'person',
        name: 'personTitle',
        component: () => import('../views/PersonPageAll.vue')
      },
      {
        path: 'person/importCSV',
        name: 'importCSV',
        component: () => import('../views/ImportCSV.vue'),
        meta: {
          breadcrumb: [
            { path: '/home', redirect: '/home/records', name: 'home' },
            { path: '/home/person', name: 'personTitle' },
            { path: '/home/person/importCSV', name: 'importCSV' }
          ]
        }
      },
      {
        path: 'records',
        name: 'systemMess',
        component: () => import('../views/SystemMess.vue')
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    component: () => import('../views/HomeView.vue'),
    redirect: '/system/commIP',
    children: [
      {
        path: 'commIP',
        name: 'comm.IP',
        component: () => import('../views/System/NetWork.vue')
      },
      {
        path: 'paramsetting',
        name: 'paramSetting',
        component: () => import('../views/System/ParamSetting.vue')
      },
      {
        path: 'featureInformation',
        name: 'featureInformation',
        component: () => import('../views/System/FeatureInformation.vue')
      },

      {
        path: 'UIParam',
        name: 'UIParam',
        component: () => import('../views/System/UIParam.vue')
      },
      {
        path: 'systemInit',
        name: 'systemInit',
        component: () => import('../views/System/SystemInit.vue')
      },

      {
        path: 'displayText',
        name: 'displayTextParam',
        component: () => import('../views/System/DisplayText.vue')
      }
    ]
  },
  {
    path: '/accessbasic',
    name: 'accessBasic',
    component: () => import('../views/HomeView.vue'),
    redirect: '/accessbasic/gateIOParam',
    children: [
      {
        path: 'gateIOParam',
        name: 'gateI/OParam',
        component: () => import('../views/AccessBasic/GateIOParam.vue')
      },
      {
        path: 'MIFAREParam',
        name: 'setMIFAREParam',
        component: () => import('../views/AccessBasic/MIFAREParam.vue')
      },
      {
        path: 'gateControl',
        name: 'gateControlSetting',
        component: () => import('../views/AccessBasic/GateControl.vue')
      }
    ]
  },
  {
    path: '/accesscontrol',
    name: 'accessControl',
    component: () => import('../views/HomeView.vue'),
    redirect: '/accesscontrol/weektable',
    children: [
      {
        path: 'weektable',
        name: 'weekTable',
        component: () => import('../views/AccessControl/WeekTable.vue')
      },
      {
        path: 'holidaytable',
        name: 'holidayTable',
        component: () => import('../views/AccessControl/HolidayTable.vue')
      },
      {
        path: 'make-upTable',
        name: 'make-upWorkdayTable',
        component: () => import('../views/AccessControl/Make-upTable.vue')
      },

      {
        path: 'recordshistory',
        name: 'recordsHistory',
        component: () => import('../views/AccessControl/RecordsHistoryAll.vue')
      }
    ]
  },
  {
    path: '/attendance',
    name: 'Attendance',
    component: () => import('../views/HomeView.vue'),
    redirect: '/attendance/sirentime',
    children: [
      {
        path: 'sirentime',
        name: 'SirenTimetable',
        component: () => import('../views/Attendance/SirenTime.vue')
      },
      {
        path: 'daylight',
        name: 'DaylightSavingTime',
        component: () => import('../views/Attendance/DaylightSavingTime.vue')
      },
      {
        path: 'attendanceparam',
        name: 'AttendanceParam',
        component: () => import('../views/Attendance/AttendanceParam.vue')
      },
      {
        path: 'dutystatus',
        name: 'WorkShiftTable',
        component: () => import('../views/Attendance/DutyStatus.vue')
      }
    ]
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/components/PageNotFound'),
    hidden: true
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
