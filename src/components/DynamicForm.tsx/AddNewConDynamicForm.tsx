import { Box, Button, Card, Grid, IconButton, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Contact } from '../../models/contact';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import contactsService, { ContactInfoService } from '../../services/ContactInfoService';
import { toast } from 'react-toastify';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'FirstName',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'LastName',
    width: 150,
    editable: true,
  },

];

const schema = yup.object().shape({
  firstName: yup.string().required("The firstname field is not blank!"),
  lastName: yup.string().required("The lastName field is not blank!"),
});



const AddNewConDynamicForm = () => {
  //   const methods = useForm({
  //     resolver: yupResolver(schema),
  //     // defaultValues,
  //   });

  //   const {
  //     reset,
  //     watch,
  //     control,
  //     setValue,
  //     handleSubmit,
  //     register,
  //     formState: { isSubmitting },
  // } = methods;

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });


  const listDataInputInit: Array<any> = [
    {
      id: uuidv4(),
      firstName: '',
      lastName: '',
    },
  ]

  const [listData, setListData] = useState<Array<any>>(listDataInputInit);

  const [isSendClicked, setIsSendClicked] = useState(false);

  const handleAddFields = () => {
    setListData([...listData, { id: uuidv4(), firstName: '', lastName: '' }])
  }

  const handleRemoveFields = (id: number) => {
    const values = [...listData];
    values.splice(values.findIndex(value => value.id === id), 1);
    setListData(values);
  }

  const [listNewData, setListNewData] = useState<Array<Contact>>(listDataInputInit);


  const handleClickSubmit = (e: any) => {
    // e.preventDefault();
    // contactsService.addNewListContactInfo(listData).then((res) => {
    //   if (res.data !== "") {

    //   }
    // })

    let contactList: Array<Contact> = [];
    setIsSendClicked(true);

    listData.map((contact: Contact, index: number) => {

      const data = {
        id: index,
        firstName: contact.firstName,
        lastName: contact.lastName,
      }
      contactList.push(data);
    })

    console.log(contactList);
    

    contactsService.addNewListContactInfo(contactList).then((res) => {
      
        
        toast("Add Successfully!!!");
        
        console.log("InputFields: ", res.data);
    
    })

    setListNewData(contactList);
    setListData(contactList);
    // reset();

  }

  const handleChangeInput = (index: number, e: any) => {
    const values = [...listData];
    values[index][e.target.name] = e.target.value;
    setListData(values);
  }

  return (
    <>
      <div>
        {/* <hr/> */}
        <h2>Demo basic validation form</h2>
        <hr />
        <form onSubmit={handleSubmit(handleClickSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                  }}
                >

                  {
                    listData.map((inputField: Contact, index: number) => (
                      <>
                        <Box
                          sx={{
                            display: 'grid',
                            columnGap: 2,
                            rowGap: 3,
                            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                          }}
                        >
                          <TextField id="outlined-basic" {...register("firstName")} value={inputField.firstName} onChange={(e: any) => handleChangeInput(index, e)} name='firstName' label="firstName" variant="outlined" />
                          {
                            errors.firstName && <span style={{ color: 'red' }}>This field is required</span>
                          }
                        </Box>

                        <Box
                          sx={{
                            display: 'grid',
                            columnGap: 2,
                            rowGap: 3,
                            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                          }}
                        >
                          <TextField id="outlined-basic" {...register("lastName")} value={inputField.lastName} onChange={(e: any) => handleChangeInput(index, e)} name='lastName' label="lastName" variant="outlined" />
                          {
                            errors.lastName && <span style={{ color: 'red' }}>This field is required</span>
                          }
                        </Box>
                        <Stack sx={{
                          display: 'grid',
                          columnGap: 2,
                          rowGap: 3,
                          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                        }} >
                          <IconButton disabled={listData.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                            <DeleteOutlinedIcon />
                          </IconButton>

                          <IconButton onClick={handleAddFields}>
                            <AddIcon />
                          </IconButton>
                        </Stack>
                      </>
                    ))

                  }


                </Box>
                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <Button type="submit" variant="contained">
                    Send
                  </Button>
                </Stack>

              </Card>
            </Grid>
          </Grid>

        </form>
        <Card>

          <>
            {
              isSendClicked && listNewData.length > 0 && <>
                <DataGrid
                  sx={{ minWidth: 800, minHeight: 600 }}
                  rows={listNewData}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </>
            }
          </>
        </Card>
      </div>
    </>
  )
}

export default AddNewConDynamicForm