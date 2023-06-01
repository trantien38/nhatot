import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

function InputField(props) {
  const {
    readOnly,
    placeholder,
    label,
    control,
    name,
    errors,
    size = 'small',
    type = 'text',
    sx,
    InputProps,
    showClearable = false,
    handleChange,
  } = props;
  const hasError = errors[name];
  // console.log(hasError);
  // console.log(errors);
  // console.log(name);

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  console.log(readOnly);
  console.log(InputProps);
  const sxDefault = {
    fontSize: 2,
    color: 'red',
    '& label': {
      fontSize: 14,
    },
    '& svg': {
      fontSize: 18,
    },
    '& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
      padding: '8.5px !important',
    },
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <FormControl fullWidth size={size} sx={{ ...sxDefault, ...sx }}>
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
            inputProps={{
              readOnly,
            }}
            InputProps={
              InputProps
                ? // ? InputProps
                  {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                          {InputProps}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                : {
                    endAdornment:
                      type == 'password' ? (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                            {isShowPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ) : showClearable && Boolean(value) ? (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              onChange('');
                              if (handleChange) {
                                handleChange(name, '');
                              }
                            }}
                            edge="end"
                          >
                            {/* <ClearIcon /> */}
                          </IconButton>
                        </InputAdornment>
                      ) : null,
                  }
            }
          />
        </FormControl>
      )}
    />
  );
}

export default InputField;
