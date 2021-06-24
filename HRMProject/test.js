const bcrypt = require('bcrypt');


const check = async()=>{
    let hashedPassword1 =  await bcrypt.hash("password",10);
  console.log(hashedPassword1);



bcrypt.compare("password", hashedPassword1, function(err, isMatch) {
        if (err) {
          throw err
        } else if (!isMatch) {
          console.log("Password doesn't match!")
        } else {
          console.log("Password matches!")
        }
      })

}


check();

