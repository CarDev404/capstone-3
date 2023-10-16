//ArchiveProducts.js
import React from 'react';
import Swal from 'sweetalert2';

export default function ArchiveProducts({ productId, isActive, fetchData }) {

    const toggleProduct = (action) => {
        fetch(`http://localhost:4000/product/${productId}/${action}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data === true) {
                    //Member 4 and 5
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: isActive ? 'Product successfully disabled' : 'Product successfully enabled'
                    });
                    fetchData();
                } else {
                    Swal.fire({
                        title: 'Error',
                        icon: 'error',
                        text: 'Please try again'
                    });
                }
            });
    }

    const archiveProduct = () => {
        toggleProduct('archive');
    }

    const activateProduct = () => {
        toggleProduct('activate');
    }

    return (
        <div>
            {isActive ? (
                <button className="btn btn-danger" onClick={archiveProduct}>
                    Archive
                </button>
            ) : (
                <button className="btn btn-success" onClick={activateProduct}>
                    Activate
                </button>
            )}
        </div>
    );
}