export function findDiagnostico (recordType : any, fullResource :any):any {
	if(recordType === 'A'){
		if(fullResource.resource.resourceType === "QuestionnaireResponse"){
		let listaDiag:any= []
		for(let i = 0; i < fullResource.resource.item.length ; i++ ){
				if (fullResource.resource.item[i].linkId.substring(0,11) ===  'diagnostico'){
					listaDiag.push(fullResource.resource.item[i].text) 
				}else{
					null
				}
			}
		return JSON.stringify(listaDiag)
		//return fullResource.resource.item[1]
	 }else{
		return null
	 }
	}else{
		return null
	}
	 
	
}