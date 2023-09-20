import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import NoteCreation from './NoteCreation';
import { API, graphqlOperation } from 'aws-amplify';

// Mock the AWS Amplify API module
jest.mock('aws-amplify');

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

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

    // Mock the navigate function
    const navigate = jest.fn();

    // Replace the mock for useNavigate
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

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

    expect(getByText('Create Note')).toBeInTheDocument()
    // Click the "Create Note" button
    fireEvent.click(getByText('Create Note'));

    // Wait for the component to re-fetch and render the data
    await waitFor(() => {
      // Assert that the success message is displayed
      console.log('testing')
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
