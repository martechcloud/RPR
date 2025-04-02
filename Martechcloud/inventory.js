
/**
 * Contact Master
 */



'use strict';



let data2 = [];

function fetchDataAndStoreInCart() {
    const loaderContainer = document.getElementById("loader"); 
    loaderContainer.style.display = "flex"; // Show loading spinner

    const encryptedUrl = "U2FsdGVkX1+lJ+VLtI9uTGd3PVgOyI1F6Gfj5Tk59xTfAPQ+iAfx5P4Z/hcfBEFDMeLhSuRK7nB9vXF+5AV58Z3dXviB57duY4GqrwAB9zSG3RX+bY7wu7Pxto/y+/lJOEBZVQ3/auByikIovhu6S0Q3rgiPoS8V6iTEecB0axYxn5j0i7yLHlEVMB0+SVywYRgSsaz5M+yJohfL4t+N1w==";
 
    var MartechDataPass = sessionStorage.getItem('MartechDataPass'); 
    const decryptedUrl = decryptURL(encryptedUrl, MartechDataPass);

    fetch(decryptedUrl)
        .then(response => response.json())
        .then(data => {
            data2 = data.slice(1); // Store data in cart, skipping header row
            sessionStorage.setItem('data2', JSON.stringify(data2));
            loadTable(); // Call loadTable to update UI
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
            loaderContainer.style.display = "none"; // Hide spinner
        });
}



  function loadTable() {
    let data22 = JSON.parse(sessionStorage.getItem('data2')) || [];
    console.log(data22);

    let data2 = data22.filter(item => Array.isArray(item) && item.length > 2 && item[2] === "Home");
    console.log(data2);

    if (data2.length === 0) {
        fetchDataAndStoreInCart();  // Ensure this function is defined
    }

    let tableBody = document.getElementById("productTableBody");
    tableBody.innerHTML = "";

    data2.forEach(item => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${item[0]}</td>
            <td>${item[1]}</td>
            <td><input type="number" id="qty-${item[0]}" value="${item[5]}" class="form-control" disabled></td>
            <td>${item[6]}</td>
            <td>
                <button class="btn btn-primary btn-sm" id="btn-${item[0]}" onclick="editQuantity('${item[0]}')">Add Quantity</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function editQuantity(productId) {
    let qtyInput = document.getElementById(`qty-${productId}`);
    let btn = document.getElementById(`btn-${productId}`);

    if (!qtyInput || !btn) {
        console.error(`Element not found for Product ID: ${productId}`);
        return;
    }
    sessionStorage.setItem('currentqtyValue', qtyInput.value);

    qtyInput.removeAttribute("disabled");
    qtyInput.focus();

    btn.innerText = "Update Quantity";
    btn.classList.replace("btn-primary", "btn-success");
    btn.setAttribute("onclick", `updateQuantity('${productId}')`);
}

async function updateQuantity(productId) {
    let submitButton = document.getElementById(`btn-${productId}`);
    const errorMessage = document.getElementById("box2");
    const successMessage = document.getElementById("box");
    const alertMessagered = document.getElementById("almessage");
    const alertMessagegreen = document.getElementById("success");
    let qtyInput = document.getElementById(`qty-${productId}`);

    let currentqtyValue = sessionStorage.getItem('currentqtyValue');
    console.log(currentqtyValue);
    console.log(qtyInput.value)

    if (Number(qtyInput.value) < Number(currentqtyValue)) {
        alertMessagered.textContent = "Quantity can not be reduced";
        showError(errorMessage, submitButton);
        return;
    }

    let newQty = parseInt(qtyInput.value) || 0;
    const encryptedUrl = "U2FsdGVkX1/8r2UM3Oi0yR9VI/LK2t4m3U9RdbJoKJuNyEUEBRsW/1UQC2yj/QsoEG9NQ03LPcBRkfdUIsZO+5QXbLT0hnOD0X4BziSnzTRWniaXqWFpTYBIF0+Ohfeb6Z0cHbp4W/kHaEyToGowMymv2aX2CPgTp8gQm8Jr7z8G5QLuMqOqQLCUtfa0gXjA";
    var MartechDataPass = sessionStorage.getItem('MartechDataPass');     
    const decryptedUrl = decryptURL(encryptedUrl, MartechDataPass);

    const url = new URL(decryptedUrl);
    url.searchParams.append("productId", productId);
    url.searchParams.append("newQty", newQty);
    url.searchParams.append("usecase", "updateinventory");

    try {
        const response = await fetch(url);
        const data = await response.json();
        handleResponse2(data, submitButton);
    } catch (error) {
        alertMessagered.textContent = "An error occurred while updating the product.";
        showError(errorMessage, submitButton);
        return;
    }

    console.log(`Product ID: ${productId}, Updated Quantity: ${newQty}`);

    qtyInput.setAttribute("disabled", true);

    submitButton.innerText = "Add Quantity";
    submitButton.classList.replace("btn-success", "btn-primary");
    submitButton.setAttribute("onclick", `editQuantity('${productId}')`);

    let data2 = JSON.parse(sessionStorage.getItem('data2')) || [];
    const index = data2.findIndex(item => item[0] === productId && item[2] === "Home");

    if (index !== -1) {
        data2[index][5] = newQty;
    } 
    sessionStorage.setItem('data2', JSON.stringify(data2));
}

document.getElementById('refreshButton').addEventListener('click', function() {
    fetchDataAndStoreInCart();
});

document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#productTableBody tr');

    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        row.style.display = rowText.includes(searchTerm) ? '' : 'none';
    });
});

function decryptURL(encryptedUrl, password) {
    try {
        let decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encryptedUrl), password).toString(CryptoJS.enc.Utf8);
        return decrypted || "";
    } catch (error) {
        console.error("Decryption failed", error);
        return "";
    }
}

function disableButton(button) {
    button.style.backgroundColor = "lightgrey";
    button.style.border = "lightgrey";
    button.disabled = true;
}

function resetSubmitButton(button) {
    button.style.backgroundColor = "";
    button.style.border = "";
    button.disabled = false;
}

function showError(errorMessage, button) {
    errorMessage.style.display = "block";
    setTimeout(() => {
        errorMessage.style.display = "none";
    }, 3000);
    resetSubmitButton(button);
}

function handleResponse2(response, submitButton) {
    const errorMessage = document.getElementById("box2");
    const successMessage = document.getElementById("box");
    const alertMessagered = document.getElementById("almessage");
    const alertMessagegreen = document.getElementById("success");

    if (response.status === "success") {
        alertMessagegreen.textContent = "Quantity Updated!";
        sessionStorage.removeItem('currentqtyValue');
        successMessage.style.display = "block";
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);
        resetSubmitButton(submitButton);
    } else {
        alertMessagered.textContent = `Error: ${response.message || "Unable to update quantity."}`;
        showError(errorMessage, submitButton);
    }
}
