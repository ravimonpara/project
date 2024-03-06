import AdminMenu from "./AdminMenu";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import showError, { showMessage } from "./toast-message";
import 'react-toastify/dist/ReactToastify.css';
import getBase, { getImgBase } from "./api";
import VerifyLogin from "./VerifyLogin";
import axios from "axios";
import { Link } from "react-router-dom";
export default function AdminCategory() {
  //create state list
  let [categories, setCategory] = useState([]);

  //inner function 
  let DeleteCategory = function (id) {
    console.log(id);
    let apiAddress = getBase() + "delete_category.php?id=" + id;
    axios({
      method: 'get',
      responseType: 'json',
      url: apiAddress
    }).then((response) => {
      console.log(response);
      if (response.data[0]['error'] != 'no')
        showError(response.data[0]['error']);
      else {
        let temp = categories.filter((item) => {
          if (item.id !== id)
            return item;
        });
        setCategory(temp);
        showMessage(response.data[1]['message']);
      }
    }).catch((error) => {

    })
  }

  VerifyLogin();
  //use useEffect Hook to call api
  useEffect(() => {
    if (categories.length === 0) {
      let apiAddress = getBase() + 'category.php';
      //call api 
      fetch(apiAddress)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          //get 1st object's key error
          let error = data[0]['error'];
          console.log(error);
          if (error !== 'no')
            alert(error);
          else {
            //get 2nd object's key total
            let total = data[1]['total']
            if (total === 0) {
              alert('no category available');
            }
            else {
              //delete 2 object from begining
              data.splice(0, 2);
              //store data into state
              setCategory(data);
              // console.log(categories);
            }
          }
        })
        .catch(error => {
          console.log(error);
          showError('networking error!, its seems your internet connection is not working');
        });
    }
  });
  //create inner function 
  let DisplayCategory = function (item) {
    //object destructring
    let { id, title, photo, islive, isdeleted } = item;
    return (<tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>
        <img src={getImgBase() + "category/" + photo} className="img-fluid" />
      </td>
      <td>{(islive ==='1')?"Yes":"No"}</td>
      <td>
        <Link to={"/edit-category/" + id}><i className="bx bx-pencil bx-lg mb-2" /></Link>
        <a href="#" onClick={(event) => DeleteCategory(id)}><i className="bx bx-trash bx-lg mb-2" /></a>
      </td>
    </tr>);
  }
  return (
    <div className="layout-wrapper layout-content-navbar">
      <ToastContainer />
      <div className="layout-container">
        <AdminMenu />
        <div className="layout-page">
          {/* Navbar */}
          {/* / Navbar */}
          {/* Content wrapper */}
          <div className="content-wrapper">
            {/* Content */}
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row mb-3">
                <div className="col-12 d-flex justify-content-between">
                  <h4 className="fw-bold py-1 mb-1">Categories</h4>
                  <a href="/add-category" className="btn btn-primary">Add category</a>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <h5 className="card-header">Existing Categories</h5>
                    <div className="table-responsive text-nowrap">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Sr No</th>
                            <th>Title</th>
                            <th>Photo</th>
                            <th>Is Live?</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody className="top-text">
                          {categories.map((item) => DisplayCategory(item))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* Basic Bootstrap Table */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}