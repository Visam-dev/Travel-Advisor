import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

export default makeStyles((theme) => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: theme.palette.text.primary,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
  },
  searchIcon: {
    padding: theme.spacing(0, 0.5), height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    '&&': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: '2.5rem',
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: { width: '20ch' },
    },
    padding: theme.spacing(1, 1, 1, 0), 
    paddingLeft: '2.5rem', transition: theme.transitions.create('width'), width: '100%', [theme.breakpoints.up('md')]: { width: '20ch' },
  },
  toolbar: {
    display: 'flex', justifyContent: 'space-between',
  },
  themeToggle: {
    marginLeft: theme.spacing(1),
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
      color: theme.palette.primary.main,
    },
  },
}));