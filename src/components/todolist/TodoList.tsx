import { useReducer } from 'react';
import TodoItem from './TodoItem';
import { Form, TextBox } from '../form/Form';
import { Button } from '../ui/Button';
import { Hr } from '../ui/Hr';
import { Todo, TodosActionType, todosReducer } from './todosReducer';

const initialTodos = {
    items: [
        { id: crypto.randomUUID(), text: 'Wash dishes', checked: false },
        { id: crypto.randomUUID(), text: 'Go to the gym', checked: true },
    ]
};

export function TodoList() {    
    const [state, dispatch] = useReducer(todosReducer, initialTodos);

    function addTodo() {
        const input = document.querySelector<HTMLInputElement>('#todo');
        const text = input?.value;

        if (!text) {
            return;
        }

        dispatch({ type: TodosActionType.ADD_TODO, payload: { text } });

        input.value = '';
        input.focus();
    }

    function updateTodo(newTodo: Todo) {
        dispatch({ type: TodosActionType.UPDATE_TODO, payload: newTodo })
    }

    function deleteTodo(key: string) {
        dispatch({ type: TodosActionType.DELETE_TODO, payload: { id: key } })
    }

    return (<>
        <Form>
            <TextBox className='mb-6' label='New Todo' id='todo' name='todo' placeholder='Todo...' />
            <Button onClick={() => addTodo()}>Add</Button>
        </Form>
        <Hr />
        <ul>
            {state.items.map(item =>
                <TodoItem
                    key={item.id}
                    item={item}
                    onUpdate={updateTodo}
                    onDelete={() => deleteTodo(item.id)}
                />
            )}
        </ul>
    </>);
}
