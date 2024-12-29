const underDev = false;
const api_url = underDev ? 'http://192.168.0.108:6750' : 'https://api.xet.one';
let jwt_token = null;

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) {
            return value;
        }
    }
    return null; // Return null if the cookie is not found
}

// Function to check the JWT token and handle redirection
function checkJwtToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const exp = urlParams.get('expiration');

    if (token && exp) {
        const rfc1123Date = new Date(exp).toUTCString();
        document.cookie = `jwt_token=${token}; path=/; expires=${rfc1123Date}`;
        const root_domain = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
        window.location.href = `${root_domain}/dashboard`;
    } else {
        jwt_token = getCookie('jwt_token');
        if (!jwt_token) {
            const root_domain = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
            window.location.href = `${root_domain}/login`;
            
        }
    }
}

// Function to fetch account info
async function fetchAccountInfo() {
    try {
        const response = await fetch(`${api_url}/v1/account/info`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({jwt_token: jwt_token })
        });

        if (response.ok) {
            const data = await response.json();
            const name = data.name;
            const exp = data.logged_out_in;

            document.querySelector('.welcome-name').textContent = `Welcome, ${name}!`;
            document.querySelector('.log-out-in').textContent = `You'll be automatically logged out in ${exp}. To keep your account secure.`;
        } else {
            const root_domain = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
            window.location.href = `${root_domain}/login`;            
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`An error occurred. Please try clearing the cookies. Error: ${error}`);
    }
}


async function showChart() {
    try {
        const response = await fetch(`${api_url}/v1/api/stats`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jwt_token: jwt_token })
        });

        if (response.ok) {
            const data = await response.json();

            const stats = data.stats;
            const labels = Object.keys(stats); // Model names
            const values = Object.values(stats); // Request counts

            // Render the chart
            const ctx = document.getElementById('modelStatsChart').getContext('2d');
            const canvas = document.getElementById('modelStatsChart');
            canvas.height = window.innerHeight;
            const modelStatsChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels, // Dynamic model names
                    datasets: [{
                        label: 'Requests',
                        data: values, // Dynamic request counts
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

        } else {
            const root_domain = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
            window.location.href = `${root_domain}/login`;
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`An error occurred. Please try clearing the cookies. Error: ${error}`);
    }
}



let account_token = null; // Ensure variable is declared properly
const generateButton = document.querySelector('.token-generate');
console.log(generateButton);

async function generateToken() {
    const generateButton = document.querySelector('.token-generate');
    try {
        const response = await fetch(`${api_url}/v1/account/generate-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jwt_token: jwt_token })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Response data:", data);
            account_token = data.token;

            // Show modal and update content
            const modal = document.getElementById('modal');
            modal.classList.add('show');
            document.querySelector('.floating_api_token').textContent = data.token;

            // Render tokens
            render_api_tokens();
        } else {
            const root_domain = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
            window.location.href = `${root_domain}/login`;
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert(`An error occurred. Please try clearing the cookies. Error: ${error}`);
    }
}

async function deleteToken() {

    try {
        const response = await fetch(`${api_url}/v1/account/delete-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jwt_token: jwt_token })
        });

        if (response.ok) {
            // Render tokens
            account_token = null;
            render_api_tokens();
        } else {
            const root_domain = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
            window.location.href = `${root_domain}/login`;
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert(`An error occurred. Please try clearing the cookies. Error: ${error}`);
    }
}

async function render_api_tokens() {
    const button = document.querySelector('.token-generate');
    button.disabled = true; // Disable the button at the start
    try {
        const response = await fetch(`${api_url}/v1/account/tokens`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jwt_token: jwt_token })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.token === null) {
                button.disabled = false
                document.querySelector('.no-tokens').style.display = 'inline';
                document.querySelector('.token-1').style.display = 'none';
                document.querySelector('.no-tokens').textContent = "Looks like you don't have any API tokens generated.";
            } else {
                account_token = data.token
                document.querySelector('.no-tokens').style.display = 'none';
                const hidden_token = data.token.slice(0, 20) + "*****";
                document.querySelector('.token-1').style.display = 'inline';
                document.querySelector('.token_value').textContent = hidden_token;
                document.querySelector('.floating_api_token').textContent = account_token;
            }
        } else {
            const root_domain = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
            window.location.href = `${root_domain}/login`;
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`An error occurred. Please try clearing the cookies. Error: ${error}`);
        button.disabled = false;
    }
}