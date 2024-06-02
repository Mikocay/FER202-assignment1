import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { COURSES_API } from '../utils';
import '../styles/dashboard.css';

const URL = COURSES_API;

const Dashboard = ({ onLogout }: any) => {

    const navigate = useNavigate();

    const [courses, setcourses] = useState<any[]>([]);

    const getListCourse = async () => {
        const res = await axios.get(`${URL}`);
        if (res.status === 200) {
            setcourses(res.data);
        }
    }

    useEffect(() => {
        getListCourse();
    }, []);

    const [open, setOpen] = React.useState(false);
    const [delCourse, setDelCourse] = React.useState<any>();

    const handleDelete = async (id: number) => {
        const res = await axios.delete(`${URL}/${id}`);
        if (res.status === 200) {
            getListCourse();
            toast.success("Deleted Successfully ~");
        } else {
            toast.error("Delete: Error!");
        }
        handleClose();
    }

    const handleClickOpen = (id: number) => {
        setOpen(true);
        setDelCourse(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
        onLogout();
    };

    return (
        <div className="staff-table">
            <div className="btn-add">
                <Button
                    onClick={handleLogout}
                    sx={{
                        mr: 1,
                        backgroundColor: '#1976D2',
                        color: 'white',
                        ":hover": {
                            backgroundColor: '#fff',
                            color: '#1976D2',
                        }
                    }} >Logout</Button>
                <Link to={'/add/'}>
                    <Button sx={{
                        backgroundColor: '#1976D2',
                        color: 'white',
                        ":hover": {
                            backgroundColor: '#fff',
                            color: '#1976D2'
                        }
                    }} >ADD NEW COURSE</Button>
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Weeks</th>
                        <th>Created Date</th>
                        <th>Active</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses && courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.title}</td>
                            <td>{course.description}</td>
                            <td><img src={course.image} alt="" /></td>
                            <td>{course.weeks}</td>
                            <td>{course.date}</td>
                            <td>{course.active ? 'Active' : 'Inactive'}</td>
                            <td>
                                <Link to={`/update/${course.id}`}><Button sx={{ color: '#1976D2' }}>Edit</Button></Link>
                                <Button sx={{ color: '#1976D2' }} onClick={() => handleClickOpen(course.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you want to delete Course?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure that you want to delete a Course with ID: {delCourse}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => handleDelete(delCourse)} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
};

export default Dashboard;