/**
 * Contact Master
 */



'use strict';



let cart = [];

function fetchDataAndStoreInCart() {
    const loaderContainer = document.getElementById("loader"); 
    loaderContainer.style.display = "flex"; // Show loading spinner
    fetch("https://script.google.com/macros/s/AKfycbzXWL8oN0knVFt2ZV5w6CVSPvZ2iHtToxhQgqova7AobgeP6qEhp50R8lwVNLEndxSp/exec?sheet=CUSTOMER_DATA_TABLE")
        .then(response => response.json())
        .then(data => {
            cart = data.slice(1); // Store data in cart, skipping header row
            console.log(cart)
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
            loaderContainer.style.display = "none"; // Hide spinner
        });
}


document.addEventListener("DOMContentLoaded", function () {
    // Add event listener to the button
    document.querySelector(".account-image-reset").addEventListener("click", function () {
        // Get the input value
        const inputValue = document.getElementById("CUSTOMER_ID").value.trim();
        
        // Search first by Customer ID (row[0]), if not found, search by Customer Phone (row[3])
        let customer = cart.find(row => row[0] === inputValue);
        
        if (!customer) {
            customer = cart.find(row => row[3].toString() === inputValue); // Convert to string for matching
        }

        // If customer exists, update the corresponding fields
        if (customer) {
            document.getElementById("CUSTOMER_ID_FIELD").value = customer[0];
            document.getElementById("REGISTRATION_DATE").value = customer[4]; 
            document.getElementById("CUSTOMER_NAME").value = customer[1]; 
            document.getElementById("CUSTOMER_EMAIL").value = customer[2]; 
            document.getElementById("CUSTOMER_PHONE").value = customer[3]; 
            document.getElementById("AGE").value = customer[5]; 
        } else {
            const errorMessage = document.getElementById('box2');
            const alertMessagered = document.getElementById('almessage');
            const submitButton = document.getElementById("submitbutton");
            alertMessagered.textContent = "Customer ID or Phone Number not found!";
            showError(errorMessage, submitButton);
            document.getElementById("REGISTRATION_DATE").value = ""; // Clear field if not found
            document.getElementById("CUSTOMER_NAME").value = "";
            document.getElementById("CUSTOMER_EMAIL").value = "";
            document.getElementById("CUSTOMER_PHONE").value = "";
            document.getElementById("AGE").value = "";
        }
    });
});


// Function to disable the submit button with feedback
function disableButton(button) {
    button.style.backgroundColor = "lightgrey";
    button.style.border = "lightgrey";
    button.disabled = true;
}
  
// Function to reset the submit button's state
function resetSubmitButton(button) {
    button.style.backgroundColor = "";
    button.style.border = "";
    button.disabled = false;
}

// Function to show error message and re-enable the button
function showError(errorMessage, button) {
    errorMessage.style.display = "block";
    setTimeout(() => {
    errorMessage.style.display = "none";
    }, 3000);
    resetSubmitButton(button);
}



