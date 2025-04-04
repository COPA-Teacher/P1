// Set current year in footer
document.addEventListener("DOMContentLoaded", function () {
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Add any other common JavaScript functionality here
});
