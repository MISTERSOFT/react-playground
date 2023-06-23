export enum TodosActionType {
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO
}

type AddTodoAction = { type: TodosActionType.ADD_TODO, payload: { text: string } };
type UpdateTodoAction = { type: TodosActionType.UPDATE_TODO, payload: Todo };
type DeleteTodoAction = { type: TodosActionType.DELETE_TODO, payload: { id: string } };
type TodosAction = AddTodoAction
    | UpdateTodoAction
    | DeleteTodoAction;

type TodosState = {
    items: Todo[]
}

export type Todo = {
    id: string;
    text: string;
    checked: boolean;
}

export function todosReducer(state: TodosState, action: TodosAction) {
    switch (action.type) {
        case TodosActionType.ADD_TODO:
            return {
                items: [
                    ...state.items,
                    { id: crypto.randomUUID(), text: action.payload.text, checked: false }
                ]
            };

        case TodosActionType.UPDATE_TODO:
            const updatedTodo = action.payload;
            return {
                items: [
                    ...state.items.map(x => {
                        if (x.id === updatedTodo.id) {
                            return { ...x, ...updatedTodo };
                        }
                        return x;
                    })
                ]
            };

        case TodosActionType.DELETE_TODO:
            return {
                items: state.items.filter(x => x.id !== action.payload.id)
            };

        default:
            throw Error('Unknown action: ' + action);
    }
}