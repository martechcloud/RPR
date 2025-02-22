let cart = [];
const loaderContainer = document.getElementById("loader"); 
loaderContainer.style.display = "flex"; // Show loading spinner

// Fetch templates from the Google Sheet
fetch("https://script.google.com/macros/s/AKfycbzXWL8oN0knVFt2ZV5w6CVSPvZ2iHtToxhQgqova7AobgeP6qEhp50R8lwVNLEndxSp/exec?sheet=WHATSAPP_TEMPLATES") 
    .then(response => response.json())
    .then(data => {
        cart = data.slice(1); // Store data in cart, skipping header row
        console.log(cart);

        // Now call the function to create the iPhone frames for each cart item
        const container = document.querySelector(".template-grid");
        cart.forEach(item => {
            const iphoneHTML = createIphone(item);
            container.insertAdjacentHTML('beforeend', iphoneHTML);
        });
    })
    .catch(error => console.error('Error fetching data:', error))
    .finally(() => {
        loaderContainer.style.display = "none"; // Hide spinner
    });


function createIphone(item) {
    let headerContent = "";
    let buttonHTML = "";

    // Handle different types of content for the header (Text, Image, Video, Document)
    if (item[3] === "Text") {
        headerContent = `<span style="font-weight: bold; color: grey;">${item[4]}</span>`;
    } else if (item[3] === "Image" && item[4]) {
        headerContent = `<img src="${item[4]}" alt="Header Image" style="width: 100%; height: auto;">`;
    } else if (item[3] === "Video" && item[4]) {
        headerContent = `<video width="100%" controls><source src="${item[4]}" type="video/mp4">Your browser does not support the video tag.</video>`;
    } else if (item[3] === "Document" && item[4]) {
        headerContent = `<a href="${item[4]}" target="_blank" style="font-weight: bold; color: grey;">View Document</a>`;
    }

    // Handle quick reply or call-to-action buttons
    if (item[9] === "Quick Reply" || item[9] === "Call-to-Action") {
        for (let i = 10; i <= 12; i++) {
            if (item[i] !== "") {
                buttonHTML += `<a href="#" class="cta-link" style="display: block; padding: 10px; text-decoration: none; border: 1px solid #dcdcdc;">${item[9] === "Call-to-Action" ? "🔗" : "➥"} ${item[i]}</a>`;
            }
        }
    }

    // Handle the incoming message text, replacing \n with <br/>
    const messageContent = item[5].replace(/\n/g, '<br/>'); // Replacing \n with <br/> for line breaks

    return `
    <div class="template-container" style="background-color: white; padding: 15px; margin: 15px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
        <h3 style="text-align: center; color: #333; font-size: 20px;">${item[0]}</h3>
        <div class="iphone">
            <div class="screen">
                <div class="header"></div>
                <div class="chat-container">
                    <div class="message-wrapper" style="display: flex; flex-direction: column; gap: 4px;">
                        <div class="incoming-message">
                            ${headerContent ? `${headerContent}<br/>` : ''}
                            ${headerContent ? `<br/>` : ''}
                            <span>${messageContent}</span>
                            <div class="footer" style="font-size: 8px; text-align: left; color: grey; margin-top: 10px;">
                                From Martech Cloud
                            </div>
                        </div>
                        <div class="button-group" style="display: flex; flex-direction: column; gap: 0px;">
                            ${buttonHTML}
                        </div>
                    </div>
                </div>
            </div>
            <div class="notch"></div>
            <div class="button"></div>
            <button class="bottom-header-btn" onclick="sendTest('${item[0]}')">Send Test</button>
        </div>
    </div>`;
}

// Function to handle the Send Test button click
function sendTest(templateName) {
    console.log(`Template Name: ${templateName}`);
    document.getElementById('template_name').value = templateName;
    $('#largeModal').modal('show');
}

// Search function
document.getElementById('searchInput').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const filteredTemplates = cart.filter(item => item[0].toLowerCase().includes(searchValue));
    
    // Clear the current templates and display the filtered ones
    const container = document.querySelector(".template-grid");
    container.innerHTML = ""; // Clear existing templates

    filteredTemplates.forEach(item => {
        const iphoneHTML = createIphone(item);
        container.insertAdjacentHTML('beforeend', iphoneHTML);
    });
});


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
    const TEMPLATE_ID = document.getElementById('template_name').value;    
    const PHONE = document.getElementById('PHONE').value; 

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

    // Construct the URL for the Apps Script web app (replace with your actual web app URL)
    const url = new URL("https://script.google.com/macros/s/AKfycbzkgR57couUXfhmao-0GP4khq5WVVDza3m3bnki9izyBV-vErRBkRg0fPfuDcBUA4ulUQ/exec");

    // Append all the captured data as query parameters
    url.searchParams.append("usecase", "WAtesttemplates");
    url.searchParams.append("TEMPLATE_ID", TEMPLATE_ID);
    url.searchParams.append("PHONE", PHONE);

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
            alertMessagegreen.textContent = "Request Submitted!";
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


    