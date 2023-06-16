import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const CustomersSearch = ({ onSearch }) => {
    const handleInputChange = event => {
        const searchTerm = event.target.value;
        onSearch(searchTerm);
    };

    return (
        <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Buscar Invitado"
            startAdornment={
                <InputAdornment position="start">
                    <SvgIcon color="action" fontSize="small">
                        <MagnifyingGlassIcon />
                    </SvgIcon>
                </InputAdornment>
            }
            sx={{ maxWidth: 500 }}
            onChange={handleInputChange}
        />
    );
};
