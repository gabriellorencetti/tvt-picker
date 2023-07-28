'use client';

import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import TVTPickerLayout from './TVTPickerLayout';

const UsernameForm = () => {
  const {
    register,
    handleSubmit,
    // formState: { isSubmitting },
    formState: { errors }
  } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    router.push(`/?username=${data.username}`);
  };

  return (
    <TVTPickerLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="username-form">
        <TextField
          label="Username"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">@</InputAdornment>
          }}
          {...register('username', { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}
        <IconButton type="submit">
          <ShuffleIcon />
        </IconButton>
      </form>
      <style jsx>
        {`
          .username-form {
            display: flex;
            justify-content: center;
            gap: 10px;
            align-items: center;
            height: 100vh;
          }
        `}
      </style>
    </TVTPickerLayout>
  );
};

export default UsernameForm;
