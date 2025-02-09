import React, { useState, useEffect } from "react";
import './AdminView.css';
import AdminHeader from "./AdminHeader/AdminHeader";
import trash from "./assets/trash-bin.png";
import Swal from 'sweetalert2';
function AdminView() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch student data from the API when the component mounts
        fetch("http://localhost:3001/api/users/getStudentDetails")
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error("Error fetching student details:", error));
    }, []);

    const handleSearch = () => {
        const filtered = students.filter(student =>
            student._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStudents(filtered);
    };



    const handleDelete = (id) => {
        // Show confirmation alert before proceeding with deletion
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Send delete request to the backend
                fetch(`http://localhost:3001/api/users/${id}`, {
                    method: "DELETE",
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message === "User removed") {
                            // Remove user from the students list in state
                            const updatedStudents = students.filter(student => student._id !== id);
                            setStudents(updatedStudents);

                            // Show success alert
                            Swal.fire(
                                'Deleted!',
                                'The user has been removed.',
                                'success'
                            );
                        } else {
                            // Show error alert if deletion fails
                            Swal.fire(
                                'Error!',
                                `Failed to delete user: ${data.message}`,
                                'error'
                            );
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting user:", error);
                        Swal.fire(
                            'Error!',
                            'Something went wrong while deleting the user.',
                            'error'
                        );
                    });
            }
        });
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setFilteredStudents([]);
    };
    // ---------------------

    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Student Added:\nName: ${name}\nEmail: ${email}`);
        setName("");
        setEmail("");
        setShowForm(false);
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
                                <input className="input1" type="text" required placeholder="Search by ID or email" id="search" value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} />
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

                    {/* sudent add modal */}

                    <div className="col-md-4 col-12">

                        <div className="auth-buttons2">
                            <button className="addStu-btn" onClick={() => setShowForm(true)}>Add new Student</button>
                            {showForm && (
                                <div className="form-overlay">
                                    <div className="form-container">
                                        <h2>Add Student</h2>
                                        <form onSubmit={handleSubmit}>
                                            <input className="input2"
                                                type="text"
                                                placeholder="Enter Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                            <input className="input2"
                                                type="email"
                                                placeholder="Enter Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />

                                            {/* <button type="submit" className="button-modal submit-modal">Submit</button>
                                            <button type="button" className="button-modal close-modal" onClick={() => setShowForm(false)}>Cancel</button> */}

                                            <div className="button-container">
                                                <button type="submit" className="button-modal submit-modal">Submit</button>
                                                <button type="button" className="button-modal close-modal" onClick={() => setShowForm(false)}>Cancel</button>
                                            </div>


                                        </form>
                                    </div>

                                </div>
                            )}
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
                                    <td>{student._id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.message}</td>
                                    <td>
                                        <button className="btn" onClick={() => handleDelete(student._id)}>
                                            {/* <i className="bi bi-trash-fill"></i> */}
                                            <img src={trash} alt="" className="trash" />
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
