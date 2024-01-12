import Tag from '../components/Tag';
import NewTag from '../components/NewTag';
import { useSelector } from 'react-redux';

const Tags = () => {
    const tags = useSelector(state => state.tags.tags);

    return (
        <div className='mt-4'>
            <ul>
                { tags?.length 
                    ? tags.map(tag => 
                        <Tag key={ tag.id } id={ tag.id } name={ tag.name } /> ) 
                    : null 
                }
            </ul>
            <NewTag />
        </div>
    );
};

export default Tags;
