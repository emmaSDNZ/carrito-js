//varialbes
const carrito           = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn  = document.querySelector('#vaciar-carrito');
const listasCursos      = document.querySelector('#lista-cursos')

let articulosCarrito = [];



cargarEventListeners()
function cargarEventListeners() {

    //cuando se agrega un curso presionando "Agregar al Carrito"
    listasCursos.addEventListener( 'click', agregarCurso )    

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{ 

        articulosCarrito= [] //reseteamos el arreglo

        limparHTML(); //eliminamos todo el html
        
    })
}

//funciones
function agregarCurso(e) {

    e.preventDefault()

    if( e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        
        leerDatosCursos(cursoSeleccionado)
    }
}

//elimina un curso del carrito
function eliminarCurso(e){
    
    if(e.target.classList.contains('borrar-curso')){
        const cursoId =  e.target.getAttribute('data-id');

        //elimnar por dataId
        articulosCarrito = articulosCarrito.filter( cursos => cursos.id !== cursoId)
        
        //itera sobre el carrito y muestra su HTML
        carritoHTML()
    }
}


//leer el contenido del html y extraer informacion
//e.target  -> elemento al que hacemos click
function leerDatosCursos(curso){
    

    //objeto con el contenido actual 
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    //revisa si un elemento ya existe en el carrito

    const existe =  articulosCarrito.some( curso => curso.id === infoCurso.id )
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map( curso =>{
            if( curso.id === infoCurso.id ){
                curso.cantidad ++;
                return curso; //retorna actualizado
            }else {
                return curso; //retorna objetos no duplicados
            }
        });
        articulosCarrito = [...cursos]
    } else {

        //agregar elemento al arreglo del carrito
        articulosCarrito= [...articulosCarrito, infoCurso]
    }

    
   

    carritoHTML()
}

//muestra el carrito de compra en el HTML
function carritoHTML(){
    
    //limpar html
    limparHTML()

    //recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {

        const{imagen, titulo, precio, cantidad, id} = curso

        const row = document.createElement('tr')

        row.innerHTML=`
            <td>
                <img src=${imagen} width='100'>
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href='#' class='borrar-curso' data-id='${id}'> x </a>
            </td>
            `

        //agrega el html dle carrito en el tbody
        contenedorCarrito.appendChild(row);
        

    })
}

function limparHTML(){

    //forma lenta
    //contenedorCarrito.innerHTML='';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}