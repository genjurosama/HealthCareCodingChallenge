// PatientNoteRow.js (Child Component)
import React from 'react';

function PatientNoteRow({ note, openModal, handleDeleteNote }) {
  return (
    <tr key={note.id}>
      <td>{note.patientName}</td>
      <td>{note.date}</td>
      <td>{note.medicalObservations}</td>
      <td>
        <button className='edit-button' onClick={() => openModal(note)}>
          Update
        </button>
        <button
          className='edit-button'
          data-testid={`delete-button-${note.id}`}
          onClick={() => handleDeleteNote(note.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default PatientNoteRow;
