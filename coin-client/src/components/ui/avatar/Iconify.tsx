import PropTypes, { ReactNode } from 'prop-types';
import { Icon } from '@iconify/react';
import { Box } from '@mui/material';

interface IconifyProps {
    icon: ReactNode;
    sx?: object;
}

const Iconify: React.FC<IconifyProps> = ({ icon, sx, ...other }) => {
    return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
};

Iconify.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    sx: PropTypes.object,
};

export default Iconify;
