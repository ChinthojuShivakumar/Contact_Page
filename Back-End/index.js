import express from 'express';
import cors from 'cors';
import mysql from 'mysql'
const app = express()
const Port = 8081



const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'120718',
    database:'contact_db'
})

app.use(cors())
app.use(express.json())


app.get('/getcontact',(req,res)=>{
    const getData = 'SELECT * FROM contact';
    db.query(getData,(err,result)=>{
        if(err){
            console.error("Error:",err)
            res.status(500).send("Internal Server Error")
        }
        else{
            console.log('Data Calling Successful');
            res.send(result)
        }
    })
})

app.post('/postData',(req,res)=>{
    const { name, email, number } = req.body;
    const sqlInsert = "INSERT INTO contact (`contact`, `email`, `phone`) VALUES (?, ?, ?)";

    db.query(sqlInsert, [name, email, number],(err,result)=>{
        if(err){
            console.error('Error:', err)
            res.status(500).send('Internal Server Error')
        }
        else{
            console.log("Insertion success");
            res.send(result)
        }
    })
})

app.delete('/removeContact/:id', (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM contact WHERE id = ?";

    db.query(sqlRemove, id, (err, result) => {
        if (err) {
            console.error('Error:', err)
            res.status(500).send('Internal Server Error')
        }
        else {
            console.log("Contact deleted success");
            res.send(result)
        }
    })
})

app.get('/getcontact/:id', (req, res) => {
    const { id } = req.params;
    const getContact = "SELECT * FROM contact WHERE id = ?";

    db.query(getContact, id, (err, result) => {
        if (err) {
            console.error('Error:', err)
            res.status(500).send('Internal Server Error')
        }
        else {
            console.log("Contact Updated success");
            res.send(result)
        }
    })
})

app.put('/updateData/:id', (req, res) => {
    const {id} = req.params;
    const { contact, email, phone } = req.body;
    const sqlInsert = "UPDATE contact SET contact = ?, email = ?, phone = ? WHERE id = ?";

    db.query(sqlInsert, [contact, email, phone, id], (err, result) => {
        if (err) {
            console.error('Error:', err)
            res.status(500).send('Internal Server Error')
        }
        else {
            console.log("Update success");
            res.send(result)
        }
    })
})

app.listen(Port ,()=>{
    console.log(`Your Server is running on ${Port}`);
})

