import { useSelector, useDispatch } from 'react-redux';
import { deleteTag } from '../redux/reducer/tagReducer';
import { getNotes } from '../redux/reducer/noteReducer';
import { setFilter } from '../redux/reducer/configReducer';
import { setPopup } from '../redux/reducer/popupReducer';

const Tag = ({ id, name }) => {
    const dispatch = useDispatch();

    const archived = useSelector(state => state.config.archived);
    const filter = useSelector(state => state.config.filter);

    const handleTagDelete = () => {
        dispatch(setPopup({
            type: 'YES_NO',
            title: 'Wait!',
            content: 'This action will delete the tag and remove it from any note associated with it. Are you sure?',
            callbacks: [
                () => dispatch(deleteTag(id)),
                () => dispatch(setFilter('REFRESH')),
                () => dispatch(getNotes({ archived, filter })),
            ]
        }));
    }
    const handleTagClick = (name) => {
        if (name !== filter) dispatch(setFilter(name));
        else dispatch(setFilter(''));
    }

    return (
        <li 
            className={`flex flex-row justify-between items-center h-[50px] cursor-pointer pl-6 pr-6 ${ filter === name ? 'font-bold' : null } `}
            value={ name } 
        >
            <div className='flex flex-row w-[200px]' onClick={ () => handleTagClick(name) }>
                <span className="material-symbols-outlined text-[20px] mr-2">label</span>
                { name } 
            </div>
            <button onClick={ handleTagDelete }>
                <span className="material-symbols-outlined text-[18px] mt-[2px]">delete</span>
            </button> 
        </li>
    );
};

export default Tag;
