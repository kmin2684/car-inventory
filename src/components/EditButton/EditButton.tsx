import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

interface propType {
  onClick: any
}

export default function EditButton(prop: propType) {
    return (
        <IconButton onClick={prop.onClick} aria-label="serach" sx={{ color: 'primary', fontSize: '40' }}>
          <EditIcon />
        </IconButton>
        )}