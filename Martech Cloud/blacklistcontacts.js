function decryptURL(encryptedUrl, password) {
  var decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encryptedUrl), password).toString(CryptoJS.enc.Utf8);
  return decrypted;
}
var encryptedUrl = "U2FsdGVkX1/xwj7h01dOahh9ZglmdtbB3H2hA1FgMO8Y/b9vjFjuLbs5DTFPog6mT7SqFhY/EbD26PeGUfKyBDlA2kHfTvGjjeZXSMg7VPMKnu916J5G5pPv73ypTmEG9IcqBzeVUwKs6jLqDC231A+a0SOcK/AQ830aFeWayuQ3MB5yO5NtHWPCJsePd5al";
var password = sessionStorage.getItem("pass");

function blacklistemail() {
    document.getElementById('blacklistemail').style.backgroundColor = 'lightgrey';
    document.getElementById('blacklistemail').style.border = 'lightgrey';
    var contact = document.getElementById('name').value;
    var reason = document.getElementById('reason').value;
    var password = document.getElementById('password').value;
    var phoneRadio = "email"

    var formData = new FormData();
    formData.append('contact', contact);
    formData.append('reason', reason);
    formData.append('password', password);
    formData.append('phoneRadio', phoneRadio);
    
    var decryptedUrl = decryptURL(encryptedUrl, password);
    fetch(decryptedUrl, {
    method: "POST",
    body: formData,
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.redirectUrl) {
          var box = document.getElementById("box");
          box.style.display = "inline-block";
          document.getElementById("contactForm").reset();
          document.getElementById('blacklistemail').style.backgroundColor = '';
          document.getElementById('blacklistemail').style.border = '';
          setTimeout(function () {
            box.style.display = "none";
          }, 3000);
        } else {
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            document.getElementById('blacklistemail').style.backgroundColor = '';
            document.getElementById('blacklistemail').style.border = '';
            setTimeout(function () {
              box2.style.display = "none";
            }, 3000);
        }
    })
    .catch(function (error) {
        console.error("Error:", error);
        loadingSpinner.style.display = "none";
    });
}



function blacklistphone() {
    document.getElementById('blacklistphone').style.backgroundColor = 'lightgrey';
    document.getElementById('blacklistphone').style.border = 'lightgrey';
    var contact = document.getElementById('phone1').value;
    var reason = document.getElementById('reason1').value;
    var password = document.getElementById('password1').value;
    var phoneRadio1 = "Phone"

    var formData = new FormData();
    formData.append('contact', contact);
    formData.append('reason', reason);
    formData.append('password', password);
    formData.append('phoneRadio', phoneRadio1);

    var decryptedUrl = decryptURL(encryptedUrl, password);
    fetch(decryptedUrl, {
    method: "POST",
    body: formData,
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.redirectUrl) {
          var box = document.getElementById("box");
          box.style.display = "inline-block";
          document.getElementById("contactForm1").reset();
          document.getElementById('blacklistphone').style.backgroundColor = '';
          document.getElementById('blacklistphone').style.border = '';
          setTimeout(function () {
            box.style.display = "none";
          }, 3000);
        } else {
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            document.getElementById('blacklistphone').style.backgroundColor = '';
            document.getElementById('blacklistphone').style.border = '';
            setTimeout(function () {
              box2.style.display = "none";
            }, 3000);
        }
    })
    .catch(function (error) {
        console.error("Error:", error);
        loadingSpinner.style.display = "none";
    });
}
                
                  

                    
                  
                  
              