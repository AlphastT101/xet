(function($) {
	"use strict";
})(jQuery);

const underDev = false;

const api_url = underDev ? "http://192.168.0.108:6750" : "https://api.xet.one";

document.querySelector('.signin-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

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
            alert(errorData.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});
