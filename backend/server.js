const express = require('express');
const mysql= require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 8080;
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(cors({
    origin: 'http://localhost:3000', // React app URL
    credentials: true // Allow credentials (cookies) to be sent
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/thumb_uploads', express.static('thumb_uploads'));
app.use('/uploads', express.static('uploads'));

app.use(session({
    secret: 'yds1110',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: false // Set to true if using https
    }
}));


const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"flixrio"
})

//UPDATE
app.post('/upuser', async (req, res) => {
    const { restEmail, restpass1 } = req.body;
    
    if (!restEmail || !restpass1) {
        return res.status(400).json("Missing email or password");
    }

    try {
        //const hashedPassword = await bcrypt.hash(restpass1, 10); // Hash the password

        const sql = "UPDATE user SET password = ? WHERE email = ?";
        const values = [restpass1, restEmail];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json("Error");
            }
            return res.status(200).json({ status: "Success", message: "Password updated successfully" });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        return res.status(500).json({ status: "Error", message: "Error hashing password" });
    }
});

//INSERT IN USER

app.post('/reg',(req,res)=>{
    console.log(req.body);
    const sql="INSERT INTO user(u_name,email,password,mono) VALUES (?)";
    const values=[
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.Mono
    ]
    db.query(sql,[values],(err,data)=>{
        if(err)
        {
            return res.json("Error");
        }
        return res.json({"message":"Success","data":data});
    })
})

app.post('/feedback_insert',(req,res)=>{
    console.log(req.body);
    const sql="INSERT INTO feedback(feed,u_id,rate) VALUES (?)";
    const values=[
        req.body.feedback,
        req.body.u_id,
        req.body.rate
    ]
    db.query(sql,[values],(err,data)=>{
        if(err)
        {
            return res.json("Error");
        }
        return res.json({"message":"Success","data":data});
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM user WHERE `email`=? AND `password`=?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            const user = data[0];
            req.session.user = { id: user.u_id, name: user.u_name, email: user.email };
            console.log(req.session.user);
            return res.json("Success");
        } else {
            return res.json("fail");
        }
    });
});


app.get('/session', (req, res) => {
    // console.log('Session endpoint hit');
    // console.log('Session data:', req.session);
    if (req.session.user) {
        res.send({ user: req.session.user });
    } else {
        res.status(401).send({ message: 'Not logged in' });
    }
});




app.post('/search',(req,res)=>{
    const sql="SELECT * FROM user WHERE `u_id`=?";
    db.query(sql,[req.body.email],(err,data)=>{
        if(err)
        {
            return res.json("Error");
        }
       if(data.length>0)
       {
        console.log(data);
       }
       else{
        return res.json("fail");

       }
    })
})
//fatch data
app.get('/cat',(req,res)=>{
    db.query("SELECT * FROM category;", function(err, results, fields){
         if(err) throw err;
       return res.send(results);
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
    db.query("SELECT vd.*,u.u_name FROM videodetail vd LEFT JOIN user u ON vd.u_id = u.u_id order by views desc LIMIT 4;", function(err, results, fields) {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).send('Internal Server Error');
        }
        return res.send(results);
    });
});
app.get('/vid2', (req, res) => {
    db.query("SELECT vd.*,u.u_name FROM videodetail vd LEFT JOIN user u ON vd.u_id = u.u_id order by v_id desc  LIMIT 4;", function(err, results, fields) {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).send('Internal Server Error');
        }
        return res.send(results);
    });
});

app.get('/vid2all', (req, res) => {
    db.query("SELECT vd.*,u.u_name FROM videodetail vd LEFT JOIN user u ON vd.u_id = u.u_id order by v_id desc;", function(err, results, fields) {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).send('Internal Server Error');
        }
        return res.send(results);
    });
});



app.get('/vid1', (req, res) => {
    db.query("SELECT vd.*,u.u_name FROM videodetail vd LEFT JOIN user u ON vd.u_id = u.u_id order by views desc;", function(err, results, fields) {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).send('Internal Server Error');
        }
        return res.send(results);
    });
});

