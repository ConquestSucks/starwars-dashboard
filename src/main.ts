import './styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { CustomPreset } from './config/primeVuePreset';
import { Button, Card, Menu, Select } from 'primevue';

import PrimeVue from 'primevue/config';
import App from './App.vue'
import Chart from 'primevue/chart';

const app = createApp(App)

app.use(createPinia());
app.use(PrimeVue, { unstyled: true, pt: CustomPreset });

app.component("CustomSelect", Select);
app.component("CustomButton", Button);
app.component("CustomMenu", Menu);
app.component("CustomCard", Card);
app.component("CustomChart", Chart);

app.mount('#app')
