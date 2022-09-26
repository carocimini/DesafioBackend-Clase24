const fs = require("fs")
class Contenedor {
	constructor(ruta) {
		this.ruta = ruta
	}

	async readFileJson(ruta) {
		let dataFile = await fs.promises.readFile(ruta, "utf8")
		let fileParsed = await JSON.parse(dataFile)
		return fileParsed
	}

	// Guardar objeto (producto o mensaje)
	async save(obj) {
		try {
			let data = await this.readFileJson(this.ruta)
			if (data.length) {
				await fs.promises.writeFile (this.ruta, JSON.stringify([...data, {...obj}], null, 2))
			} else {
				await fs.promises.writeFile(this.ruta, JSON.stringify([{...obj}], null, 2))
			}
			console.log(`Se agrego el archivo con el id: ${data.length + 1}`)
		} catch (error) {
			console.log(`Error al guardar el item: ${error}`)
		}
	}

	// Buscar producto por id
	async getById(id) {
		try {
			let data = await this.readFileJson(this.ruta)
			const item = data.find(item => item.id === id)
			if (item) {
				return item
			} else {
				return { error: "no se encontro el item"}
			}
		} catch (error) {
			console.log(`Error al buscar el item: ${error}`)
		}
	}

	//Buscar todos los productos
	async getAll() {
		try {
			const data = await this.readFileJson(this.ruta)
			if (data.length) {
				return data
			} else {
				console.log('No existen items')
			}
		} catch (error) {
			console.log(error)
		}
	}

	async updateById(obj) {
		try {
			let data = await this.readFileJson(this.ruta)
			const index = data.findIndex(item => item.id === obj.id)
			if (index !== -1) {
				data[index] = obj
				await fs.promises.writeFile( this.ruta, JSON.stringify(data, null, 2))
				return { message: "Se actualizo el item" }
			} else {
				return { error: "no se encontro el item"}
			}
		} catch (error) {
			console.log(`Error al actualizar el item: ${error}`)
		}
	}

	// Eliminar producto por id
	async deleteById(id) {
		try {
			const data = await this.readFileJson(this.ruta)
			let item = data.find(item => item.id === id)
			if (item) {
				const dataFileFilter = data.filter( item => item.id !== id)
				await fs.promises.writeFile(this.ruta, JSON.stringify(dataFileFilter, null, 2), "utf8")
				console.log('Se elimino el item')
			} else {
				console.log('No se encontro el item')
			}
		} catch (error) {
			console.log(`Error al eliminar el item: ${error}`)
		}
	}
}

module.exports = Contenedor