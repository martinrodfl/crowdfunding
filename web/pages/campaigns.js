function campaignsPage(usecases) {
  Vue.component('campaigns-page', {
    data: function () {
      return {
        campaigns: []
      };
    },

    mounted: function () {
      watchEvent('campaignsObtained', this.onCampaignsObtained);
      usecases.getCampaigns({});
    },

    methods: {
      onCampaignsObtained: function (event) {
        this.campaigns = event.data.campaigns;
      }
    },

    template: `
      <div>
        <h1>Campaigns ({{campaigns.length}})</h1>
        <campaigns-list></campaigns-list>
      </div>
    `
  });
}