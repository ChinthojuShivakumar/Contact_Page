import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddEdit() {
    //   const [contactDisplay, setContactDisplay] = useState({});
    const [inputs, setInputs] = useState({ contact: '', email: '', phone: '' });
    const { id } = useParams();
    const navigate = useNavigate();



    useEffect(() => {

        axios.get(`http://localhost:8081/getcontact/${id}`)
            .then((response) => {

                setInputs(response.data[0]);
            })
            .catch((error) => {
                console.error('Error fetching contact:', error);
            });
    }, [id]);

    const handleBack = (e) => {
        e.preventDefault();
        navigate('/ContactDetails');
    };

    const handleChange = (e) => {
        e.preventDefault();
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8081/updateData/${id}`, inputs).then((response) => {
            alert('Contact updated successfully:');

        })
        .catch((error) => {
            console.error('Error updating contact:', error);
        });
    };

    return (
        <>
            <div className='container border'>
                <form onSubmit={handleUpdate} className='container-fluid d-flex flex-column justify-content-center w-25'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='contact' id='contact' value={inputs.contact} onChange={handleChange} />
                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' id='email' value={inputs.email} onChange={handleChange} />
                    <label htmlFor='number'>Phone Number</label>
                    <input type='text' name='phone' id='phone' value={inputs.phone} onChange={handleChange} />

                    <div className='container-fluid d-flex justify-content-center'>
                        <input type='submit' value='Update' className='btn btn-info m-1' />
                        <button type='button' className='btn btn-primary m-1' onClick={handleBack}>
                            Go Back
                        </button>

                    </div>
                </form>
            </div>
        </>
    );
}

export default AddEdit;
