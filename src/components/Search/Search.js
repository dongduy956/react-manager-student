import { Input } from 'antd';
import className from 'classnames/bind';
import {useDispatch,useSelector} from 'react-redux'
import { searchSelector } from '~/redux';
import { searchSlice } from '~/redux/slices'
import styles from './Search.module.scss';

const cx = className.bind(styles);

const { Search } = Input;
function SearchCB() {
    const searchText=useSelector(searchSelector);
    const dispatch=useDispatch();
    const handleValueChange = (e) => {
        const value = e.target.value;
        if (value.charAt(0)===' ') return;
        dispatch(searchSlice.actions.setSearch(e.target.value));
    };
    return (
        <Search
            className={'md:ml-0 md:mr-0 mr-5 ml-5 md:basis-2/6 basis-full ' + cx('search')}
            placeholder="input search text"
            value={searchText}
            onChange={handleValueChange}
            enterButton
        />
    );
}

export default SearchCB;
