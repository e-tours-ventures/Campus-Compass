import React from "react";

function AdminView() {
    return (
        <div className="container">
            <h1>Admin View</h1>

            <div className="row">
                <div className="col-6 mb-5">
                    {/* Search Button */}
                    {/* <form className="form">
                        <label htmlFor="search">
                            <input className="input1" type="text" required placeholder="Search here" id="search" />
                            <div className="fancy-bg"></div>
                            <div className="search">
                                <svg viewBox="0 0 24 24" aria-hidden="true"
                                    className="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr">
                                    <g>
                                        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                                    </g>
                                </svg>
                            </div>
                            <button className="close-btn" type="reset">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </label>
                    </form> */}
                </div>
                <div className="col-6">
                    <input required type="date" placeholder="Your Name" className="input2" />
                </div>
            </div>



            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>FeedBack</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>001</th>
                        <td>Example Name</td>
                        <td>Example Email</td>
                        <td>Example FeedBack</td>
                        <td>
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="btn btn-danger">
                                <i className="bi bi-trash-fill"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Update Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Student Info</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="col-form-label">ID</label>
                                <input type="text" className="form-control" disabled />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">Name</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">Email</label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">FeedBack</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Update Student</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className="page-item disabled">
                        <a className="page-link">Previous</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default AdminView;
