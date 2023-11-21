//this file is to search houses by user
import React, { useState } from 'react'
import axios from 'axios'


function UserSearch(){
    const [searchResult, setSearchResult] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const [House, setHouse]=useState(0)
    const [flat, setFlat]=useState(0)
    const [apartment, setApartment]=useState(0)
    const [minrooms, setMinRooms]=useState('')
    const [maxrooms, setMaxRooms]=useState('')
    const [locality, setLocation]=useState('')
    const [kitchen, setKitchen]=useState(0)
    const [parking, setParking]=useState(0)
    const [balcony, setBalcony]=useState(0)
    const [furnished, setFurnished]=useState(0)
    const [minamount, setMinAmount]=useState('')
    const [maxamount, setMaxAmount]=useState('')
    function handleSubmit(event){
        event.preventDefault(); 
        axios.post('http://localhost:8081/user_search',{House,flat,apartment,minrooms,maxrooms,locality,
                                                        minamount,maxamount,kitchen,parking,balcony,furnished})
        .then(res => {
            setSearchResult(res.data);
            setSearchClicked(true);
        })
        .catch(err => console.log(err));
    }

    return(
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3>Please select the type of places you are wishing to see</h3>

                        <div>
                            <label htmlFor="House">House</label>
                            <input type="checkbox"  onChange={() => setHouse(!House)}/>
                        </div>
                        <div>
                            <label htmlFor="Apartment">Apartment</label>
                            <input type="checkbox"  onChange={() => setApartment(!apartment)} />
                        </div>
                        <div>
                            <label htmlFor="Flat">Flat</label>
                            <input type="checkbox"  onChange={() => setFlat(!flat)} />
                        </div>
                        
                    </div>
                    <div>
                        <h3>Please select the No.of rooms you are looking for</h3>
                        
                        <div>
                            <label htmlFor='minrooms'>Minimum No.of Rooms</label>
                            <input type='number' min="1" max="10" placeholder='Enter Minimum No.of rooms'
                            onChange={e=> { setMinRooms(e.target.value); setMaxRooms(e.target.value); }}/>
                        </div>
                        <div>
                            <label htmlFor='maxrooms'>Maximum No.of Rooms</label>
                            <input type='number' min="1" max="10" 
                            placeholder='Enter Minimum No.of rooms'
                            onChange={e=>setMaxRooms(e.target.value)}/>
                        </div>
                        
                    </div>
                    <div>
                        <label htmlFor='location'>Location</label>
                        <input type='text' placeholder='Enter the city'
                        onChange={e=>setLocation(e.target.value)}/>
                    </div>
                    <div>
                        <h3>Please select rent amount range</h3>
                        <div>
                            <label htmlFor='rent'>Please select minimum rent amount</label>
                            <input type='range' id='rent' name='rent' min="1000" max="50000" step="500" 
                            onChange={e=>setMinAmount(e.target.value)}/>
                            <h6>{minamount}</h6>
                        </div>
                        <div>
                            <label htmlFor='rent'>Please select maximum rent amount</label>
                            <input type='range' id='rent' name='rent' min={minamount} max="50000" step="500" 
                            onChange={e=>setMaxAmount(e.target.value)}/>
                            <h6>{maxamount}</h6>
                        </div>
                        
                    </div>
                    <div>
                        <h3>Please check the boxes if your houses should have those facilities</h3>

                        <div>
                            <label htmlFor="kitchen">Kitchen</label>
                            <input type="checkbox"  onChange={() => setKitchen(!kitchen)} />
                        </div>
                        <div>
                            <label htmlFor="parking">Parking</label>
                            <input type="checkbox"  onChange={() => setParking(!parking)} />
                        </div>
                        <div>
                            <label htmlFor="balcony">Balcony</label>
                            <input type="checkbox"  onChange={() => setBalcony(!balcony)} />
                        </div>
                        <div>
                            <label htmlFor="furnished">Furnished</label>
                            <input type="checkbox"  onChange={() => setFurnished(!furnished)} />
                        </div>

                    </div>
                    


                    <button >Search</button>
                </form>
            </div>
            <div>
            {searchResult &&  searchResult.length > 0 && (
                <div>
                    <h3>Search Results:</h3>
                    {/* Render the search result data here */}
                    {searchResult.map(result => (
                        <div key={result.HouseID}>

                            <p>
                            Owner Name: {result.Name}<br></br>
                            Owner Phone number : {result.Phone_number}<br></br>
                            Property Type: {result.PropertyType}<br></br>
                            Location: {result.City}<br></br>
                            No.of.rooms : {result.No_of_rooms}<br></br>
                            Rent amount (per month) : {result.Amount}<br></br>
                            Features available: { Number(kitchen) === 1 ? <p>Kitchen</p> : null }
                                                { Number(balcony) === 1 ? <p>Balcony</p> : null }
                                                { Number(parking) === 1 ? <p>Parking</p> : null }
                                                { Number(furnished) === 1 ? <p>Furnished</p> : null }
                                                                            

                            </p>
                        </div>
                    ))}
                </div>
            )}
            {searchResult.length===0 && searchClicked && <div>No records</div>}
            </div>
        </div>
    )
}

export default UserSearch