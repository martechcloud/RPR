
/**
 * Contact Master
 */

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

let segments_cart2 = [];

function fetchDataAndStoreInCart() {

    let segments_cart2 = JSON.parse(sessionStorage.getItem('segments_cart2')) || [];

    if (segments_cart2.length !== 0) {
        populateSegmentDropdown();
        updateReachableCountallcontacts();
        return;
    } 

    const submitButton = document.getElementById("nextStep");
    const errorMessage = document.getElementById('box2');
    let campaign_name = document.getElementById("campaign_name").value.trim(); // Trim to remove extra spaces

    if (!campaign_name) {
        document.getElementById('almessage').innerHTML = "Campaign Name is mandatory!"
        showError(errorMessage, submitButton);
        return;
    }

    const loaderContainer = document.getElementById("loader"); 
    loaderContainer.style.display = "flex"; // Show loading spinner
    const loaderContainerx = document.getElementById("loaderx"); 
    loaderContainerx.style.display = "flex"; // Show loading spinner
    disableButton(submitButton);

    const encryptedUrl = "U2FsdGVkX1/SNIGWtjW4ltoDjburF2qMq7UWDIWDap7jTqF+JG8f1twkG1l/OlIkKmyvPY0nIkLVTxhvjiTi+pW6Hiw6gIKkOOJUVE/Np8Z7nQgpa9xnPRmuhngyrd2efgpAnVgCAcfWizEwUlFiZpkaGYeO5DZW6ivEz2M/Op4gHMLy7F8yLtmYiZsswBtf";
 
    var MartechDataPass = sessionStorage.getItem('MartechDataPass');       
    const decryptedUrl = decryptURL(encryptedUrl, MartechDataPass);

    fetch(decryptedUrl)
        .then(response => response.json())
        .then(data => {
            segments_cart2 = data.slice(1); // Store data in cart, skipping header row
            sessionStorage.setItem('segments_cart2', JSON.stringify(segments_cart2));
            sessionStorage.setItem('segments_cart', JSON.stringify(segments_cart2));
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
            loaderContainer.style.display = "none"; // Hide spinner
            loaderContainerx.style.display = "none"; // Hide spinner
            resetSubmitButton(submitButton);
            populateSegmentDropdown();
            updateReachableCountallcontacts();
        });
}


function populateSegmentDropdown() {
    let segments_cart2 = JSON.parse(sessionStorage.getItem('segments_cart2')) || [];

    const submitButton = document.getElementById("nextStep");
    const errorMessage = document.getElementById('box2');
    let campaign_name = document.getElementById("campaign_name").value.trim(); // Trim to remove extra spaces

    if (!campaign_name) {
        document.getElementById('almessage').innerHTML = "Campaign Name is mandatory!"
        showError(errorMessage, submitButton);
        return;
    }

    const segmentDropdown = document.getElementById("listSegment");
    segmentDropdown.innerHTML = '<option value="">Segments</option>'; // Reset dropdown

    segments_cart2.forEach(row => {
        if (row.length > 3) { // Ensure row has data and reachability count exists
            let segmentName = row[0]; // First column contains the segment name
            let option = document.createElement("option");
            option.value = segmentName;
            option.textContent = segmentName;
            option.dataset.reachability = row[3]; // Store reachability count in data attribute
            segmentDropdown.appendChild(option);
        }
    });

    document.getElementById("campaignForm").style.display = "none";
    document.getElementById("nextForm").style.display = "block";

    // Add event listener to update reachable count when selection changes
    segmentDropdown.addEventListener("change", updateReachableCount);
}

function updateReachableCountallcontacts() {
    const segmentDropdown = document.getElementById("listSegment");
    const reachableCountSpan = document.getElementById("reachableCount");
    let selectedOption = segmentDropdown.options[segmentDropdown.selectedIndex];

    const defaultOption = segmentDropdown.querySelector('option[value="ALL_CONTACTS"]');
    if (defaultOption) {
        segmentDropdown.value = "ALL_CONTACTS";
        reachableCountSpan.textContent = `Reachable Contacts: ${defaultOption.dataset.reachability}`;
    }
}



