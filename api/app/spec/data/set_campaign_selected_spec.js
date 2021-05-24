describe('setCampaignSelected',function(){
    var fn = require('../../data/set_campaign_selected.js')
    var doubleSuccessInput;
    var doubleSuccessOutput;

    function setCampaignSelectedDoubleSuccess(input) {
        doubleSuccessInput = input;
        doubleSuccessOutput = doubleSuccessInput;
        return Promise.resolve(doubleSuccessOutput);
      };

    it('sets campaign selected active',function(done){
        var deps = { setCampaignSelected: setCampaignSelectedDoubleSuccess };
        
        var input = {
            campaignId: Math.random(),
            adminSession: {adminId: Math.random()},
            active: false
        }
        var fnLista = fn(deps);
        fnLista(input).then(function (output){
            expect(output).toBe(input);
            expect(doubleSuccessInput).toEqual({
                campaignId: input.campaignId,
                adminSession: input.adminSession.adminId,
                active: !input.active
              });
            done();
        }) 
    })



    it('sets campaign unselected inactive')
})