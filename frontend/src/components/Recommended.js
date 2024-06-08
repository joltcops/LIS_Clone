import React, { useState, useEffect } from 'react';
import '../styles/LatestBooks.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

const Recommended = ({id}) => {
  const [recomBooks, setRecomBooks] = useState([]);

  useEffect(() => {
    const fetchRecomBooks = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/adm/suggest/${id}`);
        const data = await response.json();
        setRecomBooks(data);
      } catch (error) {
        console.error('Error fetching latest books:', error);
      }
    };

    fetchRecomBooks();
  }, []);

  return (
    <div className="latest-books">
      <h3>Recommended for you</h3>
      <div className="book-grid">
        {recomBooks.slice(0, 8).map((book, index) => (
          <Link to={`/book/${book.id}`}><div className="book-box" key={index}>
            <p>{book.title}</p>
            <p>by {book.author}</p>
            <hr />
            <div className="overflow">
            <p>{book.description}</p>
            </div>
          </div></Link>
        ))}
      </div>
    </div>
  );
};

export default Recommended;

