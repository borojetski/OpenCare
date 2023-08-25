MicroModal.init();
document.getElementById('addPatientBtn').addEventListener('click', function() {
    MicroModal.show('addPatientMModal');
});

// Show/Hide Welcome Screen/Patient Profile
const getStartedSections = document.querySelectorAll('#getStarted');
const patientProfileSections = document.querySelectorAll('#patientProfile');

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

// // Medication Autocmplete
// function showMedicationSuggestions(medicationSuggestions) {
//   const suggestionsList = document.createElement('ul');
//   suggestionsList.classList.add('suggestions');

//   medicationSuggestions.forEach(suggestion => {
//     const suggestionItem = document.createElement('li');

//     // Extract medication information
//     const brandName = suggestion.openfda.brand_name[0];
//     const genericName = suggestion.openfda.generic_name[0];
//     const medicationText = createMedicationText(brandName, genericName);

//     suggestionItem.appendChild(medicationText);
//     suggestionsList.appendChild(suggestionItem);
//   });

//   const suggestionsContainer = document.getElementById('suggestions');
//   suggestionsContainer.innerHTML = ''; // Clear previous suggestions
//   suggestionsContainer.appendChild(suggestionsList);
// }

// function createMedicationText(brandName, genericName) {
//   return document.createTextNode(brandName + " (" + genericName + ")");
// }

// function hideSuggestions() {
//   document.getElementById('suggestions').innerHTML = '';
// }

// async function fetchMedicationSuggestions(searchTerm) {
//   try {
//     const apiUrl = `https://api.fda.gov/drug/drugsfda.json?search=${searchTerm}&limit=5`;
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error('Error fetching medication suggestions', error);
//     return [];
//   }
// }

// const searchInput = document.getElementById('medication-input');

// searchInput.addEventListener('input', async event => {
//   const searchTerm = event.target.value;

//   if (searchTerm.length > 2) {
//     try {
//       const suggestions = await fetchMedicationSuggestions(searchTerm);
//       if (suggestions) {
//         showMedicationSuggestions(suggestions);
//       } else {
//         hideSuggestions();
//       }
//     } catch (error) {
//       console.error('Error fetching medication suggestions', error);
//       hideSuggestions();
//     }
//   } else {
//     hideSuggestions();
//   }
// });