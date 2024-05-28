function findAttendance(bundleBody): any {
  return bundleBody.entry.find(
    (item) => item.resource.resourceType === 'Encounter',
  )
}

export { findAttendance }
