import { FormControl, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

function InputField(props) {
  const { placeholder, label, control, name, errors, size = 'small', type = 'text', sx } = props;
  const hasError = errors[name];
  // console.log(hasError);
  // console.log(errors);
  // console.log(name);

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
      render={({ field: { value, onChange } }) => (
        <FormControl fullWidth size={size} sx={sx}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={(e) => {
              const value = e.target.value;

              onChange(value);
            }}
            label={label}
            size={size}
            type={isShowPassword ? 'text' : type}
            placeholder={placeholder}
            value={value}
            error={!!hasError}
            helperText={hasError?.message}
          />
        </FormControl>
      )}
    />
  );
}

export default InputField;
