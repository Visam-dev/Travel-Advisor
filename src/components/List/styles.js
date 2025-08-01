import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1), 
    minWidth: 180, 
    marginBottom: '30px',
    zIndex: 1000,
    position: 'relative',
    '& .MuiSelect-select': {
      height: '40px',
      padding: '8px 14px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      color: 'rgba(0, 0, 0, 0.8)',
      '&:focus': {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid rgba(0, 0, 0, 0.2)',
      },
    },
    '& .MuiOutlinedInput-root': {
      height: '40px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid rgba(0, 0, 0, 0.2)',
      },
      '&.Mui-focused': {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        border: '1px solid rgba(0, 0, 0, 0.3)',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(0, 0, 0, 0.7)',
      '&.Mui-focused': {
        color: 'rgba(0, 0, 0, 0.9)',
      },
    },
    '& .MuiSvgIcon-root': {
      color: 'rgba(0, 0, 0, 0.7)',
    },
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  container: {
    padding: '25px',
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height: '75vh', 
    overflow: 'auto',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  },
  formControlsWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '12px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
}));