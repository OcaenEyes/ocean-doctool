/*
 * @Author: OCEAN.GZY
 * @Date: 2023-10-28 10:59:29
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-10-28 15:40:11
 * @FilePath: \ocean-doctool\src\store\index.ts
 * @Description: 注释信息
 */
import { createStore } from 'vuex'
import exampleData from 'simple-mind-map/example/exampleData'
import { storeLocalConfig } from '@/views/mindmap/map-core/api'

const store = createStore({
    state: {
      mindMapData: null, // 思维导图数据
      isHandleLocalFile: false, // 是否操作的是本地文件
      localConfig: {
        // 本地配置
        isZenMode: false, // 是否是禅模式
        openNodeRichText: true, // 是否开启节点富文本
        useLeftKeySelectionRightKeyDrag: false // 鼠标行为
      },
      activeSidebar: '', // 当前显示的侧边栏
      isDark: false // 是否是暗黑模式
    },
    mutations: {
      /**
       * @Author: OceanGZY
       * @Desc: 设置思维导图数据
       */
      setMindMapData(state, data) {
        state.mindMapData = data
      },
      /**
       * @Author: OceanGZY
       * @Desc: 设置操作本地文件标志位
       */
      setIsHandleLocalFile(state, data) {
        state.isHandleLocalFile = data
      },
      /**
       * @Author: OceanGZY
       * @Desc: 设置本地配置
       */
      setLocalConfig(state, data) {
        state.localConfig = {
          ...state.localConfig,
          ...data
        }
        storeLocalConfig(state.localConfig)
      },
      /**
       * @Author: OceanGZY
       * @Desc: 设置当前显示的侧边栏
       */
      setActiveSidebar(state, data) {
        state.activeSidebar = data
      },
      /**
       * @Author: OceanGZY
       * @Desc: 设置暗黑模式
       */
      setIsDark(state, data) {
        state.isDark = data
      }
    },
    actions: {
      /**
       * @Author: OceanGZY
       * @Desc: 设置初始思维导图数据
       */
      getUserMindMapData(ctx) {
        try {
          let { data } = {
            data: {
              data: {
                mindMapData: exampleData
              }
            }
          }
          ctx.commit('setMindMapData', data.data)
        } catch (error) {
          console.log(error)
        }
      }
    }
  })
  
export default store