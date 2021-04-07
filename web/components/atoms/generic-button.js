Vue.component('generic-button', {
  props: [
    'text',
    'click'
  ],
  template: `
    <button
        v-on:click="click"
        class="generic-button">
      {{text}}
    </button>
  `
});