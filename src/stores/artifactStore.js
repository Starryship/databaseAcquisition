// src/stores/artifactStore.js
import { defineStore } from 'pinia';

// export const useArtifactStore = defineStore('artifact', {
//   state: () => ({
//     // id: null,
//     // era: '',
//     // location_time: '',
//     // image: '',
//     // name: '',
//     // parameter: '',
//     // category: '',
//     // text: ''
//     artifact:[]

//   }),
//   actions: {
//     setArtifactData(artifact) {
//         console.log("store",artifact)
//     //   this.id = artifact.id;
//     //   this.era = artifact.period;
//     //   this.location_time = artifact.material;
//     //   this.image = artifact.thumbnail_path;
//     //   this.name = artifact.name;
//     //   this.parameter = artifact.parameter;
//     //   this.category = artifact.category;
//     //   this.text = artifact.description;
//     this.artifact=artifact
//     console.log("store2",this.artifact)

//     }
//   }
// });




export const useArtifactStore = defineStore('artifact', {
    state: () => ({
      artifact: JSON.parse(localStorage.getItem('artifactData')) || [], // 从 localStorage 获取数据，如果没有就初始化为空数组
    }),
    actions: {
      setArtifactData(artifact) {
        console.log("store", artifact);
  
        this.artifact = artifact;
  
        // 将数据保存到 localStorage
        localStorage.setItem('artifactData', JSON.stringify(this.artifact));
  
        console.log("store2", this.artifact);
      },
  
      clearArtifactData() {
        this.artifact = [];
        localStorage.removeItem('artifactData'); // 清除缓存
      },
    },
  });



  