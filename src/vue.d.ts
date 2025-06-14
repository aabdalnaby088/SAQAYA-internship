import type { DefineComponent } from 'vue';

declare module '*.vue' {
  const component: DefineComponent<object, object, unknown>;
  export default component;
}
