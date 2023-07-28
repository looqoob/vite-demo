<template>
  <div class="menuDemo">
    <div class="menu">
      <div class="menuHeader">
        <el-icon class="icon"><SwitchFilled /></el-icon>
        <span v-if="isOpenMenu"> Switch LOGO</span>
      </div>
      <div class="menuMain">
        <div class="menuList">
          <div class="menuItem" v-for="(item, index) in menuList" @click.stop="goBgc(index)" :key="index">
            <el-icon class="icon">
              <component :is="item.icon" class="a"></component>
            </el-icon>
            <span v-if="isOpenMenu">{{ item.title }}</span>
          </div>
        </div>
      </div>
      <div class="menuFooter">
        <div class="man">
          <img src="../../assets/路飞.jpg" />
          <span>I'M SO HANDSOME</span>
        </div>
        <div class="logout">
          <el-icon class="icon"><SwitchButton /></el-icon>
          <span>LOGOUT</span>
        </div>
      </div>
    </div>
    <div class="main">
      <span @click="iconClick">
        <el-icon class="icon" v-if="isOpenMenu"><Fold /></el-icon>
        <el-icon class="icon" v-else><Expand /></el-icon>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive,onMounted } from "vue";
const arr = ['57px','52px','200px','195px']
const width = ref('200px')
const width2 = ref('195px')
const isOpenMenu = ref(true)
const iconClick = () => {
  if (isOpenMenu.value) {
    width.value = '57px'
    width2.value = '52px'
    console.log(true);
  } else {
    width.value = '200px'
    width2.value = '195px'
    console.log(false);
  }
  isOpenMenu.value = !isOpenMenu.value
}

const menuList = reactive([
  {
    title: 'HOME',
    icon: 'House',
    color: '#D02D35'
  },
  {
    title: 'USER',
    icon: 'User',
    color: '#F2A834'
  },
  {
    title: 'MESSAGE',
    icon: 'ChatRound',
    color: '#15C91B'
  },
])
onMounted(() => {
  let init = document.querySelector('.menuItem')
  init?.classList.add('menuItemBgc')
})
const goBgc = (index: number) => {
  let menuItemBgc = document.querySelector('.menuItemBgc')
  menuItemBgc?.classList.remove('menuItemBgc')
  let menu: any = document.querySelectorAll('.menuItem')
  menu[index].classList.add('menuItemBgc')
}
</script>

<style scoped lang="less">
.menuDemo {
  border: 1px black solid;
  height: 82vh;
  background-color: #14121c;
  position: relative;
  display: flex;

  .menu {
    height: 100%;
    width: v-bind(width);
    background-color: #fefefe;
    overflow: hidden;
    transition: all .3s;
    .menuHeader {
      width: 200px;
      height: 80px;
      line-height: 80px;
      vertical-align: middle;
      .icon {
        font-size: 24px;
        position: relative;
        top: 7px;
        width: 60px;
      }
    }
    .menuMain {
      .menuList {
        position: relative;
        
        .menuItem {
          width: 200px;
          height: 50px;
          line-height: 50px;
          border-top-right-radius: 20px;
          z-index: 99;
          
          .icon {
            font-size: 20px;
            vertical-align: middle;
            width: 37px;
            height: 37px;
            border-radius: 50px;
            position: relative;
            bottom: 1px;
            left: 10px;
            margin-right: 20px;
            
          }
          &:nth-child(1):hover {
            color: #D02D35;
          }
          &:nth-child(2):hover {
            color: #F2A834;
          }
          &:nth-child(3):hover {
            color: #15C91B;
          }
        }
        .menuItemBgc {
          height: 50px;
          width: v-bind(width2);
          background-color: #14121c;
          position: relative;
          border-radius: 30px 0 0 30px;
          margin-left: 5px;
          top: 0;
          transition: width .3s;
          .icon {
            left: 5px;
            background-color: #D02D35;
            color: #fefefe;
            margin-right: 15px;
            transition: all .3s;
            .a {
              margin-right: 2px;
              margin-bottom: 2px;
            }
            &:hover {
              background-color: #fefefe;
              color: #D02D35;
            }
          }
          span {
            color: #fefefe;
          }
          &::before {
            content: "";
            position: absolute;
            right: 0;
            top: -20px;
            width: 20px;
            height: 20px;
            color: #000;
            background-color: #fefefe;
            border-bottom-right-radius: 20px;
            box-shadow: 5px 5px 0 5px;
          }
          &::after {
            content: "";
            position: absolute;
            right: 0;
            bottom: -20px;
            width: 20px;
            height: 20px;
            color: #000;
            background-color: #fefefe;
            border-top-right-radius: 20px;
            box-shadow: 5px -5px 0 5px;
          }
        }
      }
    }
    .menuFooter {
      height: 100px;
      width: 200px;
      position: absolute;
      bottom: 0;
      .man {
        height: 50px;
        line-height: 50px;
        img {
          height: 40px;
          width: 40px;
          vertical-align: middle;
          border-radius: 50px;
          margin-left: 10px;
          margin-right: 10px;
        }
      }
      .logout {
        height: 50px;
        line-height: 50px;
        .icon {
          font-size: 24px;
          vertical-align: middle;
          width: 60px;
        }
      }
    }
  }
  .main {
    height: 100%;
    flex: 1;
    z-index: 1;
    .icon {
      font-size: 24px;
      color: white;
      margin: 25px;
    }
  }
}
</style>
