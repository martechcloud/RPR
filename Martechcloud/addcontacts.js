

// Function to disable the submit button
function disableButton(button) {
    button.style.backgroundColor = 'lightgrey';
    button.style.border = 'lightgrey';
    button.disabled = true;
}

// Function to enable the submit button
function enableButton(button) {
    button.style.backgroundColor = '';
    button.style.border = '';
    button.disabled = false;
}

// Function to show error message and re-enable the button
function showError(errorMessage, button) {
    errorMessage.style.display = "block";
    setTimeout(() => {
        errorMessage.style.display = "none";
    }, 3000);
    enableButton(button);
}

// Function to handle the server response
function handleResponse1(response, submitButton) {
    const successMessage = document.getElementById('box');
    const alertMessagegreen = document.getElementById('success');
    const alertMessagered = document.getElementById('almessage');
    const errorMessage = document.getElementById('box2');

    if (response.status === "success") {
        alertMessagegreen.textContent = "Contact Added Sucessfully!";
        successMessage.style.display = "block";
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);

        // Clear input fields

        document.getElementById("name").value = "";
        document.getElementById("number").value = "";
        document.getElementById("email").value = "";
        document.getElementById("name1").value = "";
        document.getElementById("number1").value = "";
        document.getElementById("email1").value = "";
        document.getElementById("age1").value = "";

    } else {
        alertMessagered.textContent = response.message || "Failed to add contact. Please try again.";
        showError(errorMessage, submitButton);
    }

    // Enable the submit button
    enableButton(submitButton);
}


document.getElementById("submitbutton1").addEventListener("click", async () => {
    const submitButton = document.getElementById('submitbutton1');
    const errorMessage = document.getElementById('box2');
    const alertMessagered = document.getElementById('almessage');

    // Get input values

    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    const email = document.getElementById("email").value;

    // Validate inputs
    if (!number || !name ) {
        alertMessagered.textContent = "Mandatory fields are required !";
        showError(errorMessage, submitButton);
        return;
    }

    if (number !== "") {
        var phonePattern = /^[0-9]{12}$/;
        if (!phonePattern.test(number)) {
            document.getElementById('almessage').innerHTML = "Phone Number is not valid!";
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            setTimeout(function () {
                box2.style.display = "none";
                document.getElementById('submitbutton1').style.backgroundColor = '';
                document.getElementById('submitbutton1').style.border = '';
                submitButton.disabled = false;
            }, 3000);
            return;
        }
    }

    if (email !== "") {
        var re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            document.getElementById('almessage').innerHTML = "Email is not valid!"
            var box2 = document.getElementById("box2");
                box2.style.display = "inline-block";
                setTimeout(function () {
                    box2.style.display = "none";
                    document.getElementById('submitbutton1').style.backgroundColor = '';
                    document.getElementById('submitbutton1').style.border = '';
                    submitButton.disabled = false;
                }, 3000);
            return;
        }
    }

    // Disable the submit button while processing
    disableButton(submitButton);

    // Construct the URL
    const url = new URL("https://script.google.com/macros/s/AKfycbzkgR57couUXfhmao-0GP4khq5WVVDza3m3bnki9izyBV-vErRBkRg0fPfuDcBUA4ulUQ/exec");
    url.searchParams.append("usecase", "addnewbasiccontact");
    url.searchParams.append("name", name);
    url.searchParams.append("number", number);
    url.searchParams.append("email", email);


    try {
        // Make the API call
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        handleResponse1(data, submitButton);
      } catch (error) {
        alertMessagered.textContent = "An unexpected error occurred. Please try again.";
        showError(errorMessage, submitButton);
      }
 
});


document.getElementById("submitbutton2").addEventListener("click", async () => {
    const submitButton = document.getElementById('submitbutton2');
    const errorMessage = document.getElementById('box2');
    const alertMessagered = document.getElementById('almessage');

    // Get input values

    const name = document.getElementById("name1").value;
    const number = document.getElementById("number1").value;
    const email = document.getElementById("email1").value;
    const age = document.getElementById("age1").value;

    // Validate inputs
    if (!number || !name ) {
        alertMessagered.textContent = "Mandatory fields are required !";
        showError(errorMessage, submitButton);
        return;
    }

    if (number !== "") {
        var phonePattern = /^[0-9]{12}$/;
        if (!phonePattern.test(number)) {
            document.getElementById('almessage').innerHTML = "Phone Number is not valid!";
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            setTimeout(function () {
                box2.style.display = "none";
                document.getElementById('submitbutton1').style.backgroundColor = '';
                document.getElementById('submitbutton1').style.border = '';
                submitButton.disabled = false;
            }, 3000);
            return;
        }
    }

    if (email !== "") {
        var re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            document.getElementById('almessage').innerHTML = "Email is not valid!"
            var box2 = document.getElementById("box2");
                box2.style.display = "inline-block";
                setTimeout(function () {
                    box2.style.display = "none";
                    document.getElementById('submitbutton1').style.backgroundColor = '';
                    document.getElementById('submitbutton1').style.border = '';
                    submitButton.disabled = false;
                }, 3000);
            return;
        }
    }

    // Disable the submit button while processing
    disableButton(submitButton);

    // Construct the URL
    const url = new URL("https://script.google.com/macros/s/AKfycbzkgR57couUXfhmao-0GP4khq5WVVDza3m3bnki9izyBV-vErRBkRg0fPfuDcBUA4ulUQ/exec");
    url.searchParams.append("usecase", "addnewadvancecontact");
    url.searchParams.append("name", name);
    url.searchParams.append("number", number);
    url.searchParams.append("email", email);
    url.searchParams.append("age", age);


    try {
        // Make the API call
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        handleResponse1(data, submitButton);
      } catch (error) {
        alertMessagered.textContent = "An unexpected error occurred. Please try again.";
        showError(errorMessage, submitButton);
      }
 
});

function validatePhoneNumber(input) {
    let value = input.value.trim();

    // Validate phone number after +91
    const phoneRegex = /^\d{12}$/;
    const phoneError = document.getElementById('phoneError');
    const phoneError2 = document.getElementById('phoneError2');

    if (!phoneRegex.test(value)) {
        phoneError.style.display = 'block';
        phoneError2.style.display = 'block';

    } else {
        phoneError.style.display = 'none';
        phoneError2.style.display = 'none';

    }

    input.value = value; // Update the input value with +91
}

function validateemail(input) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    const emailError = document.getElementById("emailError");
    const emailError2 = document.getElementById("emailError2");

    if (emailPattern.test(input.value)) {
        emailError.style.display = "none";
        emailError2.style.display = "none";

    } else {
        emailError.style.display = "block";
        emailError2.style.display = "block";
    }
}