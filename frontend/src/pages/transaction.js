import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Transactions = () => {
  // const { id } = useParams();
  // console.log(id, "hello");

  const [trans, setTrans] = useState([]);

  useEffect(() => {
    const getTrans = async () => {
      try {
        let response = await fetch(`http://localhost:8000/api/adm/latest_trans`);
        let data = await response.json();
        console.log(data);
        setTrans(data);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    getTrans();
  }, []); // Include id as a dependency to fetch data when id changes

  return (
    <div className="dummyWrapper">
      <div className="topbar">
            <div><Link to="/"><h3>Home</h3></Link></div>
            <div><Link to="/issue-reserve"><h3>Back</h3></Link></div>
           </div>
    <div className="transactions">
        
        <div className="transWrapper">
        <h2>Transaction Details</h2>
        <p>User code: {trans.user_code}</p>
        <p>Book ISBN: {trans.book_id}</p>
        <p>Type: {(trans.category===1 && "ISSUE") || (trans.category===2 && "RETURN") || (trans.category===3 && "RESERVE")}</p>
        <div>
            {
                (trans.category===1 && <div><p>Issue Date: {trans.issue_date}</p> <p>Due on: {trans.due_date}</p></div>) || 
                 
                (trans.category===2 &&  <div><p>Issue Date: {trans.issue_date}</p> <p>Return Date: {trans.return_date}</p> <p>Fine: {trans.dues}</p></div>)
            }
        </div>
        </div>
    </div>
    </div>
  );
};

export default Transactions;
