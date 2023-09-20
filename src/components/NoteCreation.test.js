import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import NoteCreation from './NoteCreation';
import { ToastContainer, toast } from 'react-toastify';

// Mock the useNavigate function from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock the API.graphql method from aws-amplify
jest.mock('aws-amplify', () => ({
  API: {
    graphql: jest.fn(() => Promise.resolve()),
  },
}));

// Mock the toast methods from react-toastify
jest.mock('react-toastify', () => ({
  ...jest.requireActual('react-toastify'),
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('NoteCreation Component', () => {
  it('renders without errors', () => {
    const { getByText, getByPlaceholderText } = render(<NoteCreation />);
    
    // Check if the component renders without errors
    expect(getByText('Create Patient Note')).toBeInTheDocument();
    expect(getByPlaceholderText('Patient Full Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Date')).toBeInTheDocument();
    expect(getByPlaceholderText('Medical Observations')).toBeInTheDocument();
    expect(getByText('Create Note')).toBeInTheDocument();
  });


});
