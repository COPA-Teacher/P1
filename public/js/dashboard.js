// Dashboard-specific JavaScript will go here
// This file will be loaded only on the dashboard page

// document.addEventListener("DOMContentLoaded", function () {
//     console.log("Dashboard page loaded");
//     // Add dashboard-specific JavaScript here
// });

document.addEventListener("DOMContentLoaded", function () {
    // Set default date to today
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("expenseDate").value = today;

    // Word count for description
    const descTextarea = document.getElementById("expenseDesc");
    const wordCount = document.getElementById("wordCount");

    descTextarea.addEventListener("input", function () {
        const words = this.value.trim()
            ? this.value.trim().split(/\s+/).length
            : 0;
        wordCount.textContent = words;

        if (words > 30) {
            this.style.borderColor = "#ef4444";
            wordCount.style.color = "#ef4444";
        } else {
            this.style.borderColor = "#d1d5db";
            wordCount.style.color = "inherit";
        }
    });

    // Add Expense Form
    const addExpenseForm = document.getElementById("addExpenseForm");
    addExpenseForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Validate description word count
        const words = descTextarea.value.trim()
            ? descTextarea.value.trim().split(/\s+/).length
            : 0;
        if (words > 30) {
            alert("Description should be maximum 30 words");
            return;
        }

        // Prepare form data
        const formData = {
            date: this.date.value,
            mode: this.mode.value,
            type: this.type.value,
            amount: parseFloat(this.amount.value),
            description: this.description.value,
        };

        // Send POST request
        fetch("/auth/add-expense", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert("Expense added successfully!");
                    this.reset();
                    document.getElementById("expenseDate").value = today;
                    // You might want to refresh the expense list here
                } else {
                    alert("Error: " + data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred while adding expense");
            });
    });

    // Filter Expense Form
    const filterExpenseForm = document.getElementById("filterExpenseForm");
    filterExpenseForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const params = new URLSearchParams();
        if (this.mode.value !== "BOTH") params.append("mode", this.mode.value);
        if (this.type.value !== "BOTH") params.append("type", this.type.value);
        if (this.fromDate.value) params.append("fromDate", this.fromDate.value);
        if (this.toDate.value) params.append("toDate", this.toDate.value);

        // Redirect or fetch filtered data
        window.location.href = `/auth/filter-expense?${params.toString()}`;

        // Alternative: Fetch API approach
        /*
      fetch(`/auth/filter-expense?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
          // Update the UI with filtered data
          updateExpenseList(data);
        });
      */
    });
});

// This would be used if you're doing client-side filtering
function updateExpenseList(data) {
    // Implementation to update the expense list table
}
