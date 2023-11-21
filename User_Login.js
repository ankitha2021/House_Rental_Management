import React, { useState } from 'react';
import axios from 'axios';
import UserSearch from './User_Search';
import Appointment from './Appointment';
import Review from './Review';

function UserLogin() {
    const [username, setUsername] = useState('');
    const [NoRecord, setNoRecord] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showUserSerach, setShowUserSerach]=useState(false);
    const [HouseSearch, setHouseSearch]=useState(false);
    const [appoint, setAppoint]=useState(false);
    const [review, setReview]=useState(false);


    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/user_login', { email, password })
            .then(res => {
                if (res.data.uname) {
                    setUsername(res.data.uname);
                    console.log(res.data);
                    setShowUserSerach(true);
                } else {
                    setNoRecord("No Record");
                    console.log("no record");
                }

            }).catch(err =>
                console.log(err));
    }

    function handleHouseSearch(event) {
        event.preventDefault();
       setHouseSearch(true);
    }

    function handleAppointment(event) {
        event.preventDefault();
       setAppoint(true);
    }

    function handleReview(event) {
        event.preventDefault();
       setReview(true);
    }



    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '100px' }}>
            {showUserSerach ? (
                <div>
                    <div>
                    {username && <h2 style={{ color: 'black',textAlign:'center', textTransform:'uppercase'}}>WELCOME {username} !</h2>}
                    </div>
                    <br></br>
                    
                    <button onClick={handleHouseSearch} style={{ padding: '8px 15px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight:'10px'}}>Search for houses</button>
                    {HouseSearch && <div><UserSearch/></div>}
                    

                    <button onClick={handleAppointment} style={{ padding: '8px 15px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight:'10px' }}>Book an Appointment</button>
                    {appoint && <div><Appointment/></div>}
                    
                        
                    <button onClick={handleReview} style={{ padding: '8px 15px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight:'10px' }}>Give Review</button>
                    {review && <div><Review/></div>}
                    
                        
                </div>
            ):(
            <div style={{ marginBottom: '20px' }}>
                <form onSubmit={handleSubmit} style={{ border: '2px solid ', padding: '50px', borderRadius: '5px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            onChange={e => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '3px' }}
                        />
                    </div>
                    <div className='mb-3' style={{ marginBottom: '10px' }}>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            onChange={e => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '3px' }}
                        />
                    </div>
                    <button style={{ padding: '8px 15px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Login as a User</button>
                </form>
            </div>
            )}
            <div>
                
                {NoRecord && <h6 style={{ color: 'black' }}>Sorry {NoRecord} was found</h6>}
            </div>

        </div>
    );
}

export default UserLogin;
