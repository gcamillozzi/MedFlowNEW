function findDoctor(bundleBody, fullResource): any {
  const resourceDoctorUuid = fullResource.resource.requester.reference

  const doctorRole = bundleBody.entry.find(
    (item) => item.fullUrl === resourceDoctorUuid,
  )

  const doctor = bundleBody.entry.find(
    (item) => item.fullUrl === doctorRole.resource.practitioner.reference,
  )

  if (!doctor) {
    const practitioner = bundleBody.entry.find(
      (item) => item.resource.resourceType === 'Practitioner',
    )

    return practitioner
  }

  return doctor
}

export { findDoctor }
