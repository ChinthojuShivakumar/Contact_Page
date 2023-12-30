import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'

function AddContact() {

    const Details = {
        name:'',
        email:'',
        number:''
    }

    const [inputs, setInputs] = useState(Details)
    const navigate = useNavigate()
   

    
    const  handleChange = (e) =>{
        e.preventDefault()

        const {name,value} = e.target

        setInputs({ ...inputs, [name]: value, })

    }


    const handleClickBack = (e) => {
        e.preventDefault()

        navigate('/')
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault()

        const { name, email, number } = inputs

        if(!name || !email || !number){

            console.error("please provide all details");
            alert("please provide all details")
        }
        else{
            const options = {
                name,
                email,
                number
            }
            axios.post('http://localhost:8081/postData',options)
            .then(()=>{
                setInputs({name:'',email:'',number:''})
            })
            .catch((error)=>{
                console.error("You have an error");
            })
            alert("contact added successfully")
        }
    }
    return (


        <>
            <div className='container d-flex justify-content-center align-items-center flex-column gap-5 m-5 border shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
                <h1>Add Contact</h1>
                <form className='container-fluid d-flex flex-column justify-content-center gap-2 w-25'>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" onChange={handleChange} value={inputs.name}/>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" onChange={handleChange} value={inputs.email} />
                    <label htmlFor="number">Phone Number</label>
                    <input type="text" name="number" id="number" onChange={handleChange} value={inputs.number}/>
                </form>
                <div className='container-fluid d-flex justify-content-center'>
                    <input type="submit" value='Add Contact' onClick={handleSubmit} className='btn btn-info m-1'  />
                    <button type="button" className='btn btn-primary m-1' onClick={handleClickBack}>Go Back</button>
                </div>
            </div>
        </>
    )
}

export default AddContact


