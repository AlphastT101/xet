(function($) {
	"use strict";
})(jQuery);

const underDev = false;

const api_url = underDev ? "http://192.168.0.101:6750" : "https://api.lumixcore.com";

document.querySelector('.signin-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const btn = document.getElementById("login-button");
    btn.disabled = true;
    btn.textContent = "Logging in...";

    const email = document.querySelector('input[placeholder="Email"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;

    const payload = {
        email: email,
        password: password
    };

    try {
        const response = await fetch(`${api_url}/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            const root_domain = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
            dash_url = `${root_domain}/dashboard`;
            const dashboardUrl = `${dash_url}?token=${data.access_token}&expiration=${encodeURIComponent(data.expiration)}`;
            window.location.href = dashboardUrl;

        } else {
            const errorData = await response.json();
            console.error('Login failed:', errorData.error);

            btn.disabled = false;
            btn.textContent = "Log In";

            const errorLabel = document.querySelector('.error-msg');
            errorLabel.style.display = 'inline';
            errorLabel.textContent = errorData.error;

        }
    } catch (error) {
        console.error('Error:', error);
        btn.disabled = false;
        btn.textContent = "Log In";

        const errorLabel = document.querySelector('.error-msg');
        errorLabel.style.display = 'inline';
        errorLabel.textContent = 'An error occurred. Make sure you have internet access.';
    }
});
