//owner adds a house
import React, { useState } from 'react';
import axios from 'axios';

function Owner() {
    const [saved, setSaved] = useState('');
    const [type, setType] = useState('');
    const [rooms, setRooms] = useState('');
    const [locality, setLocation] = useState('');
    const [kitchen, setKitchen] = useState(0);
    const [parking, setParking] = useState(0);
    const [balcony, setBalcony] = useState(0);
    const [furnished, setFurnished] = useState(0);
    const [amount, setAmount] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/owner', { type, rooms, locality, amount, kitchen, parking, balcony, furnished })
            .then(res => {
                console.log(res);
                setSaved("Details successfully saved");
            })
            .catch(err => console.log(err));
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{ border: '2px solid ', padding: '50px', borderRadius: '5px' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor='type'>Property Type</label>
                        <select onChange={e => setType(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '3px' }}>
                            <option value="">Select property type</option>
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="flat">Flat</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor='rooms'>No. of Rooms</label>
                        <input
                            type='number'
                            min="1"
                            max="10"
                            placeholder='Enter No. of rooms'
                            onChange={e => setRooms(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '3px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor='location'>Location</label>
                        <input
                            type='text'
                            placeholder='Enter the city'
                            onChange={e => setLocation(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '3px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor='rent'>Rent Amount</label>
                        <input
                            type='number'
                            min="1000"
                            step="500"
                            placeholder='Enter rent amount'
                            onChange={e => setAmount(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '3px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="kitchen">Kitchen</label>
                        <input type="checkbox" onChange={() => setKitchen(!kitchen)} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="parking">Parking</label>
                        <input type="checkbox" onChange={() => setParking(!parking)} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="balcony">Balcony</label>
                        <input type="checkbox" onChange={() => setBalcony(!balcony)} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="furnished">Furnished</label>
                        <input type="checkbox" onChange={() => setFurnished(!furnished)} />
                    </div>

                    <button style={{ padding: '8px 15px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Save Details</button>
                </form>
            </div>
            <div>
                {saved && <h4 style={{ color: 'black' }}>{saved}</h4>}
            </div>
        </div>
    );
}

export default Owner;
