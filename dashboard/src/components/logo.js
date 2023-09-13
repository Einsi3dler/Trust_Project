import { useTheme } from '@mui/material/styles';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  const imgStyle = {
    width: '100%',
    height: '100%',
  };

  return (
    <img
     src= "/assets/logo/m.png"
     alt='Logo'
     style={imgStyle}
    />
  );
};