app.put('/myvid/:u_id', (req, res) => {
    try {
        const { u_id } = req.params; // Retrieve views and v_id from the request body

        const sql = "SELECT vd.*,u.u_name FROM videodetail vd LEFT JOIN user u ON vd.u_id = u.u_id where u.u_id=?;";
        const values = [u_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ status: "Error", message: "Failed to update views" });
            }
            return res.status(200).json({ status: "Success",data:result });
        });
    } catch (error) {
        console.error('Error updating views:', error);
        return res.status(500).json({ status: "Error", message: "Error updating views" });
    }
});

app.put('/myvid_mostview/:u_id', (req, res) => {
    try {
        const { u_id } = req.params; // Retrieve views and v_id from the request body
        console.log(req.params);
        const sql = "select v_name from videodetail where u_id=? order by views desc LIMIT 1;";
        const values = [u_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ status: "Error", message: "Failed to update views" });
            }
            //console.log(result);
            return res.status(200).json({ status: "Success",data:result });
            
        });
    } catch (error) {
        console.error('Error updating views:', error);
        return res.status(500).json({ status: "Error", message: "Error updating views" });
    }
});

app.put('/myvid_recentvideo/:u_id', (req, res) => {
    try {
        const { u_id } = req.params; // Retrieve views and v_id from the request body

        const sql = "select v_name from videodetail where u_id=? order by v_id desc LIMIT 1;"

        const values = [u_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ status: "Error", message: "Failed to update views" });
            }
            return res.status(200).json({ status: "Success",data:result });
        });
    } catch (error) {
        console.error('Error updating views:', error);
        return res.status(500).json({ status: "Error", message: "Error updating views" });
    }
});

app.put('/userdata/:u_id', (req, res) => {
    try {
        const { u_id } = req.params; // Retrieve views and v_id from the request body

        const sql = "select * from user where u_id=?;"

        const values = [u_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ status: "Error", message: "Failed to update views" });
            }
            return res.status(200).json({ status: "Success",data:result });
        });
    } catch (error) {
        console.error('Error updating views:', error);
        return res.status(500).json({ status: "Error", message: "Error updating views" });
    }
});


app.put('/searchbycetegory/:c_id', (req, res) => {
    try {
        const { c_id } = req.params; // Retrieve views and v_id from the request body

        const sql = "SELECT vd.*,u.u_name FROM videodetail vd LEFT JOIN user u ON vd.u_id = u.u_id where vd.c_id=?;";
        const values = [c_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ status: "Error", message: "Failed to update views" });
            }
            return res.status(200).json({ status: "Success",data:result });
        });
    } catch (error) {
        console.error('Error updating views:', error);
        return res.status(500).json({ status: "Error", message: "Error updating views" });
    }
});


app.put('/update_views', (req, res) => {
    try {
        const { views, v_id } = req.body; // Retrieve views and v_id from the request body

        const sql = "UPDATE videodetail SET views = ? WHERE v_id = ?";
        const values = [views, v_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ status: "Error", message: "Failed to update views" });
            }
            return res.status(200).json({ status: "Success", message: "Views updated successfully" });
        });
    } catch (error) {
        console.error('Error updating views:', error);
        return res.status(500).json({ status: "Error", message: "Error updating views" });
    }
});


app.get('/search_vid', (req, res) => {
    const search = req.query.search_data;
    if (!search) {
        return res.status(400).send('Search query is required');
    }
    
    const sql = `
        SELECT vd.*, u.u_name 
        FROM videodetail vd 
        LEFT JOIN user u ON vd.u_id = u.u_id 
        WHERE vd.v_name LIKE ? OR vd.description LIKE ?
    `;
    const values = [`%${search}%`, `%${search}%`];

    db.query(sql, values, function(err, results) {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).send('Internal Server Error');
        }
        return res.send(results);
    });
});




// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /mp4/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only .mp4 files are allowed!'));
        }
    }
}).single('file');

