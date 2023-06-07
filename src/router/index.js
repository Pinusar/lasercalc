import {createRouter, createWebHashHistory} from 'vue-router'
import HomePage from './../components/HomePage.vue'
import LaserCalculation from "@/components/LaserCalculation.vue";


export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: HomePage, name: 'Home' },
        { path: '/calc', component: LaserCalculation },
    ]
})