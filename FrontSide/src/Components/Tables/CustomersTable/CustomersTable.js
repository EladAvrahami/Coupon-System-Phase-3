import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import './CustomersTable.css';
import axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';
import AxiosRequest from '../../../axios/AxiosRequest';
import notify from '../../Services/Notify';


// regex for email validation
const validateEmail = (email) => {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

const CustomerTable = () => {

  const [user, setUser] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  let columns = [
    { title: 'ID', field: 'id' },
    { title: 'First name', field: 'firstName' },
    { title: 'Last name', field: 'lastName' },
    { title: 'Email', field: 'email' },
    { title: 'Password', field: 'password' },
    { title: 'coupons', button: <button type="">Coupons</button> }
  ]

  // let data = [
  //   { name: 'manish', username: 'traptrick', email: 'themk85@gmail.com', phone: '9999999999', website: 'https://github.com/traptrick' }
  // ]  

  useEffect(() => {
    AxiosRequest.get(`/coupons/getAllCustomers`)
      .then(res => {
        const users = res.data;
        setUser(users);
        // console.log(users);
      })
  }, [])



  //function for updating the existing row details
  const handleRowUpdate = (newData, oldData, resolve) => {
    //validating the data inputs
    let errorList = []
    if (newData.id !== oldData.id) {
      errorList.push("* You can't update the customer's id.")
    }
    if (newData.firstName === "") {
      errorList.push("* Please fill the first name field.")
    }
    if (newData.firstName.length < 3) {
      errorList.push("* First name must be at least 2 letters long.")
    }
    if (newData.lastName === "") {
      errorList.push("* Please fill the last name field.")
    }
    if (newData.lastName.length < 3) {
      errorList.push("* Last name must be at least 2 letters long.")
    }
    if (newData.email === "" || validateEmail(newData.email) === false) {
      errorList.push("* Please enter a valid email")
    }
    if (newData.password.length < 11) {
      errorList.push("* The password must be at least 10 notes long.")
    }
    

    if (errorList.length < 1) {
      AxiosRequest.post(`/coupons/updateCustomer`, newData)
        .then(response => {
          const updateUser = [...user];
          const index = oldData.tableData.companyId;
          updateUser[index] = newData;
          setUser([...updateUser]);
          resolve()
          setIserror(false)
          setErrorMessages([])
          notify.success("Editing succeeded!");
        })
        .catch(error => {
          console.log(error.response.data.message);
          notify.error(error.response.data.message);
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }
  }


  //function for deleting a row
  const handleRowDelete = (oldData, resolve) => {
    AxiosRequest.delete(`/coupons/deleteCustomer/${oldData.id}`)
      .then(response => {
        const dataDelete = [...user];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setUser([...dataDelete]);
        resolve()
        notify.success("Delete succeeded!");
      })
      .catch(error => {
        console.log(error.response.data.message);
        notify.error(error.response.data.message);
        resolve()
      })
  }


  //function for adding a new row to the table
  const handleRowAdd = (newData, resolve) => {
    //validating the data inputs
    let errorList = []
    if(newData.id >= "") {
      errorList.push("* Please don't fill the id field. Id's are given by the system.")
    }
    if (newData.firstName === "") {
      errorList.push("* Please fill the first name field.")
    }
    if (newData.firstName.length < 3) {
      errorList.push("* First name must be at least 2 notes long.")
    }
    if (newData.lastName === "") {
      errorList.push("* Please fill the last name field.")
    }
    if (newData.lastName.length < 3) {
      errorList.push("* Last name must be at least 2 notes long.")
    }
    if (newData.email === "" || validateEmail(newData.email) === false) {
      errorList.push("* Please enter a valid email.")
    }
    if (newData.password.length < 11) {
      errorList.push("* The password must be at least 10 notes long.")
    }

    if (errorList.length < 1) {
      AxiosRequest.post(`/coupons/addCustomer`, newData)
        .then(response => {
          let newUserdata = [...user];
          newUserdata.push(newData);
          setUser(newUserdata);
          resolve()
          setErrorMessages([])
          setIserror(false)
          notify.success("Adding succeeded!")
        })
        .catch(error => {
          console.log(error.response.data.message);
          notify.error(error.response.data.message);
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }


  return (
    <div className="CustomerTable">
      <h1>Customers management:</h1> <br /><br />

      <MaterialTable
        title="Customer details:"
        columns={columns}
        data={user}
        options={{
          headerStyle: { borderBottomColor: 'red', borderBottomWidth: '3px', fontFamily: 'verdana' },
          actionsColumnIndex: -1
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);

            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve)
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve)
            }),
        }}
      />

      <div>
        {iserror &&
          <Alert severity="error">
            <AlertTitle>ERROR</AlertTitle>
            {errorMessages.map((msg, i) => {
              return <div key={i}>{msg}</div>
            })}
          </Alert>
        }
      </div>

    </div>
  );
}

export default CustomerTable;
