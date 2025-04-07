document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const submitBtn = document.getElementById("submitBtn");

    // Elements
    const emailInput = document.getElementById("email");
    const mobileInput = document.getElementById("mobile");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirmPassword");

    // Error elements
    const emailError = document.getElementById("emailError");
    const mobileError = document.getElementById("mobileError");
    const passwordError = document.getElementById("passwordError");
    const confirmError = document.getElementById("confirmError");

    // Tooltip for password requirements
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    document.body.appendChild(tooltip);

    const infoIcon = document.querySelector(".info-icon");
    infoIcon.addEventListener("mouseover", (e) => {
        tooltip.innerHTML = e.target
            .getAttribute("data-tooltip")
            .replace(/&#10;/g, "<br>");
        tooltip.style.display = "block";
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
    });

    infoIcon.addEventListener("mouseout", () => {
        tooltip.style.display = "none";
    });

    // Validation functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateMobile(mobile) {
        return /^\d{10}$/.test(mobile);
    }

    function validatePassword(password) {
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
            valid:
                hasMinLength &&
                hasUpperCase &&
                hasLowerCase &&
                hasNumber &&
                hasSpecialChar,
            requirements: {
                length: hasMinLength,
                upperCase: hasUpperCase,
                lowerCase: hasLowerCase,
                number: hasNumber,
                specialChar: hasSpecialChar,
            },
        };
    }

    function updatePasswordStrength(password) {
        const strengthMeter = document.querySelector(".strength-meter");
        const strengthText = document.querySelector(".strength-text");
        const validation = validatePassword(password);

        if (password.length === 0) {
            strengthMeter.style.width = "0%";
            strengthMeter.style.backgroundColor = "transparent";
            strengthText.textContent = "";
            return;
        }

        const metRequirements = Object.values(validation.requirements).filter(
            Boolean
        ).length;
        const strength = (metRequirements / 5) * 100;

        strengthMeter.style.width = `${strength}%`;

        if (strength < 40) {
            strengthMeter.style.backgroundColor = "#ef4444";
            strengthText.textContent = "Weak";
        } else if (strength < 80) {
            strengthMeter.style.backgroundColor = "#f59e0b";
            strengthText.textContent = "Medium";
        } else {
            strengthMeter.style.backgroundColor = "#10b981";
            strengthText.textContent = "Strong";
        }
    }

    // Real-time validation
    emailInput.addEventListener("input", function () {
        const isValid = validateEmail(this.value);
        this.style.borderColor = isValid ? "#d1d5db" : "#ef4444";
        emailError.style.display = isValid ? "none" : "block";
        validateForm();
    });

    mobileInput.addEventListener("input", function () {
        const isValid = validateMobile(this.value);
        this.style.borderColor = isValid ? "#d1d5db" : "#ef4444";
        mobileError.style.display = isValid ? "none" : "block";
        validateForm();
    });

    passwordInput.addEventListener("input", function () {
        const validation = validatePassword(this.value);
        updatePasswordStrength(this.value);

        if (this.value.length === 0) {
            passwordError.textContent = "";
            this.style.borderColor = "#d1d5db";
        } else if (!validation.valid) {
            const missing = [];
            if (!validation.requirements.length) missing.push("8+ characters");
            if (!validation.requirements.upperCase)
                missing.push("1 uppercase letter");
            if (!validation.requirements.lowerCase)
                missing.push("1 lowercase letter");
            if (!validation.requirements.number) missing.push("1 number");
            if (!validation.requirements.specialChar)
                missing.push("1 special character");

            passwordError.textContent = `Missing: ${missing.join(", ")}`;
            this.style.borderColor = "#ef4444";
        } else {
            passwordError.textContent = "";
            this.style.borderColor = "#d1d5db";
        }

        // Trigger confirm password validation
        if (confirmInput.value) {
            confirmInput.dispatchEvent(new Event("input"));
        }

        validateForm();
    });

    confirmInput.addEventListener("input", function () {
        const isValid = this.value === passwordInput.value;
        this.style.borderColor = isValid ? "#d1d5db" : "#ef4444";
        confirmError.style.display = isValid ? "none" : "block";
        validateForm();
    });

    // Form validation
    function validateForm() {
        const isEmailValid = validateEmail(emailInput.value);
        const isMobileValid = validateMobile(mobileInput.value);
        const isPasswordValid = validatePassword(passwordInput.value).valid;
        const isConfirmValid = confirmInput.value === passwordInput.value;

        submitBtn.disabled = !(
            isEmailValid &&
            isMobileValid &&
            isPasswordValid &&
            isConfirmValid
        );
    }

    // Form submission
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Form is valid at this point
        alert("Account created successfully!");
        // form.submit(); // Uncomment to actually submit the form
    });
});
