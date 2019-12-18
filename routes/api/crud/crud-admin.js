const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

require('../../../models/Admin');
const Admin = mongoose.model('admin');

async function getAdmins(callback) {
  Admin.find({}, (err, admins) => {
    console.log(admins)
    if(!admins) {
      callback(null, 'No admins found.');
    } else {
      returnAdmins = admins.map(admin => admin.username);
      callback(returnAdmins, 'Success');
    }
  })
}

function authenticateAdmin(username, password, callback) {
  Admin.findOne({username: username}, async (err, user) => {
    if(user === null) {
      callback(null, `No user for ${username}`);
    } else {
      try {
        console.log(password)
          if(await bcrypt.compare(password, user.password)) {
            callback(user.username, 'Success');
          } 
          else {
            callback(null, 'Incorrect password');
          }
      } catch(e) {
        console.log(e);
        callback(null, 'Error');
      }
    }
  });
}

async function createNewAdmin(username, password, callback) {
  if(!username || username.length < 5) {
    callback(null, 'Invalid username');
  } else {
    if(!password || password.length < 6) {
      callback(null, 'Invalid password');
    } else {
      await bcrypt.hash(password, 10, (err, hash) => {
        if(err) {
          callback(null, 'Error crypting password');
        } else {
          Admin.create({username: username, password: hash}, (err, admin) => {
            if(err) callback(null, 'Server error');
            callback(admin.username, 'Success');
          })
        }
      })
    }
  }
}

async function modifyAdmin(oldUsername, username, password, callback) {
  try {
    await bcrypt.hash(password, 10, async (err, hash) => {
      if(err) {
        callback(null, 'Error crypting password');
      } else {
        const res = await Admin.replaceOne({ username: oldUsername }, 
          { username: username, password: hash }
        );
        if(res.n === 0) {
          callback(null, 'Not found');
        } else {
          callback(username, 'Success');
        }
      }
    });
  } catch(e) {
    console.log(e);
    callback(null, 'Error');
  }
}

module.exports = { getAdmins, authenticateAdmin, createNewAdmin, modifyAdmin };