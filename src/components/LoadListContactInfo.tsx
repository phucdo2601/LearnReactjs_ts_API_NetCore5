import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Contact } from '../models/contact'
import contactsService from '../services/ContactInfoService';


const LoadListContactInfo = () => {

    const [contactList, setContactList] = useState<Array<Contact>>([]);


    const getAllContactInfo = () => {
         contactsService.getAllContacts()
            .then((res) => {
                console.log(res.data);
                setContactList(res.data);
                
                
            })
            .catch((e: Error) => {
                console.log(e);
              });
    }

    const deleteContact = (id: number) => {
        contactsService.deleteContactInfo(id)
        .then((res) => {
            console.log(res.data);
            getAllContactInfo();
            
            
        })
        .catch((e: Error) => {
            console.log(e);
          });
    }

    useEffect(() =>{
        getAllContactInfo()
    }, [])
    
  return (
    <>
        <div>
            <NavLink to="/AddContactInfo" className="btn btn-primary">Add New Contact Info</NavLink>
        </div>
        <hr />
        <table>
            <thead>
                <tr>
                <th>Id</th>
                    <th>
                        First Name
                    </th>

                    <th>
                        Last Name
                    </th>

                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {
                    contactList.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>
                            <NavLink className="btn btn-success" to={`/viewDetailContactInfo/${item.id}`}>
                                    Edit
                                </NavLink>
                            </td>
                            <td>
                                <button className="btn btn-primary"
                                    onClick={() => deleteContact(item.id)}
                                >
                                    Delete
                                </button>

                            </td>

                            <td>
                                <NavLink className="btn btn-warning" to={`/viewDetailContactInfo/${item.id}`}>
                                    View Contact Detail
                                </NavLink>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </>
  )
}

export default LoadListContactInfo