function decryptURL(encryptedUrl, password) {
    var decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encryptedUrl), password).toString(CryptoJS.enc.Utf8);
    return decrypted;
}
var encryptedUrl = "U2FsdGVkX180FE/TIUdvg4fd8Swvm4prFqRof0jra1pKhquUxtw3O7MikyU2SHjf+SNKncasEl3H/ZPs0o6uVBgL0zDkRWdCJr1jUsztJ7XCO+r5chCMeAzt74MX81estMvGIA/WIYrcBObUpTkHjWqkPnrZFlSXAmWY2Io4c/vxpy2F8ekt/E4BRM2JQ0Fb31OwYEQT5Rzr6eqHuas7mg==";
var password = sessionStorage.getItem("pass");
var decryptedUrl = decryptURL(encryptedUrl, password);

// MyProfile Master
fetch(decryptedUrl)
.then(response => response.json())
.then(data => {
    var Username = sessionStorage.getItem("Username");
    var filteredRow = data.filter(function(row) {
        return row[0] === Username;
    });  

    // for main profile
    sessionStorage.setItem("profileusername", filteredRow[0][7]);
    sessionStorage.setItem("profilerole", filteredRow[0][2]); 

    // for myprofile page
    sessionStorage.setItem("usernamedetails", filteredRow[0][0]);
    sessionStorage.setItem("roledetails", filteredRow[0][2]); 
    sessionStorage.setItem("firstNamedetails", filteredRow[0][3]);
    sessionStorage.setItem("lastNamedetails", filteredRow[0][4]); 
    sessionStorage.setItem("emaildetails", filteredRow[0][5]);
    sessionStorage.setItem("phoneNumberdetails", filteredRow[0][6]); 
    
    // For main page
    document.getElementById('profileusername').textContent = filteredRow[0][7]; 
    document.getElementById('profilerole').textContent = filteredRow[0][2];         
    
    // For secondary Profile
    var filteredRow = data.filter(function(row) {
        return row[0] !== Username && row[0] !== "Username";
    });
    sessionStorage.setItem("secondaryprofileusername", filteredRow[0][7]);
    sessionStorage.setItem("secondaryprofilerole", filteredRow[0][2]); 
})

