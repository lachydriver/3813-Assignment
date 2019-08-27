const fs = require('fs');
module.exports = function(app, path){
    app.post("api/login", function(req, res) {
        if(!req.body) {
            return res.sendStatus(400);
        }

        let data = fs.readFileSync('users.json');
        let users = JSON.parse(data);    
        
        var user = {};

        user.username = req.body.username;
        user.role = req.body.role;
        customer.valid = false;

        for(let i=0;i<users.length;i++){
            if(req.body.username == users[i].username){
                user.valid = true;
                user.role = users[i].role;
            }
        }
        res.send(user)
    })
}