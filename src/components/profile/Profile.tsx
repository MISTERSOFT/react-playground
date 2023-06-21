import { Photo } from '../gallery/Gallery'

export function Profile({ photo }: { photo: Photo }) {
    return (
        <div>
            <h3><a target='_blank' href={photo.url}>{photo.title}</a></h3>
            <img
                src={photo.thumbnailUrl}
                alt={photo.title}
            />
        </div>
    )
}