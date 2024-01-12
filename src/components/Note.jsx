import Select from 'react-select'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editNote, archiveRestoreNote, deleteNote, addTagNote } from '../redux/reducer/noteReducer';
import { setFilter } from '../redux/reducer/configReducer';
import { setPopup } from '../redux/reducer/popupReducer';

const Note = ({ id, title, content, tags }) => {
    const dispatch = useDispatch();

    const [ newTitle, setNewTitle ] = useState(title);
    const [ newContent, setNewContent ] = useState(content);

    const archived = useSelector(state => state.config.archived);
    const allTags = useSelector(state => state.tags.tags);
    
    const handleTitleChange = (e) => setNewTitle(e.target.value);
    const handleContentChange = (e) => setNewContent(e.target.value);
    const handleArchiveRestore = () => dispatch(archiveRestoreNote(id));
    const handleHardDelete = () => {
        dispatch(setPopup({
            type: 'YES_NO',
            title: 'Wait!',
            content: 'This action is irreversible. Are you sure?',
            callbacks: [
                () => dispatch(deleteNote(id)),
            ]
        }));
    }
    const handleEditSave = () => dispatch(editNote({ id, title: newTitle, content: newContent }));
    const handleEnterKey = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault();
            handleEditSave();
        }
    };
    const handleTagChange = (e) => {
        dispatch(addTagNote({ id, tags: e, archived }));
        dispatch(setFilter(''));
    };

    return (
        <div className='flex flex-col justify-between m-4 w-[320px] bg-notes border-2 border-notesBorder rounded-md hover:shadow-md duration-200'>
            <textarea 
                onKeyDown={ handleEnterKey }
                onChange={ handleTitleChange }
                defaultValue={ title } 
                placeholder='Title...'
                maxLength='28'
                className='pl-4 pt-4 pr-4 font-bold text-[16px] h-[50px] overflow-hidden rounded-md bg-notes outline-none resize-none'
                onBlur={ handleEditSave }
                >
            </textarea>
            <textarea 
                onChange={ handleContentChange } 
                defaultValue={ content } 
                placeholder='Note content...'
                className='pl-4 pr-4 rounded-md bg-notes outline-none leading-6 resize-none h-[200px]'
                onBlur={ handleEditSave }>
            </textarea>
            <div className='mt-2'>
                <Select
                    isMulti
                    defaultValue={ tags?.map(tag => { return { value: tag.name, label: tag.name } } ) }
                    options={ allTags?.map(tag => { return { value: tag.name, label: tag.name } } ) }
                    onChange={ handleTagChange }
                    placeholder='Tags...'
                    className='mt-4 pl-4 pr-4 cursor-pointer'
                    styles={{
                        control: (styles) => ({
                            ...styles,
                            backgroundColor: 'transparent',
                            border: 'none',
                            outline: 'none',
                            boxShadow: 'none'
                        }),
                        option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                            ...styles,
                            backgroundColor: isSelected ? '#9d8189' : isFocused ? '#9d8189' : 'white',
                            color: isFocused ? 'white' : '#554b46',
                        }),
                        multiValueRemove: (styles) => ({
                            ...styles,
                            ':hover': {
                                backgroundColor: 'transparent',
                                color: 'black'
                            }
                        }),
                        menu: (styles) => ({
                            ...styles,
                            width: '90%'
                        })
                    }}
                />
                <div className='flex flex-row justify-center mt-4 [&>*]:p-2 space-x-2'>
                    <button onClick={ handleArchiveRestore }>
                        { archived 
                        ? 
                            <span className="material-symbols-outlined text-[20px]">unarchive</span>
                        : 
                            <span className="material-symbols-outlined text-[20px]">archive</span>
                        }
                    </button>
                    <button onClick={ handleHardDelete }>
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Note;
