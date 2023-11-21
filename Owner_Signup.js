import React, { useState } from 'react';
import axios from 'axios';

function OwnerSignup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [pwd, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/owner_signup', { email, name, mobile, pwd })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '100px' }}>
            <div style={{ border: '2px solid ', padding: '50px', borderRadius: '5px' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            placeholder='Enter Your full name'
                            onChange={e => setName(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '3px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor='phone'>Phone number</label>
                        <input
                            type='tel'
                            placeholder='Enter mobile number'
                            onChange={e => setMobile(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '3px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            onChange={e => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '3px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            onChange={e => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '3px' }}
                        />
                    </div>

                    <button style={{ padding: '8px 15px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Register as a Owner</button>
                </form>
            </div>
        </div>
    );
}

export default OwnerSignup;
