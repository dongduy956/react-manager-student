import { Input } from 'antd';
import className from 'classnames/bind';
import { setSearchText, useStore } from '~/store';
import styles from './Search.module.scss';

const cx = className.bind(styles);

const { Search } = Input;
function SearchCB() {
    const { reduce } = useStore();
    const [state, dispatch] = reduce;
    const handleValueChange = (e) => {
        const value = e.target.value;
        if (value.charAt(0)===' ') return;
        dispatch(setSearchText(e.target.value));
    };
    return (
        <Search
            className={'md:ml-0 md:mr-0 mr-5 ml-5 md:basis-2/6 basis-full ' + cx('search')}
            placeholder="input search text"
            value={state.searchText}
            onChange={handleValueChange}
            enterButton
        />
    );
}

export default SearchCB;
