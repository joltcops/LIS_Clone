import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookDetails from '../components/BookDetails'; // Corrected the component name

const BookPage = () => {
  const { id } = useParams();
  console.log(id, "hello");

  const [book, setBook] = useState({
    title: "",
    author: "",
    publisher: "",
    edition: "",
    year: "",
    category: "",
    last_issue_date: "",
    available: "",
    reserved: "",
  });

  useEffect(() => {
    const getBook = async () => {
      try {
        let response = await fetch(`http://localhost:8000/api/books/${id}`);
        let data = await response.json();
        console.log(data);
        setBook(data);
        console.log(book.available, "available");
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    getBook();
  }, [id]); // Include id as a dependency to fetch data when id changes

  return (
    <BookDetails book={book} />
  );
};

export default BookPage;
