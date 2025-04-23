const apiUrl = 'http://localhost:8000/medicines'

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
            // nameTd.textContent = item.name;
            const name = item.name;
            console.log(isNaN(name));
            // Handling the missing or error value of the product name.
            if (typeof name === 'string' && name.trim() !== '') {
                nameTd.textContent = item.name;
            } else {
                nameTd.textContent = 'Unknown';
                nameTd.classList.add('error-value');
            }

            const priceTd = document.createElement('td');
            priceTd.textContent = item.price;

            tr.appendChild(nameTd);
            tr.appendChild(priceTd);

            tbody.appendChild(tr);
        });
    })
    .catch(err => {
        console.error('Error: ', err);
    });