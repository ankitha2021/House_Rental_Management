import React, { useState } from 'react';
import axios from 'axios';


function Review() {
    const [feedback, setFeedback] = useState('');
    const [email,setEmail]= useState('');
   
    
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/review', { feedback ,email})
            .then(res => {
                if (res.data) {
                    console.log(res.data);
                } else {
                    console.log("no record");
                }

            }).catch(err =>
                console.log(err));
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '100px' }}>
            
            <div style={{ marginBottom: '20px' }}>
                <form onSubmit={handleSubmit} style={{ border: '2px solid ', padding: '50px', borderRadius: '5px' }}>
                <div style={{ marginBottom: '10px' }}>
                        <label htmlFor='email'>Your Email ID</label>
                        <input
                            type='email'
                            placeholder="Enter your email id"
                            onChange={e => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '3px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor='feedback'>Feedback</label>
                        <input
                            type='text'
                            placeholder="Please give feedback in less than 100 words"
                            onChange={e => setFeedback(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '3px' }}
                        />
                    </div>
                    <button style={{ padding: '8px 15px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Submit</button>
                </form>
            </div>
            
            

        </div>
    );
}

export default Review;
