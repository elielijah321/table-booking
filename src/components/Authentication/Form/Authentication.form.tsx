import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './AuthenticationForm.module.css';
import { SystemUser } from '@/types/SystemUser';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../Functionality/authService';
import { getBusinessInfo } from '@/functions/fetchEntities';
import { useForm } from '@mantine/form';

export function AuthenticationForm() {

  const navigate = useNavigate();


  interface LoginUser {
    email: string;
    password: string;
  }

    const initialValues: LoginUser = {
      email: '',
      password: '',
    };

    const form = useForm({
      mode: 'uncontrolled',
      initialValues: initialValues,
      validate: {
        // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        // email: (value) => (value.length < 2 ? 'Invalid email' : null),
        // businessName: (value) => (value.length < 2 ? 'Name' : null),
        // address: (value) => (value.length < 2 ? 'address' : null),
      },
  
    });


  function parseJwt (token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
  
  const parseLoggenInUser = (idToken: any): SystemUser => {
  
    const user: SystemUser = {
      id: "",
      username: idToken["cognito:username"],
      name: idToken.email,
      mail: idToken.email,
      createdDate: undefined
    };
  
    return user;
  }

  const handleSignIn = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const {email, password } = form.getValues();

    try {
      const session = await signIn(email, password);
      // console.log('Sign in successful', session);
      if (session && typeof session.AccessToken !== 'undefined') {
        sessionStorage.setItem('accessToken', session.AccessToken);
        if (sessionStorage.getItem('accessToken')) {

          var idToken = parseJwt(sessionStorage.idToken.toString());
          const systemUser = parseLoggenInUser(idToken);


          getBusinessInfo(systemUser.mail).then((response) => {

            if(response){
              systemUser.id = response.id;

              if (response.businessName === '') {
                // window.location.href = `/business/${response.id}/edit`;
              }else{

                window.location.href = `/${response.businessName}/Reservations`;
              }
            }
          }
          );

        } else {
          console.error('Session token was not set properly.');
        }
      } else {
        console.error('SignIn session or AccessToken is undefined.');
      }
    } catch (error) {
      console.log(`Sign in failed: ${error}`);

      var _error = `${error}`;

      if(_error.includes("NotAuthorizedException")){

        // showToast(toastRef, "Incorrect username or password.", false);

      }else{
        // showToast(toastRef, "Sign in failed", false);
      }
    }
  };

  const handleSignUp = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // if (password !== confirmPassword) {
    //   showToast(toastRef, "Passwords do not match", false);
    //   return;
    // }
    // try {
    //   await signUp(email, password);
    //   navigate('/confirm', { state: { email } });
    // } catch (error) {
    //   showToast(toastRef, "Sign up failed", false);
    //   console.log(`Sign up failed: ${error}`);
    // }
  };

  const handleForgotPassword = () => {

    // navigate('/forgot-password', { state: { email } });
  }



  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Mantine!
        </Title>

        <TextInput
                  label="Email address"
                  placeholder="hello@gmail.com"
                  withAsterisk
                  {...form.getInputProps('email')}
                />


        <PasswordInput label="Password" placeholder="Your password" mt="md" withAsterisk size="md" {...form.getInputProps('password')} />
        {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
        <Button fullWidth mt="xl" size="md" onClick={e => handleSignIn(e)}>
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'> href="#" fw={700} onClick={(event) => event.preventDefault()}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}