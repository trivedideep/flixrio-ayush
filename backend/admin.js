const express = require('express');
const mysql= require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 8090;
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(cors({
    origin: 'http://localhost:3001', // React app URL
    credentials: true // Allow credentials (cookies) to be sent
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"flixrio"
})

//fatch data
app.get('/cat',(req,res)=>{
    db.query("SELECT * FROM category;", function(err, results, fields){
         if(err) throw err;
       return res.send(results);
    })
})
app.post('/alogin',(req,res)=>{
    console.log(req);
    const sql="SELECT * FROM admin WHERE `a_name`=? AND `pass`=?";
    db.query(sql,[req.body.a_name,req.body.pass],(err,data)=>{
        console.log("here");
        if(err)
        {
            return res.json("Error");
        }
       if(data.length>0)
       {
        return res.json("Success");
       }
       else{
        return res.json("fail");

       }
    })
})



app.get('/lan',(req,res)=>{
    db.query("SELECT * FROM language;", function(err, results, fields){
         if(err) throw err;
       return res.send(results);
    })
})

app.get('/user',(req,res)=>{
    db.query("SELECT * FROM user;", function(err, results, fields){
         if(err) throw err;
       return res.send(results);
    })
})

app.get('/feed',(req,res)=>{
    db.query("SELECT * FROM feedback;", function(err, results, fields){
         if(err) throw err;
       return res.send(results);
    })
})

app.get('/vid', (req, res) => {
    db.query("SELECT * FROM videodetail;", function(err, results, fields) {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).send('Internal Server Error');
        }
        return res.send(results);
    });
});

app.listen(PORT,()=>{
    console.log("listening");
    console.log(`Server is running on http://localhost:${PORT}`);
})


//dele data..
app.delete('/delcat/:c_id', async (req, res) => {
    const { c_id } = req.params; // Extract c_id from URL parameters
    console.log("here");
    console.log(c_id);
    try {
        const sql = "DELETE FROM category WHERE c_id=?";
        const values = [c_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ status: "Error", message: "Failed to delete category" });
            }
            return res.status(200).json({ status: "Success", message: "Category deleted successfully" });
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({ status: "Error", message: "Error deleting category" });
    }
});

app.delete('/delfeed/:f_id', async (req, res) => {
    const { f_id } = req.params; // Extract c_id from URL parameters
    console.log("here");
    console.log(f_id);
    try {
        const sql = "DELETE FROM feedback WHERE f_id=?";
        const values = [f_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ status: "Error", message: "Failed to delete category" });
            }
            return res.status(200).json({ status: "Success", message: "Category deleted successfully" });
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({ status: "Error", message: "Error deleting category" });
    }
});

app.delete('/dellan/:l_id', async (req, res) => {
    const { l_id } = req.params; // Extract c_id from URL parameters
    console.log("here");
    console.log(l_id);
    try {
        const sql = "DELETE FROM language WHERE l_id=?";
        const values = [l_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ status: "Error", message: "Failed to delete category" });
            }
            return res.status(200).json({ status: "Success", message: "Category deleted successfully" });
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({ status: "Error", message: "Error deleting category" });
    }
});

app.delete('/deluser/:u_id', async (req, res) => {
    const { u_id } = req.params; // Extract c_id from URL parameters
    console.log("here");
    console.log(u_id);
    try {
        const sql = "DELETE FROM user WHERE u_id=?";
        const values = [u_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ status: "Error", message: "Failed to delete category" });
            }
            return res.status(200).json({ status: "Success", message: "Category deleted successfully" });
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({ status: "Error", message: "Error deleting category" });
    }
});


app.delete('/delvid/:v_id', async (req, res) => {
    const { v_id } = req.params; // Extract c_id from URL parameters
    console.log("here");
    console.log(v_id);
    try {
        const sql = "DELETE FROM videodetail WHERE v_id=?";
        const values = [v_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ status: "Error", message: "Failed to delete category" });
            }
            return res.status(200).json({ status: "Success", message: "Category deleted successfully" });
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({ status: "Error", message: "Error deleting category" });
    }
});
//update---
app.put('/upcat', async (req, res) => {
    const { c_id, name } = req.body;
    try {
        const sql = "UPDATE category SET name = ? WHERE c_id = ?";
        const values = [name, c_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json("Error");
            }
            return res.status(200).json({ status: "Success", message: "category updated successfully" });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        return res.status(500).json({ status: "Error", message: "Error hashing password" });
    }
});

app.put('/uplan', async (req, res) => {
    const { l_id, l_name } = req.body;
    try {
        const sql = "UPDATE language SET l_name = ? WHERE l_id = ?";
        const values = [l_name, l_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json("Error");
            }
            return res.status(200).json({ status: "Success", message: "Language updated successfully" });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        return res.status(500).json({ status: "Error", message: "Error hashing password" });
    }
});

app.put('/upuser', async (req, res) => {
    const { u_id, u_name,email,password,mono } = req.body;
    try {
        const sql = "UPDATE user SET u_name = ?,email=?,password=?,mono=? WHERE u_id = ?";
        const values = [u_name,email,password,mono,u_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json("Error");
            }
            return res.status(200).json({ status: "Success", message: "User updated successfully" });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        return res.status(500).json({ status: "Error", message: "Error hashing password" });
    }
});


app.put('/upvid', async (req, res) => {
    const { v_id, v_name,description,c_id,path,u_id,thubnail,views } = req.body;
    try {
        const sql = "UPDATE videodetail SET v_name = ?,description=?,c_id=?,path=?,u_id=?,thubnail=?,views=? WHERE v_id = ?";
        const values = [v_name,description,c_id,path,u_id,thubnail,views,v_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json("Error");
            }
            return res.status(200).json({ status: "Success", message: "video details updated successfully" });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        return res.status(500).json({ status: "Error", message: "Error hashing password" });
    }
});

// cards api

app.get('/counttotal_user',(req,res)=>{
    db.query("SELECT count(u_id) as cnt FROM user;", function(err, results, fields){
         if(err) throw err;
       return res.send(results);
    })
})

app.get('/counttotal_videos',(req,res)=>{
    db.query("SELECT count(v_id)as cnt FROM videodetail;", function(err, results, fields){
         if(err) throw err;
       return res.send(results);
    })
})

app.get('/counttotal_views',(req,res)=>{
    db.query("SELECT sum(views)as cnt FROM videodetail;", function(err, results, fields){
         if(err) throw err;
       return res.send(results);
    })
})

app.get('/display_mostviewvideo',(req,res)=>{
    db.query("SELECT * FROM videodetail order by views desc LIMIT 5;", function(err, results, fields){
         if(err) throw err;
       return res.send(results);
    })
})

app.get('/counttotal_feedback',(req,res)=>{
    db.query("SELECT sum(f_id)as cnt FROM feedback;", function(err, results, fields){
         if(err) throw err;
       return res.send(results);
    })
})

app.get('/display_top20_mostviewvideo',(req,res)=>{
    db.query("SELECT * FROM videodetail order by views desc LIMIT 20;", function(err, results, fields){
         if(err) throw err;
       return res.send(results);
    })
})
