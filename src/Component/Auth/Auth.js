import { useContext, useMemo, useState } from 'react';
import Lottie from 'react-lottie-player';
import HomeAnimation from '../../Assests/HomeAnimation.json';
import useForm from '../../Management/useForm';
import { BsFacebook } from 'react-icons/bs';
import { GlobalContext, GlobalDispatchContext } from '../../State/Context/GlobalContext';
import { auth,} from '../../Firebase/Config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { handlePromise } from '../../Management/handlePromise';
import { toast } from 'react-hot-toast';
import Loading from '../Loading/Loading';
import IsOnboard from './IsOnboard';

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);

  const { isAuthenticated, isLoading, isOnboarded} = useContext(GlobalContext);

  const dispatch = useContext(GlobalDispatchContext);

  const { form, onChangeHandler, resetForm } = useForm({
    email: '',
    password: '',
  });

  const authenticate = async () => {
    if (isLoginForm) {
      const [data, loginError] = await handlePromise(
        signInWithEmailAndPassword(auth, form.email, form.password)
      );
      console.log(data);
      return loginError;
    } else {
      const [data, signupError] = await handlePromise(
        createUserWithEmailAndPassword(auth, form.email, form.password)
      );
      console.log(data);
      return signupError;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'SET_LOADING',
      payload: {
        isLoading: true,
      },
    });

    let error = null;

    error = await authenticate();

    dispatch({
      type: 'SET_LOADING',
      payload: {
        isLoading: false,
      },
    });

    if (error) toast.error(error.message);
    if (!error) {
      toast.success(
        `You have successfully ${isLoginForm ? 'logged in' : 'signed up'}`
      );
    }
    resetForm();
  };

  const isDisabled = useMemo(() => {
    return !Object.values(form).every((val) => !!val);
  }, [form]);


  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="flex w-4/5 h-4/5">
        <div className="w-full h-full">
          <Lottie
            play
            loop
            animationData={HomeAnimation}
            className="w-full h-full"
          />
        </div>
        <div className="flex flex-col w-full space-y-5 ">
          <div className="relative flex flex-col w-full p-10 space-y-5 bg-white border border-gray-300">
            {isLoading && <Loading />}
            {!isAuthenticated && (
              <form
                onSubmit={submitHandler}
                className="flex flex-col items-center space-y-5"
              >
              <div className='my-3'>
                <h1 className="text-3xl text-center font-bold tracking-wider bg-gradient-to-r from-blue-700 via-red-600  to-fuchsia-600 text-transparent bg-clip-text">Postagram</h1>
                </div>
                <input 
                  type="email"
                  name="email"
                  id="email"
                  onChange={onChangeHandler}
                  value={form.email}
                  className="w-full px-2 py-1 bg-gray-100 border rounded-sm outline-none hover:bg-transparent focus:bg-transparent placeholder:text-sm focus:border-gray-400"
                  placeholder="Email"
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={onChangeHandler}
                  value={form.password}
                  placeholder="Password"
                  className="w-full px-2 py-1 transition bg-gray-100 border rounded-sm outline-none hover:bg-transparent focus:bg-transparent placeholder:text-sm focus:border-gray-400"
                />
                <button
                  type="submit"
                  className="bg-[#0095F6] py-1 text-white active:scale-95 transform transition w-full disabled:bg-opacity-50 disabled:scale-100 rounded text-sm font-semibold"
                  disabled={isDisabled}
                >
                  {isLoginForm ? 'Log In' : 'Sign Up'}
                </button>
              </form>
            )}
              {isAuthenticated && !isOnboarded && <IsOnboard/>}
            <div className="flex items-center justify-center w-full my-5 space-x-2">
              <div className="h-[0.8px] w-full bg-slate-400" />
              <div className="text-sm font-semibold text-center text-gray-400">
                OR
              </div>
              <div className="h-[0.8px] w-full bg-slate-400" />
            </div>
            <div className="w-full h-9 flex items-center justify-center bg-blue-800 text-white font-bold tracking-wider rounded-full cursor-pointer">
              <BsFacebook className="inline-block mr-2 text-2xl" />
              <span className="text-sm font-semibold">
                {isLoginForm ? 'Log in' : 'Sign Up'} with Facebook
              </span>
            </div>
            {isLoginForm && (
              <div className="w-full text-xs text-center text-indigo-900">
                Forgotten your password?
              </div>
            )}
          </div>
          <div className="w-full py-5 space-y-5 text-sm text-center bg-white border border-gray-300">
            {isLoginForm
              ? "Don't have an account?"
              : 'Already have an account?'}
            <button
              onClick={() => setIsLoginForm((prev) => !prev)}
              className="ml-2 font-semibold text-blue-600"
            >
              {isLoginForm ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