function updateReachableCount() {
    const segmentDropdown = document.getElementById("listSegment");
    const reachableCountSpan = document.getElementById("reachableCount");
    const selectedOption = segmentDropdown.options[segmentDropdown.selectedIndex];

    if (selectedOption.value) {
        reachableCountSpan.textContent = `Reachable Contacts: ${selectedOption.dataset.reachability}`;
    } else {
        reachableCountSpan.textContent = "Reachable Contacts: 0";
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const allContactsRadio = document.getElementById("allContacts");
    const listSegmentsRadio = document.getElementById("listSegments");
    const segmentDropdown = document.getElementById("listSegment");

    function toggleSegmentDropdown() {
        if (allContactsRadio.checked) {
            segmentDropdown.disabled = true;
            segmentDropdown.value = ""; // Reset dropdown selection
        } else {
            segmentDropdown.disabled = false;
        }
    }

    // Add event listeners to toggle dropdown based on selection
    allContactsRadio.addEventListener("change", toggleSegmentDropdown);
    listSegmentsRadio.addEventListener("change", toggleSegmentDropdown);
    toggleSegmentDropdown();

    // Initialize the correct state on page load
});





let whatsappcontent_cart2 = [];

function fetchDataAndStoreInCart2() {

    const listSegmentsRadio = document.getElementById("listSegments");
    const segmentDropdown = document.getElementById("listSegment").value;
    const submitButton = document.getElementById("nextStep2");
    const errorMessage = document.getElementById('box2');

    if (listSegmentsRadio.checked && segmentDropdown === "") {
        document.getElementById('almessage').innerHTML = "Segment Selection is mandatory!"
        showError(errorMessage, submitButton);
        return;
    }

    let whatsappcontent_cart2 = JSON.parse(sessionStorage.getItem('whatsappcontent_cart2')) || [];

    if (whatsappcontent_cart2.length !== 0) {
        document.getElementById("nextForm").style.display = "none";
        document.getElementById("messageForm").style.display = "block";
        populateTemplateDropdown();
        return;
    } 

    const loaderContainer = document.getElementById("loader2"); 
    loaderContainer.style.display = "flex"; // Show loading spinner
    const loaderContainery = document.getElementById("loadery"); 
    loaderContainery.style.display = "flex"; // Show loading spinner
    disableButton(submitButton);

    const encryptedUrl = "U2FsdGVkX1/jI3DihM4NBvZczFtVxwPvNwnma27AJ8mWUApINjf76e+qd1SupJciDyraO31x0Z7TubEWHwVBB8HGYWIl/z3LYrfqgCN4fAGyY69gcUriKT8jRIO3/WcrTXnNglcSjU4mz8yybDuwbhUSk4i8vF8cfe6JUukwlABUgb3vuFE/8aw19Ka5swFbocj3XauqMhs5yn17AtJLFA==";
 
    var MartechDataPass = sessionStorage.getItem('MartechDataPass');       
    const decryptedUrl = decryptURL(encryptedUrl, MartechDataPass);
    fetch(decryptedUrl)
        .then(response => response.json())
        .then(data => {
            whatsappcontent_cart2 = data.slice(1); // Store data in cart, skipping header row
            sessionStorage.setItem('whatsappcontent_cart2', JSON.stringify(whatsappcontent_cart2));
            sessionStorage.setItem('whatsappcontent_cart', JSON.stringify(whatsappcontent_cart2));
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
            document.getElementById("nextForm").style.display = "none";
            document.getElementById("messageForm").style.display = "block";
            populateTemplateDropdown();
        });
}

/*

let user_attributes_cart = [];

function fetchDataAndStoreInCart3() {

    let user_attributes_cart = JSON.parse(sessionStorage.getItem('user_attributes_cart')) || [];

    if (user_attributes_cart.length !== 0) {
        document.getElementById("nextForm").style.display = "none";
        document.getElementById("messageForm").style.display = "block";
        populateTemplateDropdown();
        return;
    } 

    const loaderContainer = document.getElementById("loader2"); 
    loaderContainer.style.display = "flex"; // Show loading spinner
    const loaderContainery = document.getElementById("loadery"); 
    loaderContainery.style.display = "flex"; // Show loading spinner
    const submitButton = document.getElementById("nextStep2");
    fetch("https://script.google.com/macros/s/AKfycbzXWL8oN0knVFt2ZV5w6CVSPvZ2iHtToxhQgqova7AobgeP6qEhp50R8lwVNLEndxSp/exec?sheet=ATTRIBUTES")
        .then(response => response.json())
        .then(data => {
            user_attributes_cart = data.slice(1); // Store data in cart, skipping header row
            sessionStorage.setItem('user_attributes_cart', JSON.stringify(user_attributes_cart));
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
            loaderContainer.style.display = "none"; // Hide spinner
            loaderContainery.style.display = "none"; // Hide spinner
            resetSubmitButton(submitButton);
            document.getElementById("nextForm").style.display = "none";
            document.getElementById("messageForm").style.display = "block";
            populateTemplateDropdown();
        });
}

*/

