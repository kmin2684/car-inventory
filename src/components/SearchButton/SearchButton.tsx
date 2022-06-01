import IconButton from '@mui/material/IconButton';
// import SearchIcon from './SearchIcon';
// import SearchIcon from '../../icons/search.svg';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchButton() {
    return (
        <IconButton aria-label="serach" sx={{ color: 'white', fontSize: '40' }}>
          <SearchIcon />
          {/* <img src={SearchIcon} style={{color:'white'}}></img> */}
        </IconButton>
        )}