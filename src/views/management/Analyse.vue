<template>
  <div class="back">
    <div class="management-container">
      <div ref="chart1" style="width: 100%; height: 600px"></div>
      
      <div ref="chart2" style="width: 100%; height: 400px; margin-top: 10%"></div>
      <div ref="chart3" style="width: 100%; height: 400px; margin-top: 10%"></div>
      
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

// 创建对 DOM 元素的引用
const chart1 = ref(null)
const chart2 = ref(null)
const chart3 = ref(null)
// // 初始化第一个图表 - Nightingale Chart
// const initChart1 = () => {
//   const myChart1 = echarts.init(chart1.value)

//   const option1 = {
//     title: {
//       text: '类别占比',
//       // subtext: '',
//       left: 'center',
//       textStyle: {
//         fontSize: 30,
//       },

//     },
//     legend: {
//       top: 'bottom',
//     },
//     toolbox: {
//       show: true,
//       feature: {
//         mark: { show: true },
//         dataView: { show: true, readOnly: false },
//         // restore: { show: true },
//         saveAsImage: { show: true },
//       },
//     },
//     series: [
//       {
//         name: 'Nightingale Chart',
//         type: 'pie',
//         radius: [50, 250],
//         center: ['50%', '50%'],
//         roseType: 'area',
//         itemStyle: {
//           borderRadius: 8,
//         },
//         data: [
//           { value: 40, name: 'rose 1' },
//           { value: 38, name: 'rose 2' },
//           { value: 32, name: 'rose 3' },
//           { value: 30, name: 'rose 4' },
//           { value: 28, name: 'rose 5' },
//           { value: 26, name: 'rose 6' },
//           { value: 22, name: 'rose 7' },
//           { value: 18, name: 'rose 8' },
//         ],
//       },
//     ],
//   }

//   myChart1.setOption(option1)
// }
import { get_artifacts_count_by_category,get_artifact_interaction_counts ,get_interactions_count_by_category } from '@/api/request'

const fetchAndRenderChart = async () => {
  try {
    // 获取文物类别统计数据
    const countData = await get_artifacts_count_by_category()

    // 提取数据部分
    const categoryData = countData.data
    console.log(categoryData)

    // 格式化数据，转换为图表需要的形式
    const chartData = categoryData.map((item) => ({
      value: item.artifact_count,
      name: item.category,
    }))

    // 图表配置
    const option1 = {
      title: {
        text: '各类别数量占比',
        left: 'center',
        textStyle: {
          fontSize: 30,
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        top: 'bottom',
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: 'Percentage!',
          type: 'pie',
          radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8,
          },

          data: chartData, // 动态填充数据
        },
      ],
    }

    // 获取图表 DOM 容器

    const myChart1 = echarts.init(chart1.value)
    // 渲染图表
    myChart1.setOption(option1)
  } catch (error) {
    console.error('获取文物类别统计数量失败', error)
  }
}



// // 初始化第二个图表 - Bar Chart
// const initChart2 = () => {
//   const myChart2 = echarts.init(chart2.value)
//   const option2 = {
//     title: {
//       text: '各文物热度',
//       // subtext: 'Fake Data',
//       left: 'center',
//       textStyle: {
//         fontSize: 30,
//       },
//     },

//     tooltip: {
//       trigger: 'axis',
//       axisPointer: {
//         type: 'shadow',
//       },
//     },
//     toolbox: {
//       show: true,
//       feature: {
//         mark: { show: true },
//         dataView: { show: true, readOnly: false },
//         // restore: { show: true },
//         saveAsImage: { show: true },
//       },
//     },
//     grid: {
//       left: '3%',
//       right: '4%',
//       bottom: '3%',
//       containLabel: true,
//     },

//     xAxis: [
//       {
//         type: 'category',
//         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//         axisTick: {
//           alignWithLabel: true,
//         },
//       },
//     ],
//     yAxis: [
//       {
//         type: 'value',
//       },
//     ],
//     series: [
//       {
//         name: 'Direct',
//         type: 'bar',
//         barWidth: '60%',
//         data: [10, 52, 200, 334, 390, 330, 220],
//       },
//     ],
//   }
//   myChart2.setOption(option2)
// }


