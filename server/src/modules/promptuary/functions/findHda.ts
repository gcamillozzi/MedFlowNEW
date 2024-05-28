export function findHda (recordType : any, fullResource :any):any {
	if(recordType === 'A'){
		if(fullResource.resource.resourceType === "QuestionnaireResponse"){
		let listaHda :any= []
		for(let i = 0; i < fullResource.resource.item.length ; i++ ){
				if (fullResource.resource.item[i].linkId.substring(0,3) ===  'hda'){
					listaHda.push(fullResource.resource.item[i].text) 
				}else{
					null
				}
			}
		return JSON.stringify(listaHda)
		//return fullResource.resource.item[1]
	 }else{
		return null
	 }
	}else{
		return null
	}
	 
	
}