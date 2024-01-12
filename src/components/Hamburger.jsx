import { useDispatch } from 'react-redux';
import { setMobileMenu } from '../redux/reducer/configReducer';

const Hamburger = ({mobileMenu}) => {
    const dispatch = useDispatch();
    
    const handleMobileMenu = () => dispatch(setMobileMenu(mobileMenu ? false : true));

    return (
        <button onClick={ handleMobileMenu }>
            <span className="material-symbols-outlined text-[30px] mt-[2px]">
                menu
            </span>
        </button>
    );
};

export default Hamburger;
