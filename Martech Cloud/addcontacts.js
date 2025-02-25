
function decryptURL(encryptedUrl, password) {
    var decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encryptedUrl), password).toString(CryptoJS.enc.Utf8);
    return decrypted;
}
var encryptedUrl1 = "U2FsdGVkX1/pY4u5LflKTMCVuvTTftmbslAoTb66tzE7wF6O5qQUNDwJBUMcJCbfecGVcDOjNNHfSewjP31pPKNMh92jNI5LrZeM3vKQgu5BerkUYXBpZUxbgOUtt3LrEkI1Gz/4q7pg5/pHA4FSgJaTHaolJ5+7ZB1LQJie2ycI4QtBLxuxxYM3RlRrcIXN";
var encryptedUrl2 = "U2FsdGVkX1+4pBsIt87Cq+jf+FmFgD0E0vfSaOb52pBsHYeR+WUcrp42RAB86rXqlr7Y73pJMG9dFxScQRgi5D99p0+HDn63Ju5HS7lGpqxkHE/fwYMn5P0zFgj5sH2Le0UM1Y08pv4Pahe8KUktx2+1O0YxZryd5u5McD/u6hL1DowFNkn0eQkdOC7e97m4";
var password = "secret";

function handleResponse1(response) {
    if (response && response.result === "success") {
        var submitButton = document.getElementById('submitbutton1')
        submitButton.style.backgroundColor = '';
        submitButton.style.border = '';
        submitButton.disabled = false;

        var submitButton2 = document.getElementById('submitbutton2')
        submitButton2.style.backgroundColor = '';
        submitButton2.style.border = '';
        submitButton2.disabled = false;

        var box = document.getElementById("box");
        box.style.display = "inline-block";
        setTimeout(function () {
            box.style.display = "none";
            document.getElementById("dataForm1").reset();
            document.getElementById("dataForm2").reset();
        }, 2000);
    } else {
        var submitButton = document.getElementById('submitbutton1')
        submitButton.style.backgroundColor = '';
        submitButton.style.border = '';
        submitButton.disabled = false;

        var submitButton2 = document.getElementById('submitbutton2')
        submitButton2.style.backgroundColor = '';
        submitButton2.style.border = '';
        submitButton2.disabled = false;

        var box2 = document.getElementById("box2");
        box2.style.display = "inline-block";
        setTimeout(function () {
            box2.style.display = "none";    
        }, 2000);
    }
}


function addcontact1() {
    var submitButton = document.getElementById('submitbutton1')
    submitButton.style.backgroundColor = 'lightgrey';
    submitButton.style.border = 'lightgrey';
    submitButton.disabled = true;

    var key = document.getElementById("key").value;
    var name = document.getElementById("name").value;
    var number = document.getElementById("number").value;
    var email = document.getElementById("email").value;

    if (number !== "") {
        var phonePattern = /^[0-9]{12}$/;
        if (!phonePattern.test(number)) {
            document.getElementById('almessage').innerHTML = "Phone Number is not valid!";
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            setTimeout(function () {
                box2.style.display = "none";
                document.getElementById('submitbutton1').style.backgroundColor = '';
                document.getElementById('submitbutton1').style.border = '';
                submitButton.disabled = false;
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
                    document.getElementById('submitbutton1').style.backgroundColor = '';
                    document.getElementById('submitbutton1').style.border = '';
                    submitButton.disabled = false;
                }, 3000);
            return;
        }
    }

    var script = document.createElement('script');
    var decryptedUrl1 = decryptURL(encryptedUrl1, password);
    script.src = decryptedUrl1 +
                 "?callback=handleResponse1" +
                 "&key=" + encodeURIComponent(key) +
                 "&name=" + encodeURIComponent(name) +
                 "&number=" + encodeURIComponent(number) +
                 "&email=" + encodeURIComponent(email);
    document.body.appendChild(script);
}


function addcontact2() {
    var submitButton2 = document.getElementById('submitbutton2')
    submitButton2.style.backgroundColor = 'lightgrey';
    submitButton2.style.border = 'lightgrey';
    submitButton2.disabled = true;

    var key = document.getElementById("key1").value;
    var name = document.getElementById("name1").value;
    var number = document.getElementById("number1").value;
    var email = document.getElementById("email1").value;
    var age = document.getElementById("age1").value;

    if (number !== "") {
        var phonePattern = /^[0-9]{12}$/;
        if (!phonePattern.test(number)) {
            document.getElementById('almessage').innerHTML = "Phone Number is not valid!";
            var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            setTimeout(function () {
                box2.style.display = "none";
                document.getElementById('submitbutton2').style.backgroundColor = '';
                document.getElementById('submitbutton2').style.border = '';
                submitButton2.disabled = false;
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
                    document.getElementById('submitbutton2').style.backgroundColor = '';
                    document.getElementById('submitbutton2').style.border = '';
                    submitButton2.disabled = false;
                }, 3000);
            return;
        }
    }

    var script = document.createElement('script');
    var decryptedUrl2 = decryptURL(encryptedUrl2, password);
    script.src = decryptedUrl2 +
                 "?callback=handleResponse2" +
                 "&key=" + encodeURIComponent(key) +
                 "&name=" + encodeURIComponent(name) +
                 "&number=" + encodeURIComponent(number) +
                 "&email=" + encodeURIComponent(email) +
                 "&age=" + encodeURIComponent(age);
    document.body.appendChild(script);
}