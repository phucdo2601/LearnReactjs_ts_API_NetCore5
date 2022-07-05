import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Contact } from '../models/contact';
import contactsService from '../services/ContactInfoService';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import "./loadListContactInfo.scss";

const LoadListContactInfo = () => {

    //call navigate in react-router v6


    const [contactList, setContactList] = useState<Array<Contact>>([]);

    const [pageSize, setPageSize] = useState<number>(5);

    //value search
    const [searched, setSearched] = useState<string>("");

    //list value search
    const [filtererResults, setFiltererResults] = useState<Array<Contact>>([]);

    const getAllContactInfo = () => {
        contactsService.getAllContacts()
            .then((res) => {
                // console.log(res.data);
                setContactList(res.data);


            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    useEffect(() => {

        getAllContactInfo()
    }, [])



    const deleteContact = (id: number) => {
        contactsService.deleteContactInfo(id)
            .then((res) => {
                // console.log(res.status === 200);
                getAllContactInfo();
                // if (res.status === 200) {
                //     setContactList(contactList.filter(x => x.id !== id));
                // }
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    /**
    * Test Material x-data-grid
    */

    const columns: GridColDef[] = [
        { field: "id", headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            editable: true,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                // console.log(params);

                return (
                    <div className="cellAction">
                        <NavLink to={`/viewDetailContactInfo/${params.id}`} style={{ textDecoration: "none" }}>
                            <div className="btn btn-warning">View</div>
                        </NavLink>
                        <div
                            className="deleteButton"

                        >
                            <button className="btn btn-danger" onClick={() => deleteContact(params.row.id)} >
                                Delete
                            </button>

                        </div>
                    </div>
                );
            },
        },
    ];

    /**
     * ham auto generate password theo chuan dat dat password
     */
    const [password, setPassword] = useState<string>("");
    const [warningText, setWarningText] = useState<string>("");
    var patternPass = `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`;

    const autoGeneratePass = () => {
        var result: string = "";
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        var charactersLength: number = characters.length;
        // var patternPass = `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`;
        while (!result.match("^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$")) {
            for (var i = 0; i < 20; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
                if (result.match(patternPass) && result.length === 20) {
                    break;
                } else {
                    continue;
                }
            }
        }

        // alert(result);
        setPassword(result);
        console.log(result);

        return result;
    }

    const onPageSizeChanging = (newPageSize: number) => {
        setPageSize(newPageSize);

    }


    const disableOrEnableAutoGen = (): boolean => {
        if (password.match(patternPass)) {
            return true;
        } else {
            return false;
        }
    }

    const requestSearch = (e: any) => {
        e.preventDefault();
        // alert(`Searching succcessfully ${searched}`)
        if (searched !== "") {
            let newData = [...contactList];
            const filteredData = newData.filter((item) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(searched.toLowerCase());
            });
            setFiltererResults(filteredData);
        } else {
            setFiltererResults(contactList);
        }
    };

    const requestSearch2 = (searchedVal: string) => {
        setSearched(searchedVal);
        if (searched !== "") {
            let newData = [...contactList];
            const filteredData = newData.filter((item) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(searched.toLowerCase());
            });
            setFiltererResults(filteredData);
        } else {
            setFiltererResults(contactList);
        }
    }

    // const cancelSearch = () => {
    //     setSearched("");
    //     requestSearch();
    // };


    return (
        <>
            <div>
                <NavLink to="/AddContactInfo" className="btn btn-primary">Add New Contact Info</NavLink>
            </div>
            <hr />
            <button onClick={autoGeneratePass}
                disabled={disableOrEnableAutoGen()}
            >Auto Generate Password</button>
            <input type="text" value={password} style={{ width: "300px" }} />
            {
                disableOrEnableAutoGen() === true ? (
                    <p></p>
                ) : (
                    <p> Auto generating is not match with the password standard. Please Click 'Auto Generate Password' again! </p>
                )
            }
            <hr />
            <div>

            </div>
            {/* <table>
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
            </table> */}

            {/* table-view data-grid can ban cua material ui  */}
            {/* <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={contactList}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                // disableSelectionOnClick

                />
            </div> */}

            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Google Maps"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    value={searched}
                    onChange={(e: any) => requestSearch2(e.target.value)}
                />
                {/* <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={() => requestSearch(searched)}  >
                    <SearchIcon />
                </IconButton> */}

                <button type="submit" onClick={(e: any) => requestSearch(e)} >Search</button>

            </Paper>

            {/* display data paging using mui-datagrid */}
            {
                searched.length > 1 ? (
                    <>
                        <div className="datatable">

                            <DataGrid
                                rows={filtererResults}
                                columns={columns}
                                checkboxSelection
                                //turn on pagination on datagird
                                pageSize={pageSize}
                                rowsPerPageOptions={[5, 10, 15]}
                                onPageSizeChange={(newPageSize) => onPageSizeChanging(newPageSize)}
                                pagination
                            // disableSelectionOnClick

                            />

                        </div>
                    </>
                ) : (
                    <>
                        <div className="datatable">
                            <DataGrid
                                rows={contactList}
                                columns={columns}
                                checkboxSelection
                                //turn on pagination on datagird
                                pageSize={pageSize}
                                rowsPerPageOptions={[5, 10, 15]}
                                onPageSizeChange={(newPageSize) => onPageSizeChanging(newPageSize)}
                                pagination
                            // disableSelectionOnClick

                            />
                        </div>
                    </>
                )
            }

            {/* <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={contactList}
                    columns={columns}
                    checkboxSelection
                    //turn on pagination on datagird
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 15]}
                    onPageSizeChange={(newPageSize) => onPageSizeChanging(newPageSize)}
                    pagination
                // disableSelectionOnClick

                />
            </div> */}
        </>
    )
}

export default LoadListContactInfo