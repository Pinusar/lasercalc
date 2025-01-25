import {createApp} from 'vue'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from "@/router";
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap';
import '@fortawesome/fontawesome-free';

import {library} from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

/* import specific iconss */
import {
    faBell,
    faChartArea,
    faCogs,
    faDownload,
    faEnvelope,
    faFolder,
    faLaughWink,
    faList,
    faSearch,
    faTable,
    faTachometerAlt,
    faUser,
    faUserSecret,
    faWrench
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faEnvelope, faUser, faCogs, faList, faSearch, faBell, faLaughWink, faTachometerAlt, faWrench, faFolder, faChartArea, faTable, faDownload)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .use(Toast)
    .use(pinia)
    .mount('#app')
