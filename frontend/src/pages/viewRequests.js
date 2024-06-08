import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedOption, setSelectedOption] = useState('bookNotInShelf');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const url = `http://localhost:8000/api/adm/reqs`;
        const response = await fetch(url);
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setRequests([]);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="dummyWrapper">
      <div className="topbar">
        <div><Link to="/"><h3>Home</h3></Link></div>
        <div><Link to="/userlogin/admin"><h3>Back</h3></Link></div>
      </div>
      <div className="transactions">
        <div className="transactionWrapper">
          <h2>Request Details</h2>
          <div className='requestOptions'>
            <label>
              <input type="radio" name="option" value="bookNotInShelf" onChange={() => setSelectedOption('bookNotInShelf')} checked={selectedOption === 'bookNotInShelf'} />
              Book Not in Shelf
            </label>
            <label>
              <input type="radio" name="option" value="requestForProcuring" onChange={() => setSelectedOption('requestForProcuring')} checked={selectedOption === 'requestForProcuring'} />
              Request for Procuring
            </label>
          </div>
          {selectedOption === 'bookNotInShelf' ? (
            <table>
              <thead>
                <tr>
                  <th>User Code</th>
                  <th>Book ISBN</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request, index) => request.request===2 && (
                  <tr key={index}>
                    <td>{request.ucode}</td>
                    <td>{request.bISBN}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>User Code</th>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request, index) => request.request===1&&(
                  <tr key={index}>
                    <td>{request.ucode}</td>
                    <td>{request.bname}</td>
                    <td>{request.bauthor}</td>
                    <td>{request.blink}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
