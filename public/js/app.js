console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
 const location = weatherForm.elements['location'].value

 messageOne.textContent="Loading..."
 messageTwo.textContent=""   
 fetch(`/weather?address=${location}`)
 .then((response) => {
    
     response.json().then((data) => {
         if(data.error) {
             messageTwo.textContent = data.error
             messageOne.textContent=""
             console.log('ERROR', data.error)
         }else {
            messageOne.textContent =  data.location
            messageTwo.textContent = data.forecast
         console.log('Location', data.location)
         console.log('Forecast', data.forecast)
         }
     }).catch((e) => {
         console.log('Error', e)
     })
 })   
})