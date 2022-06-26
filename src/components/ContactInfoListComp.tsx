import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllContactInfo, findContactInfosByTitle, retrieveContacts } from '../redux/slices/contactInfoSlice';
import { ContactModel } from '../models/ContactModel';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/stores/store';
import { toast } from 'react-toastify';
import ContactInfoApi from '../apis/ContactInfoApi';
import initAxios from '../apis/http-common';
import { AxiosError, AxiosResponse } from 'axios';

const initContactState = {
    id: 0,
    firstName: "",
    lastName: "",
};

const ContactInfoListComp = () => {
    const [currentTutorial, setCurrentTutorial] = useState<ContactModel>(initContactState);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    const [listInfo, setListInfo] = useState<ContactModel[]>([]);

    const contacts = useSelector((state: RootState) => state.contacts);
    const dispatch = useDispatch<AppDispatch>();

    const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    /**
     * Doc du lieu bang redux tool kit
     */
    const initFetch = useCallback(() => {
        dispatch(retrieveContacts());
    }, [dispatch]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const refreshData = () => {
        setCurrentTutorial(initContactState);
        setCurrentIndex(-1);
    };

    useEffect(() => {
        const getAllInfos = () => {
            const id = toast.loading("Please wait...")
            ContactInfoApi.getAll()
                .then((res: AxiosResponse) => {
                    if (res.status === 200) {
                        toast.update(id, { render: "All is good", type: "success", isLoading: false, autoClose: 2000 });
                    }
                    if (res.status === 404) {
                        toast.update(id, { render: "Something went wrong", type: "warning", isLoading: false, autoClose: 2000 });
                    }
                }).catch((err: AxiosError) => {
                    if (err.response?.status === 404) {
                        toast.update(id, { render: "Something went wrong", type: "warning", isLoading: false, autoClose: 2000 });
                    }

                });
        }
        getAllInfos();

    }, []);

    const setActiveTutorial = (contact: React.SetStateAction<any>, index: number) => {
        setCurrentTutorial(contact);
        setCurrentIndex(index);
    };

    const removeAllTutorials = () => {
        dispatch(deleteAllContactInfo())
            .then((response: any) => {
                refreshData();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    var searchData = {
        firstName: searchTitle,
    }

    const findByTitle = () => {
        refreshData();
        dispatch(findContactInfosByTitle({ firstName: searchTitle, lastName: "", id: 0 }));
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
                            contacts.map((contact: ContactModel, index: number) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => setActiveTutorial(contact, index)}
                                    key={index}
                                >
                                    {contact.lastName}
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

export default ContactInfoListComp