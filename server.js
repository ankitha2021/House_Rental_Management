    const express = require('express');
    const mysql = require('mysql2');
    const cors = require('cors');
    const util = require('util');


    const app = express();
    app.use(express.json());
    app.use(cors());
    const db=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"dinku123",
        database:'trial'
    })

    db.connect((err) => {
        if (err) {
          console.error('Database connection error: ' + err.message);
        } else {
          console.log('Connected to the database');
        }
      });

      

      //enter owner signup details
      app.post('/owner_signup', async (req, res) => {
        const sql = 'INSERT INTO signup (Name, Email, Phone_number,Password) VALUES (?,?,?,?)';
        const values = [req.body.name, req.body.email, req.body.mobile,req.body.pwd];
        db.query(sql,values,(err,data)=> {
            if(err) return res.json(err);
            if (data.length >0){
                return res.json("sccessful");
            } else{
                return res.json("No record");
            }
        })
      });



      //getting owner id from the email id
      async function id(mail) {
        return new Promise((resolve, reject) => {
          db.query("SELECT ID FROM signup WHERE Email=?", mail, (err, data) => {
            if (err) return reject(err);
            if (data.length > 0) {
              return resolve(data[0].ID);
            } else {
              return resolve(null);
            }
          });
        });
      }
    let oid;

    //getting owner name from owner id
    async function name(id) {
        return new Promise((resolve, reject) => {
            console.log(id);
          db.query("SELECT Name FROM signup WHERE ID=?", id, (err, data) => {
            if (err) return reject(err);
            if (data.length > 0) {
              return resolve(data[0].Name);
            } else {
              return resolve(null);
            }
          });
        });
      }
    let oname;

      //check owner login validity
    app.post('/owner_login',async(req,res)=>{
        
            //console.log(req.body.email)
        oid=await id(req.body.email)
        oname=await name(oid)
    
        const sql = "SELECT Email,Password FROM signup WHERE Email=? AND Password=?";
        const values=[
            req.body.email,
            req.body.password
        ]
        db.query(sql,values,(err,data)=> {
            if(err) return res.json(err);
            if (data.length >0){
                return res.json({message:"Login sccessful",oname});
            } else{
                return res.json("No record" );
            }
        })
    });

    //get recently entered house id
    async function hoid() {
        return new Promise((resolve, reject) => {
            const val=[]
          db.query("SELECT HouseID FROM house ORDER BY HouseID DESC LIMIT 1", val, (err, data) => {
            if (err) return reject(err);
            if (data.length > 0) {
                console.log(data);
              return resolve(data[0].HouseID);
            } else {
              return resolve(null);
            }
          });
        });
      }
      
      let hid;

    
    
const dbQuery = util.promisify(db.query).bind(db);

//insert house details into different tables
app.post('/owner', async (req, res) => {
    try {
        
        const sql = "INSERT INTO house (OwnerID, PropertyType, No_of_rooms) VALUES (?,?,?)";
        const values = [
            oid,
            req.body.type,
            req.body.rooms
        ];

        const data = await dbQuery(sql, values);

        if (data.affectedRows > 0) {
            // First query executed successfully, proceed with the next queries
            hid = await hoid();
            console.log("hid is ",hid);
            // Enter location details
            const locationSql = "INSERT INTO location (HouseId, City) VALUES (?,?)";
            const locationValues = [
                hid,
                req.body.locality
            ];

            await dbQuery(locationSql, locationValues);

            // Enter feature details
            const featuresSql = "INSERT INTO features (HouseId, Kitchen, Parking, Balcony, Furnished) VALUES (?,?,?,?,?)";
            const featuresValues = [
                hid,
                req.body.kitchen,
                req.body.parking,
                req.body.balcony,
                req.body.furnished
            ];

            await dbQuery(featuresSql, featuresValues);

            // Enter rent amount
            const rentSql = "INSERT INTO rent (OwnerId, HouseId, Amount) VALUES (?,?,?)";
            const rentValues = [
                oid,
                hid,
                req.body.amount
            ];

            await dbQuery(rentSql, rentValues);

            return res.json({ message: "House details and related information successfully entered" });
        } else {
            return res.json("No record");
        }

    } catch (error) {
        return res.json(error);
    }
});


//add user signup details
app.post('/user_signup', async (req, res) => {
    const sql = 'INSERT INTO user (Name, Email, Phone_number,Password) VALUES (?,?,?,?)';
    const values = [req.body.name, req.body.email, req.body.mobile,req.body.pwd];
    db.query(sql,values,(err,data)=> {
        if(err) return res.json(err);
        if (data.length >0){
            return res.json("sccessful");
        } else{
            return res.json("No record");
        }
    })
  });

  //to get user name from mail id
  async function username(mail) {
    return new Promise((resolve, reject) => {
      db.query("SELECT Name FROM user WHERE Email=?", mail, (err, data) => {
        if (err) return reject(err);
        if (data.length > 0) {
          return resolve(data[0].Name);
        } else {
          return resolve(null);
        }
      });
    });
  }
let uname;

  //check user login validity
app.post('/user_login',async(req,res)=>{
    
        //console.log(req.body.email)
    uname=await username(req.body.email)

    const sql = "SELECT Email,Password FROM user WHERE Email=? AND Password=?";
    const values=[
        req.body.email,
        req.body.password
    ]
    db.query(sql,values,(err,data)=> {
        if(err) return res.json(err);
        if (data.length >0){
            return res.json({message:"Login sccessful",uname});
        } else{
            return res.json("No record" );
        }
    })
});

