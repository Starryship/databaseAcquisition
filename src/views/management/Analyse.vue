<template>
    <div>
      <!-- 第一个图表容器 -->
      <div ref="chart1" style="width: 600px; height: 400px;"></div>
      <!-- 第二个图表容器 -->
      <div ref="chart2" style="width: 600px; height: 400px;"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import * as echarts from 'echarts'
  
  // 创建对 DOM 元素的引用
  const chart1 = ref(null)
  const chart2 = ref(null)
  
  // 初始化第一个图表 - Nightingale Chart
  const initChart1 = () => {
    const myChart1 = echarts.init(chart1.value)
    const option1 = {
      title: {
        text: 'Nightingale Chart',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        top: 'bottom',
        data: [
          'rose1',
          'rose2',
          'rose3',
          'rose4',
          'rose5',
          'rose6',
          'rose7',
          'rose8'
        ]
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: 'Radius Mode',
          type: 'pie',
          radius: [20, 140],
          center: ['25%', '50%'],
          roseType: 'radius',
          itemStyle: {
            borderRadius: 5
          },
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true
            }
          },
          data: [
            { value: 40, name: 'rose 1' },
            { value: 33, name: 'rose 2' },
            { value: 28, name: 'rose 3' },
            { value: 22, name: 'rose 4' },
            { value: 20, name: 'rose 5' },
            { value: 15, name: 'rose 6' },
            { value: 12, name: 'rose 7' },
            { value: 10, name: 'rose 8' }
          ]
        },
        {
          name: 'Area Mode',
          type: 'pie',
          radius: [20, 140],
          center: ['75%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5
          },
          data: [
            { value: 30, name: 'rose 1' },
            { value: 28, name: 'rose 2' },
            { value: 26, name: 'rose 3' },
            { value: 24, name: 'rose 4' },
            { value: 22, name: 'rose 5' },
            { value: 20, name: 'rose 6' },
            { value: 18, name: 'rose 7' },
            { value: 16, name: 'rose 8' }
          ]
        }
      ]
    }
    myChart1.setOption(option1)
  }
  
//   // 初始化第二个图表 - Bar Chart with Zoom
//   const initChart2 = () => {
//     const myChart2 = echarts.init(chart2.value)
//     const dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放']
//     const data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220]
//     const yMax = 500
//     let dataShadow = []
//     for (let i = 0; i < data.length; i++) {
//       dataShadow.push(yMax)
//     }
  
//     const option2 = {
//       title: {
//         text: '特性示例：渐变色 阴影 点击缩放',
//         subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
//       },
//       xAxis: {
//         data: dataAxis,
//         axisLabel: {
//           inside: true,
//           color: '#fff'
//         },
//         axisTick: {
//           show: false
//         },
//         axisLine: {
//           show: false
//         },
//         z: 10
//       },
//       yAxis: {
//         axisLine: {
//           show: false
//         },
//         axisTick: {
//           show: false
//         },
//         axisLabel: {
//           color: '#999'
//         }
//       },
//       dataZoom: [
//         {
//           type: 'inside'
//         }
//       ],
//       series: [
//         {
//           type: 'bar',
//           showBackground: true,
//           itemStyle: {
//             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//               { offset: 0, color: '#83bff6' },
//               { offset: 0.5, color: '#188df0' },
//               { offset: 1, color: '#188df0' }
//             ])
//           },
//           emphasis: {
//             itemStyle: {
//               color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//                 { offset: 0, color: '#2378f7' },
//                 { offset: 0.7, color: '#2378f7' },
//                 { offset: 1, color: '#83bff6' }
//               ])
//             }
//           },
//           data: data
//         }
//       ]
//     }
  
//     // Enable data zoom when user clicks bar
//     const zoomSize = 6
//     myChart2.on('click', function (params) {
//       myChart2.dispatchAction({
//         type: 'dataZoom',
//         startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
//         endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
//       })
//     })
  
//     myChart2.setOption(option2)
//   }



// 初始化第二个图表 - Bar Chart
const initChart2 = () => {
  const myChart2 = echarts.init(chart2.value)
  const option2 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  }
  myChart2.setOption(option2)
}
  
  // 调用图表初始化函数
  onMounted(() => {
    initChart1()
    initChart2()
  })
  
  // 在组件销毁时清除 ECharts 实例
  onBeforeUnmount(() => {
    if (chart1.value) echarts.dispose(chart1.value)
    if (chart2.value) echarts.dispose(chart2.value)
  })
  
  </script>
  
  <style scoped>
  /* 你可以根据需要调整图表的样式 */
  </style>
  