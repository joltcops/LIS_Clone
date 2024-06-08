import React, { useState, useEffect } from 'react';
import '../styles/LatestBooks.css'; // Import CSS file for styling
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const LatestBooks = () => {
  const [latestBooks, setLatestBooks] = useState([]);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/books/latest');
        const data = await response.json();
        setLatestBooks(data);
      } catch (error) {
        console.error('Error fetching latest books:', error);
      }
    };

    fetchLatestBooks();
  }, []);

  return (
    <div className="latest-books">
      <h3>Our Latest Additions....</h3>
      <div className="book-grid">
        {latestBooks.slice(0, 8).map((book, index) => (
          <Link to = {"book/"+book.id} key={book.id}><div className="book-box" key={index}>
            <div className="bookupar">
            <p>{book.title}</p>
            <p>by {book.author}</p>
            </div>
            <div className="description">
            <p>{book.description}</p>
            </div>
          </div></Link>
        ))}
      </div>
    </div>
  );
};

export default LatestBooks;

