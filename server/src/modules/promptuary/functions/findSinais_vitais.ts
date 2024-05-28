export function findSinais_vitais(recordType : any, fullResource :any):any {
	if(recordType === 'A'){
		if(fullResource.resource.resourceType === "QuestionnaireResponse"){
		for(let i = 0; i < fullResource.resource.item.length ; i++ ){
				if (fullResource.resource.item[i].linkId.substring(0,6) ===  'sinais_vitais'){
					return fullResource.resource.item[i].text
				}else{
					null
				}
			}
		//return fullResource.resource.item[1]
	 }else{
		return null
	 }
	}else{
		return null
	}
	 
	
}