// Upload endpoint
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: err.message });
        }
        console.log(req.file.path);
        res.send({ message: 'File uploaded successfully', file: req.file });
    });
});

const thmb_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'thumb_uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const thumb_upload = multer({
    storage: thmb_storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only .jpeg, .jpg, .png, and .gif files are allowed!'));
        }
    }
}).single('file');

app.post('/tmb_upload', (req, res) => {
    thumb_upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: err.message });
        }
        console.log(req.file.path);
        res.send({ message: 'File uploaded successfully', file: req.file });
    });
});

app.post('/insup',(req,res)=>{
    console.log(req.body);
    const sql="INSERT INTO videodetail(v_name,description,path,thubnail,c_id,u_id) VALUES (?)";
    const values=[
        req.body.name,
        req.body.desc,
        req.body.file,
        req.body.thumbnail,
        req.body.category,
        req.body.u_id,
    ]
    db.query(sql,[values],(err,data)=>{
        if(err)
        {
            return res.json("Error");
        }
       // return res.json(data);
        return res.status(200).json({"message":"Success","data":"Success"});

    })
})


app.listen(PORT,()=>{
    console.log("listening");
    console.log(`Server is running on http://localhost:${PORT}`);
})

// Add this route to your existing Express application

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.send({ message: 'Logged out successfully' });
    });
});

app.post('/check-email', (req, res) => {
    const { email } = req.body;
    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, [email], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Server Error" });
        }
        if (data.length > 0) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    });
});

app.post('/check-user', (req, res) => {
    const { username } = req.body;
    const sql = "SELECT * FROM user WHERE username = ?";
    db.query(sql, [username], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Server Error" });
        }
        if (data.length > 0) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    });
});

app.post('/insfev',(req,res)=>{
    var err1=0;
   
    Object.entries(req.body.favorites).forEach(([key, value]) => {
        const sql = "SELECT * FROM favourite WHERE v_id = ? and u_id=?";
        db.query(sql, [value.v_id,value.u_id], (err, data) => {
            if (err) {
                return res.status(500).json({ message: "Server Error" });
            }
            
            // if (data.length == 0 && !value.v_id) {
            if (data.length == 0 ) {
                const sql1="INSERT INTO favourite(link,u_id,v_id) VALUES (?)";
                const inster_values=[
                    value.path,
                    req.body.u_id,
                    value.v_id
                ]
                db.query(sql1,[inster_values],(err2,data)=>{
                    if(err2)
                    {
                        err1 = 1;
                        console.log(err1);
                    }
                   // return res.json(data);
                })
            } 
        });
        // Do something with the key-value pair
      });
    
      if(err1==0){
        return res.json({"message":"Success"});
      }else{
        return res.json("Error");
      }
    // console.log(req.body);
   
})

app.delete('/delfev/:v_id', async (req, res) => {
    const { v_id } = req.params; // Extract v_id from URL parameters
    try {
        const sql = "DELETE FROM favourite WHERE v_id=?";
        const values = [v_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ status: "Error", message: "Failed to delete favorite podcast" });
            }
            return res.status(200).json({ status: "Success", message: "Favorite podcast deleted successfully" });
        });
    } catch (error) {
        console.error('Error deleting favorite podcast:', error);
        return res.status(500).json({ status: "Error", message: "Error deleting favorite podcast" });
    }
});

app.put('/fatchfavouritedata/:u_id', (req, res) => {
    try {
        const { u_id } = req.params; // Retrieve views and v_id from the request body

        const sql = "SELECT DISTINCT fv.v_id,fv.u_id,vd.*,u.u_name from favourite fv LEFT JOIN videodetail vd ON fv.v_id = vd.v_id LEFT JOIN user u ON vd.u_id = u.u_id where fv.u_id=?;";
        const values = [u_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ status: "Error", message: "Failed to update views" });
            }
            return res.status(200).json({ status: "Success",data:result });
        });
    } catch (error) {
        console.error('Error updating views:', error);
        return res.status(500).json({ status: "Error", message: "Error updating views" });
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