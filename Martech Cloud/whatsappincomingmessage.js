'use strict';

async function fetchAndDisplayMessages() {
    function decryptURL(encryptedUrl, password) {
        var decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encryptedUrl), password).toString(CryptoJS.enc.Utf8);
        return decrypted;
    }
    var encryptedUrl = "U2FsdGVkX1/sZJvdiwlUYyJedvckjf8NeX7SP/HpDheZ1ybIpIKW7U/yesPj8wEuVy7LmoB8roVj/af3u3I55Je60BCeInWARY7dm2r97HlNEjH5X/HVr/h553Jm4nqF6ApAs++WbkaobVW7M69G6ygdmCdrl6GfJmh0Lf5ODPM=";
    var password = sessionStorage.getItem("pass");
    var decryptedUrl = decryptURL(encryptedUrl, password);

    document.getElementById('refreshMessages').style.backgroundColor = 'lightgrey';
    document.getElementById('refreshMessages').style.border = 'lightgrey';
    const response = await fetch(decryptedUrl);
    const data = await response.json();
    
    console.log(data)

    const filteredData = data.filter(message => message.phoneNumber === 918208710562);
    

    // Sort data by timestamp in descending order
    filteredData.sort((a, b) => b.timestamp - a.timestamp);

    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Clear existing messages

    filteredData.forEach(message => {
        const timestamp = new Date(message.timestamp * 1000);
        const istTime = timestamp.toLocaleString('en-US', { 
            timeZone: 'Asia/Kolkata', 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: true 
        });
    
        const messageDiv = document.createElement('div');
        messageDiv.className = "card p-3 mb-3";
        // Add border style
        messageDiv.style.border = "0.5px solid blue"; 

        messageDiv.innerHTML = `
            <figure class="p-3 mb-0">
                <blockquote class="blockquote">
                    <p>${message.message}</p>
                </blockquote>
                <figcaption class="blockquote-footer mb-0 text-muted">
                    ${message.fromName} 
                    (${message.fromPhoneNumber}) at ${istTime}
                    ${message.REPLY_STATUS === "SENT" ? `<span class="badge bg-label-success me-1 reply-badge" style="cursor: pointer;">REPLIED</span>
                    <div class="reply-message" style="display: none; margin-top: 5px; padding: 5px; border: 1px solid #ddd; border-radius: 5px; background-color: #f8f9fa;">${message.REPLY_MESSAGE}</div>` : ""}
                </figcaption>
            </figure>
        `;

        const replyBadge = messageDiv.querySelector('.reply-badge');
        const replyMessageDiv = messageDiv.querySelector('.reply-message');

        if (replyBadge && replyMessageDiv) {
            replyBadge.addEventListener('click', () => {
                replyMessageDiv.style.display = replyMessageDiv.style.display === "none" ? "block" : "none";
            });
        }

        const now = new Date();
        const timeDifference = now - timestamp; // Difference in milliseconds
        const hoursDifference = timeDifference / (1000 * 60 * 60); // Convert to hours
        if (hoursDifference <= 23) {
            // Create a reply button
            const replyButton = document.createElement('button');
            replyButton.className = "btn btn-primary";
            replyButton.innerText = "Reply";
        
            // Append the reply button to the messageDiv
            messageDiv.appendChild(replyButton);
        
            // Add event listener to handle reply functionality
            replyButton.addEventListener('click', () => {
                // Hide reply button
                replyButton.style.display = "none";
        
                // Create a container for input and send button
                const replyContainer = document.createElement('div');
                replyContainer.className = "reply-container";
                replyContainer.style.marginTop = "10px"; // Space above reply box
        
                // Create input box
                const replyInput = document.createElement('input');
                replyInput.type = "text";
                replyInput.className = "form-control";
                replyInput.placeholder = "Type your reply...";
                replyInput.style.marginRight = "10px"; // Space between input and button
        
                // Create send button
                const sendButton = document.createElement('button');
                sendButton.className = "btn btn-success";
                sendButton.id = "replyback";
                sendButton.innerText = "Send";
        
                // Create a flex container for alignment
                const replyFlexContainer = document.createElement('div');
                replyFlexContainer.style.display = "flex";
                replyFlexContainer.style.gap = "10px"; // Spacing between input and button
        
                // Append input and button to the flex container
                replyFlexContainer.appendChild(replyInput);
                replyFlexContainer.appendChild(sendButton);
        
                // Append flex container to reply container
                replyContainer.appendChild(replyFlexContainer);
        
                // Append the reply container to the messageDiv
                messageDiv.appendChild(replyContainer);
        
                // Handle send button click
                sendButton.addEventListener('click', async () => { 
                    const replyText = replyInput.value.trim();
                    if (replyText !== "") {
                        const errorMessage = document.getElementById('box2');
                        const alertMessagered = document.getElementById('almessage');
                        const submitButton = document.getElementById('replyback');
                        disableButton(submitButton);

                        const url = new URL("https://script.google.com/macros/s/AKfycbzAzZIM7MOjUM3aN1be8HRKtpCAQojxjNC4mrw6GbWyxfVe1_qfcXfI9XxmXJRJf5Z-8w/exec");
                        url.searchParams.append("usecase", "REPLY_BACK");
                        url.searchParams.append("To", message.fromPhoneNumber);
                        url.searchParams.append("Text", replyText);
                        url.searchParams.append("From", "918208710562");
                        url.searchParams.append("Id", message.ID);

                        try {
                            // Make the API call
                            const response = await fetch(url);
                            const data = await response.json();
                            handleResponse1(data, submitButton);
                            message.REPLY_STATUS = "SENT";

                            // Create and append "REPLIED" badge dynamically
                            const repliedBadge = document.createElement("span");
                            repliedBadge.className = "badge bg-label-success me-1 reply-badge";
                            repliedBadge.style.cursor = "pointer";
                            repliedBadge.innerText = "REPLIED";

                            // Create and append reply message dynamically
                            const replyMessageDiv = document.createElement("div");
                            replyMessageDiv.className = "reply-message";
                            replyMessageDiv.style.display = "none";
                            replyMessageDiv.style.marginTop = "5px";
                            replyMessageDiv.style.padding = "5px";
                            replyMessageDiv.style.border = "1px solid #ddd";
                            replyMessageDiv.style.borderRadius = "5px";
                            replyMessageDiv.style.backgroundColor = "#f8f9fa";
                            replyMessageDiv.innerText = replyText;

                            // Append elements to messageDiv
                            // Append elements to messageDiv
                            const figcaption = messageDiv.querySelector("figcaption");
                            figcaption.appendChild(repliedBadge);
                            figcaption.appendChild(replyMessageDiv);

                            // Add click event to toggle reply message visibility
                            repliedBadge.addEventListener("click", () => {
                                replyMessageDiv.style.display = replyMessageDiv.style.display === "none" ? "block" : "none";
                            });
                          } catch (error) {
                            alertMessagered.textContent = "An unexpected error occurred. Please try again.";
                            showError(errorMessage, submitButton);
                          }
                     
                        // Remove input box after sending
                        replyContainer.remove();
                        
                        // Show reply button again
                        replyButton.style.display = "inline-block";
                    } else {
                        alert("Please enter a reply before sending.");
                    }
                });
            });
        }
        
        
    
        // Append the messageDiv to the messagesContainer
        messagesContainer.appendChild(messageDiv);
        document.getElementById('refreshMessages').style.backgroundColor = '';
        document.getElementById('refreshMessages').style.border = '';
        var box = document.getElementById("box");
        box.style.display = "inline-block";
        document.getElementById('success').innerHTML = "Message Refreshed!";
        setTimeout(function () {
            box.style.display = "none";
        }, 3000);
    });
}



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
        alertMessagegreen.textContent = "Request Sunmitted!";
        successMessage.style.display = "block";
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);

    } else {
        alertMessagered.textContent = response.message || "Failed to submit request. Please try again.";
        showError(errorMessage, submitButton);
    }

    // Enable the submit button
    enableButton(submitButton);
}




