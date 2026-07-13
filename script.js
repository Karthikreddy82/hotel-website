// Get the form element
const registrationForm = document.getElementById("registrationForm");

// Run this function when the form is submitted
registrationForm.addEventListener("submit", function(event) {

    // Prevent page refresh
    event.preventDefault();

    // Get input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // Display the values
    document.getElementById("displayName").textContent = name;
    document.getElementById("displayEmail").textContent = email;

    // Show the output section
    document.getElementById("output").style.display = "block";

});