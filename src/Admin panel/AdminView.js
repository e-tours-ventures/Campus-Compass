import React from "react";
import './AdminView.css';
import AdminHeader from "./AdminHeader/AdminHeader";
import { useState } from "react";
import trash from "./assets/trash-bin.png"

function AdminView() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredStudents, setFilteredStudents] = useState([]);

    const students = [
        { id: "12365478010", name: "Example Name", email: "example@email.com", feedback: "Example Feedback" },
        { id: "12365478011", name: "John Doe", email: "johndoe@email.com", feedback: "Great experience!" },
        { id: "12365478012", name: "Jane Doe", email: "janedoe@email.com", feedback: "Loved the service!" },
        { id: "12365478010", name: "Example Name", email: "example@email.com", feedback: "Example Feedback" },
        { id: "12365478011", name: "John Doe", email: "johndoe@email.com", feedback: "Great experience!" },
        { id: "12365478012", name: "Jane Doe", email: "janedoe@email.com", feedback: "Loved the service!" },
        { id: "12365478010", name: "Example Name", email: "example@email.com", feedback: "Example Feedback" },
        { id: "12365478011", name: "John Doe", email: "johndoe@email.com", feedback: "Great experience!" },
        { id: "12365478012", name: "Jane Doe", email: "janedoe@email.com", feedback: "Loved the service!" }
    ];


     const handleSearch = () => {
        const filtered = students.filter(student => 
            student.id.includes(searchTerm) || student.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStudents(filtered);
    };

    return (
        <>
            {/* <div className="row"> */}
            <AdminHeader />

            <div className="search-container">
                <div className="row search-row">
                    <div className="col-md-8 col-12">
                        <form className="form" onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="search">
                                <input className="input1" type="text" required placeholder="Search by ID or email" id="search"  value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}/>
                                <div className="fancy-bg"></div>
                                <div className="search" onClick={handleSearch}>
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
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
                        </form>
                    </div>

                    <div className="col-md-4 col-12">
                        <div className="auth-buttons2">
                            <button className="addStu-btn">Add new Student</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* search bar */}

            {/* Table for Students & Feedback */}
            <div className="admin-container">
                <div className="mask">
                    
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Feedback</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(filteredStudents.length > 0 ? filteredStudents : students).map((student, index) => (
                                <tr key={index}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.feedback}</td>
                                    <td>
                                        <button className="btn">
                                            {/* <i className="bi bi-trash-fill"></i> */}
                                            <img src={trash} alt="" className="trash"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* </div> */}
        </>
    );
}

export default AdminView;
