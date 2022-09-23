const { faker } = require("@faker-js/faker")

class Products {
    constructor(id, titulo, precio, thumbnail) {
        this.id = id,
        this.titulo = titulo,
        this.precio = precio,
        this.thumbnail = thumbnail
    }
}

productsRandom = () => {
    const productos = []
    for (let i=0; i < 5; i++) {
        const producto = new Products(
            faker.random.numeric(),
            faker.commerce.productName(),
            faker.commerce.price(100, 200, 0),
            faker.image.imageUrl()
        )
        productos.push(producto)
    }
    return productos
}

module.exports = { productsRandom }
