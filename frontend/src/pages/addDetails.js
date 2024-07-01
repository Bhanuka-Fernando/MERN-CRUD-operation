import { useState } from "react";

const CreateDetail = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Detail created successfully');
                setFirstName('');
                setLastName('');
                setEmail('');
            } else {
                setErrorMessage(data.error || 'Failed to create detail');
            }
        } catch (error) {
            console.error('Error creating detail:', error.message);
            setErrorMessage('Failed to create detail');
        }
    };

    return (
        <div className="CreateDetail">
            <h2>Create New Detail</h2>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Last Name:
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Create Detail</button>
            </form>
        </div>
    );
};

export default CreateDetail;
