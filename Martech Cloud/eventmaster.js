/**
 * Events Master
 */
'use strict';

function decryptURL(encryptedUrl, password) {
    var decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encryptedUrl), password).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }
var encryptedUrl1 = "U2FsdGVkX1+6wh6hPiR0iKZxrB6YymWYhJVCYw1Q2MyjnN7wMjC4nB3IOZesOWLY0AMAl+/wkRm3aLNcLNU/C0C3rKTT8JbWWANWQ2U0lTuUR1Ua/kQEyRrF19MKgSQ85ZDQI+uQ54CNfauYSZSEk525UnVjsadCpaeLIuqlkQucr8r2fYvTA+PC2nrD2Q14vD7NPd26NkrcZ6YdtoNj6w==";
var password = "secret";


function loadtable() {
    var decryptedUrl = decryptURL(encryptedUrl1, password);
    var dataTable = document.getElementById("dataTable");
    dataTable.getElementsByTagName('tbody')[0].innerHTML = ''; 
    fetch(decryptedUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#dataTable tbody');
            data.slice(1).forEach(rowData => {
                const newRow = document.createElement('tr');
                rowData.forEach(cellData => {
                    const newCell = document.createElement('td');
                    newCell.textContent = cellData;
                    newRow.appendChild(newCell);
                });
                tableBody.appendChild(newRow);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
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