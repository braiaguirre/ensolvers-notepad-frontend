import Notes from '../components/Notes';
import NewNote from '../components/NewNote';
import { useSelector } from 'react-redux';

function Home() {
    const archived = useSelector(state => state.config.archived);

    return (
        <div className='flex flex-col sm:items-center md:ml-[300px] p-6'>
            { !archived ? <NewNote /> : null }
            <Notes />
        </div>
    );
};

export default Home;
