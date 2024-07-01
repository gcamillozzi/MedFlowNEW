function buildListaHda(lista:any, titulo:any){
    let listaHda :any= []
	listaHda.push(titulo)
	for(let y = 0; y < lista.length; y++){
		if(lista[y].answer[0].valueBoolean){
			listaHda.push(lista[y].text)
			
		}else{null}
	}
	return listaHda
}

export function findHda (recordType : any, fullResource :any):any {
	if(recordType === 'A'){
		if(fullResource.resource.resourceType === "QuestionnaireResponse"){
		let had:any
		let array:any = []
		let newList :any = []
		for(let i = 0; i < fullResource.resource.item.length ; i++ ){
				if (fullResource.resource.item[i].linkId.substring(0,3) ===  'hda'){
					had = fullResource.resource.item[i].text
					array = fullResource.resource.item[i].item
					newList.push(...buildListaHda(array,had))
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