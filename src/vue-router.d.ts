import { ComponentCustomProperties } from "vue";
import { RouteLocationNormalizedLoaded, Router } from "vue-router";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $router: Router;
    $route: RouteLocationNormalizedLoaded;
  }
}
