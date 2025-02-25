function sendTest() {
    document.getElementById('sendButton').style.backgroundColor = 'lightgrey';
    document.getElementById('sendButton').style.border = 'lightgrey';
    // Get the input values
    var templateName = document.getElementById("nameWithTitle").value;
    var email = document.getElementById("emailWithTitle").value;
    var password = document.getElementById("dobWithTitle").value;

    // Validation for empty input fields
    if (templateName.trim() === '' || email.trim() === '' || password.trim() === '') {
        document.getElementById('almessage').innerHTML = "Some fields are missing!"
        var box2 = document.getElementById("box2");
            box2.style.display = "inline-block";
            setTimeout(function () {
                box2.style.display = "none";
                document.getElementById('sendButton').style.backgroundColor = '';
                document.getElementById('sendButton').style.border = '';
            }, 3000);
        return;
    }

    // Validation for phone number pattern
    if (email !== "") {
        var re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            document.getElementById('almessage').innerHTML = "Email is not valid!"
            var box2 = document.getElementById("box2");
                box2.style.display = "inline-block";
                setTimeout(function () {
                    box2.style.display = "none";
                    document.getElementById('sendButton').style.backgroundColor = '';
                    document.getElementById('sendButton').style.border = '';
                }, 3000);
            return;
        }
    }

};
