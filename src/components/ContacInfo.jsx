import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteContactInfo,
  updateContactInfo,
} from "../redux/slices/contactInfoSlice";
import ContactInfoApi from "./../services/ContactInfoApi";

const ContacInfo = (props) => {
  const { id } = useParams();

  const initialTutorialState = {
    id: 0,
    firstName: "",
    lastName: "",
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getTutorial = (id) => {
    ContactInfoApi.get(id)
      .then((response) => {
        console.log(response.data);
        setCurrentTutorial(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updateStatus = (status) => {
    const data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status,
    };

    dispatch(updateContactInfo({ id: currentTutorial.id, data }))
      .unwrap()
      .then((response) => {
        console.log(response);
        setCurrentTutorial({ ...currentTutorial, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(
      updateContactInfo({ id: currentTutorial.id, data: currentTutorial })
    )
      .unwrap()
      .then((response) => {
        console.log(response);
        setMessage("The tutorial was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeTutorial = () => {
    dispatch(deleteContactInfo({ id: currentTutorial.id }))
      .unwrap()
      .then(() => {
        props.history.push("/tutorials");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">FirstName</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={currentTutorial.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">LastName</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={currentTutorial.lastName}
                onChange={handleInputChange}
              />
            </div>

            {/* <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div> */}
          </form>

          {/* {currentTutorial.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )} */}

          <button className="badge badge-danger mr-2" onClick={removeTutorial}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default ContacInfo;
