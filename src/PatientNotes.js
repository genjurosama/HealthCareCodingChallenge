import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createPatientNote,updatePatientNote,deletePatientNote} from './graphql/mutations'
import {listPatientNotes} from './graphql/queries'
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
      console.log(response)
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

  const handleCreateNote = async () => {
    try {
      console.log(formData)
      await API.graphql(graphqlOperation(createPatientNote,{input:formData}));
      setFormData({ patientName: '', date: '', medicalObservations: '' });
      fetchNotes(); // Refetch the notes after creating a new one
      toast.success('Note created successfully.'); // Display a success toast
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Error creating note. Please try again.'); // Display an error toast
    }
  };


  const handleUpdateNote = async (noteId) => {
    try {
      await API.graphql(graphqlOperation(updatePatientNote,{input:noteId}));
      setFormData({ patientName: '', date: '', medicalObservations: '' });
      fetchNotes(); // Refetch the notes after updating
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    console.log('note id:',noteId)
    try {
      await API.graphql(graphqlOperation(deletePatientNote, {input:{id:noteId}}));
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

      <form>
        <input
          type="text"
          placeholder="Patient Full Name"
          value={formData.patientName}
          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <textarea
          placeholder="Medical Observations"
          value={formData.medicalObservations}
          onChange={(e) => setFormData({ ...formData, medicalObservations: e.target.value })}
        />
        <button type="button" onClick={handleCreateNote}>
          Create Note
        </button>
      </form>
      <ul>
        {notes ? notes.data.listPatientNotes.items.map((note) => (
          <li key={note.id}>
            <div>
              <strong>{note.patientName}</strong> ({note.date})
            </div>
            <div>{note.medicalObservations}</div>
            <button onClick={() => openModal(note)}>Update</button>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </li>
        )) : 'no data'}
      </ul>

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
