import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createPatientNote,updatePatientNote,deletePatientNote} from '../graphql/mutations'
import {listPatientNotes} from '../graphql/queries'
import EditPatientModal from './EditPatientModal'

function PatientNotes() {
  const [notes, setNotes] = useState({data:{listPatientNotes : {items:[]}}});
  const [formData, setFormData] = useState({ patientName: '', date: '', medicalObservations: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  



    // Function to open the modal with patient data
    const openModal = (note) => {
      setSelectedNote(note);
      setIsModalOpen(true);
    };
  
    // Function to close the modal
    const closeModal = () => {
      setSelectedNote(null);
      setIsModalOpen(false);
    };

  // Define the fetchNotes function
  const fetchNotes = async () => {
    try {
      // Fetch the list of patient notes from your REST API using Amplify's API category
      const response = await API.graphql(graphqlOperation(listPatientNotes));
      setNotes(response); // Assuming your API returns an array of patient notes
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast.error('Error fetching notes. Please try again later.'); // Display an error toast
    }
  };

  useEffect(() => {
    // Call the fetchNotes function when the component mounts
    fetchNotes();
  }, []);

  const handleDeleteNote = async (noteId) => {
    console.log('note id:',noteId)
    try {
      await API.graphql(graphqlOperation(deletePatientNote, {input:{id:noteId}}));
      toast.success('Note Deleted successfully.'); // Display a success toast
      fetchNotes(); // Refetch the notes after deleting
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Other functions (handleUpdateNote, handleDeleteNote) with similar toast notifications

  return (
    <div>
      <h2>Patient Notes</h2>
      
      <ToastContainer /> {/* Add the ToastContainer component */}
      <table className='patient-notes-table'>
  <thead>
    <tr>
      <th>Patient Name</th>
      <th>Date</th>
      <th>Medical Observations</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {notes ? (
      notes.data.listPatientNotes.items.map((note) => (
        <tr key={note.id}>
          <td>{note.patientName}</td>
          <td>{note.date}</td>
          <td>{note.medicalObservations}</td>
          <td>
            <button className='edit-button' onClick={() => openModal(note)}>
              Update
            </button>
            <button className='edit-button' data-testid={`delete-button-${note.id}`} onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4">No data</td>
      </tr>
    )}
  </tbody>
</table>

      {selectedNote && (
        <EditPatientModal
          fetchNotes={fetchNotes}
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          noteData={selectedNote}
        />
      )}

      
      {/* Rest of the component content */}
      
    </div>
  );
}

export default PatientNotes;
