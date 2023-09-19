/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePatientNote = /* GraphQL */ `
  subscription OnCreatePatientNote(
    $filter: ModelSubscriptionPatientNoteFilterInput
  ) {
    onCreatePatientNote(filter: $filter) {
      id
      patientName
      date
      medicalObservations
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePatientNote = /* GraphQL */ `
  subscription OnUpdatePatientNote(
    $filter: ModelSubscriptionPatientNoteFilterInput
  ) {
    onUpdatePatientNote(filter: $filter) {
      id
      patientName
      date
      medicalObservations
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePatientNote = /* GraphQL */ `
  subscription OnDeletePatientNote(
    $filter: ModelSubscriptionPatientNoteFilterInput
  ) {
    onDeletePatientNote(filter: $filter) {
      id
      patientName
      date
      medicalObservations
      createdAt
      updatedAt
      __typename
    }
  }
`;
