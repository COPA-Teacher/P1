document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const emailError = document.getElementById("loginEmailError");
    const passwordError = document.getElementById("loginPasswordError");

    // Email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Real-time validation
    emailInput.addEventListener("input", function () {
        const isValid = validateEmail(this.value);
        this.style.borderColor = isValid ? "#d1d5db" : "#ef4444";
        emailError.style.display = isValid ? "none" : "block";
    });

    passwordInput.addEventListener("input", function () {
        const isValid = this.value.length > 0;
        this.style.borderColor = isValid ? "#d1d5db" : "#ef4444";
        passwordError.style.display = isValid ? "none" : "block";
    });

    // Form submission
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Basic validation before submission
        const isEmailValid = validateEmail(emailInput.value);
        const isPasswordValid = passwordInput.value.length > 0;

        if (!isEmailValid) {
            emailInput.style.borderColor = "#ef4444";
            emailError.style.display = "block";
        }

        if (!isPasswordValid) {
            passwordInput.style.borderColor = "#ef4444";
            passwordError.style.display = "block";
        }

        if (isEmailValid && isPasswordValid) {
            // Form is valid - submit or redirect
            alert("Login successful!");
            // form.submit(); // Uncomment to actually submit the form
        }
    });
});
