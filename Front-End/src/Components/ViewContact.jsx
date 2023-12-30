import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ViewContact = () => {
    const { id } = useParams();
    const [contactData, setContactData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true);

        axios
            .get(`http://localhost:8081/getcontact/${id}`)
            .then((response) => {
                setContactData(response.data[0]);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='container d-flex justify-content-center align-items-center flex-column gap-5 m-5 border shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
            <h1>Contact Details</h1>
            {contactData && (
                <div className='card p-5'>
                    <p className='fw-bold'>ID: {contactData.id}</p>
                    <p className='fw-bold'>Name: {contactData.contact}</p>
                    <p className='fw-bold'>Email: {contactData.email}</p>
                    <p className='fw-bold'>Phone: {contactData.phone}</p>
                    {/* Render other contact details */}
                </div>
            )}
            <button type="button" className='btn btn-primary' onClick={(e)=>{navigate("/ContactDetails")}}>Go Back</button>
        </div>
    );
};

export default ViewContact;
