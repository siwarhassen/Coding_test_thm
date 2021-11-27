const {findUserById ,UpdateUserInfo} = require('../services/user');
const fs = require('fs');
const path = require('path');
const userController = {};


/** this function allow us to find a user by id */
userController.findUserById = async (req, res) => {
    try {

      // call findUserById to retrieve user 
        const user = await findUserById(req.params.id);
      if (user) {
        // return the result to client
      return  res.send(user);
      }

     return res.status(404).json({ message: 'User with the specified Id does not exists' });
    } catch (error) {

      /**HTTP 500 Error is a generic error response that is returned by the server */
    return res.status(500).json({ message: error.message });
    }
  };

/** Update a user identified by the id in the request*/
userController.updateUser = async (req, res) => {
    try {
      /**retrieve user with a specific id from database */
        const user = await findUserById(req.params.id);
        const url = req.protocol + '://' + req.get('host');

        /** if the user exists in the database*/
        if(user)
        {    // the change to be made.
           const {firstname,lastname,country,city,email,phonenumber,email_alert,sms_alert} = req.body;
              
             const DataToUpdate = {
                first_name: firstname ? firstname : null,
                last_name:lastname? lastname : null,
                country: country ? country : null,
                city: city ? city : null,
                phone_number:phonenumber ? phonenumber : null,
                email_alert:email_alert ? email_alert : false,
                sms_alert:sms_alert ? sms_alert : false,
               
          };
          /**if the user upload his photo */
          if(req.file!=undefined)
          { DataToUpdate.photo=req.file.path ;
            
          }
           /**call UpdateUserInfo to Save changes in the database */
           const UpdatedUser= await UpdateUserInfo(DataToUpdate,req.params.id);

            // return a response to client
                return res.status(200).json( UpdatedUser );
        }
        else {
            return res.status(404).json({ message: error.message});
          }

      } catch (error) {
         return res.status(500).json({ message: error.message});
      }
  
  };

  module.exports = userController;