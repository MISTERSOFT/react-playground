import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { CheckBox, TextBox } from '../form/Form';
import { CloseIcon, EditIcon, TrashIcon, ValidateIcon } from '../icons/Icons';
import { Button } from '../ui/Button';
import { Todo } from './todosReducer';

interface TodoItemProps {
    item: Todo;
    onUpdate: (newTodo: Todo) => void;
    onDelete: () => void
}
 
export default function TodoItem({ item, onUpdate, onDelete }: TodoItemProps) {
    const [editing, setEditing] = useState(false);
    const id = `input-${crypto.randomUUID()}`;

    function handleEdit() {
        setEditing(true);
    }

    function handleCancel() {
        setEditing(false);
    }

    function handleValidate() {
        const input = document.querySelector<HTMLInputElement>(`#${id}`);
        if (!input) {
            return;
        }
        onUpdate({ ...item, text: input.value });
        setEditing(false);
    }

    function handleUpdate(e: ChangeEvent<HTMLInputElement>) {
        onUpdate({ ...item, checked: e.target.checked });
    }

    return (
        <li className="text-gray-900 dark:text-white flex items-center mb-2">
            <CheckBox name="done" checked={item.checked} onChange={handleUpdate} />
            {
                editing
                ? <>
                    <TextBox id={id} name={`edit-todo-${id}`} placeholder='Todo...' className="ml-3" value={item.text} />
                    <Button styleType='success' className='flex items-center ml-4' onClick={handleValidate}>
                        Validate
                        <ValidateIcon size={4} className='ml-2' />
                    </Button>
                    <Button styleType='danger' className='flex items-center' onClick={handleCancel}>
                        Cancel
                        <CloseIcon size={4} className='ml-2' />
                    </Button>
                </>
                : <>
                    <span className="ml-3">{item.text}</span>
                    <Button className='flex items-center ml-4' onClick={handleEdit}>
                        Edit
                        <EditIcon size={4} className='ml-2' />
                    </Button>
                    <Button styleType='danger' className='flex items-center' onClick={onDelete}>
                        Delete
                        <TrashIcon size={4} className='ml-2' />
                    </Button>
                </>
            }
        </li>
    );
}
