import { defineStore } from 'pinia'
import { Names } from './store-name'

export const userStore = defineStore(Names.TEXT,{
  state: () => {
    return {
      tabData: [
        {
          path:'/home',
          meta: {
            title: '首页'
          }
        }
      ],
      nightShow: localStorage.getItem('show'),
      background_day: {
        background_h1: '#fff',
        background_h2: '#f0f0f0',
        background_h3: '#e7e7e7',
        color: '#000'
      },
      background_night: {
        background_h1: '#1A2327',
        background_h2: '#263238',
        background_h3: '#000',
        color: '#fff'
      }
    }
  },
  getters: {
    getBackground():{} {
      if (!this.nightShow) {
        return this.background_day
      }else {
        return this.background_night
      }
    }
  },
  actions: {
    editNightShow(bl:any) {
      localStorage.setItem('show',bl)
      console.log(111);
    },
    addTabData(route: any) {
      if (!this.tabData.find(v => v.path == route.path)) {
        this.tabData.push(route)
      }
    },
    delTabData(index: number) {
      this.tabData.splice(index,1)
    }
  }
})