const fetchAndRenderInteractionChart = async () => {
  try {

  
  // 获取文物交互次数数据
  const interactionData = await get_interactions_count_by_category() ;  // 通过 API 获取数据，假设 `get_artifact_interaction_counts` 已经定义
console.log('dasdas',interactionData.data)


  // 格式化数据
  const artifactIds = interactionData.data.map(item => item.category);  // 文物ID（或者名称）
  const interactionCounts = interactionData.data.map(item => item.category_interaction_count);  // 交互次数
  

      // 图表配置
  const option2 = {
    title: {
      text: '各类别文物热度',
      left: 'center',
      textStyle: {
        fontSize: 30,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: artifactIds,  // 更新为从 API 获取的文物 ID
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Count',
        type: 'bar',
        barWidth: '60%',
        data: interactionCounts,  // 更新为从 API 获取的交互次数
      },
    ],
  };

    // 获取图表 DOM 容器

    const myChart2 = echarts.init(chart2.value);
    // 渲染图表
    myChart2.setOption(option2)
  } catch (error) {
    console.error('获取文物类别统计数量失败', error)
  }
}



// 初始化图表
const initChart3 = async () => {
  const myChart = echarts.init(chart3.value); // 假设 chart 是你已经定义好的图表容器
  // const response = await get_bar_chart_data(); // 获取数据
  
  // const dataAxis = response.dataAxis;
  // const data = response.data;


  const interactionData = await get_artifact_interaction_counts(20);  // 通过 API 获取数据，假设 `get_artifact_interaction_counts` 已经定义


  // 格式化数据
  // const dataAxis = interactionData.data.map(item => item.artifact_id);  // 文物ID（或者名称）
  const dataAxis = interactionData.data.map(item => `${item.name}[id:${item.artifact_id}]`);  // 将名字和ID结合起来
  const data = interactionData.data.map(item => item.interaction_count);  // 交互次数
  




  // const yMax = 500;
  // const dataShadow = new Array(data.length).fill(yMax); // 初始化阴影数据

  const option3 = {
    // title: {
    //   text: '特性示例：渐变色 阴影 点击缩放',
    //   subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom',
    // },
    title: {
      text: '各文物热度',
      left: 'center',
      textStyle: {
        fontSize: 30,
      },
    },

    xAxis: {
      data: dataAxis,
      // axisLabel: {
      //   inside: true,
      //   color: '#fff',
      // },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#999',
      },
    },
    dataZoom: [
      {
        type: 'inside',
      },
    ],
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },},
      tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    series: [
      {
        name: 'Count',
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' },
            ]),
          },
        },
        data: data,
      },
    ],
  };

  myChart.setOption(option3);

  // 图表点击缩放交互
  const zoomSize = 6;
  myChart.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart.dispatchAction({
      type: 'dataZoom',
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
        dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)],
    });
  });
};


// 调用图表初始化函数
onMounted(() => {
  // 调用函数来获取数据并渲染图表
  fetchAndRenderChart()
  // initChart1()

  // initChart2()

  fetchAndRenderInteractionChart()

  initChart3()
})

// 在组件销毁时清除 ECharts 实例
onBeforeUnmount(() => {
  if (chart1.value) echarts.dispose(chart1.value)
  if (chart2.value) echarts.dispose(chart2.value)
})
</script>

<style scoped>
/* 你可以根据需要调整图表的样式 */

.back {
  width: 100vw;
  height: 100vh;
  background-color: rgb(91, 37, 40);
  overflow-y: auto;
}

.management-container {
  margin: -4px auto;
  width: 90%;
  height: fit-content;
  background-color: rgb(250, 247, 244);
  padding: 40px 15px;
  box-sizing: border-box;
  margin-bottom: 15%;
  padding-top: 12%;
}

/* .back {
  width: 100vw;
  height: 100vh;
   display: flex; 
   justify-content: center;
  align-items: center; 
  background-color: rgb(91, 37, 40); 
  overflow-y: auto; 
}

.management-container {
  display: flex;
  margin: -4px auto;
  justify-content: space-between;
  width: 90%;
  height: fit-content; 
  background-color: rgb(250, 247, 244);
  padding: 40px 15px;
  box-sizing: border-box;
  margin-bottom: 15%;
} */

/* .left-side {
  width: 20%;
  padding-right: 20px;
}


.right-side {
  width: 80%;
  background-color: #e9ecef; 
  padding: 10px;
  border-radius: 8px;
} */
</style>
