function decryptURL(encryptedUrl, password) {
    var decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encryptedUrl), password).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }
var encryptedUrl = "U2FsdGVkX1+vjpjaTPGQINTXDoLZlOiIP/lyWpUCDOmmKjols5B/MUFeLHkrkXTxLxekibE+3ij7X4MJ3TOMl3riJ2aYQ4buWmeCxIEr8VudaByRllAawGvZ+Ig4JgRE1m6wRVQbprusZ7Pl4ZXJNuYE9s6uz/9wJwmZ1P8+AgDuYf2FQiW2VG7+MsIIg6to";
var password = sessionStorage.getItem("pass");

function handleResponse1(response) {
    if (response && response.result === "success") {
        var firstNamedetails = document.getElementById("firstNamedetails").value;
        var lastNamedetails = document.getElementById("lastNamedetails").value;
        var fullName = firstNamedetails + " " + lastNamedetails;
        sessionStorage.setItem("profileusername", fullName);
        var emaildetails = document.getElementById("emaildetails").value;
        var phoneNumberdetails = document.getElementById("phoneNumberdetails").value;

        sessionStorage.setItem("firstNamedetails", firstNamedetails);
        sessionStorage.setItem("lastNamedetails", lastNamedetails);
        sessionStorage.setItem("emaildetails", emaildetails);
        sessionStorage.setItem("phoneNumberdetails", phoneNumberdetails);
        
        document.getElementById('submitbutton').style.backgroundColor = '';
        document.getElementById('submitbutton').style.border = '';
        var box = document.getElementById("box");
        box.style.display = "inline-block";
        setTimeout(function () {
            profilerefresh()
            box.style.display = "none";
        }, 2000);
    } else {
        document.getElementById('submitbutton').style.backgroundColor = '';
        document.getElementById('submitbutton').style.border = '';
        var box2 = document.getElementById("box2");
        box2.style.display = "inline-block";
        setTimeout(function () {
            box2.style.display = "none";    
        }, 2000);
    }
}


function adddetails() {
    document.getElementById('submitbutton').style.backgroundColor = 'lightgrey';
    document.getElementById('submitbutton').style.border = 'lightgrey';
    var key = "profile";
    var name = "";
    var number = "";
    var email = "";
    var age = "";
    var usernamedetails = document.getElementById("usernamedetails").value;
    var roledetails = document.getElementById("roledetails").value;
    var firstNamedetails = document.getElementById("firstNamedetails").value;
    var lastNamedetails = document.getElementById("lastNamedetails").value;
    var emaildetails = document.getElementById("emaildetails").value;
    var phoneNumberdetails = document.getElementById("phoneNumberdetails").value;
    

    if (phoneNumberdetails !== "") {
        var phonePattern = /^[0-9]{12}$/;
        if (!phonePattern.test(phoneNumberdetails)) {
            document.getElementById('almessage').innerHTML = "Phone Number is not valid!";
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            setTimeout(function () {
                box2.style.display = "none";
                document.getElementById('submitbutton').style.backgroundColor = '';
                document.getElementById('submitbutton').style.border = '';
            }, 3000);
            return;
        }
    }

    if (emaildetails !== "") {
        var re = /\S+@\S+\.\S+/;
        if (!re.test(emaildetails)) {
            document.getElementById('almessage').innerHTML = "Email is not valid!"
            var box2 = document.getElementById("box2");
                box2.style.display = "inline-block";
                setTimeout(function () {
                    box2.style.display = "none";
                    document.getElementById('submitbutton').style.backgroundColor = '';
                    document.getElementById('submitbutton').style.border = '';
                }, 3000);
            return;
        }
    }

    var script = document.createElement('script');
    var decryptedUrl = decryptURL(encryptedUrl, password);
    script.src = decryptedUrl +
                 "?callback=handleResponse1" +
                 "&key=" + encodeURIComponent(key) +
                 "&name=" + encodeURIComponent(name) +
                 "&number=" + encodeURIComponent(number) +
                 "&email=" + encodeURIComponent(email) +
                 "&age=" + encodeURIComponent(age)+
                 "&usernamedetails=" + encodeURIComponent(usernamedetails)+
                 "&roledetails=" + encodeURIComponent(roledetails)+
                 "&firstNamedetails=" + encodeURIComponent(firstNamedetails)+
                 "&lastNamedetails=" + encodeURIComponent(lastNamedetails)+
                 "&emaildetails=" + encodeURIComponent(emaildetails)+
                 "&phoneNumberdetails=" + encodeURIComponent(phoneNumberdetails);
    document.body.appendChild(script);
}