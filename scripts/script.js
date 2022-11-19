const factorCambio = {
    USDCOP: 4988.83,
    USDEUR: 0.97,
    USDUSD: 1,
    EURCOP: 5161.19,
    EURUSD: 1.03,
    EUREUR: 1,
    COPUSD: 0.00020,
    COPEUR: 0.00019,
    COPCOP: 1,
}

function esValido() {
    return select1.value != 0 && select2.value != 0
}

function selectChange() {
    if (esValido()) {
        inputMoneda.onkeyup()
        corazon()
    }
}

select1.onchange = selectChange
select2.onchange = selectChange

inputMoneda.onkeyup = () => {
    if (esValido()) {
        if (isNaN(inputMoneda.value)) {
            conversion.innerText = 'No has ingresado un valor valido'
        } else {
            const resultado = inputMoneda.value * factorCambio[`${select1.value}${select2.value}`]
            conversion.innerText = Intl.NumberFormat('es-MX').format(resultado)
        }
    }
}

btnDelete.onclick = () => {
    favoritosArray.length = 0
    localStorage.setItem('favoritos', JSON.stringify(favoritosArray))
    botonesFavoritos.innerHTML = ''
    btnDelete.style.display = 'none'
    favoriteitem.checked = false
}

const favoritosArray = JSON.parse(localStorage.getItem('favoritos') ?? '[]')
const favoriteitem = document.querySelector('#checkbox')

function existe() {
    return favoritosArray.some(item => select1.value == item.valor1 && select2.value == item.valor2)
}

function corazon() {
    if (existe()) {
        favoriteitem.checked = true
    } else {
        favoriteitem.checked = false
    }
}

favoriteitem.onchange = () => {
    if (esValido()) {
        if (favoriteitem.checked == true) {
            const objTmp = {
                valor1: select1.value,
                valor2: select2.value
            }
            if (favoritosArray.length < 3 && !existe()) {
                console.log('pushea botones')
                favoritosArray.push(objTmp)
                localStorage.setItem('favoritos', JSON.stringify(favoritosArray))
                crearBoton(objTmp)
                btnDelete.style.display = ''
            } else if (favoritosArray.length >= 3) {
                // en caso de tener 3 mensaje
            } else {
                //en caso de existir mensajito
            }
        } else {
            //si le quitan el favorito
            const botonDelete = document.querySelector(`#botonesFavoritos>button[data="${select1.value}${select2.value}"]`)
            botonDelete?.remove()
            const positionDelete = favoritosArray.findIndex(e => e.valor1 === select1.value && e.valor2 === select2.value)
            favoritosArray.splice(positionDelete, 1)
            localStorage.setItem('favoritos', JSON.stringify(favoritosArray))
            if (favoritosArray.length == 0) {
                btnDelete.style.display = 'none'
            }
        }
    } else {
        favoriteitem.checked = false
    }
}

function crearBoton(element) {
    const btn = document.createElement('button')
    btn.className = 'btn btn-success w-100 mt-3'
    btn.innerText = `${element.valor1} a ${element.valor2}`
    btn.setAttribute('data', `${element.valor1}${element.valor2}`)
    btn.onclick = () => {
        select1.value = element.valor1
        select2.value = element.valor2
    }
    botonesFavoritos.appendChild(btn)
}

function crearBotones() {
    console.log('crearBotones')
    if (favoritosArray.length != 0) {
        favoritosArray.forEach(element => {
            crearBoton(element)
        });
        btnDelete.style.display = ''
    }
}

window.onload = crearBotones