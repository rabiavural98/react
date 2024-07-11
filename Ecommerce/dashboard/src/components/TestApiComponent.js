// frontend/src/components/TestApiComponent.js
import React, { useState, useEffect } from 'react';

function TestApiComponent() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/DBConnectionTest')
            .then(response => response.text())
            .then(message => setMessage(message))
            .catch(err => console.error('Error fetching test API:', err));
    }, []);

    return (
        <div>
            {message ? <p>{message}</p> : <p>Loading...</p>}
        </div>
    );
}

export default TestApiComponent;