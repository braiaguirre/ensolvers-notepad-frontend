import { useSelector, useDispatch } from "react-redux";
import { clearPopup } from '../redux/reducer/popupReducer';

const Popup = () => {
    const dispatch = useDispatch();

    const {
        type,
        title,
        content,
        callbacks
    } = useSelector(state => state.popup);

    const handleClose = () => dispatch(clearPopup());
    const handleCallbacks = () => {
        callbacks.forEach(callback => callback());
        dispatch(clearPopup());
    }


    return (
        <div className='flex flex-row items-center justify-center text-center fixed z-20 bg-popupBackground w-screen h-screen'>
            <div className="flex flex-col bg-white rounded-md md:min-w-[300px] p-10 text-center items-center">
                <h3 className="mb-6 text-lg uppercase">{ title }</h3>
                <p className="mb-6">{ content }</p>
                { type === 'YES_NO'
                ?   <div className="flex flex-row space-x-2">
                        <button className='bg-white border-selected border-2 text-selected pl-4 pr-4 pt-2 pb-2 rounded-md' onClick={ handleCallbacks }>Yes</button>
                        <button className='bg-selected text-white pl-4 pr-4 pt-2 pb-2 rounded-md' onClick={ handleClose }>Cancel</button>
                    </div>
                :   type === 'ACCEPT'
                    ?   <button className='bg-selected text-white pl-4 pr-4 pt-2 pb-2 rounded-md' onClick={ handleCallbacks }>Accept</button>
                    :   null
                }
            </div>
        </div>
    );
};

export default Popup;
