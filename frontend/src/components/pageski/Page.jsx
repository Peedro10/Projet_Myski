import React, { useState, useEffect } from 'react';
import './page.scss';
import image1 from '../../assets/1.jpg';
import image2 from '../../assets/2.jpg';
import image3 from '../../assets/3.jpg';
import image4 from '../../assets/4.jpg';
import image5 from '../../assets/5.jpg';

const images = [image1, image2, image3, image4, image5];

const Page = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(current => (current + 1) % images.length);
        }, 2000); // Change image every second for testing, adjust as necessary
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="page-container">
            <div className="text-content">
                <h1>Welcome to Myski - Your Ski Resort Companion</h1>
                <p>Your ultimate guide to exploring and enjoying the best ski resorts. Find maps, weather updates, and all the resources you need for your ski adventure!</p>
            </div>
            <div className="image-gallery">
                {images.map((img, index) => (
                    <img key={index} src={img} alt={`Slide ${index + 1}`}
                         className={index === currentIndex ? 'show' : ''} />
                ))}
            </div>
        </div>
    );
};

export default Page;
