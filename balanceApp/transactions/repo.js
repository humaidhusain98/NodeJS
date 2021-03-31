const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'humaid123',
  port: 5432,
})

 async function getUsers()
{
try
  {
  const results = await pool.query('SELECT * FROM users')
  return results.rows
  }
catch(ex)
{
  console.log("Some error Occured Error="+ex)
  return null;
}

}



module.exports.getUsers=getUsers;