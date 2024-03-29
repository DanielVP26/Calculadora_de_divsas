let apiData

fetch("./scripts/TASAS.json")
    .then(response => response.json())
    .then(response => {
        apiData = response
        crearSelect()
    })


function crearSelect() {
    const optionElement = document.createElement('option')
    const apiDataKeys = Object.keys(apiData)
    apiDataKeys.forEach((element) => {
        select1.appendChild(createOption(element))
        select2.appendChild(createOption(element))
    })
}

function createOption(text) {
    const option = document.createElement("option");
    option.setAttribute("value", text);
    option.innerText = text
    return option;
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

function procedimientos() {
    let resultado
    if (select1.value == "USD") {
        resultado = inputMoneda.value * apiData[select2.value]
    } else {
        const resultadotemp = inputMoneda.value / apiData[select1.value]
        resultado = resultadotemp * apiData[select2.value]
    }
    conversion.innerText = Intl.NumberFormat('es-MX').format(resultado)
}

select1.onchange = selectChange
select2.onchange = selectChange

inputMoneda.onkeyup = () => {
    if (esValido()) {
        if (isNaN(inputMoneda.value)) {
            conversion.innerText = 'No has ingresado un valor valido'
        } else {
            procedimientos()
        }
    }
}

btnDelete.onclick = () => {
    favoritosArray.length = 0
    localStorage.setItem('favoritos', JSON.stringify(favoritosArray))
    botonesFavoritos.innerHTML = ''
    btnDelete.style.display = 'none'
    favoriteitem.checked = false
    Toastify({
        text: "Se han eliminado todos los favoritos",
        duration: 2000,
        gravity: 'bottom',
        style: {
            background: "linear-gradient(to right, #990f02, #e3242b)",
        },
    }).showToast();
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
                favoritosArray.push(objTmp)
                localStorage.setItem('favoritos', JSON.stringify(favoritosArray))
                crearBoton(objTmp)
                btnDelete.style.display = ''
            } else if (favoritosArray.length >= 3) {
                Toastify({
                    text: "No puedes tener más de 3 favoritos",
                    duration: 2000,
                    close: true,
                    style: {
                        background: "linear-gradient(to right, #ffff00, #ffff81)",
                        color: 'black'
                    },
                }).showToast();
                favoriteitem.checked = false
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
        favoriteitem.checked = true
        inputMoneda.onkeyup()
    }
    botonesFavoritos.appendChild(btn)
}

function crearBotones() {
    if (favoritosArray.length != 0) {
        favoritosArray.forEach(element => {
            crearBoton(element)
        });
        btnDelete.style.display = ''
    }
}

window.onload = crearBotones


