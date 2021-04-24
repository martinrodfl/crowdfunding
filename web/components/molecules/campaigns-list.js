function campaignsList() {
  Vue.component('campaigns-list', {
    data: function () {
      return {
        campaigns: []
      }
    },

    mounted: function () {
      watchEvent('campaignsObtained', this.onCampaignsObtained);
    },

    methods: {
      onCampaignsObtained: function (event) {
        this.campaigns = event.data.campaigns;
      }
    },

    template: `
      <div>
        <div class="campaign" v-for="campaign in campaigns">
          <p>{{campaign.name}}</p>
        </div>
      </div>
    `
  });
}