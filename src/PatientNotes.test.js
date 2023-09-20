import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import PatientNotes from './PatientNotes';
import * as Amplify from 'aws-amplify'; // Mock Amplify functions
import { MemoryRouter } from 'react-router-dom'; // Mock React Router

// Mock Amplify's API category
const mockGraphQL = jest.fn();
Amplify.API = {
  graphql: mockGraphQL,
};

describe('PatientNotes Component', () => {
  beforeEach(() => {
    // Clear any previous mock implementation calls
    mockGraphQL.mockClear();
  });

  it('renders without errors', () => {
    const { getByText: getByTextMock } = render(
      <MemoryRouter>
        <PatientNotes />
      </MemoryRouter>
    );

    expect(getByTextMock('Patient Notes')).toBeInTheDocument();
  });

  it('fetches and displays patient notes', async () => {
    // Mock the response data from the API
    const mockResponse = {
      data: {
        listPatientNotes: {
          items: [
            {
              id: '1',
              patientName: 'John Doe',
              date: '2023-09-20',
              medicalObservations: 'Sample observations',
            },
          ],
        },
      },
    };

    // Mock Amplify's API.graphql to return the mock response
    mockGraphQL.mockResolvedValueOnce(mockResponse);

    const { getByText: getByTextMock } = render(
      <MemoryRouter>
        <PatientNotes />
      </MemoryRouter>
    );

    // Wait for the component to fetch and render patient notes
    await waitFor(() => {
      expect(getByTextMock('John Doe')).toBeInTheDocument();
      expect(getByTextMock('2023-09-20')).toBeInTheDocument();
      expect(getByTextMock('Sample observations')).toBeInTheDocument();
    });
  });

  

  // Add more test cases for other component behavior as needed
});
