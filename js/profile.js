'use strict';
document.addEventListener("DOMContentLoaded", function() {

    // For main profile
    var profileusername = sessionStorage.getItem("profileusername");
    var profilerole = sessionStorage.getItem("profilerole");

    var secondaryprofileusername = sessionStorage.getItem("secondaryprofileusername");
    var secondaryprofilerole = sessionStorage.getItem("secondaryprofilerole");
    
    document.getElementById('profileusername').textContent = profileusername; 
    document.getElementById('profilerole').textContent = profilerole;

    // For myprofile page

    var usernamedetails = sessionStorage.getItem("usernamedetails");
    var roledetails = sessionStorage.getItem("roledetails");
    var firstNamedetails = sessionStorage.getItem("firstNamedetails");
    var lastNamedetails = sessionStorage.getItem("lastNamedetails");
    var emaildetails = sessionStorage.getItem("emaildetails");
    var phoneNumberdetails = sessionStorage.getItem("phoneNumberdetails");
    console.log(usernamedetails)
    try {

    document.getElementById('usernamedetails').value = usernamedetails; 
    document.getElementById('roledetails').value = roledetails; 
    document.getElementById('firstNamedetails').value = firstNamedetails; 
    document.getElementById('lastNamedetails').value = lastNamedetails; 
    document.getElementById('emaildetails').value = emaildetails; 
    document.getElementById('phoneNumberdetails').value = phoneNumberdetails; 
    } catch (error){
    }
    
    // For setting page
    try {
    document.getElementById('primaryprofileusername').textContent = profileusername;
    document.getElementById('primaryprofilerole').textContent = profilerole;

    document.getElementById('secondaryprofileusername').textContent = secondaryprofileusername;
    document.getElementById('secondaryprofilerole').textContent = secondaryprofilerole;
    } catch (error) {
    }      
     
})


function profilerefresh() {

    // For main profile
    var profileusername = sessionStorage.getItem("profileusername");
    var profilerole = sessionStorage.getItem("profilerole");

    var secondaryprofileusername = sessionStorage.getItem("secondaryprofileusername");
    var secondaryprofilerole = sessionStorage.getItem("secondaryprofilerole");
    
    document.getElementById('profileusername').textContent = profileusername; 
    document.getElementById('profilerole').textContent = profilerole;

    // For myprofile page

    var usernamedetails = sessionStorage.getItem("usernamedetails");
    var roledetails = sessionStorage.getItem("roledetails");
    var firstNamedetails = sessionStorage.getItem("firstNamedetails");
    var lastNamedetails = sessionStorage.getItem("lastNamedetails");
    var emaildetails = sessionStorage.getItem("emaildetails");
    var phoneNumberdetails = sessionStorage.getItem("phoneNumberdetails");
    console.log(usernamedetails)
    try {

    document.getElementById('usernamedetails').value = usernamedetails; 
    document.getElementById('roledetails').value = roledetails; 
    document.getElementById('firstNamedetails').value = firstNamedetails; 
    document.getElementById('lastNamedetails').value = lastNamedetails; 
    document.getElementById('emaildetails').value = emaildetails; 
    document.getElementById('phoneNumberdetails').value = phoneNumberdetails; 
    } catch (error){
    }
    
    // For setting page
    try {
    document.getElementById('primaryprofileusername').textContent = profileusername;
    document.getElementById('primaryprofilerole').textContent = profilerole;

    document.getElementById('secondaryprofileusername').textContent = secondaryprofileusername;
    document.getElementById('secondaryprofilerole').textContent = secondaryprofilerole;
    } catch (error) {
    }  

}
