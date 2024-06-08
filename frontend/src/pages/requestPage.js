// import React, { useState } from 'react';
// import { useHistory, useParams } from 'react-router-dom';

// const RequestPage = () => {
//     const { id } = useParams();
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [formData, setFormData] = useState({
//         request: 0,
//         ucode: '0',
//         bISBN: 0,
//         bname: '',
//         bauthor: '',
//         blink: ''
//     });

//     const history = useHistory(); // Access to the history object

//     const handleOptionChange = (option) => {
//         setSelectedOption(option);
//         // Reset form data when option changes
//         setFormData({
//             request: 0,
//             ucode: '0',
//             bISBN: 0,
//             bname: '',
//             bauthor: '',
//             blink: ''
//         });
//     }

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     }

//     const handleSubmit = async () => {
//         try {
//             const payload = {
//                 request: selectedOption === 'requestForProcuring' ? 1 : 2,
//                 ucode: id,
//                 bISBN: formData.bISBN,
//                 bname: formData.bname,
//                 bauthor: formData.bauthor,
//                 blink: formData.blink,
//             };
    
//             const response = await fetch('/adm/makereq', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(payload)
//             });
    
//             if (response.ok) {
//                 console.log('Request submitted successfully');
//             } else {
//                 console.error('Request submission failed');
//             }
//         } catch (error) {
//             console.error('An error occurred while submitting the request:', error);
//         }
//     }    

//     const goBack = () => {
//         history.goBack(); // Navigate back
//     }

//     return (
//         <div className='requestPage'>
//             <div className="topRequest">
//                 <h1>Request Page</h1>
//                 <h3 onClick={goBack}>Back</h3> {/* Added onClick event */}
//             </div>
//             <div className='requestOptions'>
//                 <label>
//                     <input type="radio" name="option" value="bookNotInShelf" onChange={() => handleOptionChange('bookNotInShelf')} checked={selectedOption === 'bookNotInShelf'} />
//                     Book Not in Shelf
//                 </label>
//                 <label>
//                     <input type="radio" name="option" value="requestForProcuring" onChange={() => handleOptionChange('requestForProcuring')} checked={selectedOption === 'requestForProcuring'} />
//                     Request for Procuring
//                 </label>
//             </div>

//             {selectedOption === 'bookNotInShelf' && (
//                 <div className='requestData'>
//                     <h2>Enter Book ISBN:</h2>
//                     <input type="number" name="bISBN" value={formData.bISBN} onChange={handleInputChange} />
//                     <button onClick={handleSubmit}>Submit</button>
//                 </div>
//             )}

//             {selectedOption === 'requestForProcuring' && (
//                 <div className='requestData'>
//                     <h2>Enter Book Details:</h2>
//                     <div>
//                         <label>Title:</label>
//                         <input type="text" name="bname" value={formData.bname} onChange={handleInputChange} />
//                     </div>
//                     <div>
//                         <label>Author:</label>
//                         <input type="text" name="bauthor" value={formData.bauthor} onChange={handleInputChange} />
//                     </div>
//                     <div>
//                         <label>Link to Official Book Website:</label>
//                         <input type="text" name="blink" value={formData.blink} onChange={handleInputChange} />
//                     </div>
//                     <button onClick={handleSubmit}>Submit</button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default RequestPage;

import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const RequestPage = () => {
    const { id } = useParams();
    const [selectedOption, setSelectedOption] = useState(null);
    const [formData, setFormData] = useState({
        request: 0,
        ucode: id,
        bISBN: 0,
        bname: 'NA',
        bauthor: 'NA',
        blink: 'NA'
    });

    const history = useHistory(); // Access to the history object

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        // Reset form data when option changes
        setFormData({
            request: 0,
            ucode: id,
            bISBN: 0,
            bname: 'NA',
            bauthor: 'NA',
            blink: 'NA'
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async () => {
        try {
            const payload = {
                request: selectedOption === 'requestForProcuring' ? 1 : 2,
                ucode: id,
                bISBN: parseInt(formData.bISBN),
                bname: formData.bname,
                bauthor: formData.bauthor,
                blink: formData.blink,
            };
    
            const response = await fetch('http://localhost:8000/api/adm/makereq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            console.log(JSON.stringify(payload))
    
            if (response.ok) {
                console.log('Request submitted successfully');
                setFormData({
                    request: 0,
                    ucode: id,
                    bISBN: 0,
                    bname: 'NA',
                    bauthor: 'NA',
                    blink: 'NA'
                });
            } else {
                console.error('Request submission failed');
            }
        } catch (error) {
            console.error('An error occurred while submitting the request:', error);
        }
    }    

    const goBack = () => {
        history.goBack(); // Navigate back
    }

    return (
        <div className='requestPage'>
            <div className="topRequest">
                <h1>Request Page</h1>
                <h3 onClick={goBack}>Back</h3> {/* Added onClick event */}
            </div>
            <div className='requestOptions'>
                <label>
                    <input type="radio" name="option" value="bookNotInShelf" onChange={() => handleOptionChange('bookNotInShelf')} checked={selectedOption === 'bookNotInShelf'} />
                    Book Not in Shelf
                </label>
                <label>
                    <input type="radio" name="option" value="requestForProcuring" onChange={() => handleOptionChange('requestForProcuring')} checked={selectedOption === 'requestForProcuring'} />
                    Request for Procuring
                </label>
            </div>

            {selectedOption === 'bookNotInShelf' && (
                <div className='requestData'>
                    <h2>Enter Book ISBN:</h2>
                    <input type="number" name="bISBN" value={formData.bISBN} onChange={handleInputChange} />
                    <button className="reqSubmit" onClick={handleSubmit}>Submit</button>
                </div>
            )}

            {selectedOption === 'requestForProcuring' && (
                <div className='requestData'>
                    <h2>Enter Book Details:</h2>
                    <div>
                        <label>Title:</label>
                        <input type="text" name="bname" value={formData.bname} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Author:</label>
                        <input type="text" name="bauthor" value={formData.bauthor} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Link to Official Book Website:</label>
                        <input type="text" name="blink" value={formData.blink} onChange={handleInputChange} />
                    </div>
                    <button className="reqSubmit" onClick={handleSubmit}>Submit</button>
                </div>
            )}
        </div>
    );
}

export default RequestPage;

