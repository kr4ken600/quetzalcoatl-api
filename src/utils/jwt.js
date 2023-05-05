const jwt = require('jsonwebtoken');

const generateJWT = (uid, username, role) => {
  
  const payload = {uid, username, role};
  
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '24h'
    }, (err, token) => {
      if(err){
        console.log(err);
        reject(err);
      }
  
      resolve(token);
    })
  })
}

module.exports = {
  generateJWT
}