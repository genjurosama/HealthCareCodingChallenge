import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()
import { API } from 'aws-amplify';
import PatientNotes from './PatientNotes';

// Mocking API calls
jest.mock('aws-amplify');

// Mocked data for testing
const mockNotesData = {
  data: {
    listPatientNotes: {
      items: [
        {
          id: '1',
          patientName: 'John Doe',
          date: '2023-09-20',
          medicalObservations: 'Some observations',
        },
        // Add more mock notes as needed
      ],
    },
  },
};

describe('PatientNotes Component', () => {
  beforeEach(() => {
    // Reset the mock implementation for each test
    API.graphql.mockReset();
  });

  it('renders the component with data', async () => {
    // Mocking the API response
    API.graphql.mockResolvedValueOnce(mockNotesData);
  
    const { getByText } = render(<PatientNotes />);
  
    // Wait for the component to fetch and render the data
    await waitFor(() => {
      expect(getByText('John Doe')).toBeInTheDocument();
      expect(getByText('2023-09-20')).toBeInTheDocument();
      expect(getByText('Some observations')).toBeInTheDocument();
    });
  });
  

 

  

  // Add more test cases for interactions, such as opening the modal, etc.
});
