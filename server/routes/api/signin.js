const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
// //TODO: Do CORS overhere todo whitelisting -- for security reasons
 module.exports = (app) => {
//   app.get('/api/users', (req, res, next) => {
//     Counter.find()
//       .exec()
//       .then((counter) => res.json(counter))
//       .catch((err) => next(err));
//   });
//
//   app.post('/api/users', function (req, res, next) {
//     const user = new User();
//
//     counter.save()
//       .then(() => res.json(counter))
//       .catch((err) => next(err));
//   });
//
//   app.delete('/api/counters/:id', function (req, res, next) {
//     Counter.findOneAndRemove({ _id: req.params.id })
//       .exec()
//       .then((counter) => res.json())
//       .catch((err) => next(err));
//   });
//
//   app.put('/api/counters/:id/increment', (req, res, next) => {
//     Counter.findById(req.params.id)
//       .exec()
//       .then((counter) => {
//         counter.count++;
//
//         counter.save()
//           .then(() => res.json(counter))
//           .catch((err) => next(err));
//       })
//       .catch((err) => next(err));
//   });
//
//   app.put('/api/counters/:id/decrement', (req, res, next) => {
//     Counter.findById(req.params.id)
//       .exec()
//       .then((counter) => {
//         counter.count--;
//
//         counter.save()
//           .then(() => res.json(counter))
//           .catch((err) => next(err));
//       })
//       .catch((err) => next(err));
//   });
// };
app.post('/api/account/signin', (req,res,next) => {
  const {body} = req;
  const {
    password
  } = body;
  let {
    email
  } = body;

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

  User.find({
    email: email
  }, (err, users) => {
    if(err){
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }
    if(users.length != 1){
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    }

    const user = users[0];
    if(!user.validPassword(password)){
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    }

    //create a new UserSession
    const userSession = new UserSession();
    userSession.userId = user._id;
    userSession.save((err, doc) => {
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      return res.send({
        success: true,
        message: 'Valid, Logged In',
        token: doc._id
      });
    });
  })
});
// app.post('/api/account/signup', (req,res,next) => {
//   const {body} = req;
//   const {
//     firstName,
//     lastName,
//     password
//   } = body;
//   let {
//     email
//   } = body;
//
//   if(!firstName){
//     return res.send({
//       success: false,
//       message: 'Error: First Name can not be blank.'
//     });
//   }
//   if(!lastName){
//     return res.send({
//       success: false,
//       message: 'Error: Last Name can not be blank.'
//     });
//   }
//   if(!email){
//     return res.send({
//       success: false,
//       message: 'Error: email can not be blank.'
//     });
//   }
//   if(!password){
//     return res.send({
//       success: false,
//       message: 'Error: Password can not be blank.'
//     });
//   }
//
//   email = email.toLowerCase();
//   // valudate email address is a valid email
// // check if user exists
//   User.find({
//     email: email
//   }, (err, previousUsers) => {
//     if(err){
//       return res.send({
//         success: false,
//         message: 'Error: Server Error'
//       });
//     }else if(previousUsers.length > 0){
//       return res.send({
//         success: false,
//         message: 'Error: Account already exists'
//       })
//     }
//
//     //save the user
//     const newUser = new User();
//
//     newUser.firstName = firstName;
//     newUser.lastName = lastName;
//     newUser.email = email;
//     newUser.password = newUser.generateHash(password);
//
//     newUser.save((err, user) =>{
//       if(err){
//         return res.send({
//           success: false,
//           message: 'Error: Server Error'
//         });
//       }
//       else{
//         return res.send({
//           success: true,
//           message: 'Signed UP'
//         });
//       }
//
//     });
//   }
//   });
// });
}
