export function findAntecedentes_pessoais(recordType : any, fullResource :any):any {
	if(recordType === 'A'){
		if(fullResource.resource.resourceType === "QuestionnaireResponse"){
		let listaAntecedentes:any= []
		for(let i = 0; i < fullResource.resource.item.length ; i++ ){
				if (fullResource.resource.item[i].linkId.substring(0,21) ===  'antecedentes_pessoais'){
					listaAntecedentes.push(fullResource.resource.item[i].text)
				}else{
					null
				}
			}
		return  JSON.stringify(listaAntecedentes)
	 }else{
		return null
	 }
	}else{
		return null
	}
	 
	
}