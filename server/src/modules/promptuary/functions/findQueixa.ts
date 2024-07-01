function findQueixav2 (recordType : any, fullResource :any):any {
	if(recordType === 'A'){
		if(fullResource.resource.resourceType === "QuestionnaireResponse"){
		let listaQueixa:any= []
		
		for(let i = 0; i < fullResource.resource.item.length ; i++ ){
				if (fullResource.resource.item[i].linkId.substring(0,19) ===  'complemento_queixas'){
					return `${fullResource.resource.item[i].text} ${fullResource.resource.item[i].answer[0].valueString}`
				}else{
					null
				}
			}
	 }else{
		return null
	 }
	}else{
		return null
	}
	 

}


function buildListafindQueixa(lista:any, titulo:any){
    let listaHda :any= []
	listaHda.push(titulo)
	for(let y = 0; y < lista.length; y++){
		if(lista[y].answer[0].valueBoolean){
			listaHda.push(lista[y].text)
			
		}else{null}
	}
	return listaHda
}

export function findQueixa (recordType : any, fullResource :any):any {
	if(recordType === 'A'){
		let complemento_quixa :any = findQueixav2(recordType,fullResource)
		if(fullResource.resource.resourceType === "QuestionnaireResponse"){
		let headerQueixa:any
		let array:any = []
		let newList :any = []
		for(let i = 0; i < fullResource.resource.item.length ; i++ ){
				if (fullResource.resource.item[i].linkId.substring(0,6) ===  'queixa'){
					headerQueixa = fullResource.resource.item[i].text
					array = fullResource.resource.item[i].item
					newList.push(...buildListafindQueixa(array,headerQueixa))
				}else{
					null
				}
			}
		newList.push(complemento_quixa)
		return newList.toString()

	 }else{
		return null
	 }
	}else{
		return null
	}
	 
	
}







