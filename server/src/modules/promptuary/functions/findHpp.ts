function buildListafindHpp(lista:any, titulo:any){
    let listaHpp :any= []
	listaHpp.push(titulo)
	for(let y = 0; y < lista.length; y++){
		if(lista[y].answer[0].valueBoolean){
			listaHpp.push(lista[y].text)
			
		}else{null}
	}
	return listaHpp
}

export function findHpp (recordType : any, fullResource :any):any {
	if(recordType === 'A'){
		if(fullResource.resource.resourceType === "QuestionnaireResponse"){
		let headerHpp:any
		let array:any = []
		let newList :any = []
		for(let i = 0; i < fullResource.resource.item.length ; i++ ){
				if (fullResource.resource.item[i].linkId.substring(0,3) ===  'hpp'){
					headerHpp = fullResource.resource.item[i].text
					array = fullResource.resource.item[i].item
					newList.push(...buildListafindHpp(array,headerHpp))
				}else{
					null
				}
			}
		return newList.toString()

	 }else{
		return null
	 }
	}else{
		return null
	}
	 
	
}