import React, { useState } from 'react';
import axios from 'axios';
import Owner from './Owner';
import HouseDisp from './Owner_house_disp'
import HouseDelete from './Owner_house_delete'

function OwnerLogin() {
    
    const [ownername, setOwnername] = useState('');
    const [NoRecord, setNoRecord] = useState('');
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [showOwnerComponent, setShowOwnerComponent] = useState(false);
    const [houseDelete, setHouseDelete]=useState(false);
    const [AddHouse, setAddHouse]=useState(false);
   


    function handleSubmit(event){
        event.preventDefault(); 
        axios.post('http://localhost:8081/owner_login',{email, password})
        .then(res => {
            if(res.data.oname){
                setOwnername(res.data.oname);
                console.log(res.data);
                setNoRecord('');
                setShowOwnerComponent(true);
                
            }else{
                setNoRecord("No Record");
                console.log(res.data);
                //setShowOwnerComponent(false);
            }}).catch(err => 
            console.log(err));     
    }

    function handleAddHouse(event) {
        event.preventDefault();
       setAddHouse(true);
    }

    function handleHouseDelete(event) {
        event.preventDefault();
       setHouseDelete(true);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '100px' }}>
            {showOwnerComponent ? (
                <div>
                    <div>
                    {ownername && <h2 style={{ color: 'black',textAlign:'center', textTransform:'uppercase'}}> WELCOME {ownername} !</h2>}
                    </div>
                    <br></br>
                    
                    <HouseDisp/>

                    <button onClick={handleAddHouse} style={{ padding: '8px 15px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight:'10px'}}>Add a House</button>
                    {AddHouse && <div><Owner/></div>}

                    <button onClick={handleHouseDelete} style={{ padding: '8px 15px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight:'10px'}}>Delete a House</button>
                    {houseDelete&& <div><HouseDelete/></div>}
               
               
               
                </div>
                
            ) : (
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
                    <button style={{ padding: '8px 15px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Login as Owner</button>
                </form>
            </div>
            )}
            <div>
                
                {NoRecord && <h6 style={{ color: 'black' }}>Sorry {NoRecord} was found</h6>}
            </div>
        </div>
    );
}

export default OwnerLogin;
