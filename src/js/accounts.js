import axios from "axios";

const signupBtn = document.getElementById('signup_btn')

const signupUser = () => {
   const inputs = document.querySelectorAll('.input')

   const name = inputs[0].value
   const lastname = inputs[1].value
   const email = inputs[2].value
   const password = inputs[3].value
   const agreement = inputs[4].checked


   if (agreement) {
      axios.post('https://shapemi.herokuapp.com/user/', {
         name: name,
         lastname: lastname,
         email: email,
         password: password
      })
         .then((res) => {
            console.log(res.data)
            alert('Success')
         })
         .catch((err) => {
            console.error(err)
         })

      inputs.forEach(el => {
         el.value = '';
      })
   } else {
      alert('Accept our Terms')
   }
}

signupBtn.onclick = () => {
   signupUser()
}