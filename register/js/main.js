(function($) {
	"use strict";
})(jQuery);

const underDev = false;
const api_url = underDev ? "http://192.168.0.105:6750" : "https://api.xet.one";
const login_url = underDev ? "http://192.168.0.105:5500/login" : "https://xet.one/login"
email_main = null;


document.querySelector('.signin-form').addEventListener('submit', async (event) => {
    const signupButton = document.getElementById("signup_button");
    signupButton.disabled = true;
    event.preventDefault(); // Prevent the default form submission

    const email = document.querySelector('input[placeholder="Email"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;
    email_main = email
    const payload = {
        email: email,
        password: password
    };

    try {
        const response = await fetch(`${api_url}/v1/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            document.querySelector('.signin-form').style.display = 'none';
            document.querySelector('.verification-form').style.display = 'inline';
        } else {
            const errorData = await response.json();
            console.error('Login failed:', errorData.error);
            const errorLabel = document.querySelector('.error-msg');
            errorLabel.style.display = 'inline';
            errorLabel.textContent = errorData.error;
            signupButton.disabled = false;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});

document.querySelector('.verification-form').addEventListener('submit', async (event) => {
    const code = document.querySelector('input[placeholder="Verification code"]').value;
    const check = document.getElementById("check");
    check.disabled = true;

    const payload = {
        email: email_main,
        verification_code: code
    };

    try {
        const response = await fetch(`${api_url}/v1/auth/account/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            // alert(response.status)
            check.disabled = false;
            // alert(await response.json());
            window.location.href = login_url;
        } else {
            const errorData = await response.json();
            console.error('Login failed:', errorData.detail);
            const errorLabel = document.querySelector('.verify-error');
            errorLabel.style.display = 'inline';
            errorLabel.textContent = errorData.detail;
            check.disabled = false;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
})

function setupPasswordValidation() {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");
    const signupButton = document.getElementById("signup_button");
    const errorMessage = document.querySelectorAll('.no_match');

    // Disable the button by default
    signupButton.disabled = true;

    function validatePasswords() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (confirmPassword) { // Only validate if the confirm password field is not empty
            if (password === confirmPassword) {
                signupButton.disabled = false;
                signupButton.style.backgroundColor = ""; // Reset to default button color
                errorMessage.forEach(label => label.style.display = 'none');
            } else {
                signupButton.disabled = true;
                errorMessage.forEach(label => label.style.display = 'inline');
            }
        } else {
            errorMessage.forEach(label => label.style.display = 'none'); // Hide error if confirm password is empty
        }
    }

    // Add event listeners to both password fields
    passwordInput.addEventListener("input", validatePasswords);
    confirmPasswordInput.addEventListener("input", validatePasswords);
}

// Call the function to initialize the validation
setupPasswordValidation();