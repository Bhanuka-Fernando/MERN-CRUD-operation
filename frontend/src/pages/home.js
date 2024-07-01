import React, { useState, useEffect } from "react";
import UpdateDetail from "../pages/updateDetails"; // Import the UpdateDetail component

const Home = () => {
    const [details, setDetails] = useState(null);
    const [selectedDetail, setSelectedDetail] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch('/api/details');
                if (!response.ok) {
                    throw new Error('Failed to fetch details');
                }
                const json = await response.json();
                setDetails(json);
            } catch (error) {
                console.error('Error fetching details:', error.message);
            }
        };

        fetchDetails();
    }, []);

    const handleUpdateClick = (detail) => {
        setSelectedDetail(detail);
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`/api/details/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete detail');
            }

            // Update details state after deletion
            const updatedDetails = details.filter(detail => detail._id !== id);
            setDetails(updatedDetails);
        } catch (error) {
            console.error('Error deleting detail:', error.message);
        }
    };

    return (
        <div className="Home">
            <h2>Details</h2>
            {details ? (
                <ul>
                    {details.map((detail) => (
                        <li key={detail._id}>
                            <strong>First Name:</strong> {detail.firstName}<br />
                            <strong>Last Name:</strong> {detail.lastName}<br />
                            <strong>Email:</strong> {detail.email}<br /><br />
                            <button onClick={() => handleUpdateClick(detail)}>Update</button>
                            <button onClick={() => handleDeleteClick(detail._id)}>Delete</button>
                            {selectedDetail?._id === detail._id && (
                                <UpdateDetail detailId={detail._id} />
                            )}
                            <hr />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading details...</p>
            )}
        </div>
    );
};

export default Home;
