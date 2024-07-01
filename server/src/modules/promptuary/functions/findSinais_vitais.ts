export function findSinais_vitais(recordType : any, fullResource :any):any {
	const listaSinais = {   "sinais_vitais_altura":'',
                        "sinais_vitais_data_nascimento" :""
                    
                    }
	if(recordType = 'A'){
        if(fullResource.resource.resourceType === "QuestionnaireResponse"){
            let newArray :any = []
            let valor
            for(let i = 0; i < fullResource.resource.item.length ; i++ ){
				if (fullResource.resource.item[i].linkId ===  'sinais_vitais.altura'){
                    //chave = fullResource.resource.item[i].linkId
                    valor = fullResource.resource.item[i].answer[0].valueDecimal
					listaSinais.sinais_vitais_altura = valor
                    
				}else if(fullResource.resource.item[i].linkId ===  'sinais_vitais.data_nascimento'){
                    valor =  fullResource.resource.item[i].answer[0].valueDate
                    listaSinais.sinais_vitais_data_nascimento = valor
					
				}else{
                    null
                }
			}
            return listaSinais
    }
    }else{
        return ' '
    }
    
} 

