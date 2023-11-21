import React, { useState } from 'react';
import axios from 'axios';


function Appointment() {
    const [Oname, setOname] = useState('');
    const [Adate, setAdate] = useState('');
    const [Atime, setAtime] = useState('');
    const [email, setEmail] = useState('');
    const [clicked,setClicked]=useState(false);
    
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/book_appointment', { Oname, Adate,Atime, email})
            .then(res => {
                if (res.data) {
                    console.log(res.data);
                    setClicked(true);
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
                        <label htmlFor='name'>Owner's Name</label>
                        <input
                            type='text'
                            placeholder="Enter Owner's name with whom you want an appontment"
                            onChange={e => setOname(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '3px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor='email'>Your Email ID</label>
                        <input
                            type='email'
                            placeholder="Enter your email id"
                            onChange={e => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '3px' }}
                        />
                    </div>
                    <div className='mb-3' style={{ marginBottom: '10px' }}>
                        <label htmlFor='date'>Date</label>
                        <input
                            type='date'
                            placeholder='Enter Appointment Date'
                            onChange={e => setAdate(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '3px' }}
                        />
                    </div>

                    <div className='mb-3' style={{ marginBottom: '10px' }}>
                        <label htmlFor='time'>Time</label>
                        <input
                            type='time'
                            placeholder='Enter Appointment Time'
                            onChange={e => setAtime(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '3px' }}
                        />
                    </div>
                    <button style={{ padding: '8px 15px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Book</button>
                </form>
            </div>
            
            {clicked && <h4 style={{ color: 'black',textAlign:'center', textTransform:'uppercase'}}> Appointment booked!</h4>}

        </div>
    );
}

export default Appointment;
