const apiUrl = 'http://localhost:8000/medicines'

fetch(apiUrl)
    .then(res => {
        if (!res.ok) throw new Error('Connection Error');
        return res.json();
    })
    .then(data => {
        const tbody = document.getElementById('product-table');
        data.medicines.forEach(item => {
            const name_str = item.name;
            console.log(name_str);
            console.log(`${item.price}`);
        });
    })
    .catch(err => {
        console.error('Error: ', err);
    });