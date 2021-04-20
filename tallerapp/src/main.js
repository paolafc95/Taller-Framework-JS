import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import store from './store'
import routes from './plugins/router'
import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAqSbbh6DKYxV1z_gGkSRXtFnjt75PIfE0",
  authDomain: "tallerappjs.firebaseapp.com",
  projectId: "tallerappjs",
  storageBucket: "tallerappjs.appspot.com",
  messagingSenderId: "352390480240",
  appId: "1:352390480240:web:c3099b17857377c5c78fb5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();


Vue.config.productionTip = false
const router = new VueRouter ({routes});

Vue.use(VueRouter);
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
