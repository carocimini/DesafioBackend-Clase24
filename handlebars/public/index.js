const server = io().connect()

const render = (buzonChat) => {
    let chat = document.querySelector('#chat')
    let html = buzonChat.map(mesj => {
        return `<li>
        <strong style="color:blue">${mesj.author}</strong>
        <em style="color:green">${mesj.text}</em>  
        </li>`
    })
    chat.innerHTML = html.join('')
}

const addMessage = (evt) => {
    const id = document.querySelector('#mail').value
    const nombre = document.querySelector("#nombre").value;
	const apellido = document.querySelector("#apellido").value;
	const edad = document.querySelector("#edad").value;
	const alias = document.querySelector("#alias").value;
	const avatar = document.querySelector("#avatar").value
    const text = document.querySelector('#text').value

    const chatString = {
        author: {id, nombre, apellido, edad, alias, avatar}, 
        text
    }
    //console.log(chatString)
    server.emit('mensaje-nuevo', chatString, id => {
        console.log(id)
    })
    return false
}


server.on('mensaje-servidor', mensaje => {
    render(mensaje.buzonChat)
})