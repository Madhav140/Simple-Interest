import './App.css';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { useState } from 'react';


function App() {

  const[interest, setinterset] = useState(0)
  const[principle, setprinciple] = useState(0)
  const[rate, setrate] = useState(0)
  const[year, setyear] = useState(0)

  const[isprinciple, setisprinciple] = useState(true)  /* for conditional rendering */
  const[israte, setisrate] = useState(true)
  const[isyear, setisyear] = useState(true)

  const getvalidate = (e)=>{
          const {name,value}= e.target
    /* !!value.match(/^[0-9]*.?[0-9]+$/) -- .match is used to check the value follows a pattern of regular expression 
                                     and !! is used it to convert the whole expression into boolean so only we can conditional render it */

          if(!!value.match(/^[0-9]*.?[0-9]+$/)){

           if(name==='Principal'){
              setprinciple(value)
              setisprinciple(true)
            }
           else if(name==='rate'){
              setrate(value)
              setisrate(true)
            }   
           else{
              setyear(value)
              setisyear(true)
            }

          }
          else{

           if(name==='Principal'){
               setprinciple(value)
              setisprinciple(false)
            }
           else if(name==='rate'){
               setrate(value)
               setisrate(false)
            }  
           else{
            setyear(value)
            setisyear(false)
           } 

          }
                                     
  }

  const handlecalculate = (n)=>{
    n.preventDefault()  /* to prevent refreshing */
    if(!principle || !rate || !year){
      alert('please fill the form')
    }
    else{
      setinterset(principle*rate*year/100)
    }
  }

  const handlereset = ()=>{
    setinterset(0)
    setprinciple(0)
    setrate(0)
    setyear(0)
    setisprinciple(true)
    setisrate(true)
    setisyear(true)
  }

  return (
   <>
   <div style={{height:'100vh'}} className='d-flex justify-content-center align-items-center w-100 bg-dark'> 
   <div className='bg-light p-5 rounded' style={{width:'500px'}}> 
   <h1>Simple Interest App</h1>
   <p>Calculate Simple Interest Easily</p>
   <div className='bg-warning d-flex justify-content-center align-items-center w-100 p-3 rounded flex-column'> {/* flex column is used for arrange items one after another in bottom */}
    <h1>₹ {' '} {interest}</h1>
    <p>Total Simple Interest </p>
   </div>
   <form className='mt-5' onSubmit={handlecalculate}>

          <div className='mb-3'> 
          <TextField name='Principal' value={principle || ''} onChange={(e)=>getvalidate(e)} className='w-100' id="outlined-basic" label="₹ Principal Amount" variant="outlined" />
          </div>
          { !isprinciple &&     /* ! is used to only render when the isprinciple is false,initially it is true and && -truthy operator */
            <div>
            <p className='text-danger'>Invalid Input</p>
          </div>}

          <div className='mb-3'> 
          <TextField name='rate' value={rate || ''} className='w-100' id="outlined-basic" label="Rate of Interest (p.a) %" variant="outlined" onChange={(e)=>getvalidate(e)} />
          </div>
          { !israte &&     
            <div>
            <p className='text-danger'>Invalid Input</p>
          </div>}

          <div className='mb-3'> 
          <TextField  value={year|| '' } className='w-100' id="outlined-basic" label="Year (Yr)" variant="outlined" onChange={(e)=>getvalidate(e)} />
          </div>
          { !isyear &&     
            <div>
            <p className='text-danger'>Invalid Input</p>
          </div>}

          <Stack className='mt-5' direction="row" spacing={2}>
               <Button type='submit' disabled={isprinciple && israte && isyear?false:true} className='bg-success' style={{width:'200px',height:'50px'}} variant="contained">Calculate</Button>  {/* disabled is used to disable the button on a specific condiztion */}
               <Button onClick={handlereset} style={{width:'200px',height:'50px'}} variant="outlined">Reset</Button>
          </Stack>

   </form>
   </div>
   </div>
   </>
  );
}

export default App;
