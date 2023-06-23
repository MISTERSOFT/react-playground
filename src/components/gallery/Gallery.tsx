import { Profile } from '../profile/Profile';
import { useFetch } from '../../hooks/useFetch';
import { Loader } from '../loader/Loader';
import { GallerySkeleton } from '../ui/skeleton/GallerySkeleton';

export type Photo = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}


export function Gallery() {
    const [loading, items, error] = useFetch<Photo>('https://jsonplaceholder.typicode.com/photos?_limit=12');

    let content;
    if (loading) {
        content = <GallerySkeleton count={8} />
    } else if (error) {
        content = <div>A error occurred.</div>
    } else {
        content =
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {
                    items.map(item => (
                        <div key={item.id}>
                            <img className="h-auto max-w-full rounded-lg" src={item.thumbnailUrl} alt={item.title} />
                        </div>
                    ))
                }
            </div>;
    }


    return (
        <section>
            {content}
        </section>
    );
}
