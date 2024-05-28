// export function findProcedureCode(fullResource) {
//   if (
//     fullResource &&
//     fullResource.resource &&
//     fullResource.resource.resourceType === 'ServiceRequest' &&
//     fullResource.resource.category &&
//     fullResource.resource.category.length > 0 &&
//     fullResource.resource.category[0].coding &&
//     fullResource.resource.category[0].coding.length > 0 &&
//     fullResource.resource.category[0].coding[0].code
//   ) {
//     const resourceCod = fullResource.resource.category[0].coding[0].code
//     return resourceCod
//   }
//   return 'null'
// }

export function findProcedureCode(fullResource, recordType) {
  if (recordType === 'E') {
    const resourceCod =
      fullResource.resource.category[0]?.coding[0]?.code ?? 'null'
    return resourceCod
  }

  if (recordType === 'P') {
    const resourceCod = fullResource.resource.code?.coding[0]?.code ?? 'null'
    return resourceCod
  }

  return 'null'
}
