import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllContactInfo,
  findContactInfosByTitle,
  retrieveContacts,
} from "../redux/slices/contactInfoSlice";

import { Link } from "react-router-dom";

const ContactInfoListComp = () => {
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const initFetch = useCallback(() => {
    dispatch(retrieveContacts());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const refreshData = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    dispatch(deleteAllContactInfo())
      .then((response) => {
        refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findContactInfosByTitle({ firstName: searchTitle }));
  };

  return (
    <>
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Tutorials List</h4>

          <ul className="list-group">
            {contacts &&
              contacts.map((contact, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveTutorial(contact, index)}
                  key={index}
                >
                  {contact.firstName}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllTutorials}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Contact Info</h4>
              <div>
                <label>
                  <strong>FirstName:</strong>
                </label>{" "}
                {currentTutorial.firstName}
              </div>
              <div>
                <label>
                  <strong>LastName:</strong>
                </label>{" "}
                {currentTutorial.lastName}
              </div>
              {/* <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTutorial.published ? "Published" : "Pending"}
            </div> */}

              <Link
                to={"/contacts/" + currentTutorial.id}
                className="btn btn-primary"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactInfoListComp;
