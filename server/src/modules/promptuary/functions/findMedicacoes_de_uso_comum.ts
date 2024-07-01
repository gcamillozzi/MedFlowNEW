function buildListafindMedicacoes_de_uso_comum(lista:any, titulo:any){
    let listaHda :any= []
	listaHda.push(titulo)
	for(let y = 0; y < lista.length; y++){
		if(lista[y].answer[0].valueBoolean){
			listaHda.push(lista[y].text)
			
		}else{null}
	}
	return listaHda
}

export function findMedicacoes_de_uso_comum (recordType : any, fullResource :any):any {
	if(recordType === 'A'){
		if(fullResource.resource.resourceType === "QuestionnaireResponse"){
			let headerLab:any =''
			let objetos :any
			let resultLab:any =''
			let resultado :any=''
			let newList :any = []
			for(let i = 0; i < fullResource.resource.item.length ; i++ ){
				if(fullResource.resource.item[i].linkId.substring(0,'medicacoes_de_uso_comum'.length) == 'medicacoes_de_uso_comum'){
					headerLab = fullResource.resource.item[i].text
					newList.push(headerLab)
					for(let r = 0;r < fullResource.resource.item[i].answer.length; r++){
						objetos = fullResource.resource.item[i].answer[r]
						resultLab = Object.values(objetos)
						resultado = resultLab+"\n"
						newList.push(resultado)

					}

				}else{null}
				 
				 
			}return newList.toString().replace(':,',': ').replace(',-','-').replace(':,',': ')


		}else{
		return null
	 	}
	}else{
		return null
	}
	 
	
}
