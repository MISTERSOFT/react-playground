import { Gallery } from "../../components/gallery/Gallery";
import TodoList from "../../components/todolist/TodoList";

export function HomePage() {
    return (
        <main>
            <Gallery />
            <TodoList />
        </main>
    )
}