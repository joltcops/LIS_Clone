import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddBook = () => {
    const initialBookState = {
        title: "",
        author: "",
        publisher: "",
        edition: 1,
        year: 1990,
        category: 1,
        last_issue_date: "2000-01-01",
        available: true,
        reserved: false,
        description: "",
    };
    
    const history = useHistory();

    const goBack = () => {
        history.goBack(); // Navigate back
    };

    const [book, setBook] = useState(initialBookState);
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [isbn, setIsbn] = useState(0);
    const [isbnGenerated, setIsbnGenerated] = useState(false); // Track whether ISBN has been generated
    const [bookAdded, setBookAdded] = useState(false); // Track whether book has been added

    const handleCategoryChange = (e) => {
        setSelectedCategory(parseInt(e.target.value));
        setBook({ ...book, category: parseInt(e.target.value) });
    };

    const addBook = async () => {
        // Check if any field is empty
        if (Object.values(book).some(value => value === "")) {
            window.alert("Please fill in all fields.");
            return;
        }

        console.log(book);
        fetch("http://localhost:8000/api/adm/books/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book)
        })
        .then(response => {
            if (response.ok) {
                setBook({...initialBookState, description: ""}); // Resetting the book state to initial values including description
                setBookAdded(true); // Set bookAdded to true after adding book
                setIsbnGenerated(false);
                
            } else {
                // Handle error if needed
            }
        })
        .catch(error => {
            // Handle error if needed
            console.error('Error:', error);
        });

    }

    const genIsbn = () => {
        fetch("http://localhost:8000/api/adm/genISBNsingle")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                // Handle error if needed
            }
        })
        .then(data => {
            console.log("helooo");
            console.log(data);
            console.log("tata");
            history.replace('/bookadded')
        })
        .catch(error => {
            // Handle error if needed
            console.error('Error:', error);
        });
    }
    // const genIsbn = async () => {
    //     try {
    //         const response = await fetch("http://localhost:8000/api/adm/genISBNsingle");
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch ISBN');
    //         }
    //         const data = await response.json();
    //         if (data) {
    //             console.log(data);
    //         } else {
    //             throw new Error('ISBN not found in response');
    //         }
    //     } catch (error) {
    //         // Handle error
    //         console.error('Error:', error);
    //     }
    // }

    return (
        <div className='addBook'>
            <h2>Add Book</h2>
            <div className="searchWrapper">
                <input type="text" placeholder="Title" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} required />
                <br />

                <input type="text" placeholder="Author" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} required />
                <br />

                <input type="text" placeholder="Publisher" value={book.publisher} onChange={(e) => setBook({ ...book, publisher: e.target.value })} required />
                <br />

                <label>Edition:</label>
                <br />
                <input type="number" placeholder="Edition" value={book.edition} onChange={(e) => setBook({ ...book, edition: parseInt(e.target.value) })} required />
                <br />
                <label>Year:</label>
                <input type="number" placeholder="Year" value={book.year} onChange={(e) => setBook({ ...book, year: parseInt(e.target.value) })} required />
                <br />
                <textarea 
                    name="description" 
                    placeholder='Description' 
                    value={book.description} 
                    onChange={(e) => setBook({ ...book, description: e.target.value })} 
                    required 
                ></textarea>

                <div className="custom-select">
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        required
                    >
                        <option value={1}>Adventure</option>
                         <option value={2}>Fantasy</option>
                       <option value={3}>Crime</option>
                       <option value={4}>Classics</option>
                        <option value={5}>History</option>
                         <option value={6}>Romance</option>
                         <option value={7}>Biography</option>
                         <option value={8}>Mathematics</option>
                         <option value={9}>Computer Science</option>
                         <option value={10}>Science</option>
                         <option value={11}>Mechanics</option>
                         <option value={12}>Electronics and Electrical Engineering</option>
                         <option value={13}>Physics</option>
                         <option value={14}>Chemistry</option>
                         <option value={15}>Chemical Engineering</option>
                         <option value={16}>Geology</option>
                         <option value={17}>Ocean and Naval Engineering</option>
                         <option value={18}>Metallurgy</option>
                         <option value={19}>Biotechnology and Biochemistry</option>
                         <option value={20}>Architecture</option>
                         <option value={21}>Agriculture and Farming</option>
                         <option value={22}>Mining</option>
                         <option value={23}>Civil Engineering</option>
                    </select>
                </div>


                <div className="buttonWrapper">
                    <div><button onClick={addBook}>Add Book</button></div>
                    {bookAdded && !isbnGenerated && // Show button only if book is added and ISBN is not generated
                        <div><button onClick={() => { genIsbn(); setIsbnGenerated(true); setBookAdded(false) }}>Generate ISBN</button></div>
                    }
                </div>
                {/* <p>ISBN of last added book: {book.ISBN}</p> */}

            </div>
        </div>
    );
}

export default AddBook;
