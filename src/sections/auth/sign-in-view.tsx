import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------
interface Login {
  email: string;
  password: string;
}

export function SignInView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  // initialValues
  const initialValues = {
    email: '',
    password: '',
  }

  // check if the entered email is not a temporary one (mailinator.com or yopmail.com)
  const isNotMailinator = (value: string) => {
    const mailinatorRegex = /@(mailinator\.com|yopmail\.com)$/i; // Check for both mailinator.com and yopmail.com domains
    return !mailinatorRegex.test(value);
  };

  // validationSchema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format!')
      .required('Email is required!')
      .test('is-not-mailinator', 'Temporary email addresses are not allowed!', isNotMailinator),
    password: Yup.string().min(8, 'Must be 8 characters or more').required('Password is required!'),
  });

  // form submit handler
  const handleSubmit = useCallback(async (values: Login) => {
    if (values.email !== "" && values.password !== "") {
      // set store login user data and set isLoggedIn key from session storage 
      sessionStorage.setItem("data", JSON.stringify({ email: values.email, password: values.password }));
      sessionStorage.setItem("isLoggedIn", "true");
      toast.success("Login Successfully")
      router.push('/dashboard');
    }

  }, [router]);

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  })

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end" component="form" onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        name="email"
        label="Email address"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.errors.email && formik.touched.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={{ mb: 3 }}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.errors.password && formik.touched.password)}
        helperText={formik.touched.password && formik.errors.password}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box>

      {renderForm}

      {/* <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider> */}

      {/* <Box gap={1} display="flex" justifyContent="center">
        <IconButton color="inherit">
          <Iconify icon="logos:google-icon" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="eva:github-fill" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="ri:twitter-x-fill" />
        </IconButton>
      </Box> */}
    </>
  );
}
