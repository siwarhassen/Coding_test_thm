const shajs = require('sha.js');
const db = require('../sql/db');

const SECRET = process.env.SECRET || 'test-dev-secret';
/**
 * Generate hash password
 * Generate online: https://emn178.github.io/online-tools/sha256.html
 * @param {string} email
 * @param {string} password
 */
const hashPassword = (email, password) => shajs('sha256').update(`${email}${password}${SECRET}`).digest('hex');

const authenticateUser = async (email, password) => {
  const hash = hashPassword(email, password);
  const queryText = {
    text: ` SELECT s.id, s.email, s.first_name as firstName, s.last_name as lastName
              FROM users s
              WHERE email = $1 AND password = $2`,
    values: [email, hash],
  };
  try {
    const { rows } = await db.query(queryText);
    if (rows[0]) {
      const user = rows[0];
      return user;
    }
    throw (new Error('Bad credentials'));
  } catch (error) {
    throw (new Error('Bad credentials'));
  }
};



/**find user by id from database */
const findUserById = async (id) => {
  const queryText = {
    text: ` SELECT s.id, s.email, s.first_name as firstName, s.last_name as lastName,
     s.country, s.city, s.phone_number,s.photo,s.email_alert,s.sms_alert
    FROM users s
    WHERE id = $1`,
    values: [id],
  };
  try {
    const { rows } = await db.query(queryText);
    if (rows[0]) {
      return rows[0];
    }
    throw (new Error('No user with this id!'));
  } catch (error) {
    throw (new Error(error));
  }
}


/**update user */
const UpdateUserInfo = async (data ,id) => {
  /** replace the object to make postgres able to update the user(from javascript Object to postgres query) */
  let Array = [];
  let Data = [];
  let i = 1;
  for (let key in data) {
    const item = `${key} = '${data[key]}'`;
    Array.push(item);
    Data.push(data[key]);
    i++;
  }

  const informations = Array.join(', ');
    const queryText = {
      text: `UPDATE users SET ${informations} WHERE id = $1;`,
      values: [id],
    };
    try {
      const res = await db.query(queryText);
      if (res) {
        /**retrieve the user after update,we call function findUserId (in line 36) */
        return findUserById(id);
      }
      throw (new Error('Failed To Update'));
    } catch (error) {
      throw (new Error('This User Is Not Found'));
    }
  
  };



module.exports = {
  authenticateUser,
  findUserById,
  UpdateUserInfo
};
