// Select all custom HTML tags
let counters = document.querySelectorAll('counter');

counters.forEach(counter => {
    // Read the target amount from the "target" attribute of the custom element
    let targetNumber = parseInt(counter.getAttribute('target')) || 0; // Default to 0 if no target is set
    let duration = 2000; // Duration in milliseconds (2 seconds)
    let stepTime = 35; // Update counter every 35ms
    let currentValue = 0;
    let increment = targetNumber / (duration / stepTime);
    let slowdownFactor = 1.25; // Factor by which the last few numbers will slow down

    function formatNumber(number) {
        return number.toLocaleString(); // Adds commas to the number
    }

    function updateCounter() {
        currentValue += increment;

        // Slow down the last few numbers by reducing the increment towards the end
        if (currentValue < targetNumber * 0.4) {
            increment = targetNumber / (duration / stepTime);
        } else {
            increment = Math.ceil(targetNumber - currentValue) / (duration / stepTime / slowdownFactor);
        }

        // Explicitly check if the current value is greater than or equal to the target
        if (currentValue >= targetNumber) {
            currentValue = targetNumber; // Ensure it doesn't overshoot
            counter.textContent = formatNumber(Math.floor(currentValue)) + "+";
        } else {
            counter.textContent = formatNumber(Math.floor(currentValue));
            requestAnimationFrame(updateCounter);
        }
    }

    // Only update the counter if a valid target number is specified
    if (targetNumber > 0) {
        updateCounter();
    } else {
        counter.textContent = "Invalid target";
    }
});