let continuar = 1
let valor = 0
function correrAlerta (){
    while(continuar == 1){
        let eleccion = prompt("¿Que divisas desea calcular? \n\n 1. Pesos colombianos a Dolares \n 2. Dolares a pesos colombianos \n 3. Dolares a Euros \n 4. Euros a Dolares ")
        switch(eleccion){
            case "1":
                valor = prompt("Ingrese la cantidad de Pesos colombianos que desea calcular: ")
                if(!isNaN(valor)){
                    alert("La cantidad de "+ valor + " Pesos colombianos en Dolares es de: \n " + valor * 0.00021 + " Dolares")
                continuar = prompt("¿Desea continuar? \n 1. Si \n 2. No")
                break;
                }
                else{
                    alert("Lo siento, has ingresado un numero no valido :(")
                break;
                }
            case "2":
                valor = prompt("Ingrese la cantidad de Dolares que desea calcular: ")
                if(!isNaN(valor)){
                    alert("La cantidad de "+ valor + " Dolares en Pesos colombianos es de: \n " + valor * 4762 + " Pesos colombianos")
                continuar = prompt("¿Desea continuar? \n 1. Si \n 2. No")
                break;
                }
                else{
                    alert("Lo siento, has ingresado un numero no valido :(")
                break;
                }
            case "3":
                valor = prompt("Ingrese la cantidad de Dolares que desea calcular: ")
                if(!isNaN(valor)){
                alert("La cantidad de "+ valor + " Dolares en Euros es de: \n " + valor * 1.01 + " Euros")
                continuar = prompt("¿Desea continuar? \n 1. Si \n 2. No")
                break;
                }
                else{
                    alert("Lo siento, has ingresado un numero no valido :(")
                break;
                }
            case "4":
                valor = prompt("Ingrese la cantidad de Euros que desea calcular: ")
                if(!isNaN(valor)){
                alert("La cantidad de "+ valor + " Euros en Dolares es de: \n " + valor * 0.99 + " Dolares")
                continuar = prompt("¿Desea continuar? \n 1. Si \n 2. No")
                break;
                }
                else{
                    alert("Lo siento, has ingresado un numero no valido :(")
                break;
                }
            default:
                alert("No has elegido un valor valido, vuelve a intentarlo")
        }
    }
}
correrAlerta()