function populateTemplateDropdown() {
    let whatsappcontent_cart2 = JSON.parse(sessionStorage.getItem('whatsappcontent_cart2')) || [];

    const template_dropdown = document.getElementById("template_dropdown");
    template_dropdown.innerHTML = '<option value="">Select a Template</option>'; // Reset dropdown

    whatsappcontent_cart2.forEach(row => {
        if (row.length > 1) { // Ensure row has data and reachability count exists
            let templateName = row[0]; // First column contains the template name
            let option = document.createElement("option");
            option.value = templateName;
            option.textContent = templateName;
            template_dropdown.appendChild(option);
        }
    });

    // Event listener for template selection
    template_dropdown.addEventListener("change", function () {
        const selectedTemplate = this.value;

        // Find the selected template in cart2
        const selectedRow = whatsappcontent_cart2.find(row => row[0] === selectedTemplate);

        if (selectedRow) {
            const numberOfFields = parseInt(selectedRow[7]); // Get row[7] value
            const numberOfFieldsvalues = selectedRow[13]; // Get row[7] value

            // Call function to create input fields
            generateDynamicFields(numberOfFields, numberOfFieldsvalues);
        }
    });
}

function generateDynamicFields(numberOfFields, numberOfFieldsvalues) {
    const container = document.getElementById("dynamicVariableContainer");
    container.innerHTML = ""; // Clear previous fields

    // Ensure numberOfFieldsvalues is an array
    const valuesArray = Array.isArray(numberOfFieldsvalues) ? numberOfFieldsvalues : numberOfFieldsvalues.split(",").map(val => val.trim());

    for (let i = 0; i < numberOfFields; i++) {
        const colDiv = document.createElement("div");
        colDiv.className = "col-md-6 mb-3 px-3"; // Adds margin for spacing

        colDiv.innerHTML = `
            <label style="margin-left: 10px;">{{${i+1}}} *</label>
            <input type="text" class="form-control" style="margin-left: 10px; width: 350px;" required value="${valuesArray[i] || ''}" disabled>
        `;

        container.appendChild(colDiv);
    }
}


/*

// Function to populate options dynamically from cart3
function populateSegmentOptions() {
    let optionsHTML = `<option value="">Select an option</option>`;
    let user_attributes_cart = JSON.parse(sessionStorage.getItem('user_attributes_cart')) || [];
    
    user_attributes_cart.forEach(row => {
        if (row.length > 0) { // Ensure the row has data
            let attributeName = row[0]; // First column contains the attribute name
            optionsHTML += `<option value="${attributeName}">${attributeName}</option>`;
        }
    });

    return optionsHTML;
}

*/




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



document.addEventListener("DOMContentLoaded", function () {
    const sendNow = document.getElementById("sendnow");
    const sendLater = document.getElementById("sendlater");
    const scheduleTimeDiv = document.getElementById("scheduletime");
    const scheduleTimeInput = document.getElementById("scheduletimecalender");
    const sendNowLabel = document.querySelector("label[for='sendNowLabel']");
    const sendLaterLabel = document.querySelector("label[for='sendLaterLabel']");

    function toggleScheduleInput() {
        if (sendNow.checked) {
            scheduleTimeDiv.style.display = "none";
            scheduleTimeInput.disabled = true;
        } else {
            scheduleTimeDiv.style.display = "flex";
            scheduleTimeInput.disabled = false;
        }
    }

    sendNow.addEventListener("change", toggleScheduleInput);
    sendLater.addEventListener("change", toggleScheduleInput);
    sendNowLabel.addEventListener("click", () => sendNow.click());
    sendLaterLabel.addEventListener("click", () => sendLater.click());

    // Initialize the state on page load
    toggleScheduleInput();
});




