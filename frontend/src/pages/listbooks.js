import React from 'react';

const ListBooks = ({ books }) => {
    return (
        <div>
            <h1>List of Books</h1>
            {books.map((book, index) => (
                <div key={index}>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                </div>
            ))}
        </div>
    );
};

export default ListBooks;