//display houses to user
app.post('/user_search',async(req,res)=>{

const sql = `
SELECT COUNT(*) AS TotalHouses , H.HouseID,O.Name, O.Phone_number,
H.PropertyType, H.No_of_rooms,
L.City, R.Amount,
F.Kitchen, F.Balcony, F.Parking, F.Furnished 
FROM house AS H
JOIN location AS L ON L.HouseId = H.HouseID AND L.City=?
JOIN rent AS R ON R.HouseId = H.HouseID AND R.Amount BETWEEN ? AND ?
JOIN features AS F ON F.HouseId = H.HouseID AND F.Kitchen=? AND F.Parking=? AND F.Balcony=? AND F.Furnished=?
JOIN signup AS O ON O.ID = H.OwnerID
WHERE H.PropertyType IN 
(SELECT H2.PropertyType FROM house as H2 WHERE 
(?= 1 AND H2.PropertyType='house') OR (?=1 AND H2.PropertyType='apartment') OR (?=1 AND H2.PropertyType='flat'))
AND H.No_of_rooms BETWEEN ? AND ?  
GROUP BY H.HouseID,O.Name,O.Phone_number,H.PropertyType,H.No_of_rooms,L.City,R.Amount,F.Kitchen,F.Balcony,F.Parking,F.Furnished `;
/*console.log( req.body.locality,req.body.minamount,req.body.maxamount,
    req.body.kitchen,
    req.body.parking,
    req.body.balcony,
    req.body.furnished,
    req.body.House,
    req.body.apartment  ,
    req.body.flat ,
    req.body.minrooms,
    req.body.maxrooms)*/
const values=[
    req.body.locality,
    req.body.minamount,
    req.body.maxamount,
    req.body.kitchen,
    req.body.parking,
    req.body.balcony,
    req.body.furnished,
    req.body.House,
    req.body.apartment,
    req.body.flat,
    req.body.minrooms,
    req.body.maxrooms
]
db.query(sql,values,(err,data)=> {
    if(err) return res.json(err);
    if (data.length >0){
        return res.json(data);
    } else{
        return res.json("");
    }
})
});


//display houses to owner
app.post('/owner_disp',async(req,res)=>{

    const sql = `
    SELECT H.PropertyType,H.No_of_rooms,H.HouseID,
    L.City, R.Amount,
    F.Kitchen, F.Balcony, F.Parking, F.Furnished
    FROM house AS H
    JOIN location AS L ON L.HouseId = H.HouseID 
    JOIN rent AS R ON R.HouseId = H.HouseID 
    JOIN features AS F ON F.HouseId = H.HouseID 
    WHERE H.OwnerID = ?  `;
    
    const values=[oid]
    db.query(sql,values,(err,data)=> {
        if(err) return res.json(err);
        if (data.length >0){
            return res.json(data);
        } else{
            return res.json("");
        }
    })
    });


    //delete a house by  owner
    app.post('/house_delete',async(req,res)=>{
        try {
           
            const deleteProcedure = "CALL DeleteHouse(?)";
            const deleteValues = [req.body.houseId];
    
            const deleteResult = await dbQuery(deleteProcedure, deleteValues);
    
            return res.json(deleteResult[0]);
        } catch (error) {
            return res.json({ error: error.message });
        }
        });

        //get owner id from name
        async function Oid(name) {
            return new Promise((resolve, reject) => {
              db.query("SELECT ID FROM signup WHERE Name=?", name, (err, data) => {
                if (err) return reject(err);
                if (data.length > 0) {
                  return resolve(data[0].ID);
                } else {
                  return resolve(null);
                }
              });
            });
          }


          //get user id from mail
          async function Uid(mail) {
            return new Promise((resolve, reject) => {
              db.query("SELECT UID FROM user WHERE Email=?", mail, (err, data) => {
                if (err) return reject(err);
                if (data.length > 0) {
                  return resolve(data[0].UID);
                } else {
                  return resolve(null);
                }
              });
            });
          }
          let uid;

    //book an appointment by user
    app.post('/book_appointment', async (req, res) => {
        oid=await Oid(req.body.Oname);
        uid = await Uid(req.body.email);
        const sql = 'INSERT INTO appointment (OwnerId, UserId, AppointDate,AppointTime) VALUES (?,?,?,?)';
        const values = [oid, uid, req.body.Adate,req.body.Atime];
        db.query(sql,values,(err,data)=> {
            if(err) return res.json(err);
            if (data.length >0){
                return res.json("sccessful appointment booked");
            } else{
                return res.json("Not successful");
            }
        })
      });

      //to insert reviews of the user
      app.post('/review', async (req, res) => {
        uid = await Uid(req.body.email);
        const sql = 'INSERT INTO review (UserId, Feedback) VALUES (?,?)';
        const values = [uid, req.body.feedback];
        db.query(sql,values,(err,data)=> {
            if(err) return res.json(err);
            if (data.length >0){
                return res.json("sccessful review saved");
            } else{
                return res.json("Not successful");
            }
        })
      });
    


   
    

    app.listen(8081,()=>{
        console.log("Listening...")
    })
