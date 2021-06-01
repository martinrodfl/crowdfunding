describe('selectCampaign', function () {
  var fn = require('../../usecases/select_campaign.js');

  var doubleSuccessCampaignByIdInput;
  var doubleSuccessCampaignByIdOutput;
  var doubleSuccessInput;
  var doubleSuccessUnselectedInput;

  function findCampaignByIdDoubleSuccess(input) {
    doubleSuccessCampaignByIdInput = input;
    doubleSuccessCampaignByIdOutput = { _id: Math.random() };
    return Promise.resolve(doubleSuccessCampaignByIdOutput);
  };

  function setCampaignSelectedDoubleSuccess(input) {
    doubleSuccessInput = input;
    return Promise.resolve();
  };

  function setCampaignUnselectedDoubleSuccess(input) {
    doubleSuccessUnselectedInput = input;
    return Promise.resolve();
  };

  function findAdminSessionDoubleNull() {
    return Promise.resolve(null);
  }

  function findCampaignByIdDoubleNull() {
    return Promise.resolve(null);
  }

  function findAdminSessionDoubleSuccess(params) {
    findAdminSessionDoubleSuccess.params = params;
    findAdminSessionDoubleSuccess.result = { adminId: Math.random() };
    return Promise.resolve(findAdminSessionDoubleSuccess.result);
  }

  it('calls findAdminSession and fails', function (done) {
    var deps = { findAdminSession: findAdminSessionDoubleNull };
    var input = {};
    fnLista = fn(deps);
    fnLista(input).catch(function (output) {
      expect(output).toEqual({ adminSession: 'NOT_FOUND' });
      done();
    })
  })

  it('calls findCampaignById and fails', function (done) {
    var deps = {
      findCampaignById: findCampaignByIdDoubleNull,
      findAdminSession: findAdminSessionDoubleSuccess
    };
    var input = { adminSessionId: Math.random() };

    fnLista = fn(deps);
    fnLista(input).catch(function (output) {
      expect(findAdminSessionDoubleSuccess.params).toBe(input.adminSessionId);
      expect(output).toEqual({ campaign: 'NOT_FOUND' });
      done();
    })
  })

  it('test all contracts', function (done) {

    var deps = {
      findAdminSession: findAdminSessionDoubleSuccess,
      findCampaignById: findCampaignByIdDoubleSuccess,
      setCampaignSelected: setCampaignSelectedDoubleSuccess,
      setCampaignsUnselected: setCampaignUnselectedDoubleSuccess
    }
    var input = {
      campaignId: Math.random(),
      adminSessionId: Math.random(),
    };
    fnLista = fn(deps);
    fnLista(input).then(function (output) {
      expect(findAdminSessionDoubleSuccess.params)
        .toBe(input.adminSessionId);
      expect(doubleSuccessCampaignByIdInput).toEqual({
        campaignId: input.campaignId,
        adminId: findAdminSessionDoubleSuccess.result.adminId,
      });
      expect(doubleSuccessInput).toEqual({
        campaignId: input.campaignId,
        adminId: findAdminSessionDoubleSuccess.result.adminId,
      });
      console.log('output', output)
      expect(output).toEqual({ campaign: doubleSuccessCampaignByIdOutput });
      done();
    });
  })
});