import React, { useState, useEffect } from 'react';
import '../styles/LatestBooks.css'; // Import CSS file for styling
import { Link, useHistory } from 'react-router-dom';

const CATEGORY_MAPPING = {
    1: 'Adventure',
    2: 'Fantasy',
    3: 'Crime',
    4: 'Classics',
    5: 'History',
    6: 'Romance',
    7: 'Biography',
    8: 'Mathematics',
    9: 'Computer Science',
    10: 'Science',
    11: 'Mechanics',
    12: 'Electronics and Electrical Engineering',
    13: 'Physics',
    14: 'Chemistry',
    15: 'Chemical Engineering',
    16: 'Geology',
    17: 'Ocean and Naval Engineering',
    18: 'Metallurgy',
    19: 'Biotechnology and Biochemistry',
    20: 'Architecture',
    21: 'Agriculture and Farming',
    22: 'Mining',
    23: 'Civil Engineering',
};

const LatestBook = () => {
  const [book, setbook] = useState([]);

  const history = useHistory(); // Access to the history object

    // Function to get text based on category value
    const getCategoryText = (category) => {
        return CATEGORY_MAPPING[category] || 'Unknown';
    };

    const goBack = () => {
        history.goBack(); // Navigate back
    };

  useEffect(() => {
    const fetchbook = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/books/latest/one');
        const data = await response.json();
        setbook(data);
      } catch (error) {
        console.error('Error fetching latest books:', error);
      }
    };

    fetchbook();
  }, []);

  return (
    <div className="fullpage">
            <div className="leftpage">
            </div>
            <div className="book">
                <div className="bookWrapper">
                    <div className="bookContent">
                        <h2>{book.title}</h2>
                        <h3 className='finalEdit'>{book.description}</h3>
                        <hr />
                        <div>
                            <h3>ISBN: {book.ISBN}</h3>
                            
                            <h3>ID: {book.id}</h3>
                            <h3>Author: {book.author}</h3>
                            <h3>Publisher: {book.publisher}</h3>
                            <h3>Edition: {book.edition}</h3>
                            <h3>Year: {book.year}</h3>
                            <h3>Category: {getCategoryText(book.category)}</h3>
                            <h3>Cupboard no.: {book.cupboard}</h3>
                            <h3>Rack no.: {book.rack}</h3>
                            <h3>Position no.: {book.position}</h3>
                            <h3>Available: {(book.available === true && "Yes") || (book.available === false && "No")}</h3>
                            <h3 className='break-here'>Reserved: {(book.reserved === true && "Yes") || (book.reserved === false && "No")}</h3>
                        </div>
                        <div className='searchWrapperLight2'><button onClick={goBack}>Back</button></div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default LatestBook;

