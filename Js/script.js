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
            // Simulate a network request delay (remove this in production)
            await new Promise(resolve => setTimeout(resolve, 1500)); // Waits for 1.5 seconds

            // --- SIMULATED BACKEND RESPONSE ---
            // In your Spring Boot application, you will have a REST API endpoint (e.g., /api/login)
            // that receives the email and password, authenticates them against your MySQL database,
            // determines the user's role (ADMIN, FACULTY, STUDENT), and sends back a response.
            //
            // Example of what your Spring Boot backend might return (as JSON):
            // On success: { "success": true, "message": "Login successful", "role": "ADMIN" }
            // On failure: { "success": false, "message": "Invalid credentials" }

            let simulatedSuccess = false;
            let simulatedRole = ''; // This role would come from your backend

            // These are example credentials for demonstration purposes.
            // DO NOT use these hardcoded values in your final project!
            // All authentication should happen on the backend.
            if (email === 'admin@sis.com' && password === 'admin123') {
                simulatedSuccess = true;
                simulatedRole = 'ADMIN';
            } else if (email === 'faculty@sis.com' && password === 'faculty123') {
                simulatedSuccess = true;
                simulatedRole = 'FACULTY';
            } else if (email === 'student@sis.com' && password === 'student123') {
                simulatedSuccess = true;
                simulatedRole = 'STUDENT';
            } else {
                simulatedSuccess = false;
            }

            // --- Handling the Simulated Response ---
            if (simulatedSuccess) {
                displayMessage('Login successful! Redirecting...', 'success');
                // Based on the 'simulatedRole' received from the backend, redirect the user
                // to their respective dashboard.
                // You will need to create these HTML files (e.g., admin_dashboard.html).
                if (simulatedRole === 'ADMIN') {
                    window.location.href = 'AdminPage.html';
                } else if (simulatedRole === 'FACULTY') {
                    window.location.href = 'FacultyPage.html';
                } else if (simulatedRole === 'STUDENT') {
                    window.location.href = 'StudentPage.html';
                }
            } else {
                displayMessage('Invalid email or password.', 'error');
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
