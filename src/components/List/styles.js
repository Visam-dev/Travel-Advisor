import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  titleContainer: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(42, 42, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    borderRadius: '16px',
    border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: theme.palette.mode === 'dark' ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    background: theme.palette.mode === 'dark' 
      ? 'linear-gradient(45deg, #90caf9, #f48fb1)' 
      : 'linear-gradient(45deg, #1976d2, #dc004e)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: theme.spacing(2),
  },
  titleIcon: {
    marginRight: theme.spacing(1),
    fontSize: '2rem',
    color: theme.palette.primary.main,
  },
  subtitleContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(1),
    flexWrap: 'wrap',
  },
  typeChip: {
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
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
    height: 'calc(100vh - 64px)', // Full height minus header
    display: 'flex',
    flexDirection: 'column',
    minHeight: '200vh', // Extend much further to match weather section length
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    flex: 1,
    overflow: 'auto',
    marginTop: '20px',
    paddingTop: '20px',
    paddingBottom: '300px', // Much more bottom padding to extend further down
    // Custom scrollbar styling for dark mode
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.mode === 'dark' ? '#2a2a2a' : '#f1f1f1',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.mode === 'dark' ? '#555' : '#888',
      borderRadius: '4px',
      '&:hover': {
        background: theme.palette.mode === 'dark' ? '#777' : '#666',
      },
    },
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
    flexShrink: 0, // Prevent shrinking
  },
}));