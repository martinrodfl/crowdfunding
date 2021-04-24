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
        <home-page></home-page>
        <campaigns-page></campaigns-page>
      </div>
    `
  });
}