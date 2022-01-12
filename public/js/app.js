
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message_1')
const messageTwo=document.querySelector('#message_2')


//messageOne.textContent="Javascript"
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    //console.log('testing')
    const location=search.value
    //console.log(location)
    messageOne.textContent='Loading.....'
    messageOne.textContent=''
    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        //console.log(data)
        if(data.error){
            messageOne.textContent=data.error
        }else{
            
            messageOne.textContent=data.location
            messageTwo.textContent=data.forcast
            //console.log(data.forcast)
        }
    })
})
})