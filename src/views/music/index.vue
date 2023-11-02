<template>
  <div class="card">
    <audio controls class="audio" ref="audio" :src="music" @timeupdate="musicIndex"></audio>
    <div class="main">
      <ul ref="ul" @mousewheel="mousewheel">
        <li v-for="(item, index) in musicList" :key="index">
          <div :class="{selected : index == myIndex}">
            <el-icon class="play" v-if="hover == index && hover != myIndex"><VideoPlay /></el-icon>
            <span v-if="hover == index && hover != myIndex" class="hover_l"></span>
            <span @mouseenter="mouseenter(index)" @mouseleave="mouseleave" @click="contentClick(index)">{{ item.data }}</span>
            <span v-if="hover == index && hover != myIndex" class="hover_r"></span>
          </div>
        </li>
      </ul>
    </div>
    <div class="upload">
      <el-upload
        action="http://localhost:9090/files/upload"
      >
        <el-button type="primary">上传歌曲以及歌词</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref,reactive,onMounted } from 'vue'
// import lrc from "./assets/data2"
import lrc from "./assets/说了再见.txt?raw"
import music from "./assets/musics/说了再见.mp3";
import debounce from "@/utils/debounce";

const audio = ref<HTMLAudioElement>()
const ul = ref()

/**
 * 处理歌词字符串
 */
const disposeLrc = (lrc: string) => {
  // 歌词数组
  let musicList: any = []
  let line = lrc.split('\n')
  line.forEach((item, index) => {
    let musicData = item.split(']')
    let time = musicData[0].substring(1)
    let newTime = +time.split(':')[0] * 60 + +time.split(':')[1]
    let data = musicData[1]
    let obj  = {
      time: newTime,
      data
    }
    musicList.push(obj)
  })
  return musicList
}

/**
 * 计算播放到了第几句
 */

let myIndex = ref(-1)
const musicIndex = () => {
  let time = audio.value?.currentTime
  musicList.forEach((item: any, index: number) => {
    if (time && time >= item.time) {
      myIndex.value = index
      return
    }
  })
  if(!scrolling.value) {
    location(myIndex.value)
  }
}

/**
 * 设置歌词滚动的位置
 */
const location = (index: number) => {
  let liHeight = ul.value.children[0].clientHeight
  let y = -(liHeight * index + liHeight / 2) + 200
  ul.value.style.transform = `translateY(${y}px)`
}

let scrolling = ref(false)

let musicList = disposeLrc(lrc)

onMounted(() => {
  ul.value.style.transform = `translateY(${215}px)`
})

// 鼠标悬浮效果
let hover = ref(-1)
const mouseenter = (index: number) => {
  hover.value = index
}
const mouseleave = () => {
  hover.value = -1
}

// 点击歌词跳转到该歌词位置播放
const contentClick = (index: number) => {
  if (audio.value) {
    audio.value.currentTime = musicList[index].time
    scrolling.value = false
  }
}

// 滚动事件
const mousewheel = (e: any) => {
  scrolling.value = true
  debounce(() => {
    scrolling.value = false
  }, 2500)
  let y = ul.value.style.transform.split('(')[1].split('p')[0]
  console.log(y);
  ul.value.style.transform = `translateY(${+y + e.wheelDelta / 3}px)`
}

</script>

<style scoped lang='less'>
  .card {
    height: 100%;
    background-color: rgb(69, 69, 69);
    text-align: center;
    color: rgb(164, 164, 164);
    position: relative;
    .audio {
      width: 400px;
    }
    .main {
      height: 400px;
      overflow: hidden;
      margin-top: 30px;
      position: relative;
      ul {
        transition: .3s;
        transform: translateY(-10px);
        li {
          height: 30px;
          line-height: 30px;
          transform: scale(1);
          div{
            transition: .3s;
            .play {
              position: relative;
              top: 2px;
              right: 7px;
              color: rgb(255, 255, 255);
            }
            .hover_l, .hover_r {
              display: inline-block;
              position: relative;
              bottom: 4px;
              width: 25px;
              height: 1px;
              background-color: rgb(255, 255, 255);
              transition: .3s;
            }
            .hover_l {
              width: 15.5px;
              right: 5px;
            }
            .hover_r {
              left: 5px;
            }
          }
          .selected {
            transform: scale(1.3);
            color: aliceblue;
          }
        }
      }
    }
    .upload {
      color: aliceblue;
      position: absolute;
      right: 60px;
      top: 30px;
    }
  }
</style>
