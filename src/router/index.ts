/*
 * @Author: OCEAN.GZY
 * @Date: 2023-10-22 23:28:09
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-10-28 15:33:21
 * @FilePath: \ocean-doctool\src\router\index.ts
 * @Description: 注释信息
 */
import { createRouter, createWebHashHistory } from "vue-router"
import MindFlow from "../views/mindflow/MF.vue"
import MindMap from "../views/mindmap/MM.vue"
import MindPPT from "../views/mindppt/MP.vue"
import Home from '../views/home/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/mindflow',
        name: 'MindFlow',
        component: MindFlow
    },
    {
        path: '/mindmap',
        name: 'MindMap',
        component: MindMap
    },
    {
        path: '/mindppt',
        name: 'MindPPT',
        component: MindPPT
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

export default router