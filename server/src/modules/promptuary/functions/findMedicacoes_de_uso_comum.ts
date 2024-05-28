export function findMedicacoes_de_uso_comum (recordType : any, fullResource :any):any {
	if(recordType === 'A'){
		if(fullResource.resource.resourceType === "QuestionnaireResponse"){
		let listaHda:any= []
		for(let i = 0; i < fullResource.resource.item.length ; i++ ){
				if (fullResource.resource.item[i].linkId.substring(0,23) ===  'medicacoes_de_uso_comum'){
					listaHda.push(fullResource.resource.item[i].text) 
				}else{
					null
				}
			}
		return listaHda
		//return fullResource.resource.item[1]
	 }else{
		return null
	 }
	}else{
		return null
	}
	 
	
}