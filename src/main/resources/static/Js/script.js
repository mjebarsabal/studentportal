document.addEventListener('DOMContentLoaded', function() {
    // Get references to HTML elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email'); // Changed from usernameInput to emailInput
    const passwordInput = document.getElementById('password');
    const messageParagraph = document.getElementById('message');

    // Add an event listener for the form submission
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission (which would reload the page)

        // Get the values from the email and password input fields
        const email = emailInput.value.trim(); // .trim() removes any leading/trailing whitespace
        const password = passwordInput.value.trim();

        // --- Basic Client-Side Validation ---
        // This checks if the fields are empty BEFORE sending to the backend.
        // It's good for immediate feedback to the user and reduces unnecessary server requests.
        if (email === '' || password === '') {
            displayMessage('Please enter both email and password.', 'error');
            return; // Stop the function if validation fails
        }

        // Display a "logging in" message to the user
        displayMessage('Logging in...', 'info');

        // --- IMPORTANT: THIS IS WHERE YOU WILL CONNECT TO YOUR SPRING BOOT BACKEND ---
        // The following 'try...catch' block simulates a network request and backend response.
        // In a real application, you will replace this simulation with an actual 'fetch' API call
        // to your Spring Boot login endpoint.

        try {


            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                displayMessage('Login successful! Redirecting...', 'success');
                
                // Store user info in sessionStorage
                sessionStorage.setItem('userRole', data.role);
                sessionStorage.setItem('userEmail', data.email);
                sessionStorage.setItem('userName', `${data.firstName} ${data.lastName}`);

                // Redirect based on role
                if (data.role === 'ADMIN') {
                    window.location.href = 'AdminPage.html';
                } else if (data.role === 'TEACHER') {
                    window.location.href = 'FacultyPage.html';
                } else if (data.role === 'STUDENT') {
                    window.location.href = 'StudentPage.html';
                }
            } else {
                displayMessage(data.error || 'Invalid email or password.', 'error');
            }
        } catch (error) {
            // This block catches any errors during the simulated network request
            // or if the backend connection fails.
            console.error('Login process error:', error);
            displayMessage('An unexpected error occurred. Please try again later.', 'error');
        }
    });

    // Helper function to display messages to the user
    function displayMessage(msg, type) {
        messageParagraph.textContent = msg; // Set the text content of the message paragraph
        // Remove existing message classes to ensure only one type is applied
        messageParagraph.classList.remove('error-message', 'success-message', 'info-message');

        // Add the appropriate class based on the message type
        if (type === 'success') {
            messageParagraph.classList.add('success-message');
        } else if (type === 'info') {
            messageParagraph.classList.add('info-message');
        } else { // Default to error if type is not specified or recognized
            messageParagraph.classList.add('error-message');
        }
        messageParagraph.style.display = 'block'; // Make the message paragraph visible
    }
});


// document.getElementById('loginForm').addEventListener('submit', async function(e) {
//   e.preventDefault();
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   const message = document.getElementById('message');

  // const response = await fetch('/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password })
  // });

  // const data = await response.json();

//   if (data.success && data.role === 'admin') {
//     window.location.href = '/AdminPage.html';
//   } else {
//     message.textContent = data.message || 'Login failed';
//   }
// });