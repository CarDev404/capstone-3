import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Products() {
    const { user } = useContext(UserContext);

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = () => {
        fetch(`http://localhost:4000/product/all`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setProducts(data);
            })
            .catch((error) => {
                console.error('Network error:', error);
                setError(error.message);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {error ? (
                <p>Error: {error}</p>
            ) : user.isAdmin ? (
                <AdminView productsData={products} fetchData={fetchData} />
            ) : (
                <UserView productsData={products} />
            )}
        </>
    );
}

