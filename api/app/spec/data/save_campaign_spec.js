describe('saves campaign', function(){
    var fn = require('../../data/save_campaign.js')

    //PRECONDICION (simulamos el contrato de la funcion)
    function saveCampaignDoubleSucces(params){
        //console.log('SE LLAMO A LA DEPENDENCIA CON ', params);
        saveCampaignDoubleSucces.params = params;
        saveCampaignDoubleSucces.result = { _id: Math.random() };
        /*return new Promise(function(resolve){
            setTimeout(function(){
                resolve(saveCampaignDoubleSucces.result)},1000);//SIMULO CONSULTA A BASE DE DATOS
            })*/
        return Promise.resolve(saveCampaignDoubleSucces.result);   
        }

    it('calls saveCampaign function', function(done){
        
        //EJECUCION
        var deps = { saveCampaign: saveCampaignDoubleSucces };/*INYECCION DE DEPENDENCIAS */
        //var fnLista = fn(deps);/*INYECCION DE DEPENDENCIAS */
        
        var input = {
            adminSession: {
                adminId: Math.random(),
            },
            newCampaign: {
                name: Math.random(),
                description: Math.random(),
            }
        };
        fn(deps)(input).then(function(output) {
            //VALIDACION
            expect(output).toBe(input);
            expect(saveCampaignDoubleSucces.params).toEqual({
                name: input.newCampaign.name,
                description: input.newCampaign.description,
                adminId: input.adminSession.adminId,
            });
            expect(output.campaign).toEqual(saveCampaignDoubleSucces.result);
            done();
        })
            
    });
});