//this file is to search houses by user
import React, { useState } from 'react'
import axios from 'axios'


function HouseDelete(){
    const [houseId, setHouseId]=useState(0)
    const [clicked, setClicked]=useState(false);

    function handleSubmit(event){
        event.preventDefault(); 
        axios.post('http://localhost:8081/house_delete',{houseId})
        .then(res => {
            console.log(res.data);
            setClicked(true);
        })
        .catch(err => console.log(err));
    }

    return(
            <div>
                <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='houseid'>HouseID</label>
                            <input type='number' placeholder='Please enter the House ID of the house you want to delete'
                            onChange={e=> setHouseId(e.target.value)}/>
                        </div>

                    <button style={{ padding: '8px 15px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
                    
                </form>
                {clicked && <div>successfully deleted</div>}
            </div>
    )
}

export default HouseDelete