// console.log("Client sidee JavaScript is loaded!");

//Fetch API is not part of JavaScript but it is a brower based API,
//its something we can use in all modern browers but not accessable in node js

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')  //this is target  by element but it will match the first one that show 
const search = document.querySelector('input')   //first input or form  but if want to target b y class can so as ('.className=')
const messageOne = document.querySelector('#message-1')      //this is target id need #
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
   

fetch("/weather?address="+ location )  //whateve value store in location above
     .then((response) => {
      response.json().then((data)=>{
   if (data.error) {
     messageOne.textContent = (data.error)
      
    }else{
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
        
    }

  })
 
   
      })
  })

    
//     fetch("http://localhost:3000/weather?address="+ location )  //whateve value store in location above
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Request Error");
//     }
//     response
//       .json()
//       .then((data) => { 
//         // if (data.error) {
//         //   throw new Error(data.error);
//         // }
//         console.log(data.forecast);
//         console.log(data.address);
//       })
//   })
// .catch((err) => {
//     console.log({ err })
//   })
    
// })

