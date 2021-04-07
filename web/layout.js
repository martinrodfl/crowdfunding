function layout(usecases) {
  Vue.component('layout', {
    data: function () {
      return {
        loggedIn: true
      };
    },

    methods: {
      onAdminSessionRemoved: function (event) {
        this.loggedIn = false;
      }
    },

    mounted: function () {
      watchEvent('adminSessionRemoved', this.onAdminSessionRemoved);
    },

    template: `
      <div id="layout">
        <p v-show="!loggedIn">Gracias por venir!</p>
        <home-page v-show="loggedIn"></home-page>
      </div>
    `
  });
}