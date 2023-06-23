import { Header } from "../../components/header/Header";
import { TodoList } from "../../components/todolist/TodoList";

export function TodosPage() {
    return (
        <>
            <Header>Todo List</Header>
            <TodoList />
        </>
    )
}