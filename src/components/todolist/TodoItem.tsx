import { ChangeEvent } from 'react';

interface TodoItemProps {
    text: string;
    checked: boolean;
    onToggleCheck: (event: ChangeEvent<HTMLInputElement>) => void;
}
 
export default function TodoItem({ text, checked, onToggleCheck }: TodoItemProps) {
    return (
        <li>
            <input type="checkbox" name="done" checked={checked} onChange={(e) => onToggleCheck(e)} />
            {text}
        </li>
    );
}