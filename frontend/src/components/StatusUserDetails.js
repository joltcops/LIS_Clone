import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const StatusUserDetails = ({ user }) => {
    const [trans, setTrans] = useState({});

    useEffect(() => {
        const fetchTransaction = async (id, code, cat) => {
            try {
                let position=Math.floor(id%10)
                let rack=Math.floor((id/10)%5)
                let cupboard=Math.floor((id/50))
                let isbn=cupboard*100+rack*10+position
                const url = `http://localhost:8000/api/adm/custom_trans/${isbn}/${code}/${cat}`;
                const response = await fetch(url);
                const data = await response.json();
                setTrans(prevTrans => ({ ...prevTrans, [id]: data }));
            } catch (error) {
                console.error("Error fetching transaction:", error);
            }
        };

        // Fetch transaction for each active book
        user.active_books.forEach(id => {
            fetchTransaction(id, user.code, 1);
        });

        // Fetch transaction for each reserved book
        user.reserved_books.forEach(id => {
            fetchTransaction(id, user.code, 3); // Assuming category 3 is for reserved books
        });
    }, [user.active_books, user.reserved_books, user.code]); // Fetch transaction when active_books, reserved_books, or code changes

    return (
        <div className="ankuserfullpage">
            <div className="notifications">
                <h1><p className='textnote'>Notifications</p></h1>
                <h2 className='texts'> {user.notification}</h2>
            </div>
            <div className="userstatusdetailspage">
                <div className="userstatusleftpage">
                    <div className="userstatus">
                        <div className="userstatusWrapper">
                            <div className="userstatusContent">
                                <h2>{user.name}</h2>
                                <p>User Type: {(user.type === 1 && "UG") || (user.type === 2 && "PG") || (user.type === 3 && "RS") || (user.type === 4 && "Faculty")}</p>
                                <p>Maximum books that can be issued/reserved: {user.max_books}</p>
                            </div>
                            <p>Number of Active Books: {user.active_no}</p>
                            <div className="books-liststatus">
                                <p>Active Books: </p>
                                {user.active_books.map(id => (
                                    <button className='searchbutton' key={id}>
                                        <Link to={"/book/" + id} className='underline'>
                                            <div className="bookItemstatus">
                                                <p>ID: {id}</p>
                                                <p>Due Date: {trans[id]?.due_date}</p>
                                            </div>
                                        </Link>
                                    </button>
                                ))}
                                <p>Number of Reserved Books: {user.reserve_no}</p>
                                <p>Reserved Books: </p>
                                
                                {user.reserved_books.map(id => (
                                    <button className='searchbutton' key={id}>
                                        <Link to={"/book/" + id} className='underline'>
                                            <div className="bookItemstatus">
                                                <p>ID: {id}</p>
                                                <p>Max date of reserve: {trans[id]?.max_date_of_reserve}</p>
                                            </div>
                                        </Link>
                                    </button>
                                ))}
                            </div>
                            <p>Dues remaining: {user.fine}</p>
                        </div>
                        <button className='searchbutton'><Link to ={'/userlogin/'+user.code} className='underline'>Back</Link></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatusUserDetails;