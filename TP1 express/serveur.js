const express = require('express');
const app = express();
const port = 3000; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// GET all users
app.get('/users', (req, res) => {
    
    // res.json(users);
    ch="<table border='2'><tr><td>id</td><td>Name</td><td>Email</td>";
    users.forEach(user => {
        ch+="<tr><td>"+user.id+"</td><td>"+user.name+"</td><td>"+user.email+"</td></tr>";
    })
    res.send(ch+"</table>");

});
    
// GET a user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) 
        return res.status(404).send('User not found');
    ch="<table border='2'><tr><td>id</td><td>Name</td><td>Email</td>";
    ch+="<tr><td>"+user.id+"</td><td>"+user.name+"</td><td>"+user.email+"</td></tr>";
    res.send(ch+"</table>");
});
    
// POST a new user
app.post('/usersp', (req, res) => {
    const{name,email} = req.body
    if((name=="")||(email=="")){
        res.send("name ou email vide");
        
    }
    else{
        const newUser = { id: users.length + 1, ...req.body };
        users.push(newUser);
        res.json(newUser);
    }

});
    
// PUT to update a user
app.put('/users/:id', (req, res) => {
    let user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    user = { ...user, ...req.body };
    res.json(user);
});
    
// DELETE a user
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

    if (userIndex === -1) 
        return res.status(404).send('User not found');
    users.splice(userIndex, 1);
    res.json({ message: 'User deleted' });
});

const logger=(req,res,next)=>{
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    console.log(`[${date} ${time} ] ${req.method} ${req.path}`)
    next();
}

app.use(logger);

app.listen(port, () => {
    console.log(`Application exemple à l'écoute sur le port ${port}!`);
});
