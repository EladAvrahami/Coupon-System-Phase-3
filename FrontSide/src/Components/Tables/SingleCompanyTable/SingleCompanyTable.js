import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import './SingleCompanyTable.css';
import axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';
import AxiosRequest from "../../../axios/AxiosRequest";
import notify from '../../Services/Notify';


// regex for email validation
const validateEmail = (email) => {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

const SingleCompanyTable = () => {

  const [user, setUser] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  let columns = [
   { title: 'CouponId', field: 'id' },
   { title: 'CompanyID', field: 'companyID' },
    { title: 'Category', field: 'category' },
    { title: 'Title', field: 'title' },
    { title: 'Description', field: 'description' },
    { title: 'StartDate', field: 'startDate' },
    { title: 'EndDate', field: 'endDate' },
    { title: 'Amount', field: 'amount' },
    {title: "Price", field: "price",
      customFilterAndSearch: (term, rowData) => rowData.price <= term,
    },
    { title: 'Image', field: 'image' }
  ]

  // let data = [
  //   { name: 'manish', username: 'traptrick', email: 'themk85@gmail.com', phone: '9999999999', website: 'https://github.com/traptrick' }
  // ]  

  useEffect(() => {
    AxiosRequest.get("/coupons/getCouponsByCompany")
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
      errorList.push("* You can't update the coupon's id.")
    }
    if (newData.id === "") {
        errorList.push("* You must fill the coupon id field.")
      }
    if (newData.companyID !== oldData.companyID) {
      errorList.push("* You can't update the company's id.")
    }
    if (newData.companyId === "") {
        errorList.push("* You must fill the company id field.")
      }
    if (newData.category === "") {
      errorList.push("* Please fill the category field.")
    }
    if (newData.title === "") {
      errorList.push("* Please fill the title field.")
    }
    if (newData.title.length < 4) {
        errorList.push("* Title must be at least 3 notes long.")
      }
    if (newData.description === "") {
      errorList.push("* Please fill the description field.")
    }
    if (newData.description.length < 4) {
        errorList.push("* The description field must be at least 3 notes long.")
      }
    if (newData.startDate === "" ) {
      errorList.push("* Please fill the start-date field.")
    }
    if (newData.endDate === "") {
      errorList.push("* Please fill the end-date field.")
    }
    if (newData.amount === "") {
      errorList.push("* Please fill the amount field.")
    }
    if (newData.amount < 0) {
        errorList.push("* Amount can't be negative.")
      }
    if (newData.price === "") {
      errorList.push("* Please fill the price field.")
    }
    if (newData.price < 0) {
        errorList.push("* The price can't have a negative value.")
      }
    if (newData.image === "") {
      errorList.push("* Please fill the image field.")
    }
    

    if (errorList.length < 1) {
      AxiosRequest.put(`/coupons/updateCoupon`, newData)
        .then(response => {
          const updateUser = [...user];
          const index = oldData.tableData.id;
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
    AxiosRequest.delete(`/coupons/deleteCoupon/${oldData.id}`)
      .then(response => {
        const dataDelete = [...user];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setUser([...dataDelete]);
        resolve()
        notify.success("Delete succeeded!")
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
      if (newData.id >=0 ) {
        errorList.push("* Please leave the id field empty. Id's are given by the system.")
      }
      if (newData.id === "") {
          errorList.push("* You must fill the company id field.")
        }
      if (newData.category === "") {
        errorList.push("* Please fill the category field.")
      }
      if (newData.title === "") {
        errorList.push("* Please fill the title field.")
      }
      if (newData.title.length < 4) {
          errorList.push("* Title must be at least 3 notes long.")
        }
      if (newData.description === "") {
        errorList.push("* Please fill the description field.")
      }
      if (newData.description.length < 4) {
          errorList.push("* The description field must be at least 3 notes long.")
        }
      if (newData.startDate === "" ) {
        errorList.push("* Please fill the start-date field.")
      }
      if (newData.endDate === "") {
        errorList.push("* Please fill the end-date field.")
      }
      if (newData.amount === "") {
        errorList.push("* Please fill the amount field.")
      }
      if (newData.amount < 0) {
          errorList.push("* Amount can't be negative.")
        }
      if (newData.price === "") {
        errorList.push("* Please fill the price field.")
      }
      if (newData.price < 0) {
          errorList.push("* The price can't have a negative value.")
        }
      if (newData.image === "") {
        errorList.push("* Please fill the image field.")
      }

    if (errorList.length < 1) {
      //const response = await AxiosRequest.post<CompanyData>("/coupons/addCompany",company); //the link was wrong
      AxiosRequest.post(`/coupons/addCoupon`, newData)
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
    <div className="SingleCompanyTable">
      <h1>Coupons management:</h1> <br /><br />

      <MaterialTable
        title="Company coupons:"
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

export default SingleCompanyTable;
