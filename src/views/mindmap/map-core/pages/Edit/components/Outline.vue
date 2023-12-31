<template>
  <Sidebar ref="sidebar" :title="$t('outline.title')">
    <el-tree class="outlineTree" :class="{ isDark: isDark }" :data="data" :props="defaultProps"
      :expand-on-click-node="false" default-expand-all>
      <template #default="{ node }">
        <span class="customNode" @click="onClick($event, node)">
          <span class="nodeEdit" :key="getKey()" contenteditable="true" @keydown.stop="onKeydown($event, node)"
            @keyup.stop @blur="onBlur($event, node)" v-html="node.label"></span>
        </span>
      </template>
    </el-tree>
  </Sidebar>
</template>

<script setup>
/**
 * @Author: OceanGZY
 * @Desc: 大纲内容
 */
import { onMounted, ref, watch, computed } from 'vue'
import Sidebar from './Sidebar'
import { mapState, useStore } from 'vuex'
import bus from '@/views/mindmap/map-core/utils/bus.js'

const props = defineProps({
  mindMap: {
    type: Object
  }
})

const store = useStore()
const sidebar = ref(null)
const data = ref([])
const defaultProps = ref({
  label(data) {
    return data.data.richText ? data.data.text : data.data.text.replaceAll(/\n/g, '</br>')
  }
})
const notHandleDataChange = ref(false)

const activeSidebar = computed(() => store.state.activeSidebar)
const isDark = computed(() => store.state.isDark)

watch(
  () => activeSidebar.value,
  val => {
    if (val === 'outline') {
      sidebar.value.show = true
    } else {
      sidebar.value.show = false
    }
  }
)

onMounted(() => {
  bus.on('data_change', data2 => {
    // 激活节点会让当前大纲失去焦点
    if (notHandleDataChange.value) {
      notHandleDataChange.value = false
      return
    }
    data.value = [props.mindMap.renderer.renderTree]
  })
})

const onBlur = (e, node) => {
  const richText = node.data.data.richText
  if (richText) {
    node.data._node.setText(e.target.innerHTML, true)
  } else {
    node.data._node.setText(e.target.innerText)
  }
}

const getKey = () => {
  return Math.random()
}

const onKeydown = (e, node) => {
  if (e.keyCode === 13 && !e.shiftKey) {
    e.preventDefault()
    insertNode()
  }
  if (e.keyCode === 9) {
    e.preventDefault()
    insertChildNode()
  }
}

// 插入兄弟节点
const insertNode = () => {
  notHandleDataChange.value = false
  props.mindMap.execCommand('INSERT_NODE', false)
}

// 插入下级节点
const insertChildNode = () => {
  notHandleDataChange.value = false
  props.mindMap.execCommand('INSERT_CHILD_NODE', false)
}

// 激活当前节点且移动当前节点到画布中间
const onClick = (e, node) => {
  notHandleDataChange.value = true
  let targetNode = node.data._node
  if (targetNode && targetNode.nodeData.data.isActive) return
  props.mindMap.execCommand('GO_TARGET_NODE', node.data.data.uid)
}
</script>

<style lang="less" scoped>
.customNode {
  width: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 7px;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  &::-webkit-scrollbar-track {
    box-shadow: none;
    background: transparent;
    display: none;
  }

  .nodeEdit {
    outline: none;
  }
}

.outlineTree {
  &.isDark {
    background-color: #262a2e;
  }

  :deep(.el-tree-node__content) {
    height: auto;
    margin: 5px 0;

    .el-tree-node__expand-icon.is-leaf {
      position: relative;

      &::after {
        position: absolute;
        content: '';
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #c0c4cc;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
