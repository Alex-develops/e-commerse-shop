const fs = require('fs');
const crypto = require('crypto');
const util =require('util'); 
const Repository = require ('./repository');

const scrypt = util.promisify(crypto.scrypt); //new version that returns a promise, instead of callback

class UsersRepository extends Repository {

  async comparePasswords(saved, supplied) {
    //saved -> pass saved in our db. 'hashed.salt'
    //supplied -> pass given us by the user when trying to sign in
    const [hashed, salt] = saved.split('.');
    const hashedSuppliedBuffer = await scrypt(supplied, salt, 64);
    
    return hashed ===hashedSuppliedBuffer.toString('hex');
      }
      async writeAll(records) {
        await fs.promises.writeFile(
          this.filename,
          JSON.stringify(records, null, 2)
        );
      }
  
  async create(attrs) {
    attrs.id = this.randomId();

    const salt = crypto.randomBytes(8).toString('hex');
    const hashed = await scrypt (attrs.password, salt, 64);

    const records = await this.getAll();
    
    const record = {
      ...attrs,
      password: `${hashed.toString('hex')}.${salt}`
    };
    records.push(record);
    await this.writeAll(records);

    return record;
  }
 
}

module.exports = new UsersRepository('users.json');

// module.exports = UsersRepository; Exporting the entire class is not a good approach

 //Another file ...
// const UsersRepository = require('./users');
// const repo = new UsersRepository('users.json');

//Yet another file...
// const UsersRepository = require('./users');
// const repo = new UsersRepository('user.json'); if we make a typo we create 2 seraparate data sets

//Better exporting an instance of the class and we can start calling on methods immediatelly
//module.exports = new UsersRepository('users.json');
// const repo = require ('./users');
// repo.getAll();

//router 

