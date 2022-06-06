/* 
Making the name text field have the focus state by default when the page first loads
*/
const nameInput = document.querySelector('#name');
nameInput.focus();

/* 
Job Role Section
 * Making the Job Role <select> element listen for user changes 
 * setting the default state of the "other job role" text field to be hidden
   so that it only appears when the "Other" option is selected in the select menu
*/
const jobSelect = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');
otherJobRole.style.display = "none";

jobSelect.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = '';
    } else {
        otherJobRole.style.display = 'none';
    }
});

/*
T Shirt Info section
 * displaying color options based on what design is selected
*/
const designSelect = document.querySelector('#design');
const colorSelect = document.querySelector('#color');
colorSelect.disabled = true;

designSelect.addEventListener('change', (e) => {
    colorSelect.disabled = false;

    const jsPunsOptions = document.querySelectorAll('[data-theme="js puns"]');
    const heartJsOptions = document.querySelectorAll('[data-theme="heart js"]');

    if (e.target.value === 'js puns') {
        for (let option of jsPunsOptions) {
            option.hidden = false;
        }
        for (let option of heartJsOptions) {
            option.hidden = true;
        }
    } else {
        for (let option of heartJsOptions) {
            option.hidden = false;
        }
        for (let option of jsPunsOptions) {
            option.hidden = true;
        }
    }
})

/* 
Register for Activities section 
 * adds an event listener to the activities fieldset, so that the total cost goes up or down based on the 
   activities selected
*/
const activitiesFieldset = document.querySelector('#activities');
const activityCheckbox = document.querySelectorAll('[type="checkbox"]');
const activitiesCost = document.querySelector('#activities-cost');
let totalCost = 0;

activitiesFieldset.addEventListener('change', (e) => {
    let dataCost = parseInt(e.target.attributes['data-cost'].value);
    if (e.target.checked) {
        totalCost += dataCost; 
    } else {
        totalCost -= dataCost; 
    }
    activitiesCost.textContent = `Total: $${totalCost}`;
})

/* 
Payment Info Section 
 * Makes the default payment method the 'Credit Card' option
 * Adds an event listener to the payment method select menu so that the credit card 
   payment section is only displayed when the 'Credit Card' option is selected
*/
const paymentMethodSelect = document.querySelector('#payment');
const creditCardDetails = document.querySelector('#credit-card');
paymentMethodSelect[1].selected = true;

paymentMethodSelect.addEventListener('change', (e) => {
    if (e.target.value === "credit-card") {
        creditCardDetails.style.display = '';
    } else {
        creditCardDetails.style.display = 'none';
    }
})