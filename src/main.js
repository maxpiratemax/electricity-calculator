import { createApp } from "vue";
import App from "./App.vue";
import GStore from "./store";
import VFocus from "@/Directives/VFocus.vue";

const app = createApp(App);

app.directive("focus", VFocus).provide("GStore", GStore).mount("#app");
