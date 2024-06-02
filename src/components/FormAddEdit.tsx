import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { COURSES_API } from '../utils';
import '../styles/formAddEdit.css'
import { Button } from '@mui/material';

const COURSES = COURSES_API

const initialState = {
    title: '',
    description: '',
    weeks: '',
    image: '',
    date: '',
    active: '',
}

const error_init = {
    title_err: '',
    description_err: '',
    weeks_err: '',
    image_err: '',
    date_err: '',
    active_err: '',
}

const FormAddEdit = () => {

    const { id } = useParams<string>(); // Add type annotation to 'id' parameter
    const navigate = useNavigate();

    const [state, setState] = useState({
        ...initialState,
        date: new Date().toISOString().split('T')[0], // Set date to current date
    });
    const { title, description, weeks, image, date, active } = state;
    const [errors, setErrors] = useState(error_init);

    const getOneCourse = async (id: string) => { // Add type annotation to 'id' parameter
        const res = await axios.get(`${COURSES}/${id}`);
        // console.log(res.data);
        if (res.status === 200) {
            setState(res.data);
        }
    }

    useEffect(() => {
        if (id) getOneCourse(id);
    }, [id]);

    const updateCouree = async (staffID: string, data: any) => {
        const res = await axios.put(`${COURSES}/${staffID}`, data);
        if (res.status === 200) {
            toast.success(`Updated Staff with ID: ${staffID} successfully ~`);
            navigate('/dashboard');
        }
    }

    const addNewCouree = async (data: any) => {
        const res = await axios.post(`${COURSES}`, data);
        if (res.status === 200 || res.status === 201) {
            toast.success("New Course has been added successfully ~");
            navigate('/dashboard');
        }
    }

    function isValidImageUrl(url: string): boolean {
        const pattern = /^https?:\/\/.*\.(?:jpg|jpeg|gif|png)(\?.*)?$/i;
        const queryPattern = /^https?:\/\/.*\?.*=\.(?:jpg|jpeg|gif|png)/i;
        return pattern.test(url) || queryPattern.test(url);
    }

    function isValidDate(dateString: string): boolean {
        const dateCheck = new Date(dateString);
        return !isNaN(dateCheck.getTime());
    }

    // Usage in your validation code

    // validate
    const validateForm = () => {
        let isValid = true;
        let errors = { ...error_init };

        if (title.trim() === '' || title.length < 2) {
            errors.title_err = 'Title is Required';
            if (title.length < 2) {
                errors.title_err = 'Title must be more than 2 words';
            }
            isValid = false;
        }

        if (description.trim() === '' || description.length < 2) {
            errors.description_err = 'Description is Required';
            if (description.length < 2) {
                errors.description_err = 'Description must be more than 2 words';
            }
            isValid = false;
        }

        if (isNaN(parseInt(weeks)) || parseInt(weeks) < 0 || weeks === '') { // Add type annotation to 'weeks' variable
            errors.weeks_err = 'Weeks must be a positive number and more than 0';
            isValid = false;
        }

        if (date.trim() === '') {
            errors.date_err = 'A valid date is required';
            isValid = false;
        } else if (!isValidDate(date)) {
            errors.date_err = 'Wrong format (dd/mm/yyyy)';
            isValid = false;
        }

        if (image.trim() === '' || !isValidImageUrl(image)) {
            errors.image_err = 'Image must be a valid URL (end with jpg, gif, png)';
            isValid = false;
        }

        if (active !== 'true' && active !== 'false') {
            errors.active_err = 'Active must be a boolean value';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { // Add type annotation to 'event' parameter
        event.preventDefault();
        if (validateForm()) {
            if (id) updateCouree(id, state);
            else addNewCouree(state);
        } else {
            toast.error("Some info is invalid ~ Pls check again");
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { // Add type annotation to 'event' parameter
        let { name, value } = event.target;
        setState((state) => ({ ...state, [name]: value }));
    }

    return (
        <div className='container'>
            <div className="form">
                <h2>{id ? "Update Courses" : "Add New Courses"}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title: </label>
                        <input type="text" name='title' value={state.title} onChange={handleInputChange} />
                        {errors.title_err && <span className='error'>{errors.title_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="description">Description: </label>
                        <input type="text" name='description' value={state.description} onChange={handleInputChange} />
                        {errors.description_err && <span className='error'>{errors.description_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="image">Image: </label>
                        <input type="text" name='image' value={state.image} onChange={handleInputChange} />
                        {errors.image_err && <span className='error'>{errors.image_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="weeks">Weeks: </label>
                        <input type="number" name='weeks' value={state.weeks} onChange={handleInputChange} />
                        {errors.weeks_err && <span className='error'>{errors.weeks_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="active">Active: </label>
                        <input type="text" name='active' value={state.active} onChange={handleInputChange} />
                        {errors.active_err && <span className='error'>{errors.active_err}</span>}
                    </div>
                    {!id && <div>
                        <label htmlFor="date">Date: </label>
                        <input type="text" name='date' value={state.date} onChange={handleInputChange} readOnly />
                        {errors.date_err && <span className='error'>{errors.date_err}</span>}
                    </div>}
                    <Button type='submit' sx={{
                        backgroundColor: '#1976D2',
                        color: 'white',
                        ":hover": {
                            backgroundColor: '#fff',
                            color: '#1976D2'
                        }
                    }}>{id ? "Update" : "Submit"}</Button>
                </form>
            </div>
        </div>
    );
};

export default FormAddEdit;