document.getElementById("nextStep3").addEventListener("click", function () {
    const submitButton = document.getElementById("nextStep3");
    const errorMessage = document.getElementById('box2');

    const preview_template = document.getElementById('template_dropdown').value;
    
    if (preview_template === "") {
        document.getElementById('almessage').innerHTML = "Please select template!"
        showError(errorMessage, submitButton);
        return;
    }


    let allFieldsFilled = true;
    let selects = document.querySelectorAll(".dynamic-dropdown"); // Select only dynamically generated dropdowns

    selects.forEach(select => {
        if (select.value.trim() === "") {
            allFieldsFilled = false;
            select.style.border = "2px solid red"; // Highlight empty fields
        } else {
            select.style.border = ""; // Reset border if filled
        }
    });

    if (!allFieldsFilled) {
        document.getElementById('almessage').innerHTML = "Attribute maping is mandatory!"
        showError(errorMessage, submitButton);
    } else {
        // Proceed with next step logic here
        document.getElementById("messageForm").style.display = "none";
        document.getElementById("schedulecampaignform").style.display = "block";
    }
});



// Function to handle the server response
function handleResponse1(response, submitButton) {
    const successMessage = document.getElementById('box');
    const alertMessagegreen = document.getElementById('success');
    const alertMessagered = document.getElementById('almessage');
    const errorMessage = document.getElementById('box2');

    if (response.status === "success") {
        let campaignsummary_cart = JSON.parse(sessionStorage.getItem('campaignsummary_cart')) || []

        const campaignName = document.getElementById('summary_campaign4').innerText;
        let when = document.getElementById('when').innerText;

        if (when === "Send Now") {
            when = new Date().toISOString(); // Adding timestamp
        } 

        // Get new row values from the input fields
        const newRow = [
            response.message,
            campaignName,
            "WHATSAPP",
            "",
            "",
            when,
            "",
            "",
            "0",
            "0",
            "0",
            "0"
        ];


        campaignsummary_cart.unshift(newRow);
        sessionStorage.setItem('campaignsummary_cart', JSON.stringify(campaignsummary_cart));

        alertMessagegreen.textContent = "Request Submitted!";
        successMessage.style.display = "block";
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);
        window.location.href = "martechcloudcampaignsummary.html";


    } else {
        alertMessagered.textContent = response.message || "Failed to submit request. Please try again.";
        showError(errorMessage, submitButton);
    }

    // Enable the submit button
    enableButton(submitButton);
}


document.getElementById("publish_campaign").addEventListener("click", async () => {
    const submitButton = document.getElementById('publish_campaign');
    const errorMessage = document.getElementById('box2');
    const alertMessagered = document.getElementById('almessage');

    // Get input values

    const campaignName = document.getElementById('summary_campaign4').innerText;
    const selectedAudience = document.getElementById('summary_audience3').innerText;
    const excludedContacts = document.getElementById('summary_exclude3').innerText;
    const waTemplateName = document.getElementById('template_name2').innerText;
    const when = document.getElementById('when').innerText;

    if (when === "Send Later") {
        alertMessagered.textContent = "Please pick a time to schedule a campaign.";
        showError(errorMessage, submitButton);
        return;
    }

    // Disable the submit button while processing
    disableButton(submitButton);

    const encryptedUrl = "U2FsdGVkX1/8r2UM3Oi0yR9VI/LK2t4m3U9RdbJoKJuNyEUEBRsW/1UQC2yj/QsoEG9NQ03LPcBRkfdUIsZO+5QXbLT0hnOD0X4BziSnzTRWniaXqWFpTYBIF0+Ohfeb6Z0cHbp4W/kHaEyToGowMymv2aX2CPgTp8gQm8Jr7z8G5QLuMqOqQLCUtfa0gXjA";
 
    var MartechDataPass = sessionStorage.getItem('MartechDataPass');       
    const decryptedUrl = decryptURL(encryptedUrl, MartechDataPass);

    // Construct the URL
    const url = new URL(decryptedUrl);
    url.searchParams.append("usecase", "createcampaign");
    url.searchParams.append("campaignName", campaignName);
    url.searchParams.append("campaignchannel", "WHATSAPP");
    url.searchParams.append("selectedAudience", selectedAudience);
    url.searchParams.append("excludedContacts", excludedContacts);
    url.searchParams.append("waTemplateName", waTemplateName);
    url.searchParams.append("when", when);


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

function decryptURL(encryptedUrl, password) {
    return CryptoJS.AES.decrypt(decodeURIComponent(encryptedUrl), password).toString(CryptoJS.enc.Utf8);
}