MicroModal.init();
document.getElementById('addPatientBtn').addEventListener('click', function() {
    MicroModal.show('addPatientMModal');
});

// Show/Hide Welcome Screen/Patient Profile
const getStartedSections = document.querySelectorAll('[data-section="getStarted"]');
const patientProfileSections = document.querySelectorAll('[data-section="patientProfile"]');

if (userHPP) {
    getStartedSections.forEach(section => {
    section.style.display = 'none'; 
    });
    patientProfileSections.forEach(section => {
    section.style.display = 'block';
    });
    } else {
    getStartedSections.forEach(section => {
    section.style.display = 'block';
    });
    patientProfileSections.forEach(section => {
    section.style.display = 'none';
    });
}

// Client-Side New Patient Validation
function handleFormSubmission(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the form data
  const form = event.target;
  const formData = new FormData(form);

  // Send an AJAX request to the server
  fetch(form.action, {
    method: form.method,
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.errors) {
        displayValidationErrors(data.errors);
      } else if (data.error) {
        displayServerError(data.error);
      } else {
        window.location.href = "/dashboard";
      }
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
}

// Accordion Button
const accordions = document.querySelectorAll('.accordion');
accordions.forEach(accordion => {
    const toggleButton = accordion.querySelector('.accordion-toggle');
    const content = accordion.querySelector('.accordion-content');
    toggleButton.addEventListener('click', () => {
        const computedStyle = window.getComputedStyle(content);
        const displayValue = computedStyle.getPropertyValue('display');
        content.style.display = displayValue === 'none' ? 'block' : 'none';
    });
});