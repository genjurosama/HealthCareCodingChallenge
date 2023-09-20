import React, { useState } from 'react';
import Modal from 'react-modal';
import { API, graphqlOperation } from 'aws-amplify';
import { updatePatientNote } from '../graphql/mutations'; 


function EditPatientModal({ isOpen, onRequestClose, noteData,fetchNotes }) {
    const [updatedNoteData, setUpdatedNoteData] = useState({
      // Initialize with existing patient data
      id: noteData.id,
      patientName: noteData.patientName,
      date: noteData.date,
      medicalObservations: noteData.medicalObservations,
    });

    const customModalStyles = {
      content: {
        width: '50%',  // Adjust the width as needed
        height: 'auto', // Adjust the height as needed
        margin: 'auto', // Center the modal horizontally
      },
    };
  
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUpdatedNoteData({
        ...updatedNoteData,
        [name]: value,
      });
    };
  
    const handleUpdatePatientNote = async () => {
      try {
        // Perform the GraphQL mutation to update the patient note data
        const response = await API.graphql(
          graphqlOperation(updatePatientNote, { input: updatedNoteData })
        );
        fetchNotes();  
        // Close the modal
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