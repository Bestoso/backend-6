const socket = io();
const postForm = document.getElementById('postForm');

const postFormData = e => {

    const values = {
        title: e.target.title.value,
        description: e.target.description.value,
        price: e.target.price.value,
        code: e.target.code.value,
        thumbnails: e.target.thumbnails.value,
        status: e.target.status.value,
        category: e.target.category.value,
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch('/api/products', options)
        .then(res => res.json())
        .then(data => socket.emit('getProducts', data))
        .catch(err => console.log(err));
}

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    postFormData(e);
});

socket.on('liveProducts', prod => {
    console.log(prod)
    const { data } = prod;
    const lastProduct = data[data.length - 1];
    console.log(lastProduct);
    const productsSection = document.getElementById('pSection');
    const product = document.createElement('div');
    product.className = 'product__container';

    product.innerHTML += `
        <div class="title__container">
            <h2 class="product__title"> ${lastProduct.title} </h2>
        </div>
        <div class="info__container">
            <p class="description"> Descripcion: ${lastProduct.description}</p>
            <p class="price"> Precio: $${lastProduct.price} </p>
            <p class="code"> Codigo: ${lastProduct.code} </p>
            <p class="status"> Status: ${lastProduct.status} </p>
            <p class="category"> Categoria: ${lastProduct.category} </p>
            <p class="thumbnail"> Thumbnails: ${lastProduct.thumbnails} </p>
        </div>`;

    productsSection.appendChild(product);
});