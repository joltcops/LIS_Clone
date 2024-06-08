import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
const Books = ({books}) => {

    return (
        <div className="book">
            <div className="books-list">
                {books.map(book => (
                    <Link to = {"book/"+book.id} key={book.id}><div className="bookItem">
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                    </div></Link>
                ))}
            </div>
        </div>
      );
}
 
export default Books;


