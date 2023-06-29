import React, { ImgHTMLAttributes, PropsWithChildren, PropsWithRef, forwardRef, useEffect, useRef, useState } from "react"
import "./Diaporama.scss"

const DIAPORAMA_TAG = 'Diaporama';
const DIAPORAMA_IMAGE_TAG = 'Image';
const DIAPORAMA_IMAGE_LABEL_TAG = 'Label';

function getChildrenByDisplayName(children: any, displayName: string): any[] {
    return React.Children.map(children, (child) => {
        return child?.type?.displayName === displayName ? child : null
    }).filter(Boolean);
}

function cloneWithProps(children: any, newProps: { [k: string]: any }) {
    return React.Children.map(children, (child) => {
        return React.cloneElement(child, newProps);
    })
}

function DiaporamaFn({ children }: PropsWithChildren) {
    const images = getChildrenByDisplayName(children, DIAPORAMA_IMAGE_TAG);
    const refs = useRef<HTMLElement[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const lastIndex = images.length - 1;

    useEffect(() => {
        refs.current = refs.current.slice(0, (children as any[]).length);
    }, [children])

    useEffect(() => {
        if (refs.current) {
            refs.current[currentIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }, [currentIndex]);

    function setRef(element: (HTMLElement | null), index: number) {
        if (element) {
            refs.current[index] = element;
        }
    }

    function previous() {
        if (currentIndex === 0) {
            setCurrentIndex(lastIndex)
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    }

    function next() {
        if (currentIndex === lastIndex) {
            setCurrentIndex(0)
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    }

    return (
        <div className="diaporama relative overflow-hidden">
            <nav className="diaporama-nav absolute w-full flex justify-between z-10">
                <button onClick={() => previous()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    <span className="sr-only">Left</span>
                </button>
                <button onClick={() => next()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                    <span className="sr-only">Right</span>
                </button>
            </nav>
            <ul className="whitespace-nowrap overflow-hidden">
                {images.map((img, i) => cloneWithProps(img, { onSetRef: (el: any) => setRef(el, i) }))}
            </ul>
        </div>
    )
}

type ImageProps = {
    onSetRef?: (el: HTMLElement | null) => void
} & ImgHTMLAttributes<HTMLImageElement> & PropsWithChildren;

const Image = ({ onSetRef, children, ...props }: ImageProps) => {
    const label = getChildrenByDisplayName(children, DIAPORAMA_IMAGE_LABEL_TAG);

    return (
        <li className="inline-block w-full relative" ref={onSetRef}>
            <img {...props} />
            {label}
        </li>
    )
}

const ImageLabel = ({ children }: PropsWithChildren) => {
    return (
        <div className="diaporama-image-label text-white absolute">{children}</div>
    )
}


DiaporamaFn.displayName = DIAPORAMA_TAG
Image.displayName = DIAPORAMA_IMAGE_TAG
ImageLabel.displayName = DIAPORAMA_IMAGE_LABEL_TAG

export const Diaporama = Object.assign(DiaporamaFn, {
    [DIAPORAMA_IMAGE_TAG]: Object.assign(Image, { [DIAPORAMA_IMAGE_LABEL_TAG]: ImageLabel })
})