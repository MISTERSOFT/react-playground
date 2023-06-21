import './Loader.scss';

// https://loading.io/css/

export function Loader() {
    return <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
}