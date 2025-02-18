
/**
 * Contact Master
 */



'use strict';



let cart = [];

function fetchDataAndStoreInCart() {
    const loaderContainer = document.getElementById("loader"); 
    loaderContainer.style.display = "flex"; // Show loading spinner

    fetch("https://script.google.com/macros/s/AKfycbzXWL8oN0knVFt2ZV5w6CVSPvZ2iHtToxhQgqova7AobgeP6qEhp50R8lwVNLEndxSp/exec?sheet=CAMPAIGN_DATA_TABLE")
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
    dataTable.getElementsByTagName('thead')[0].innerHTML = `
        <tr>
            <th>CAMPAIGN NAME</th>
            <th>SENT ON</th>
            <th>CAMPAIGN CHANNEL</th>
            <th class="text-center">SENT</th>
            <th class="text-center">DELIVERED</th>
            <th class="text-center">OPENED</th>
            <th class="text-center">CLICKED</th>
            <th>Actions</th>
        </tr>
    `;

    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; // Clear previous data

    cart.forEach(rowData => {
        const newRow = document.createElement('tr');

        // Extract only the first 6 columns
        const [campaignid, campaignname, campaignchannel, targetedsegment, blacklistflag, senton, templatename, campaignstatus ,sent, delivered, opened, clicked] = rowData.slice(0, 12);

        // Convert UTC timestamp to IST (Indian Standard Time)
        const date = new Date(senton); 
        const options = {
            weekday: 'short', 
            year: 'numeric',
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        const istTime = date.toLocaleString('en-IN', options); 

        // Format the time to match the desired format: "Feb 10, 2025 05:30 PM"
        const formattedTime = istTime.replace(',', '').replace(' AM', 'AM').replace(' PM', 'PM');

        // Create Segment Name cell with Info icon
        const segmentCell = document.createElement('td');
        segmentCell.innerHTML = `
            <div>
                <strong>${campaignname}</strong>
                <div style="font-size: 12px; color: #6c757d;">ID: ${campaignid}</div>
            </div>
        `;
        newRow.appendChild(segmentCell);

        // Create refreshed date cell
        const refreshedCell = document.createElement('td');
        refreshedCell.textContent = formattedTime;
        newRow.appendChild(refreshedCell);
        
        const campaignchannelcell = document.createElement('td');
        campaignchannelcell.textContent = campaignchannel;
        newRow.appendChild(campaignchannelcell);

        [sent, delivered, opened, clicked].forEach(cellData => {
            const newCell = document.createElement('td');
            newCell.innerHTML = `<span class="text-primary fw-bold">${cellData}</span>`;
            newCell.classList.add("text-center");
            newRow.appendChild(newCell);
        });

        // Actions Dropdown
        const actionsCell = document.createElement('td');
        actionsCell.innerHTML = `
            <div class="dropdown">
                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" id="download_report" href="#" onclick="downloadReport('${campaignname}')">
                        <i class="bx bx-envelope me-1"></i> Download Report
                    </a>
                </div>
            </div>
        `;
        newRow.appendChild(actionsCell);
        tableBody.appendChild(newRow);
    });

    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Apply filter by date range (From and To)
    document.getElementById("fromDate").addEventListener('change', function() {
        const fromDate = new Date(this.value);
        const toDate = document.getElementById("toDate").value ? new Date(document.getElementById("toDate").value) : null;
        filterTableByDateRange(fromDate, toDate);
    });

    document.getElementById("toDate").addEventListener('change', function() {
        const fromDate = document.getElementById("fromDate").value ? new Date(document.getElementById("fromDate").value) : null;
        const toDate = new Date(this.value);
        filterTableByDateRange(fromDate, toDate);
    });

    // Apply search by campaign name
    document.getElementById("searchBox").addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        filterTableByName(searchText);
    });

    document.getElementById("searchBox2").addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        filterTableByName(searchText);
    });
}

function filterTableByDateRange(fromDate, toDate) {
    const rows = document.querySelectorAll("#dataTable tbody tr");
    rows.forEach(row => {
        const dateText = row.cells[1].textContent; // Date in SENT ON column
        const rowDate = new Date(dateText);
        
        if ((fromDate && rowDate >= fromDate) && (!toDate || rowDate <= toDate)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

function filterTableByName(searchText) {
    const rows = document.querySelectorAll("#dataTable tbody tr");
    rows.forEach(row => {
        const campaignName = row.cells[0].textContent.toLowerCase();
        if (campaignName.includes(searchText)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}




document.getElementById('refreshButton').addEventListener('click', function() {
    fetchDataAndStoreInCart(); // Call your loadtable function when the button is clicked
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


document.getElementById("clearFilters").addEventListener('click', function() {
    // Clear the date inputs
    document.getElementById("fromDate").value = '';
    document.getElementById("toDate").value = '';
    
    // Clear the search box
    document.getElementById("searchBox").value = '';
    
    // Call the function to reset the table display
    loadTable();
});


async function downloadReport(campaignname) {
    const submitButton = document.getElementById('download_report');
    const errorMessage = document.getElementById('box2');
    const successMessage = document.getElementById('box');
    const alertMessage = document.getElementById('almessage');
    const alertMessagegreen = document.getElementById('success');

    alertMessagegreen.textContent = "Processing!";
    successMessage.style.display = "block";
    setTimeout(() => {
        successMessage.style.display = "none";
    }, 6000);

    // Construct the URL for the Apps Script web app (replace with your actual web app URL)
    const url = new URL("https://script.google.com/macros/s/AKfycbzkgR57couUXfhmao-0GP4khq5WVVDza3m3bnki9izyBV-vErRBkRg0fPfuDcBUA4ulUQ/exec");

    // Append all the captured data as query parameters
    url.searchParams.append("usecase", "downloadreport");
    url.searchParams.append("campaignname", campaignname);
    url.searchParams.append("email", "helpdesk.martechcloud@gmail.com");

    try {
        // Make the API call
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        handleResponse1(data, submitButton);
    } catch (error) {
        alertMessage.textContent = "An unexpected error occurred. Please try again.";
        showError(errorMessage, submitButton);
    }
}


// Function to handle the server response
function handleResponse1(response, submitButton) {
    const successMessage = document.getElementById('box');
    const alertMessagegreen = document.getElementById('success');
    const alertMessagered = document.getElementById('almessage');
    const errorMessage = document.getElementById('box2');

    if (response.status === "success") {
        alertMessagegreen.textContent = "Request Submitted Sucessfully!";
        successMessage.style.display = "block";
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);

    } else {
        alertMessagered.textContent = response.message || "Failed to punch Request. Please try again.";
        showError(errorMessage, submitButton);
    }
    // Enable the submit button
    enableButton(submitButton);
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

