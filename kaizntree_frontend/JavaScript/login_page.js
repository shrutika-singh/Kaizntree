function goToDashboard(){
    window.location.href = 'itemDashboard.html';
}

function obtainAuthToken() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    fetch('http://127.0.0.1:8000/api-token-auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Token:', data.token);
        // Store the token for future requests, e.g., in localStorage
        localStorage.setItem('token', data.token);
        goToDashboard()
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}