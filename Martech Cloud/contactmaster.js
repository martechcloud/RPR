/**
 * Contact Master
 */



'use strict';

function decryptURL(encryptedUrl, password) {
    var decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encryptedUrl), password).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }
var encryptedUrl1 = "U2FsdGVkX1+AMu46XfirrQRngfG3TMOJhavAIojuutPwpr928U3qhhV48Ze/lmBmyVnFDuXzK3TPMYp+KuevsGKI9LaVc0cGZBcL9R+iEBInLkdgZygtnzPP36yJBzXWj00SyuRGp1Ui6HRnl20eeMxMwmzQmfxHpCOeTC2/32L0GudFfliCevbJDFMvRXoy";
var encryptedUrl2 = "U2FsdGVkX1+7rLFZmXqm1mLp5E+HPy5SUXO5/IRhkQ9EqDBDiwDJs9SUMbBhhnwQsl7oaFQzG0hIefP6xRAARKASxPATG+EKF6agPjaBaCHKOj+ydme3DncGSN//lKZf+ba5A5ZOmNNYu8o3GyFWkntA3iTkUwymRuNF5pTdM99qB+ZOex89/p/6DM8DV6SK";
var password = "secret";


function loadtable() {
    var decryptedUrl = decryptURL(encryptedUrl1, password);
    var dataTable = document.getElementById("dataTable");
    dataTable.getElementsByTagName('tbody')[0].innerHTML = ''; 
    console.log(decryptedUrl)
    fetch("https://script.google.com/macros/s/AKfycbzXWL8oN0knVFt2ZV5w6CVSPvZ2iHtToxhQgqova7AobgeP6qEhp50R8lwVNLEndxSp/exec?sheet=CUSTOMER_DATA_TABLE")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#dataTable tbody');
            data.slice(1).forEach(rowData => {
                const newRow = document.createElement('tr');
                
                // Extract primary key from the first cell
                const primaryKey = rowData[0];
                const customername = rowData[1];
                const phonenumber = rowData[2];
                const email = rowData[3];
                const age = rowData[4];

                rowData.forEach(cellData => {
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
                            <a class="dropdown-item" href="#" onclick="openModal('${primaryKey}','${customername}', '${phonenumber}','${email}', '${age}' )">
                                <i class="bx bx-pencil me-1"></i> Edit
                            </a>
                        </div>
                    </div>
                `;

                newRow.appendChild(actionsCell);
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

function handleResponse2(response) {
    if (response && response.result === "success") {
        document.getElementById('editButton').style.backgroundColor = '';
        document.getElementById('editButton').style.border = '';
        $('#largeModal').modal('hide');
        var box = document.getElementById("box1");
        box.style.display = "inline-block";
        setTimeout(function () {
            box.style.display = "none";
            loadtable();
        }, 2000);
    } else {
        document.getElementById('editButton').style.backgroundColor = '';
        document.getElementById('editButton').style.border = '';
        $('#largeModal').modal('hide');
        var box2 = document.getElementById("box2");
        box2.style.display = "inline-block";
        setTimeout(function () {
            box2.style.display = "none";
        }, 2000);
    }
}

function editcontact() {
    document.getElementById('editButton').style.backgroundColor = 'lightgrey';
    document.getElementById('editButton').style.border = 'lightgrey';
    var key = document.getElementById("primarykey").value;
    var name = document.getElementById("customername").value;
    var number = document.getElementById("phonenumber").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;

    if (number !== "") {
        var phonePattern = /^[0-9]{12}$/;
        if (!phonePattern.test(number)) {
            document.getElementById('almessage').innerHTML = "Phone Number is not valid!";
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            setTimeout(function () {
                box2.style.display = "none";
                document.getElementById('editButton').style.backgroundColor = '';
                document.getElementById('editButton').style.border = '';
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
                    document.getElementById('editButton').style.backgroundColor = '';
                    document.getElementById('editButton').style.border = '';
                }, 3000);
            return;
        }
    }

    var script = document.createElement('script');
    var decryptedUrl = decryptURL(encryptedUrl2, password);
    script.src = decryptedUrl +
                 "?callback=handleResponse2" +
                 "&key=" + encodeURIComponent(key) +
                 "&name=" + encodeURIComponent(name) +
                 "&number=" + encodeURIComponent(number) +
                 "&email=" + encodeURIComponent(email) +
                 "&age=" + encodeURIComponent(age);
    document.body.appendChild(script);
}