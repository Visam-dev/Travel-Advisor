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
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(42, 42, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      color: theme.palette.text.primary,
      '&:focus': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(42, 42, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.2)',
      },
    },
    '& .MuiOutlinedInput-root': {
      height: '40px',
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(42, 42, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(42, 42, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.2)',
      },
      '&.Mui-focused': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(42, 42, 42, 1)' : 'rgba(255, 255, 255, 1)',
        border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(0, 0, 0, 0.3)',
        boxShadow: theme.palette.mode === 'dark' ? '0 0 20px rgba(255, 255, 255, 0.1)' : '0 0 20px rgba(0, 0, 0, 0.1)',
      },
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.text.secondary,
      '&.Mui-focused': {
        color: theme.palette.text.primary,
      },
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.text.secondary,
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
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height: '75vh', 
    overflow: 'auto',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  formControlsWrapper: {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(42, 42, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '12px',
    border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: theme.palette.mode === 'dark' ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
}));