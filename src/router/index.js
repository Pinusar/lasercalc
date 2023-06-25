import {createRouter, createWebHashHistory} from 'vue-router'
import LaserCalculation from "@/components/LaserCalculation.vue";


export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: LaserCalculation, name: 'Home' },
        { path: '/calc', component: LaserCalculation },
    ]
})