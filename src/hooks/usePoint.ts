import {reactive, onMounted, onBeforeUnmount} from 'vue'

interface point {
  x: number,
  y: number
}
interface Event {
  pageX: number,
  pageY: number
}

export default function usePoint() {
  const point = reactive<point>({
    x: 0,
    y: 0
  })

  function savaPoint(event: Event) {
    point.x = event.pageX
    point.y = event.pageY
    console.log(point.x,point.y);
  }

  onMounted(() => {
    window.addEventListener('click',savaPoint)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('click', savaPoint)
  })
  return point
}