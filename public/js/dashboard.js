console.log('dashboard loaded and can see js file.')

const addPatientBtn = document.getElementById('addPatientBtn');
	const addPatientDialog = document.getElementById('addPatientDialog');
	addPatientBtn.addEventListener('click', () => {
	addPatientDialog.showModal();
	});
	
    const cancelButton = document.querySelector('.dialog-dismiss');
	cancelButton.addEventListener('click', () => {
  	addPatientDialog.close();
});

const getStartedSections = document.querySelectorAll('.getStarted');
const patientProfileSections = document.querySelectorAll('.patientProfile');

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

try {
    console.log(userHPP);
    } catch (err) {
    if (err instanceof ReferenceError) {
      console.log('User is undefined!');
    } else {
      console.log(err);
    }
  }