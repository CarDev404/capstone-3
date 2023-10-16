import React from 'react';
import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import { Image } from 'react-bootstrap';

export default function Home() {
    const data = {
        title: "LuxeHavin Skin",
        content: "Nurturing Radiant Elegance, Transforming Your Skin",
        //discount: "Up to 65% off",
        destination: "/product",
        label: "Shop now!",
    }

    const containerStyle = {
        background: 'White', // Set the background color to white
        minHeight: '100vh', // Ensure the container takes up at least the full viewport height
        display: 'flex',
        flexDirection: 'column', // Make the container a flex container to position the footer at the bottom
    };

    const bannerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add a text shadow for better readability
    };

    const footerStyle = {
        backgroundColor: 'black',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto', // Push the footer to the bottom of the container
    };

    const socialIconsStyle = {
        marginTop: '10px',
    };

    return (
        <div style={containerStyle}>
            <Banner data={data} style={bannerStyle} />

            <Highlights />
            <footer style={footerStyle}>
                <p>&copy; 2023 LuxeHavin Skin</p>
            </footer>
        </div>
    );
}

