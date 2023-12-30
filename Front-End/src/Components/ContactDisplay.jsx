import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function ContactDisplay() {
    const [contactData, setContactData] = useState([])

    const navigate = useNavigate()





    const loadData = async () => {

        const response = await axios.get('http://localhost:8081/getcontact')

        setContactData(response.data)
    }

    useEffect(() => {
        loadData()
    }, [])





    const handleEdit = (id) => {

        navigate(`/updateContact/${id}`)
    }
    const handleDelete = async(id) => {

        if (window.confirm("Are you sure want to delete contact?")) {
           const response = await axios.delete(`http://localhost:8081/removeContact/${id}`)
            alert('contact deleted succesfully',response.status)

        }

    }

    const handleView = (id) => {
        navigate(`/ContactDetails/${id}`)

    }



    const handleClickBack = (e) => {
        e.preventDefault()

        navigate('/')

    }


    return (
        <div className='container d-flex justify-content-center align-items-center flex-column gap-5 m-5 border shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
            <h1>Contact Table</h1>
            <div className='container-fluid d-flex justify-content-center my-5'>
                <table className='table w-100 text-center'>
                    <thead className='border'>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='border'>
                        {contactData.map((contact, index) => (
                            <tr key={contact.id}>
                                <td>{index + 1}</td>
                                <td>{contact.contact}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone}</td>
                                <td>
                                    <button type="button" className='btn btn-success m-1' onClick={() => handleView(contact.id)}>View</button>
                                    <button type="button" className='btn btn-warning my-1 mx-1' onClick={() => handleEdit(contact.id)}>
                                        Edit
                                    </button>
                                    <button type="button" className='btn btn-danger my-1 mx-1' onClick={() => handleDelete(contact.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='d-flex justify-content-center'>
                <button type="button" className='btn btn-primary' onClick={handleClickBack}>Go Back</button>
            </div>
        </div>
    )
}

export default ContactDisplay