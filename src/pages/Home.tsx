import React, { useState, useEffect } from 'react';
import { COURSES_API } from '../utils';
import axios from 'axios';
import "../styles/home.css";

const URL = COURSES_API;

const Home = () => {

    const [courses, setCourses] = useState<any[]>([]);
    const [detailPopup, setDetailPopup] = useState<any | null>(null);


    const getListCourses = async () => {
        const res = await axios.get(`${URL}`);
        if (res.status === 200) {
            setCourses(res.data);
        }
    }

    useEffect(() => {
        getListCourses();
    }, []);

    // popup
    const handleViewPopup = (courses: any) => {
        setDetailPopup(courses);
    }

    const handleClosePopup = () => {
        setDetailPopup(null);
    }

    return (
        <div className="container">
            {courses && courses.map((courses) => (
                <div className="card" key={courses.id}>
                    <img src={courses.image} alt={courses.id} />
                    <h3>{courses.title}</h3>
                    <button onClick={() => handleViewPopup(courses)}>View Details</button>
                </div>
            ))}

            {detailPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <div>
                            <span className='close' onClick={handleClosePopup}>
                                &times;
                            </span>
                            <img src={detailPopup.image} alt={detailPopup.id} />
                            <h2>ID: {detailPopup.id}</h2>
                            <p>Name: {detailPopup.title}</p>
                            <p>Description: {detailPopup.description}</p>
                            <p>Weeks Learning: {detailPopup.weeks}</p>
                            <p>Created At: {detailPopup.date}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;