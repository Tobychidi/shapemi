import { getShapes } from './api.js';

const button = document.querySelector('button');
const addShapesButton = document.querySelector('.add-shape');

button.addEventListener("click", function () {
   getShapes()
})

addShapesButton.onclick =()=>{
   window.location.href='shapes.html'
}