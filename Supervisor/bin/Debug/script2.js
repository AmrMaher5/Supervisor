const dateElement = document.getElementById('date-time');

function getCurrentDateTime() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDateTime = currentDate.toLocaleDateString('en-US', options);
    return formattedDateTime;
}

function updateDateTime() {
    const currentDateTime = getCurrentDateTime();
    dateElement.textContent = currentDateTime;
}

// Update the date-time immediately
updateDateTime();

// Update the date-time every second
setInterval(updateDateTime, 1000);