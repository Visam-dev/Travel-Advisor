import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  chip: {
    margin: '5px 5px 5px 0',
    backgroundColor: theme.palette.mode === 'dark' ? '#404040' : '#e0e0e0',
    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? '#505050' : '#d0d0d0',
    },
  },
  subtitle: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px',
    color: theme.palette.text.secondary,
  },
  spacing: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    color: theme.palette.text.secondary,
  },
}));

