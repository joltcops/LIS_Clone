// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const Transactions = () => {
//   const [userCode, setUserCode] = useState('');
//   const [trans, setTrans] = useState([]);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         let url;
//         if (userCode) {
//           url = `http://localhost:8000/api/transactions/${userCode}`;
//         } else {
//           url = `http://localhost:8000/api/transactions`;
//         }
//         let response = await fetch(url);
//         let data = await response.json();
//         setTrans(data);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//         setTrans([]);
//       }
//     };

//     fetchTransactions();
//   }, [userCode]);

//   return (
//     <div className="dummyWrapper">
//       <div className="topbar">
//         <div><Link to="/"><h3>Home</h3></Link></div>
//         <div><Link to="/issue-reserve"><h3>Back</h3></Link></div>
//       </div>
//       <div className="transactions">
//         <div className="transWrapper">
//           <h2>Transaction Details</h2>
//           <div>
//             <label htmlFor="userCode">Enter User Code:</label>
//             <input type="text" id="userCode" value={userCode} onChange={(e) => setUserCode(e.target.value)} />
//           </div>
//           <table>
//             <thead>
//               <tr>
//                 <th>User Code</th>
//                 <th>Book ISBN</th>
//                 <th>Type</th>
//                 <th>Date</th>
//                 <th>Due Date</th>
//                 <th>Return Date</th>
//                 <th>Fine</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Array.isArray(trans) && trans.map((transaction, index) => (
//                 <tr key={index}>
//                   <td>{transaction.user_code}</td>
//                   <td>{transaction.book_id}</td>
//                   <td>
//                     {(transaction.category === 1 && "ISSUE") ||
//                       (transaction.category === 2 && "RETURN") ||
//                       (transaction.category === 3 && "RESERVE")}
//                   </td>
//                   <td>{transaction.issue_date}</td>
//                   <td>{transaction.due_date}</td>
//                   <td>{transaction.return_date}</td>
//                   <td>{transaction.dues}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Transactions;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Transactions = () => {
  const [searchType, setSearchType] = useState('userCode');
  const [searchValue, setSearchValue] = useState('');
  const [trans, setTrans] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let url;
        if (searchType === 'userCode' && searchValue) {
          url = `http://localhost:8000/api/transactions/${searchValue}`;
        } else if (searchType === 'ISBN' && searchValue) {
          url = `http://localhost:8000/api/transactions/book/${searchValue}`;
        } else {
          url = `http://localhost:8000/api/transactions`;
        }
        let response = await fetch(url);
        let data = await response.json();
        setTrans(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTrans([]);
      }
    };

    fetchTransactions();
  }, [searchType, searchValue]);

  return (
    <div className="dummyWrapper">
      <div className="topbar">
        <div><Link to="/"><h3>Home</h3></Link></div>
        <div><Link to="/userlogin/admin"><h3>Back</h3></Link></div>
      </div>
      <div className="transactions">
        <div className="transWrapper">
          <h2>Transaction Details</h2>
          <div className='inputradio'>
            <label>
              <input
                type="radio"
                value="userCode"
                checked={searchType === 'userCode'}
                onChange={() => setSearchType('userCode')}
              />
              Search by User Code
            </label>
            <label>
              <input
                type="radio"
                value="ISBN"
                checked={searchType === 'ISBN'}
                onChange={() => setSearchType('ISBN')}
              />
              Search by ISBN
            </label>
          </div>
          <div className='inputdiv'>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={searchType === 'userCode' ? 'Enter User Code' : 'Enter ISBN'}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>User Code</th>
                <th>Book ISBN</th>
                <th>Type</th>
                <th>Date</th>
                <th>Due Date</th>
                <th>Return Date</th>
                <th>Fine</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(trans) && trans.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.user_code}</td>
                  <td>{transaction.book_id}</td>
                  <td>
                    {(transaction.category === 1 && "ISSUE") ||
                      (transaction.category === 2 && "RETURN") ||
                      (transaction.category === 3 && "RESERVE")}
                  </td>
                  <td>{transaction.issue_date}</td>
                  <td>{transaction.due_date}</td>
                  <td>{transaction.return_date}</td>
                  <td>{transaction.dues}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;

