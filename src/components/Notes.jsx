import Note from '../components/Note';
import { useSelector } from 'react-redux';

const Notes = () => {
    const notes = useSelector(state => state.notes.notes);

    return (
        <>
            { notes.length 
                ?   <div 
                        className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
                            { notes.map(( note ) => 
                                <Note key={ note.id } id={ note.id } title={ note.title } content={ note.content } tags={ note.Tags } /> ) } 
                    </div>
                :   <p className='text-lg text-center grid grid-cols-1 mt-20'>No notes found...</p>
            }
        </>
    );
};

export default Notes;
