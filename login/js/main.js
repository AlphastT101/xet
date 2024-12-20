(function($) {
	"use strict";
})(jQuery);

const api_url = "http://127.0.0.1:6750";
const dash_url = "http://127.0.0.1:5500";


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
            console.log("Logged in.");
            console.log(data.access_token);
            console.log(data.expiration);
            const dashboardUrl = `${dash_url}/dashboard?token=${data.access_token}&expiration=${encodeURIComponent(data.expiration)}`;
            console.log(dashboardUrl)
            alert(dashboardUrl)
            // window.location.href = dashboardUrl;
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
