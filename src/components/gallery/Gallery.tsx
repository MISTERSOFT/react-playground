import { Profile } from '../profile/Profile';
import { useFetch } from '../../hooks/useFetch';
import { Loader } from '../loader/Loader';

export type Photo = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}


export function Gallery() {
    const [loading, items, error] = useFetch<Photo>('https://jsonplaceholder.typicode.com/photos?_limit=10');

    const profiles = items.map(item => <Profile key={item.id} photo={item} />);

    let content;
    if (loading) {
        content = <Loader />
    } else if (error) {
        content = <div>A error occurred.</div>
    } else {
        content = profiles;
    }


    return (
        <section>
            <h1>Amazing pictures</h1>
            {content}
        </section>
    );
}
