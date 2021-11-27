import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import 'react-notifications-component/dist/theme.css';
import ReactNotification, { store } from 'react-notifications-component';
import AddIcon from '@material-ui/icons/Add';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import queryApi from '../../tools/queryApi';
import { fetchUser, updateUser } from '../../redux/slices/userSlice';

function Profile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const user = useSelector((state) => state.user);

  const yupSchema = Yup.object({
    firstname: Yup.string().min(3, 'Minimum 3 caracteres').required('required!'),
    lastname: Yup.string().min(3, 'Minimum 3 caracteres').required('required!'),
    country: Yup.string().min(3, 'Minimum 3 caracteres').required('required!'),
    city: Yup.string().min(3, 'Minimum 3 caracteres').required('required!'),
    email: Yup.string().email('Invalid email').required('Required'),
    phonenumber: Yup.string().required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user.firstname ? user.firstname : '',
      lastname: user.lastname ? user.lastname : '',
      country: user.country ? user.country : '',
      city: user.city ? user.city : '',
      email: user.email ? user.email : '',
      photo: user.photo,
      phonenumber: user.phone_number ? user.phone_number : '',
      email_alert: user.sms_alert,
      sms_alert: user.sms_alert,

    },
    validationSchema: yupSchema,
    onSubmit: async (values) => {
      console.log(values);
      const [c, err] = await queryApi('user/updateUser/1', values, 'PUT', true);
      if (err) {
        console.log(err);
      } else {
        store.addNotification(
          {
            title: 'success',
            message: 'user updated',
            type: 'success',
            container: 'top-right',
            insert: 'left',
            dismiss: {
              duration: 1000,
              showIcon: true,
            },
          },
        );
        dispatch(updateUser(c));
      }
      console.log(values);
    },
  });
  return (
    <div>
      <ReactNotification />
      <div className="mr-44 w-[60%] max-w-[700px] mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-5">
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full mb-8 flex items-center justify-center">
            <div className="avatar w-32 h-32 rounded-full  flex items-center justify-center relative overflow-hidden">
              <img src={user.photo} alt="" />
              <label htmlFor="photo">
                <input
                  style={{ display: 'none' }}
                  id="photo"
                  type="file"
                  name="photo"
                  onChange={(event) => {
                    formik.setFieldValue('photo', event.target.files[0]);
                  }}
                />

                <Fab
                  color="secondary"
                  size="small"
                  component="span"
                  aria-label="add"
                  variant="extended"
                >
                  <AddIcon />
                  {' '}
                  Upload photo
                </Fab>
              </label>
              ;
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">

              <TextField
                name="firstname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
                type="text"
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                id="standard-password-input"
                label="Name"
                variant="standard"
              />
              {formik.errors.firstname && formik.touched.firstname && (
                <p>{formik.errors.firstname}</p>)}
            </div>
            <div className="md:w-1/2 px-3">
              <TextField
                name="lastname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
                type="text"
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                id="sz"
                label="SurName"
                variant="standard"
              />
              {formik.errors.lastname && formik.touched.lastname && (
              <p>{formik.errors.lastname}</p>)}
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <TextField
                name="country"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                type="text"
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                id="standard-password-input"
                label="Country"
                variant="standard"
              />
              {formik.errors.country && formik.touched.country && (
              <p>{formik.errors.country}</p>)}
            </div>
            <div className="md:w-1/2 px-3">
              <TextField
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                type="text"
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                id="standard-password-input"
                label="City"
                variant="standard"
              />
              {formik.errors.city && formik.touched.city && (
              <p>{formik.errors.city}</p>)}
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <TextField
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                type="text"
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                id="standard-password-input"
                label="Email"
                variant="standard"
              />
              {formik.errors.email && formik.touched.email && (
              <p>{formik.errors.email}</p>)}
            </div>
            <div className="md:w-1/2 px-3">
              <TextField
                name="phonenumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phonenumber}
                type="text"
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                id="standard-password-input"
                label="Phone Number"
                variant="standard"
              />
              <p className="text-red text-xs italic">Ex:+3361201020 (FR)</p>
              {formik.errors.phonenumber && formik.touched.phonenumber && (
              <p>{formik.errors.phonenumber}</p>)}

            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <Checkbox
                name="email_alert"
                defaultChecked={user.email_alert}
                value={formik.values.email_alert}
                checked={formik.values.email_alert}
                onChange={formik.handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              Email Alerts
            </div>
            <div className="md:w-1/2 px-3">
              <Checkbox
                name="sms_alert"
                checked={formik.values.sms_alert}
                onChange={formik.handleChange}
              />
              Sms Alerts
            </div>
            <div className="md:w-1/2 px-3" />
          </div>
          <div className="text-right">
            <Button variant="contained" size="small" className="py-3 px-8 bg-green-400 text-white font-bold" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>

  );
}
export default Profile;
