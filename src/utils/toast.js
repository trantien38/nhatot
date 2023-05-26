import { isEmpty } from 'lodash';
import { toast } from 'react-hot-toast';

export const toastMessage = {
  success: (message) => toast.success(message),
  info: (message) => toast.info(message),
  error: (message) => toast.error(message || 'Lỗi hệ thống'),
  custom: (content) => toast.custom(content),
  setErrors: (error, setError) => {
    if (!error || isEmpty(error.errors)) return toast.error(error.message || 'Lỗi hệ thống');

    for (const key in error.errors) {
      for (const err of error.errors[key]) {
        if (!setError) return;
        setError(key, { message: err.message });
      }
    }
  },
};
