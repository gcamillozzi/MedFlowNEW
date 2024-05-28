export function findAlergias (recordType : any, fullResource :any):any {
	if(recordType === 'A'){
		if(fullResource.resource.resourceType === "QuestionnaireResponse"){
		let listaAlergias:any= []
		for(let i = 0; i < fullResource.resource.item.length ; i++ ){
				if (fullResource.resource.item[i].linkId.substring(0,8) ===  'alergias'){
					listaAlergias.push(fullResource.resource.item[i].text) 
				}else{
					null
				}
			}
		return JSON.stringify(listaAlergias)
		//return fullResource.resource.item[1]
	 }else{
		return null
	 }
	}else{
		return null
	}
	 
	
}