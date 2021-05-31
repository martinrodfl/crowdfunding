describe('selectCampaign', function () {

    var fn = require('../../usecases/select_campaign.js');

    var doubleSuccessCampaignByIdInput;
    var doubleSuccessCampaignByIdOutput;

    var doubleSuccessInput;
    var doubleSuccessUnselectedInput;
    
    function findAdminSessionDoubleSuccess(params) {
        findAdminSessionDoubleSuccess.params = params;
        findAdminSessionDoubleSuccess.result = { adminId: Math.random() };
        return Promise.resolve(findAdminSessionDoubleSuccess.result);
    }

    function findAdminSessionDoubleNull() {
        return Promise.resolve(null);
    }

    function findCampaignByIdDoubleSuccess(input) {
        doubleSuccessCampaignByIdInput = input;
        doubleSuccessCampaignByIdOutput = { campaign: Math.random() };
        return Promise.resolve(doubleSuccessCampaignByIdOutput)
    }

    function findCampaignByIdDoubleNull() {
        return Promise.resolve(null);
    }


    function setCampaignSelectedDoubleSuccess(input) {
        doubleSuccessInput = input;
        return Promise.resolve();
    }

    function setCampaignsUnselectedDoubleSuccess(input) {
        doubleSuccessUnselectedInput = input;
        return Promise.resolve();
    }

    it('calls findAdminSession and fails to find adminSession', function (done) {

        var deps = { findAdminSession: findAdminSessionDoubleNull };
        var input = {};

        fnLista = fn(deps);
        fnLista(input).catch(function (output) {
            expect(output).toEqual({ adminSession: 'NOT_FOUND' });
            done();
        })

    })

    it('calls findCampaignById and fails to find campaignId', function (done) {

        var deps = {
            findCampaignById: findCampaignByIdDoubleNull,
            findAdminSession: findAdminSessionDoubleSuccess
        }

        var input = {adminSessionId: Math.random() };

        fnLista = fn(deps);
        fnLista(input).catch(function (output) {
            expect(findAdminSessionDoubleSuccess.params).toEqual(input.adminSessionId);
            expect(output).toEqual({ campaign: 'NOT_FOUND' });
            done();
        })
    })

    it('test all contracts', function (done) {

        var deps = {
            findAdminSession: findAdminSessionDoubleSuccess,
            findCampaignById: findCampaignByIdDoubleSuccess,
            setCampaignSelected: setCampaignSelectedDoubleSuccess,
            setCampaignsUnselected: setCampaignsUnselectedDoubleSuccess
        }
        
        var input = {
            adminSessionId: Math.random(),
            campaignId: Math.random(),
        }
        fnLista = fn(deps);
        fnLista(input).then(function (output) {
            expect(findAdminSessionDoubleSuccess.params).toBe(input.adminSessionId);
            expect(doubleSuccessCampaignByIdInput).toEqual({
                campaignId: input.campaignId,
                adminId: findAdminSessionDoubleSuccess.result.adminId
                })
            expect(doubleSuccessInput).toEqual({
                campaignId: input.campaignId,
                adminId: findAdminSessionDoubleSuccess.result.adminId
                })
            expect(output.campaign).toEqual({campaign: doubleSuccessCampaignByIdOutput.campaign })
            done();
        })
    })
})