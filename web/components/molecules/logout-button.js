function logoutButton(usecases) {
  Vue.component('logout-button', {
    methods: {
      logout: function () {
        usecases.removeAdminSession({});
      }
    },
    template: `
      <generic-button
        v-bind:click="logout"
        v-bind:text="'Logout'">
      </generic-button>
    `
  });
}