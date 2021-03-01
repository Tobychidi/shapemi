let shapesList
const shapesListSection = document.querySelector('.Shapes-List ul');

export const getShapes = async () => {
   await axios.get('http://localhost:3000/shapes/list')
      .then((res) => {
         console.log(res.data)
         shapesList = res.data;
      })
      .catch((err) => {
         console.log(err)
      })
      
      for (const x in shapesList) {
         if (Object.hasOwnProperty.call(shapesList, x)) {
            const el = shapesList[x];
            const li = document.createElement('li')
            li.innerHTML = x;
            shapesListSection.appendChild(li)
         }
      }
}
export const addShapes = () => {
   let data = JSON.stringify({ "shape": "triangle" });

   axios.post('http://localhost:3000/shapes/add', data)
      .then(function (response) {
         console.log(response);
      })
      .catch(function (error) {
         console.log(error);
      });

}


