// Form.tsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema } from '@/schemas/User.schemas';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import toast, { Toaster } from 'react-hot-toast';
import axios, { AxiosError } from 'axios';

const AuthComponent = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const password = watch('password');
  const [debouncedPassword] = useDebounce(password, 300);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [checkingPassword, setCheckingPassword] = useState(false);

  useEffect(() => {
    const validatePassword = async () => {
      if (!debouncedPassword) {
        setPasswordMessage('');
        return;
      }

      setCheckingPassword(true);
      try {
        const response = await axios.get(
          `/api/signup/check-password?password=${debouncedPassword}`
        );
        setPasswordMessage(response.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        setPasswordMessage(
          axiosError.response?.data.message ||
            'Error occurred during password validation.'
        );
      } finally {
        setCheckingPassword(false);
      }
    };

    validatePassword();
  }, [debouncedPassword]);

  const onSubmit = async (data: z.infer<typeof UserSchema>) => {
    toast.loading('Signing Up...');
    try {
      const response = await axios.post('/api/signup/create-account', data);
      toast.dismiss();
      toast.success('Signed Up Successfully!');
      router.push('/agent');
    } catch (error) {
      toast.dismiss();
      const axiosError = error as AxiosError<any>;
      toast.error(
        axiosError.response?.data.message ||
          'An error occurred while signing up.'
      );
    }
  };

  return (
    <div className="wrapper">
      <Toaster />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="title">
          Welcome,
          <br />
          <span>sign up to continue</span>
        </div>

        <input
          type="email"
          placeholder="Email"
          className="input"
          {...register('email')}
        />
        {errors.email && (
          <p className="error">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="input"
          {...register('password')}
        />
        {errors.password && (
          <p className="error">{errors.password.message}</p>
        )}

        {checkingPassword ? (
          <p className="feedback">Checking password strength...</p>
        ) : passwordMessage ? (
          <p className="feedback">{passwordMessage}</p>
        ) : null}

        <div className="login-with">
          <div className="button-log">
            {/* SVG icons retained */}
          </div>
          <div className="button-log">
            {/* SVG icons retained */}
          </div>
        </div>

        <button
          className="button-confirm"
          disabled={isSubmitting || checkingPassword}
        >
          {isSubmitting ? 'Signing Up…' : 'Sign Up →'}
        </button>
      </form>
    </div>
  );
};

export default AuthComponent;