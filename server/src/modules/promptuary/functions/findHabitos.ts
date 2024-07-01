export function findHabitos (recordType : any, fullResource :any):any {
	if(recordType === 'A'){
		if(fullResource.resource.resourceType === "QuestionnaireResponse"){
		let listaHabitos:any = []
		for(let i = 0; i < fullResource.resource.item.length ; i++ ){
				if (fullResource.resource.item[i].linkId.substring(0,7) ===  'habitos'){
					listaHabitos.push(fullResource.resource.item[i].text)
                    for (let x = 0; x < fullResource.resource.item[i].item.length;x++){
                        listaHabitos.push(fullResource.resource.item[i].item[x].text)
                    }
				}else{
					null
				}
			}
		return  JSON.stringify(listaHabitos)
	 }else{
		return null
	 }
	}else{
		return null
	}
	 
	
}