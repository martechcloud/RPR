let whatsappcontent_cart = [];


function fetchTemplates() {
    let whatsappcontent_cart = JSON.parse(sessionStorage.getItem('whatsappcontent_cart')) || [];

    if (whatsappcontent_cart.length !== 0) {
        const container = document.querySelector(".template-grid");
        whatsappcontent_cart.forEach(item => {
            const iphoneHTML = createIphone(item);
            container.insertAdjacentHTML('beforeend', iphoneHTML);
        });
        return;
    }

    const loaderContainer = document.getElementById("loader");
    loaderContainer.style.display = "flex"; // Show loading spinner

    const encryptedUrl = "U2FsdGVkX1/jI3DihM4NBvZczFtVxwPvNwnma27AJ8mWUApINjf76e+qd1SupJciDyraO31x0Z7TubEWHwVBB8HGYWIl/z3LYrfqgCN4fAGyY69gcUriKT8jRIO3/WcrTXnNglcSjU4mz8yybDuwbhUSk4i8vF8cfe6JUukwlABUgb3vuFE/8aw19Ka5swFbocj3XauqMhs5yn17AtJLFA==";
 
    var MartechDataPass = sessionStorage.getItem('MartechDataPass');       
    const decryptedUrl = decryptURL(encryptedUrl, MartechDataPass);

    fetch(decryptedUrl) 
        .then(response => response.json())
        .then(data => {
            const whatsappcontent_cart = data.slice(1); // Store data in cart, skipping header row
            sessionStorage.setItem('whatsappcontent_cart', JSON.stringify(whatsappcontent_cart));

            // Now call the function to create the iPhone frames for each cart item
            const container = document.querySelector(".template-grid");
            whatsappcontent_cart.forEach(item => {
                const iphoneHTML = createIphone(item);
                container.insertAdjacentHTML('beforeend', iphoneHTML);
            });
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
            loaderContainer.style.display = "none"; // Hide spinner
        });
}


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
    document.getElementById('template_name').value = templateName;
    $('#largeModal').modal('show');
}

// Search function
document.getElementById('searchInput').addEventListener('input', function() {
    let whatsappcontent_cart = JSON.parse(sessionStorage.getItem('whatsappcontent_cart')) || [];
    const searchValue = this.value.toLowerCase();
    const filteredTemplates = whatsappcontent_cart.filter(item => item[0].toLowerCase().includes(searchValue));
    
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

    const encryptedUrl = "U2FsdGVkX18my+d0S2Op+8Yg5kOww+bNhwsa1O0vbNKzZTG1+WIsLeRCJJq6X2PQKA3JozaVXRlJUw8sjebl5gi8ZB4agY0lETUzDsbQSjWuceMM490cprvlJY23XKvYRkweSmxidUmg0sbVaaNQtFfQmLAUozORGiL4bKJVtCPCm66Mds/NTvFQG6K2OmrQ";
 
    var MartechDataPass = sessionStorage.getItem('MartechDataPass');       
    const decryptedUrl = decryptURL(encryptedUrl, MartechDataPass);

    // Construct the URL for the Apps Script web app (replace with your actual web app URL)
    const url = new URL(decryptedUrl);

    // Append all the captured data as query parameters
    url.searchParams.append("usecase", "TEST_MESSAGE");
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
            let randomkey = generateRandomKey();
            const communication_logs = JSON.parse(sessionStorage.getItem("communication_logs") || "[]");
            const newRow = [
                randomkey,
                "",
                "",
                "",
                "", 
                "",
                "",
                "WHATSAPP",
            ];

            communication_logs.unshift(newRow);
            sessionStorage.setItem('communication_logs', JSON.stringify(communication_logs));

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


    function generateRandomKey(length = 10) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
      }

      function decryptURL(encryptedUrl, password) {
        return CryptoJS.AES.decrypt(decodeURIComponent(encryptedUrl), password).toString(CryptoJS.enc.Utf8);
    }


    