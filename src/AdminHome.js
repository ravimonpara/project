import AdminMenu from "./AdminMenu";
import VerifyLogin from "./VerifyLogin";
import axios from 'axios';
import { useState, useEffect } from "react";
import getBase from "./api";
import showError from "./toast-message";
import { ToastContainer } from "react-toastify";
//first 
export default function AdminHome() {
    let [users,setUsers] = useState(0);
    let [categories,setCategory] = useState(0);
    let [products,setProduct] = useState(0);
    let [daily,setDaily] = useState(0);
    let [weekly,setWeekly] = useState(0);
    let [monthly,setMonthly] = useState(0);
    let [yearly,setYearly] = useState(0);

  useEffect(()=>{
      let apiAddress = getBase() + "summery.php";
      axios.get(apiAddress,{
          responseType:'json',
      }).then((response) => {
          console.log(response.data);
          let error = response.data[0]['error'];
          if(error !== 'no')
            showError(error)
          else 
          {
              setUsers(response.data[1]['users']);
              setProduct(response.data[1]['products']);
              setCategory(response.data[1]['categories']);
              setDaily(response.data[1]['daily']);
              setWeekly(response.data[1]['weekly']);
              setMonthly(response.data[1]['monthly']);
              setYearly(response.data[1]['yearly']);
          }
      }).catch((error) => {
          if(error.code === 'ERR_NETWORK')
            showError('either you are or server is offline');
      })
  });
  VerifyLogin();
  return (<div className="layout-wrapper layout-content-navbar">
    <div className="layout-container">
      <AdminMenu />
      {/* Layout container */}
      <div className="layout-page">
        {/* Navbar */}
        {/* / Navbar */}
        {/* Content wrapper */}
        <div className="content-wrapper">
          {/* Content */}
          <div className="container-xxl flex-grow-1 container-p-y">
            <ToastContainer />
            <div className="row mb-3">
              <div className="col-12 d-flex justify-content-between">
                <h4 className="fw-bold py-1 mb-1" />
                {/* <a href="admin-add-category.html" class="btn btn-primary">Add category</a> */}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <h5 className="card-header">Dashboard</h5>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img src="admin/assets/img/icons/unicons/chart-success.png" className="rounded" />
                              </div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span className="fw-semibold d-block mb-1">daily orders</span>
                              <h3 className="card-title mb-2">{daily}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img src="admin/assets/img/icons/unicons/chart-success.png" className="rounded" />
                              </div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span className="fw-semibold d-block mb-1">weekly orders</span>
                              <h3 className="card-title mb-2">{weekly}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img src="admin/assets/img/icons/unicons/chart-success.png" className="rounded" />
                              </div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span className="fw-semibold d-block mb-1">Monthly orders</span>
                              <h3 className="card-title mb-2">{monthly}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img src="admin/assets/img/icons/unicons/chart-success.png" className="rounded" />
                              </div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span className="fw-semibold d-block mb-1">Yearly orders</span>
                              <h3 className="card-title mb-2">{yearly}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-lg-4 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                              <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                                <div className="card-title">
                                  <h5 className="text-nowrap mb-2 text-primary">Categories</h5>
                                </div>
                                <div className="mt-sm-auto">
                                  <h3 className="mb-0">{categories}</h3>
                                </div>
                              </div>
                              <div id="profileReportChart" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                              <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                                <div className="card-title">
                                  <h5 className="text-nowrap mb-2 text-danger">Products</h5>
                                </div>
                                <div className="mt-sm-auto">
                                  <h3 className="mb-0">{products}</h3>
                                </div>
                              </div>
                              <div id="profileReportChart" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                              <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                                <div className="card-title">
                                  <h5 className="text-nowrap mb-2 text-success">Users</h5>
                                </div>
                                <div className="mt-sm-auto">
                                  <h3 className="mb-0">{users}</h3>
                                </div>
                              </div>
                              <div id="profileReportChart" />
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
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
  );
}
//second