document.getElementById('submitbutton').addEventListener('click', async function () {
    const submitButton = document.getElementById("submitbutton");
    disableButton(submitButton);
    const errorMessage = document.getElementById('box2');
    const successMessage = document.getElementById('box');
    const alertMessage = document.getElementById('almessage');
    const alertMessagered = document.getElementById('almessage');


    // Capture form data
    const CUSTOMER_ID = document.getElementById('CUSTOMER_ID_FIELD').value;    
    const CUSTOMER_NAME = document.getElementById('CUSTOMER_NAME').value; 
    const CUSTOMER_EMAIL = document.getElementById('CUSTOMER_EMAIL').value; 
    const CUSTOMER_PHONE = document.getElementById('CUSTOMER_PHONE').value; 
    const AGE = document.getElementById('AGE').value;
    const REGISTRATION_DATE = document.getElementById('REGISTRATION_DATE').value;


    if (CUSTOMER_PHONE !== "") {
        var phonePattern = /^[0-9]{12}$/;
        if (!phonePattern.test(CUSTOMER_PHONE)) {
            document.getElementById('almessage').innerHTML = "Phone Number is not valid!";
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            resetSubmitButton(submitButton);
            setTimeout(function () {
                box2.style.display = "none";
            }, 3000);
            return;
        }
    }

    if (CUSTOMER_EMAIL !== "") {
        var re = /\S+@\S+\.\S+/;
        if (!re.test(CUSTOMER_EMAIL)) {
            document.getElementById('almessage').innerHTML = "Email is not valid!"
            var box2 = document.getElementById("box2");
                box2.style.display = "inline-block";
                resetSubmitButton(submitButton);
                setTimeout(function () {
                    box2.style.display = "none";
                }, 3000);
            return;
        }
    }

    // Construct the URL for the Apps Script web app (replace with your actual web app URL)
    const url = new URL("https://script.google.com/macros/s/AKfycbzkgR57couUXfhmao-0GP4khq5WVVDza3m3bnki9izyBV-vErRBkRg0fPfuDcBUA4ulUQ/exec");

    // Append all the captured data as query parameters
    url.searchParams.append("usecase", "customattribute");
    url.searchParams.append("CUSTOMER_ID", CUSTOMER_ID);
    url.searchParams.append("CUSTOMER_NAME", CUSTOMER_NAME);
    url.searchParams.append("CUSTOMER_EMAIL", CUSTOMER_EMAIL);
    url.searchParams.append("CUSTOMER_PHONE", CUSTOMER_PHONE);
    url.searchParams.append("AGE", AGE);
    url.searchParams.append("REGISTRATION_DATE", REGISTRATION_DATE);
    console.log(url)

    try {
        // Make the API call
        const response = await fetch(url);
        const data = await response.json();
        handleResponse1(data, submitButton);
      } catch (error) {
        alertMessagered.textContent = "An unexpected error occurred. Please try again.";
        showError(errorMessage, submitButton);
      }
    });

    // Function to handle the server response
    function handleResponse1(response, submitButton) {
        console.log("all set")
        const successMessage = document.getElementById('box');
        const alertMessagegreen = document.getElementById('success');
        const alertMessagered = document.getElementById('almessage');
        const errorMessage = document.getElementById('box2');

        console.log(response.status)

        if (response.status === "success") {
            const CUSTOMER_ID = document.getElementById('CUSTOMER_ID_FIELD').value;
            const CUSTOMER_NAME = document.getElementById('CUSTOMER_NAME').value; 
            const CUSTOMER_EMAIL = document.getElementById('CUSTOMER_EMAIL').value; 
            const CUSTOMER_PHONE = document.getElementById('CUSTOMER_PHONE').value; 
            const AGE = document.getElementById('AGE').value;
            const REGISTRATION_DATE = document.getElementById('REGISTRATION_DATE').value;
            let index = cart.findIndex(item => item[0] === CUSTOMER_ID);
            console.log(CUSTOMER_ID)
            console.log(cart)
            console.log(index)
            if (index !== -1) {
                // Update existing customer data
                cart[index] = [CUSTOMER_ID, CUSTOMER_NAME, CUSTOMER_EMAIL, CUSTOMER_PHONE, REGISTRATION_DATE, AGE];
            }

            alertMessagegreen.textContent = "Contact Updated!";
            successMessage.style.display = "block";
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 3000);

        } else {
        alertMessagered.textContent = response.message || "Failed! Please try again.";
        showError(errorMessage, submitButton);
        }

        // Enable the submit button
        resetSubmitButton(submitButton);
    }


function validatePhoneNumber(input) {
    let value = input.value.trim();

    // Validate phone number after +91
    const phoneRegex = /^\d{12}$/;
    const phoneError = document.getElementById('phoneError');

    if (!phoneRegex.test(value)) {
        phoneError.style.display = 'block';
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    } else {
        phoneError.style.display = 'none';
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    }

    input.value = value; // Update the input value with +91
}
  
  
  
function validateemail(input) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    const emailError = document.getElementById("emailError");

    if (emailPattern.test(input.value)) {
        emailError.style.display = "none";
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    } else {
        emailError.style.display = "block";
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    }
}



function validatePhoneNumber(input) {
    let value = input.value.trim();

    // Validate phone number after +91
    const phoneRegex = /^\d{12}$/;
    const phoneError = document.getElementById('phoneError');

    if (!phoneRegex.test(value)) {
        phoneError.style.display = 'block';
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    } else {
        phoneError.style.display = 'none';
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    }

    input.value = value; // Update the input value with +91
}
  
  
  
function validateemail(input) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    const emailError = document.getElementById("emailError");

    if (emailPattern.test(input.value)) {
        emailError.style.display = "none";
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    } else {
        emailError.style.display = "block";
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    }
}

