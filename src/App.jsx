import Home from './views/Home';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Popup from './components/Popup';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotesError, getNotes } from './redux/reducer/noteReducer';
import { clearTagsError, getTags } from './redux/reducer/tagReducer';
import { setFilter } from './redux/reducer/configReducer';
import { setPopup } from './redux/reducer/popupReducer';

function App() {
    const dispatch = useDispatch();

    const archived = useSelector(state => state.config.archived);
    const filter = useSelector(state => state.config.filter);
    const popup = useSelector(state => state.popup);
    const tagsError = useSelector(state => state.tags.error);
    const notesError = useSelector(state => state.notes.error);

    useEffect(() => {
        dispatch(getNotes({ archived, filter }));
        dispatch(getTags());
        if (filter === 'REFRESH') dispatch(setFilter(''));
    }, [archived, filter])

    useEffect(() => {
        if (tagsError !== '' || notesError !== '')
            dispatch(setPopup({
                type: 'ACCEPT',
                title: 'Oops!',
                content: tagsError ? tagsError : notesError ? notesError : 'An error ocurred.',
                callbacks: [
                    () => dispatch(clearTagsError()),
                    () => dispatch(clearNotesError())
                ]
            }));
    }, [tagsError, notesError])
    

    return (
        <div>
            { popup.type !== '' ? <Popup /> : null }
            <Topbar />
            <Sidebar />
            <Home />
        </div>
    );
};

export default App;