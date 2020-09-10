const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');


// api/members routes 
// gets all members // we're going to be using a spefic url address under the name of route on this side 
router.get('/', (req, res) => res.json(members));

// get request to get a single member // we want to get the member by their ID using a URL parameter and we can use the request object to grab whatever is in there 
router.get('/:id', (req,res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  //console.log(req.params, 'hello');// so node converts the number to a string 

  if (found) {
      res.json(members.filter(member => member.id === parseInt(req.params.id)));
   } else {
      res.status(400).json({msg: `No member with the id of ${req.params.id}`});
   }
   
});

// create Member 
// whenever you create something on the server or you're adding to a database, you want to make a post request 
router.post('/', (req,res) => {
    // request in this context is different? no its not req.body is the whole content this is the 
    // res.send(req.body) // data comes froms the request object and we want to then that send data to the json file with all of them as valid json 
    
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include a name and email'});
    }
     
    members.push(newMember);
   res.json(members); // this what happened after we submitted the form which redirected to the current state of members with the added member 
    //res.redirect('/') // using this for the view response 
});

// update Member via put method 
router.put('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
  
    if (found) {
        const updateMember = req.body;
        console.log(updateMember);
        members.forEach(member => {
            // if there is a match 
            if (member.id === parseInt(req.params.id)) {
                //below would be the new object so the value of { member.name : updateMember.name/nothing}
                 member.name = updateMember.name ? updateMember.name : member.name;// if false keep the member name whatever that is anyway
                 member.email = updateMember.email ? updateMember.email : member.email;
                 res.json({msg: 'Member updated', member}) // return this json which is just the member? 

            
            }
        });       
     } else {
        res.status(400).json({msg: `Could not update member with the id of ${req.params.id}`});
     }
     
  });


  router.delete('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
  
    if (found) {
        // so a new response without the selected id 
        res.json( {msg: 'Member deleted', members:  members.filter(member => member.id !== parseInt(req.params.id))} );
     } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
     }
     
  });


module.exports = router;


// the deleted one would be filtered out as the url of 1 is equal to 1 so that is wrong in this condition as !== means not equal which would be true // return all the members except the one that was deleted 
