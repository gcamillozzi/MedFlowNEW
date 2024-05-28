function findConduta_medica(recordType : any, fullResource :any):any {
	if(recordType === 'D'){
		if(fullResource.resource.resourceType === "PlanDefinition"){
		let listaCondutaMedica:any= []
		for(let i = 0; i < fullResource.resource.action.length ; i++ ){
				if (fullResource.resource.action[i].linkId.substring(0,14) ===  'Conduta Médica'){
					 listaCondutaMedica.push(fullResource.resource.action[i].description)
					  //fullResource.resource.action[i].description
				}else{
					null
				}
			}
		return JSON.stringify(listaCondutaMedica)
		//return fullResource.resource.item[1]
	 }else{
		return null
	 }
	}else{
		return null
	}
	 
	
}