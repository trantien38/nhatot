import { FormControl, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

function InputField(props) {
  const {
    placeholder,
    label,
    control,
    name,
    errors,
    size = 'small',
    type = 'text',
    sx,
  } = props;
  const hasError = errors[name];

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.prevenDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl required={require} fullWidth size={size} sx={sx}>
          <TextField
            {...field}
            // variant="outlined"
            margin="normal"
            fullWidth
            size={size}
            type={isShowPassword ? 'text' : type}
            placeholder={placeholder}
            required
            error={!!hasError}
            helperText={hasError?.message}
          />
        </FormControl>
      )}
    />
  );
}

export default InputField;
