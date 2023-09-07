// MicroModal.init();
// document.getElementById('addPatientBtn').addEventListener('click', function() {
//     MicroModal.show('addPatientMModal');
// });

// Accordion Button
const accordions = document.querySelectorAll('.accordion');
accordions.forEach(accordion => {
    const toggleButton = accordion.querySelector('.accordion-toggle');
    const content = accordion.querySelector('.accordion-content');
    toggleButton.addEventListener('click', () => {
        if(content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        } 
    });
});