import React, { ChangeEvent, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import contactsService from '../services/ContactInfoService';
import { Contact } from '../models/contact';

const AddContactInfo = () => {
    //chuyen trang trong react-router-v6 in react-hook
  let navigate = useNavigate();
  const initContactState = {
    id: "",
    firstName: "", 
    lastName: "",
  };

    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) : void => {
        if (event.target.name ==="firstName") {
            setFirstName(event.target.value);
        } else if (event.target.name === "lastName") {
            setLastName(event.target.value);
        }
    };


    const addNewContactInfo = (event: any)=> {
        event.preventDefault();
        var data = {
            id: 0,
            firstName: firstName as string,
            lastName: lastName as string,
        }

        

        window.alert(data.firstName +"-"+data.lastName);
        // contactsService.addNewContactInfo(data)
        //     .then((res) => {
        //         console.log(res.data);
        //         navigate("/");
        //     }).catch((e: Error) => {
        //         console.log(e);
        //       });

        contactsService.addNewContactInfo2(data.firstName, data.lastName)
        .then((res) => {
            console.log(res.data);
            navigate("/");
        }).catch((e: Error) => {
            console.log(e);
          });

        
    }

    const cancel = () => {
        navigate("/");
    }

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" name="firstName" value={firstName} placeholder="Enter email" 
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>handleChangeInput(event)}
                        />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" name="lastName" placeholder="Last Name" value={lastName} 
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>handleChangeInput(event)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button className="btn btn-success" variant="primary" onClick={(event:any) =>addNewContactInfo(event)} >
                    Submit
                </Button>
                <Button variant="primary" onClick={cancel} >
                cancel
                </Button>
            </Form>

{/* <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="firstName"
            value={firstName}
            onChange={(event) => handleChangeInput(event)}
          />
          <input
            type="text"
            placeholder="Deadline (in Days)..."
            name="lastName"
            value={lastName}
            onChange={(event) => handleChangeInput(event)}
          />
        </div>
        <button>Add Task</button> */}
        </>
    )
}

export default AddContactInfo