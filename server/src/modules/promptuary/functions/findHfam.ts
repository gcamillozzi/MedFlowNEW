export function findHfam(recordType : any, fullResource :any):any {
	if(recordType === 'A'){
		if(fullResource.resource.resourceType === "QuestionnaireResponse"){
		let liastaHfam:any=[]
		for(let i = 0; i < fullResource.resource.item.length ; i++ ){
				if (fullResource.resource.item[i].linkId.substring(0,4) ===  'hfam'){
					liastaHfam.push(fullResource.resource.item[i].text) 
				}else{
					null
				}
			}
		return JSON.stringify(liastaHfam)
	 }else{
		return null
	 }
	}else{
		return null
	}
	 
	
}