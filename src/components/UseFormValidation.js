import { useEffect, useState } from 'react';

//Custom Hook for form validation

export function useFormValidation(patientName, date, medicalObservations) {
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    const errors = [];

    if (!patientName || !date || !medicalObservations) {
      errors.push('Please fill out all form fields.');
    }

     // Check if patientName contains only alphabetical characters
        const nameRegex = /^[A-Za-z ]+$/;
     if (!patientName.match(nameRegex)) {
       errors.push('Patient name should only contain alphabetical characters.');
     }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(dateRegex)) {
      errors.push('Invalid date format. Please use YYYY-MM-DD.');
    }

    setValidationErrors(errors);
  }, [patientName, date, medicalObservations]);

  return validationErrors;
}
