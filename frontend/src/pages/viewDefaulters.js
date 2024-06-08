import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ViewDefaulters = () => {
    const [transData, setTransData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/adm/gennotice/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setTransData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData(); // Call fetchData when component mounts
    }, []); // Empty dependency array ensures it only runs once after mount

    return (
        <div>
            {/* <button onClick={() => setUserData([])}>Clear Data</button> */}
            {/* <button onClick={GenNotifications}>Send Notification</button> */}
            {transData && (
                <div className="transwrapper">
                    <h2>Fined Transactions</h2>
                    {transData.map((trans, index) => (
                        <div key={index} className='transDetails'>
                            <div className="trans-wrapper">
                                <p>User Code: {trans.user_code}</p>
                                <p>ISBN: {trans.book_id}</p>
                                <p>Issue Date: {trans.issue_date}</p>
                                <p>Due Date: {trans.due_date}</p>
                                <p>Dues: {trans.dues}</p>
                                
                            </div>
                        </div>
                    ))}
                    <Link to="/userlogin/admin"><button>Back</button></Link>
                </div>
            )}
        </div>
    );
};

export default ViewDefaulters;
