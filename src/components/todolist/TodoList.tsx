import { Component, ChangeEvent } from 'react';
import TodoItem from './TodoItem';

interface Todo {
    id: string;
    text: string;
    checked: boolean;
}
 
interface TodoListState {
    items: Todo[];
}

class TodoList extends Component<{}, TodoListState> {
    state = {
        items: [
            { id: crypto.randomUUID(), text: 'Wash dishes', checked: false },
            { id: crypto.randomUUID(), text: 'Go to the gym', checked: true },
        ]
    };
    
    addTodo() {
        const input = document.querySelector<HTMLInputElement>('#todo');
        const text = input?.value;

        if (!text) {
            return;
        }

        this.setState({
            items: [
                ...this.state.items,
                { id: crypto.randomUUID(), text, checked: false }
            ]
        });

        input.value = '';
        input.focus();
    }

    handleToggleCheck(e: ChangeEvent<HTMLInputElement>, key: string) {
        const checked = e.target.checked;
        
        this.setState({
            items: [
                ...this.state.items.map(x => {
                    if (x.id === key) {
                        return { ...x, checked };
                    }
                    return x;
                })
            ]
        });
    }

    render() { 
        return (
            <>
            <h1>Todo List</h1>
            <input type="text" name="todo" id="todo" /> <button onClick={() => this.addTodo()}>Add</button>
            <ul>
                {this.state.items.map(item => <TodoItem key={item.id} text={item.text} checked={item.checked} onToggleCheck={(e) => this.handleToggleCheck(e, item.id)} />)}
            </ul>
            </>
        );
    }
}
 
export default TodoList;