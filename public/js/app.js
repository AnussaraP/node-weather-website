
const weatherForm = document.querySelector('form')  //this is target  by element but it will match the first one that show 
const search = document.querySelector('input')   //first input or form  but if want to target b y class can so as ('.className=')
const messageOne = document.querySelector('#message-1')      //this is target id need #
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
   
//change this fo heroku to work // remove local 
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

   

