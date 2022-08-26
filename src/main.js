import { createApp } from 'vue';
import App from './App.vue';
import components from '@/components/UI';
import router from '@/router/router';
import store from '@/store';
import PrimeVue from 'primevue/config';
import componentsPrime from '@/components/PrimeVue';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(PrimeVue);
componentsPrime.forEach(componentPrime => {
  app.component('Prime' + componentPrime.name, componentPrime);
});
components.forEach(component => {
  app.component(component.name, component);
});
app.use(router).use(store).mount('#app');
