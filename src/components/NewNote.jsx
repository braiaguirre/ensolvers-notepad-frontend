import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { postNote } from '../redux/reducer/noteReducer';

const NewNote = () => {
    const [ content, setContent ] = useState('');
    const [ focus, setFocus ] = useState(false);
    const dispatch = useDispatch();
    const contentTextarea = useRef();

    const handleFocus = () => setFocus(true);
    const handleBlur = () => setFocus(false);
    const handleChange = ( e ) => setContent(e.target.value);
    const handleEnterKey = (e) => (e.keyCode === 13 && e.ctrlKey) ? handlePost() : null;
    const handlePost = () => {
        dispatch(postNote(content));
        contentTextarea.current.value = '';
        setContent('');
    };
    const handleClear = () => {
        setContent('');
        contentTextarea.current.value = '';
    };

    return (
        <div className='pl-6 flex sm:justify-start md:justify-center flex-row mb-6 mr-4'>
            <div>
                <textarea 
                    className='resize-none focus:h-[300px] h-[38px] sm:w-[175px] md:w-[500px] overflow-hidden focus:overflow-y-scroll p-2 border-b-2 border-selected outline-none focus:shadow-md duration-200' 
                    placeholder='New note...' 
                    onChange={ handleChange } 
                    onKeyDown={ handleEnterKey }
                    onFocus={ handleFocus }
                    onBlur={ handleBlur }
                    ref={ contentTextarea }>
                </textarea>
                <p className={ focus ? 'pt-2 text-selected text-center text-[12px] sm:hidden md:block' : 'hidden' }>CTRL + Enter to add.</p>
            </div>
            <div className='flex flex-row space-x-4 ml-4 mt-2'>
                <button className='flex flex-row' onClick={ handlePost }>
                    <span className="material-symbols-outlined text-[20px] mb-[1px]">add</span>
                    Add
                </button>
                <button className='flex flex-row' onClick={ handleClear }>
                    <span className="material-symbols-outlined text-[20px] mb-[1px] mr-[3px]">backspace</span>
                    Clear
                </button>
            </div>
        </div>
    );
};

export default NewNote;
