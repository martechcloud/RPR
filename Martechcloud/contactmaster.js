
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
            loadTable(); // Call loadTable to update UI
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
            loaderContainer.style.display = "none"; // Hide spinner
        });
}



function loadTable() {
    console.log("Loaded");
    var dataTable = document.getElementById("dataTable");
    dataTable.getElementsByTagName('tbody')[0].innerHTML = '';

    const tableBody = document.querySelector('#dataTable tbody');

    cart.forEach(rowData => {
        const newRow = document.createElement('tr');

        // Extract only the first 5 columns
        const firstFiveColumns = rowData.slice(0, 5);
        const [customerid, customername, customeremail, customerphone, registrationdate] = firstFiveColumns;

        firstFiveColumns.forEach(cellData => {
            const newCell = document.createElement('td');
            newCell.textContent = cellData;
            newRow.appendChild(newCell);
        });

        const actionsCell = document.createElement('td');
        actionsCell.innerHTML = `
            <div class="dropdown">
                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="#" onclick="openModal('${customerid}','${customername}', '${customeremail}','${customerphone}', '${registrationdate}')">
                        <i class="bx bx-pencil me-1"></i> Edit
                    </a>
                </div>
            </div>
        `;

        newRow.appendChild(actionsCell);
        tableBody.appendChild(newRow);
    });
}



function searchTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        var found = false;
        for (var j = 0; j < td.length; j++) {
            txtValue = td[j].textContent || td[j].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                found = true;
                break;
            }
        }
        if (found) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}


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

document.getElementById('editButton').addEventListener('click', async function () {
    const submitButton = document.getElementById("editButton");
    disableButton(submitButton);
    const errorMessage = document.getElementById('box2');
    const successMessage = document.getElementById('box');
    const alertMessage = document.getElementById('almessage');
    const alertMessagered = document.getElementById('almessage');

    // Capture form data
    const CUSTOMER_ID = document.getElementById('CUSTOMER_ID').value;    
    const CUSTOMER_NAME = document.getElementById('CUSTOMER_NAME').value; 
    const EMAIL = document.getElementById('EMAIL').value; 
    const PHONE = document.getElementById('PHONE').value; 
    const REGISTRATION_DATE = document.getElementById('REGISTRATION_DATE').value;

    if (PHONE !== "") {
        var phonePattern = /^[0-9]{12}$/;
        if (!phonePattern.test(PHONE)) {
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

    if (EMAIL !== "") {
        var re = /\S+@\S+\.\S+/;
        if (!re.test(EMAIL)) {
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
    url.searchParams.append("usecase", "editcontact");
    url.searchParams.append("CUSTOMER_ID", CUSTOMER_ID);
    url.searchParams.append("CUSTOMER_NAME", CUSTOMER_NAME);
    url.searchParams.append("EMAIL", EMAIL);
    url.searchParams.append("PHONE", PHONE);
    url.searchParams.append("REGISTRATION_DATE", REGISTRATION_DATE);

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
        const successMessage = document.getElementById('box');
        const alertMessagegreen = document.getElementById('success');
        const alertMessagered = document.getElementById('almessage');
        const errorMessage = document.getElementById('box2');

        if (response.status === "success") {
            const CUSTOMER_ID = document.getElementById('CUSTOMER_ID').value;    
            const CUSTOMER_NAME = document.getElementById('CUSTOMER_NAME').value; 
            const EMAIL = document.getElementById('EMAIL').value; 
            const PHONE = document.getElementById('PHONE').value; 
            const REGISTRATION_DATE = document.getElementById('REGISTRATION_DATE').value;

        // Update cart with new values
            const index = cart.findIndex(row => row[0] === CUSTOMER_ID);
            console.log(CUSTOMER_ID)
            console.log(index)
            if (index !== -1) {
                cart[index] = [CUSTOMER_ID, CUSTOMER_NAME, EMAIL, PHONE, REGISTRATION_DATE];
                loadTable(); // Refresh table after update
            }

            loadTable();
            alertMessagegreen.textContent = "Contact Updated!";
            $('#largeModal').modal('hide');
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


    