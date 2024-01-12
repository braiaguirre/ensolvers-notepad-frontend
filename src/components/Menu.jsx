import { useDispatch, useSelector } from 'react-redux';
import { setFilter, viewArchived } from '../redux/reducer/configReducer';
import Tags from './Tags';

const Menu = () => {
    const dispatch = useDispatch();
    const archived = useSelector(state => state.config.archived)

    const handleAllNotes = () => {
        dispatch(viewArchived(false));
        dispatch(setFilter(''));
    }
    const handleArchive = () => {
        dispatch(viewArchived(true));
        dispatch(setFilter(''));
    }

    return (
        <>
            <ul className='[&>*]:pl-6 [&>*]:pr-6 [&>*]:h-[50px] cursor-pointer'>
                <li className={ `font-bold flex flex-row items-center sm:rounded-xl md:rounded-l-none md:rounded-r-xl ${ archived === false ? 'bg-selected text-white' : null } ` } onClick={ handleAllNotes }>
                    <span className="material-symbols-outlined text-[20px] mt-[2px] mr-2">description</span>
                    Notes
                </li>
                <li className={ `font-bold flex flex-row items-center sm:rounded-xl md:rounded-r-xl ${ archived === true ? 'bg-selected text-white' : null } ` } onClick={ handleArchive }>
                    <span className="material-symbols-outlined text-[20px] mt-[2px] mr-2">archive</span>
                    Archive
                </li>
            </ul>
            <Tags />
        </>
    );
};

export default Menu;