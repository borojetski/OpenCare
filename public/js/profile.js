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
        const computedStyle = window.getComputedStyle(content);
        const displayValue = computedStyle.getPropertyValue('display');
        content.style.display = displayValue === 'none' ? 'block' : 'none';
    });
});