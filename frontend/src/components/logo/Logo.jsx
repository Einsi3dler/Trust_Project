import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { Box, Link } from "@mui/material";

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {




  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 65,
        height: 65,
        display: "inline-flex",
        ...sx,
      }}
      {...other}
    >
		<img src="/assets/images/image7.jpeg" alt="Trust logo" />

    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: "contents" }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
