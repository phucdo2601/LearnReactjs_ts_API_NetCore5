import React, { ChangeEvent, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Contact } from '../models/contact';
import contactsService from '../services/ContactInfoService';

const ViewDetailContactInfo = () => {

    let navigate = useNavigate();

    const { id } = useParams();

    // var y: number = +id;
    const initContact = {
        id: 0,
        firstName: "",
        lastName: "string|any",
    };

    const [contactInfo, setContactInfo] = useState<Contact>(initContact);

    const getContactInfoDetail = () => {
        contactsService.getContactInfoById(id)
            .then((res) => {
                console.log(res.data);
                setContactInfo(res.data);


            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    useEffect(() => {
        getContactInfoDetail()
    }, [])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setContactInfo({ ...contactInfo, [name]: value });
    };

    const cancel = () => {
        navigate("/");
    }

    const handleUpdateContactInfo = () => {
        var data = {
            id: Number(id),
            firstName: contactInfo?.firstName,
            lastName: contactInfo?.lastName
        }
        window.alert(data.firstName + "-" + data.lastName);
        contactsService.updateContactInfo(
            data.id,
            data.firstName,
            data.lastName
        ).then((res) => {
            console.log(res.data);
            navigate("/home");
        }).catch((e: Error) => {
            console.log(e);
        });
    }

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" name="firstName" value={contactInfo?.firstName} placeholder="Enter email"
                        onChange={handleInputChange}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" name="lastName" placeholder="Last Name" value={contactInfo?.lastName}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" onClick={handleUpdateContactInfo}>
                    Update
                </Button>

                <Button variant="warning" onClick={cancel} >
                    cancel
                </Button>
            </Form>
        </>
    )
}

export default ViewDetailContactInfo