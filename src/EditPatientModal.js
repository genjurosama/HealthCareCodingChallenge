import React, { useState } from 'react';
import Modal from 'react-modal';
import { API, graphqlOperation } from 'aws-amplify';
import { updatePatientNote } from './graphql/mutations'; // Import your GraphQL mutation


function EditPatientModal({ isOpen, onRequestClose, noteData,fetchNotes }) {
  console.log('note data:',noteData)
    const [updatedNoteData, setUpdatedNoteData] = useState({
      // Initialize with existing patient data
      id: noteData.id,
      patientName: noteData.patientName,
      date: noteData.date,
      medicalObservations: noteData.medicalObservations,
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUpdatedNoteData({
        ...updatedNoteData,
        [name]: value,
      });
    };
  
    const handleUpdatePatientNote = async () => {
      try {
        // Perform the GraphQL mutation to update the patient data
        console.log('updated note :',updatedNoteData)
        const response = await API.graphql(
          graphqlOperation(updatePatientNote, { input: updatedNoteData })
        );
        console.log('Patient updated:', response);
        fetchNotes();  
        // Close the modal
        onRequestClose();
      } catch (error) {
        console.error('Error updating patient:', error);
      }
    };
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Edit Patient Modal"
      >
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
            Update Patient Note
          </button>
        </form>
      </Modal>
    );
  }
  
  export default EditPatientModal;