import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {createPatientNote} from '../graphql/mutations';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function NoteCreation() {
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({ patientName: '', date: '', medicalObservations: '' });

  const handleCreateNote = async () => {
    try {
      console.log(formData)
      await API.graphql(graphqlOperation(createPatientNote,{input:formData}));
      setFormData({ patientName: '', date: '', medicalObservations: '' });
      navigate("/");
      toast.success('Note created successfully.'); // Display a success toast
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Error creating note. Please try again.'); // Display an error toast
    }
  };

  return (
    <div>
      <h2>Create Patient Note</h2>
      <form>
        {/* Form fields for creating a new patient note */}
        <input type="text" placeholder="Patient Full Name" value={formData.patientName} onChange={(e) => setFormData({ ...formData, patientName: e.target.value })} />
        <input type="date" placeholder="Date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
        <textarea placeholder="Medical Observations" value={formData.medicalObservations} onChange={(e) => setFormData({ ...formData, medicalObservations: e.target.value })} />
        <button className="button-container" type="button" onClick={handleCreateNote}>
          Create Note
        </button>
      </form>
    </div>
  );
}

export default NoteCreation;
