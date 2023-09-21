import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import NoteCreation from './NoteCreation';
import { API, graphqlOperation } from 'aws-amplify';

// Mock the AWS Amplify API module
jest.mock('aws-amplify');

describe('NoteCreation', () => {
  it('handles form submission', async () => {
    // Mock the API.graphql method to resolve with a successful response
    API.graphql.mockResolvedValueOnce({
      data: {
        createPatientNote: {
          id: '1',
          patientName: 'John Doe',
          date: '2023-09-19', 
          medicalObservations: 'Sample note',
        },
      },
    });

    // Render the component
    const { getByPlaceholderText, getByText } = render(<NoteCreation />);

    // Fill out the form
    fireEvent.change(getByPlaceholderText('Patient Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(getByPlaceholderText('Date'), {
      target: { value: '2023-09-19' }, 
    });
    fireEvent.change(getByPlaceholderText('Medical Observations'), {
      target: { value: 'Sample note' },
    });

    // Expect the date input field value to be in YYYY-MM-DD format
    expect(getByPlaceholderText('Date').value).toBe('2023-09-19');
    expect(getByText('Create Note')).toBeInTheDocument();

    // Click the "Create Note" button
    fireEvent.click(getByText('Create Note'));

    await waitFor(() => {
      expect(API.graphql).toHaveBeenCalledWith(
        graphqlOperation(expect.stringContaining('CreatePatientNote'), {
          input: {
            patientName: 'John Doe',
            date: '2023-09-19', 
            medicalObservations: 'Sample note',
          },
        })
      );
    });
  });
});
