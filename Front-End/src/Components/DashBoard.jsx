import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';



function DashBoard() {

    const navigate = useNavigate()

    

    const handleclickViewContact = (e) =>{
        e.preventDefault()

        navigate('/ContactDetails')
    }

    const handleclickAddContact = (e) =>{
        e.preventDefault()

        navigate('/AddContact')
    }
    return (
        <>
            <div className='container'>
                <div className='container-fluid d-flex justify-content-center my-5'>
                    <button type="button" className='btn btn-danger m-1' onClick={handleclickAddContact}>Add New Contact</button>
                    <button type="button" className='btn btn-success m-1' onClick={handleclickViewContact}>View Contacts</button>
                </div>
            </div>

            
        </>
    )
}

export default DashBoard


