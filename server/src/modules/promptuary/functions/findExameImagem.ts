function buildListafindExameImagem(lista:any, titulo:any){
    let listaHda :any= []
	listaHda.push(titulo)
	for(let y = 0; y < lista.length; y++){
		if(lista[y].answer[0].valueBoolean){
			listaHda.push(lista[y].text)
			
		}else{null}
	}
	return listaHda
}

export function findExameImagem (recordType : any, fullResource :any):any {
	if(recordType === 'A'){
		if(fullResource.resource.resourceType === "QuestionnaireResponse"){
		let headerExameImagem:any
		let array:any = []
		let newList :any = []
		for(let i = 0; i < fullResource.resource.item.length ; i++ ){
				if (fullResource.resource.item[i].linkId.substring(0,12) ===  'exame_imagem'){
					headerExameImagem = fullResource.resource.item[i].text
					array = fullResource.resource.item[i].item
					newList.push(...buildListafindExameImagem(array,headerExameImagem))
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