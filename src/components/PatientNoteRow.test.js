import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PatientNoteRow from './PatientNoteRow';

// Mock the functions passed as props
const mockOpenModal = jest.fn();
const mockHandleDeleteNote = jest.fn();

const sampleNote = {
  id: '1',
  patientName: 'John Doe',
  date: '2023-09-20',
  medicalObservations: 'Some medical observations',
};

describe('PatientNoteRow', () => {
  it('renders the patient note row correctly', () => {
    const { getByText } = render(
      <PatientNoteRow
        note={sampleNote}
        openModal={mockOpenModal}
        handleDeleteNote={mockHandleDeleteNote}
      />
    );

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('2023-09-20')).toBeInTheDocument();
    expect(getByText('Some medical observations')).toBeInTheDocument();
  });

  it('calls openModal when "Update" button is clicked', () => {
    const { getByText } = render(
      <PatientNoteRow
        note={sampleNote}
        openModal={mockOpenModal}
        handleDeleteNote={mockHandleDeleteNote}
      />
    );

    const updateButton = getByText('Update');
    fireEvent.click(updateButton);

    expect(mockOpenModal).toHaveBeenCalledWith(sampleNote);
  });

  it('calls handleDeleteNote when "Delete" button is clicked', () => {
    const { getByTestId } = render(
      <PatientNoteRow
        note={sampleNote}
        openModal={mockOpenModal}
        handleDeleteNote={mockHandleDeleteNote}
      />
    );

    const deleteButton = getByTestId('delete-button-1');
    fireEvent.click(deleteButton);

    expect(mockHandleDeleteNote).toHaveBeenCalledWith('1');
  });
});
