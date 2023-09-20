import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PatientNotes from './PatientNotes';
import { API, graphqlOperation } from 'aws-amplify';

// Mock the AWS Amplify API module
jest.mock('aws-amplify');

// Mock the react-toastify module to prevent toast notifications
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: jest.fn(),
}));

describe('PatientNotes', () => {
  it('fetches and displays patient notes', async () => {
    // Mock the API.graphql method to resolve with a list of patient notes
    API.graphql.mockResolvedValueOnce({
      data: {
        listPatientNotes: {
          items: [
            {
              id: '1',
              patientName: 'John Doe',
              date: '2023-09-19',
              medicalObservations: 'Sample note 1',
            },
            {
              id: '2',
              patientName: 'Jane Smith',
              date: '2023-09-20',
              medicalObservations: 'Sample note 2',
            },
          ],
        },
      },
    });

    // Render the component
    const { getByText } = render(<PatientNotes />);

    // Wait for the component to load
    await waitFor(() => {
      expect(getByText('John Doe')).toBeInTheDocument();
      expect(getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('handles note deletion', async () => {
    // Mock the API.graphql method for fetching patient notes
    API.graphql.mockResolvedValueOnce({
      data: {
        listPatientNotes: {
          items: [
            {
              id: '1',
              patientName: 'John Doe',
              date: '2023-09-19',
              medicalObservations: 'Sample note 1',
            },
          ],
        },
      },
    });

    // Render the component
    const { getByTestId, queryByText } = render(<PatientNotes />);

    // Wait for the component to load
    await waitFor(() => {
      expect(queryByText('John Doe')).toBeInTheDocument();
    });

    // Mock the API.graphql method for note deletion
    API.graphql.mockResolvedValueOnce({});

    // Click the "Delete" button
    fireEvent.click(getByTestId('delete-button-1'));

    // Wait for the component to re-fetch and render the updated data
    await waitFor(() => {
      // Assert that the note is no longer in the DOM
      expect(queryByText('John Doe')).not.toBeInTheDocument();
    });

    // Assert that the API.graphql method was called with the correct input
    expect(API.graphql).toHaveBeenCalledWith(
      graphqlOperation(expect.stringContaining('DeletePatientNote'), {
        input: { id: '1' },
      })
    );
  });



});
