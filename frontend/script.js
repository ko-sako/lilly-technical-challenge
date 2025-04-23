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
            nameTd.textContent = item.name;

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