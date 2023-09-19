/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPatientNote = /* GraphQL */ `
  query GetPatientNote($id: ID!) {
    getPatientNote(id: $id) {
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
export const listPatientNotes = /* GraphQL */ `
  query ListPatientNotes(
    $filter: ModelPatientNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatientNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        patientName
        date
        medicalObservations
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
