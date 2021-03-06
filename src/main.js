import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.config.productionTip = false;


new Vue({
    store,
    vuetify: new Vuetify(),
    render: (h) => h(App),
}).$mount("#app");