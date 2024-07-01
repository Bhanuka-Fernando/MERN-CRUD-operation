import { useState, useEffect } from "react";

const UpdateDetail = ({ detailId }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await fetch(`/api/details/${detailId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch detail');
                }
                const data = await response.json();
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setEmail(data.email);
            } catch (error) {
                console.error('Error fetching detail:', error.message);
                setErrorMessage('Failed to fetch detail');
            }
        };

        fetchDetail();
    }, [detailId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/details/${detailId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Detail updated successfully');
            } else {
                setErrorMessage(data.error || 'Failed to update detail');
            }
        } catch (error) {
            console.error('Error updating detail:', error.message);
            setErrorMessage('Failed to update detail');
        }
    };

    return (
        <div className="UpdateDetail">
            <h2>Update Detail</h2>
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
                <button type="submit">Update Detail</button>
            </form>
        </div>
    );
};

export default UpdateDetail;
