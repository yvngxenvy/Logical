const aElement = document.getElementById('download-link');
const retryAttempts = 3;
let currentAttempt = 0;

async function fetchDownloadUrl() {
    try {
        const response = await fetch('https://api.logicalrl.com/exe/loader');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data.state !== 'success') {
            throw new Error('Response state was not successful');
        }

        aElement.href = "javascript:void()";
        aElement.href = data.message.downloadUrl

        aElement.addEventListener('click', async () => {
            try {
                const analyticsResponse = await fetch('https://api.logicalrl.com/analytics/download', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({})
                });
                
                if (!analyticsResponse.ok) {
                    throw new Error('Failed to send analytics data');
                }

                console.log('Analytics data sent successfully');
            } catch (error) {
                console.error('Error sending analytics data', error);
            }
        });
    } catch (error) {
        console.error('Failed to fetch download URL after attempt ', currentAttempt, error);
    }
}

async function attemptFetch() {
    while (currentAttempt < retryAttempts) {
        try {
            await fetchDownloadUrl();
            break; // Exit loop if fetchDownloadUrl is successful
        } catch (error) {
            currentAttempt++;
            if (currentAttempt >= retryAttempts) {
                console.error('Failed to fetch download URL after maximum attempts');
            }
        }
    }
}

attemptFetch();