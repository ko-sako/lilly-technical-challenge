const apiUrl = 'http://localhost:8000/medicines'
const formApiUrl = 'http://localhost:8000/create'

fetch(apiUrl)
    .then(res => {
        if (!res.ok) throw new Error('Connection Error');
        return res.json();
    })
    .then(data => {
        const tbody = document.getElementById('product-table');
        data.medicines.forEach(item => {
            const tr = document.createElement('tr');

            const nameTd = document.createElement('td');
            const name = item.name;

            // Handling the missing or error value of the product name.
            if (typeof name === 'string' && name.trim() !== '') {
                nameTd.textContent = item.name;
            } else {
                nameTd.textContent = 'Unknown';
                nameTd.classList.add('error-value');
            }

            const priceTd = document.createElement('td');
            const price = item.price;

            // Handling the missing or error value of the product price.
            if (typeof price === 'number' && !isNaN(price)) {
                priceTd.textContent = item.price;
            } else {
                priceTd.textContent = 'Unknown';
                priceTd.classList.add('error-value');
            }

            tr.appendChild(nameTd);
            tr.appendChild(priceTd);

            tbody.appendChild(tr);
        });
    })
    .catch(err => {
        console.error('Error: ', err);
    });

// Form Submission
document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent reload the page

    const nameInput = document.getElementById('name-input').value;
    const priceInput = document.getElementById('price-input').value;

    // Basic Validation
    if (!nameInput) {
        alert("Please input product name.");
        return;
    }

    if (!priceInput || isNaN(priceInput) || Number(priceInput) < 0) {
        alert("Please enter a number greater than or equal to 0 for the price.");
        return;
    }

    const form = document.getElementById('product-form');
    const formData = new FormData(form); // Add form's data into FormData

    // Send to POST API
    fetch(formApiUrl, {
        method: 'POST',
        body: formData,
    })
        .then(res => {
            if (!res.ok) throw new Error('Sending Error');
            return res.json();
        })
        .then(data => {
            console.log('Sent Data')
            // Reset form input value
            document.getElementById('product-form').reset();

        })
        .catch(err => {
            console.error('Error: ', err);
        });
});