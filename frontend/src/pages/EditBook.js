import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams();
  console.log('hello', id);
  const history = useHistory();

  const [book, setBook] = useState({
    id: 0,
    title: "",
    author: "",
    publisher: "",
    issued_code: "",
    reserved_code: "",
    edition: 0,
    year: 0,
    category: 0,
    last_issue_date: "",
    available: true,
    reserved: false,
    max_reserve_date: "",
    cupboard: 0,
    rack: 0,
    position: 0,
    ISBN: 0,
    description: "",
  });

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/books/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch book with id ${id}`);
        }
        const data = await response.json();
        setBook(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching book:", error);
        // Handle error (e.g., show an error message, redirect)
        // For example, you can redirect to an error page:
        // history.push('/error');
      }
    };

    getBook();
  }, [id, history]); // Include id and history as dependencies

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'year' || name === 'edition' || name==='category' ? parseInt(value) : value;
    setBook({ ...book, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(book));
    try {
      const response = await fetch(`http://localhost:8000/api/adm/books/edit_book/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      if (!response.ok) {
        throw new Error(`Failed to update book with id ${id}`);
      }
      // Assuming successful update, you can redirect the user or do any other necessary action
      // For example, redirect to the book details page
    } catch (error) {
      console.error("Error updating book:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleBack = () => {
    history.goBack(); // Go back to the previous page
  };

  return (
    <div className='editBook'>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={book.title} onChange={handleInputChange} />
        <br />
        <input type="text" name="author" placeholder="Author" value={book.author} onChange={handleInputChange} />
        <br />
        <input type="text" name="publisher" placeholder="Publisher" value={book.publisher} onChange={handleInputChange} />
        <br />
        <input type="number" name="edition" placeholder="Edition" value={book.edition} onChange={handleInputChange} />
        <br />
        <input type="number" name="year" placeholder="Year" value={book.year} onChange={handleInputChange} />
        <br />
        <div className="custom-select">
          <select name="category" value={book.category} onChange={handleInputChange}>
            <option value="1">Adventure</option>
            <option value="2">Fantasy</option>
            <option value="3">Crime</option>
            <option value="4">Classics</option>
            <option value="5">History</option>
            <option value="6">Romance</option>
            <option value="7">Biography</option>
            <option value="8">Mathematics</option>
            <option value="9">Computer Science</option>
            <option value="10">Science</option>
            <option value="11">Mechanics</option>
          </select>
        </div>
        <br />
        <textarea name="description" id="description" placeholder='Description' value={book.description} onChange={handleInputChange}></textarea>
        <button type="submit">Update Book</button>
        <button type="button" onClick={handleBack}>Back</button> {/* Back button */}
      </form>
    </div>
  );
};

export default EditBook;

