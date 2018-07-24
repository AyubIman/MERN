
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
// //TODO: Do CORS overhere todo whitelisting -- for security reasons
module.exports = (app) => {

app.post('/api/account/signup', (req,res,next) => {
  const {body} = req;
  const {
    firstName,
    lastName,
    password
  } = body;
  let {
    email
  } = body;

  if(!firstName){
    return res.send({
      success: false,
      message: 'Error: First Name can not be blank.'
    });
  }
  if(!lastName){
    return res.send({
      success: false,
      message: 'Error: Last Name can not be blank.'
    });
  }
  if(!email){
    return res.send({
      success: false,
      message: 'Error: email can not be blank.'
    });
  }
  if(!password){
    return res.send({
      success: false,
      message: 'Error: Password can not be blank.'
    });
  }

  email = email.toLowerCase();
  // valudate email address is a valid email
// check if user exists
    User.find({
    email: email
  }, (err, previousUsers) => {
    if(err){
      return res.send({
        success: false,
        message: 'Error: Server Error'
      });
    }else if(previousUsers.length > 0){
      return res.send({
        success: false,
        message: 'Error: Account already exists'
      });
    }

    //save the user
    const newUser = new User();

    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = newUser.generateHash(password);

    newUser.save((err, user) =>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server Error'
        });
      }
      else{
        return res.send({
          success: true,
          message: 'Signed UP'
        });
      }
    });

  });
}
}
