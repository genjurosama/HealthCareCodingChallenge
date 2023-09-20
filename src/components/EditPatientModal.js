import React, { useState } from 'react';
import Modal from 'react-modal';
import { API, graphqlOperation } from 'aws-amplify';
import { updatePatientNote } from '../graphql/mutations';
import { ToastContainer, toast } from 'react-toastify';
import { useFormValidation } from './UseFormValidation'; // Import your custom hook

function EditPatientModal({ isOpen, onRequestClose, noteData, fetchNotes }) {
  const [updatedNoteData, setUpdatedNoteData] = useState({
    id: noteData.id,
    patientName: noteData.patientName,
    date: noteData.date,
    medicalObservations: noteData.medicalObservations,
  });

  const customModalStyles = {
    content: {
      width: '50%',
      height: 'auto',
      margin: 'auto',
    },
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedNoteData({
      ...updatedNoteData,
      [name]: value,
    });
  };

  // Use the useFormValidation hook to handle form validation
  const validationErrors = useFormValidation(
    updatedNoteData.patientName,
    updatedNoteData.date,
    updatedNoteData.medicalObservations
  );

  const handleUpdatePatientNote = async () => {
    // Check if there are validation errors before proceeding
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => {
        toast.error(error);
      });
      return;
    }

    try {
      const response = await API.graphql(
        graphqlOperation(updatePatientNote, { input: updatedNoteData })
      );
      toast.success('Note Updated Successfully');
      fetchNotes();
      onRequestClose();
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  return (
    <Modal
      style={customModalStyles}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Patient Note Modal"
    >
      <ToastContainer />
      <h2>Edit Patient Information</h2>
      <form>
        <div>
          <label htmlFor="patientName">Full Name</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={updatedNoteData.patientName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={updatedNoteData.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="medicalObservations">Medical Observations</label>
          <textarea
            id="medicalObservations"
            name="medicalObservations"
            value={updatedNoteData.medicalObservations}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleUpdatePatientNote}>
          Update
        </button>

        <button type="button" onClick={onRequestClose}>
          Close
        </button>
      </form>
    </Modal>
  );
}

export default EditPatientModal;
