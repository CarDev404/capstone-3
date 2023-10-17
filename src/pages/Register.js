import { useContext, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Register() {
    const { user, setUser } = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // State to determine whether the submit button is enabled or not
    const [isActive, setIsActive] = useState(false);

    function registerUser(e) {
        e.preventDefault();

        fetch('/users/register', {  // Use a relative URL
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password,
            })
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Registration failed');
            }
        })
        .then(data => {
            console.log(data);

            if (data) {
                // Clear input fields
                setFirstName("");
                setLastName("");
                setEmail("");
                setMobileNo("");
                setPassword("");
                setConfirmPassword("");

                Swal.fire({
                    title: "Registration Successful!",
                    icon: "success",
                    text: "Thank you for registering"
                });
            } else {
                Swal.fire({
                    title: "Registration Failed",
                    icon: "error",
                    text: "Please try again later"
                });
            }
        })
        .catch(error => {
            Swal.fire({
                title: "Registration Failed",
                icon: "error",
                text: error.message
            });
        });
    }

    useEffect(() => {
        if (firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword && mobileNo.length === 11) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

    return (
        (user.id !== null) ?
            <Navigate to="/courses

