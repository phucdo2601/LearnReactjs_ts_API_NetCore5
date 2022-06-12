import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createContactInfo } from "../redux/slices/contactInfoSlice";

const AddContactInfo = () => {
  const initialContactState = {
    id: 0,
    firstName: "",
    lastName: "",
  };
  const [tutorial, setTutorial] = useState(initialContactState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    const { id, firstName, lastName } = tutorial;

    dispatch(createContactInfo({ id, firstName, lastName }))
      .unwrap()
      .then((data) => {
        console.log(data);
        setTutorial({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
        });
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialContactState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Firstname</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              required
              value={tutorial.title || ""}
              onChange={handleInputChange}
              name="firstName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Lastname</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              required
              value={tutorial.description || ""}
              onChange={handleInputChange}
              name="lastName"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddContactInfo;
