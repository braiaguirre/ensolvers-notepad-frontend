import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { postTag } from '../redux/reducer/tagReducer';

const NewTag = () => {
    const tagInput = useRef();
    const dispatch = useDispatch();
    
    const [ newTag, setNewTag ] = useState('');

    const handleInputChange = (e) => setNewTag(e.target.value);
    const handleKeyDown = (e) => e.keyCode === 13 ? handleTagAdd() : null;
    const handleTagAdd = () => {
        dispatch(postTag(newTag));
        tagInput.current.value = '';
        setNewTag('');
    }

    return (
        <div className='flex flex-row justify-between pl-6 pr-6 items-center'>
            <input 
                className='outline-none border-b-2 border-selected h-[40px] w-[200px] pr-2' 
                ref={ tagInput } 
                onChange={ handleInputChange } 
                placeholder='New tag...'
                onKeyDown={ handleKeyDown }>
            </input>
            <button className='ml-2' onClick={ handleTagAdd }>
                <span className="material-symbols-outlined text-[20px] mt-[8px]">new_label</span>
            </button>
        </div>
    );
};

export default NewTag;
