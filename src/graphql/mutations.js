/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPatientNote = /* GraphQL */ `
  mutation CreatePatientNote(
    $input: CreatePatientNoteInput!
    $condition: ModelPatientNoteConditionInput
  ) {
    createPatientNote(input: $input, condition: $condition) {
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
export const updatePatientNote = /* GraphQL */ `
  mutation UpdatePatientNote(
    $input: UpdatePatientNoteInput!
    $condition: ModelPatientNoteConditionInput
  ) {
    updatePatientNote(input: $input, condition: $condition) {
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
export const deletePatientNote = /* GraphQL */ `
  mutation DeletePatientNote(
    $input: DeletePatientNoteInput!
    $condition: ModelPatientNoteConditionInput
  ) {
    deletePatientNote(input: $input, condition: $condition) {
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
