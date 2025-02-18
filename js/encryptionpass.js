fetch('Encryption Password/Encryption_Password.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(text => {
        // Extracting the password from the text
        const passwordRegex = /password:\s*(\w+)/i; // Assuming password format: "password: your_password_here"
        const match = text.match(passwordRegex);
        if (match && match[1]) {
            const password = match[1];
            // Storing the password in session storage
            sessionStorage.setItem('pass', password);
            console.log(password)
        } else {
            throw new Error('Password not found in the text file');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
