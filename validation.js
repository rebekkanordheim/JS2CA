
const form = document.getElementById('myForm');
const emailInput = document.getElementById('validationDefault01');
const passwordInput = document.getElementById('validationDefault02');

// Adding a submit event listener to the form
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the user's input from the email and password fields
    const userEmail = emailInput.value;
    const userPassword = passwordInput.value;

    // Validating the email 
    const emailPattern = /@(noroff\.no|stud\.noroff\.no)$/;

    if (emailPattern.test(userEmail)) {
        setTimeout(function() {
            //CLearing thea form after successfull registration 
            emailInput.value = '';
            passwordInput.value = '';

            //Redirecting to feed after registration
            window.location.href = 'feed.html';
        }, 2000);
    } else {
        alert('Invalid email address. Please use a valid @noroff.no or @stud.noroff.no email address.');
    }
  });