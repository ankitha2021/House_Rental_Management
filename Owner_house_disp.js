//this file is to show owner houses
import React, { useState } from 'react'
import axios from 'axios';


function HouseDisp(){
    const [searchResult, setSearchResult] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);

    function handleSubmit(event){
        event.preventDefault(); 
        axios.post('http://localhost:8081/owner_disp',{})
        .then(res => {
            console.log(res.data);
            setSearchResult(res.data);
            setSearchClicked(true);
        })
        .catch(err => console.log(err));
    }


    return(
        <div>
            <button onClick={handleSubmit} style={{ padding: '8px 15px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight:'10px'}}>Show My houses</button>
            {searchResult &&  searchResult.length > 0 && (
                <div>
                    <h3>Search Results:</h3>
                    {searchResult.map(result => (
                        <div key={result.HouseID}>
                    
                            <p>House ID assigned:{result.HouseID}<br></br>
                            Property Type: {result.PropertyType}<br></br>
                            Location: {result.City}<br></br>
                            No.of.rooms : {result.No_of_rooms}<br></br>
                            Rent amount (per month) : {result.Amount}<br></br>
                            Features available: {result.Kitchen === 1 ? <div>Kitchen</div> : null}
                                                {result.Balcony === 1 ? <div>Balcony</div> : null}
                                                {result.Parking === 1 ? <div>Parking</div> : null} 
                                                {result.Furnished === 1 ? <div>Furnished</div> : null}
                                                
                                                                            

                            </p>
                        </div>
                        ))}
                        </div>
                    )}
                     {searchResult.length===0 && searchClicked && <h4 style={{ color: 'black',textAlign:'center', textTransform:'uppercase'}}> No houses added yet</h4>}
                    
        </div>
    )
}

export default HouseDisp