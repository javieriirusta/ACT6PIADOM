const todos = JSON.parse(localStorage.getItem('todos')) || [];
const todosHecho = JSON.parse(localStorage.getItem('todosHecho')) || [];


const render = () => {
    const titulo2 = document.getElementById('titulo2');
    const miniContainer = document.getElementById('miniContainer');
    const cosasHechas = document.getElementById('cosasHechas');
    if (todosHecho.length > 0) {
        miniContainer.style.visibility = 'visible';
        titulo2.textContent = "Cosas hechas";
        if(!document.getElementById('botonLimpiarHecho')) {
        const botonLimpiarHecho = document.createElement('button');
        botonLimpiarHecho.textContent = "Limpiar";
        botonLimpiarHecho.id = "botonLimpiarHecho";
        miniContainer.appendChild(botonLimpiarHecho);
        botonLimpiarHecho.addEventListener('click', () => {
            todosHecho.length = 0;
            actualizacosasHechas(todosHecho);
            render();
            miniContainer.removeChild(botonLimpiarHecho);
        })
    }
    }
    else if(todosHecho.length === 0){
        miniContainer.style.visibility = 'hidden';
        titulo2.textContent = '';
    }
        const todoList = document.getElementById('todo-list');
        const cosasHechasTemplate = todosHecho.map(t => '<li>' + t + '</li>');
        cosasHechas.innerHTML = cosasHechasTemplate.join('');
        const todosTemplate = todos.map(t => '<li>' + t + '</li>');
        todoList.innerHTML = todosTemplate.join('');
        const elementos = document.querySelectorAll('#todo-list li');
        elementos.forEach((elemento, i) => {
            const botonesDiv = document.createElement('div');
            const botonEliminar = document.createElement('button');
            const botonHecho = document.createElement('button');
            botonEliminar.textContent = "Eliminar";
            botonHecho.textContent = "Hecho";
            botonesDiv.id = "botonesList";
            botonesDiv.appendChild(botonHecho);
            botonesDiv.appendChild(botonEliminar);
            elemento.appendChild(botonesDiv);
            botonHecho.addEventListener('click', () => {
                const cosaHecha = todos[i];
                todos.splice(i, 1);
                todosHecho.push(cosaHecha);
                actualizaTodos(todos);
                actualizacosasHechas(todosHecho);
                render();
            })
            botonEliminar.addEventListener('click', () => {
                elemento.parentNode.removeChild(elemento);
                todos.splice(i, 1);
                actualizaTodos(todos);
                render();
            })
        }) 
}

const actualizaTodos = (todos) => {
    const todoStrings = JSON.stringify(todos);
    localStorage.setItem('todos', todoStrings);
}
const actualizacosasHechas = (todosHecho) => {
    const todohechoStrings = JSON.stringify(todosHecho);
    localStorage.setItem('todosHecho', todohechoStrings);
}

window.onload = () => {
    const body = document.getElementsByTagName('body')[0];
    body.style.opacity = "1";
    render()
    const form = document.getElementById('todo-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        const todo  = document.getElementById('todo');
        if(todo.value !== ''){
        const todoText = todo.value;
        todo.value = '';
        todos.push(todoText);
        actualizaTodos(todos);
        actualizacosasHechas(todosHecho);
        render()
        }
    }
}






