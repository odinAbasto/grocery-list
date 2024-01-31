import './style.scss'

let list = localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
let newItemButton = document.getElementById('new-item-button');
let newItemInput = document.getElementById('item-input');
let newItemQuantity =document.getElementById('item-quantity');
renderList();

function renderList(){
    let currentRenderedList = document.getElementById('list-container');
    currentRenderedList.innerHTML = '';
    list.forEach((item,index)=>{
      console.log(item);
              let newLi = document.createElement('li');
              
              let itemName = document.createElement('span');
              newLi.append(itemName);
              newLi.classList.add('d-flex','gap-3', 'align-items-center');
              newLi.classList.add('list-group-item');
              itemName.textContent = item.nombre; 
              itemName.classList.add('flex-grow-1');            
              
              let itemQuantity = document.createElement('span');
              itemQuantity.textContent = item.cantidad;

              let deleteItemButton = document.createElement('button');
              deleteItemButton.textContent = 'Borrar';
              deleteItemButton.classList.add('btn','btn-danger');
              deleteItemButton.dataset.id = index;
              deleteItemButton.addEventListener('click',(event)=>{
                deleteItem(event.target.dataset.id);
               
                
              });

              newLi.append(itemQuantity);
              newLi.append(deleteItemButton);
              currentRenderedList.append(newLi);
      }
  )
}

function deleteItem(index) {
  list.splice(index,1);
  saveList();
  renderList();
}


function saveList() {
  localStorage.setItem('list', JSON.stringify(list));
}

newItemButton.addEventListener('click',(event)=>{
    let name = newItemInput.value;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    let quantity =  newItemQuantity.value;
    if(!name){
      alert('Debe especificar el nombre de un producto');
      return false;
    }
    let newItem = {
      nombre : name,
      cantidad: quantity
    };
    console.log(newItem);
    list.push(newItem);
    newItemInput.value = '';
    newItemQuantity.value = 1;
    saveList();
    renderList();
})