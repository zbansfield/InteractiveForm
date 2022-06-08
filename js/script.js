/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
*/

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
const paypalDetails = document.querySelector('#paypal');
const bitcoinDetails = document.querySelector('#bitcoin');
paypalDetails.style.display = 'none';
bitcoinDetails.style.display = 'none';
paymentMethodSelect[1].selected = true;

paymentMethodSelect.addEventListener('change', (e) => {
    if (e.target.value === "credit-card") {
        creditCardDetails.style.display = '';
        paypalDetails.style.display = 'none';
        bitcoinDetails.style.display = 'none';
    } else if (e.target.value === "paypal") {
        creditCardDetails.style.display = 'none';
        paypalDetails.style.display = '';
        bitcoinDetails.style.display = 'none';
    }
    else if (e.target.value === "bitcoin") {
        creditCardDetails.style.display = 'none';
        paypalDetails.style.display = 'none';
        bitcoinDetails.style.display = '';
    }
})

/* 
Form Validation
 * adds a submit event listener to the form element to validate the form when it is submitted
 * validation functions for each section that needs to be validated - these are called in the 'submit' event listener
 * adds hints when a form section is invalid 
*/
const formElement = document.querySelector('form');

// Name input validation - cannot be blank or empty
function nameValidation (name) {
    return /^([A-Za-z]*\s?){2,}$/i.test(name) && /\S/.test(name)
}

// Email input validation - has to be formatted: "char@char.com"
function emailValidation (email) {
    return /^[^@]+@[^@.]+\.com$/i.test(email);
}

// Register for Activites validation - at least one event must be checked
function activitiesValidation (checkboxes) {
    let isChecked = 0

    for (let i=0; i<checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            isChecked++;
        }
    }
    return isChecked > 0;
}

// CC Number validation - must be 13-16 digits 
function cardNumberValidation (cardNumber) {
    return /^\d{13,16}$/.test(cardNumber)
}

// Zip Code validation - must be 5 digits
function zipCodeValidation (zipCode) {
    return /^\d{5}$/.test(zipCode)
}

// CVV validation - must be 3 digits
function cvvValidation (cvv) {
    return /^\d{3}$/.test(cvv)

}

// Function to call inside of the event listener - checks if validation functions return 'true' or 'false'
// and calls preventDefault() on the submit event if they return 'false'
// displays hints if 'false' 
// changes the form field/section class to valid or not-valid (changes the style to include visual elements that indicate the error)
function validation(valid, e, section) {
    if (valid === false) {
        e.preventDefault();
        section.classList.remove('valid');
        section.classList.add('not-valid');
        section.lastElementChild.style.display = 'flex';
    } else {
        section.classList.add('valid');
        section.classList.remove('not-valid');
        section.lastElementChild.style.display = 'none';
    }
}

const emailInput = document.querySelector('#email');
const ccNumberInput = document.querySelector('#cc-num');
const zipCodeInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv');

// calls the validation functions when the form is submitted
formElement.addEventListener('submit', (e) => {
    
    const nameValue = nameInput.value
    const emailValue = document.querySelector('#email').value
    const cardNumberValue = document.querySelector('#cc-num').value
    const zipCodeValue = document.querySelector('#zip').value;
    const cvvValue = document.querySelector('#cvv').value;    
    
    validation(nameValidation(nameValue), e, nameInput.parentElement);
    validation(emailValidation(emailValue), e, emailInput.parentElement);
    validation(activitiesValidation(activityCheckbox), e, activitiesFieldset);
    if (paymentMethodSelect[1].selected === true) {
        validation(cardNumberValidation(cardNumberValue), e, ccNumberInput.parentElement);
        validation(zipCodeValidation(zipCodeValue), e, zipCodeInput.parentElement);
        validation(cvvValidation(cvvValue), e, cvvInput.parentElement);
    }

})

/*
Accessibility
*/

// Making the checkbox input elements listen for 'focus' and 'blur' events
// so that pressing the tab key moves the focus state from one input to another
for (let i=0; i<activityCheckbox.length; i++) {
    
    activityCheckbox[i].addEventListener('focus', (e) => {
        e.target.parentNode.classList.add('focus')
    })
    activityCheckbox[i].addEventListener('blur', (e) => {
        e.target.parentNode.classList.remove('focus')
    })
}