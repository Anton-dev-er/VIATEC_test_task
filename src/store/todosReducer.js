const defaultState = {
  todos: [],
};

const INIT_TODO = "INIT_TODO";
const ADD_TODO = "ADD_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const CHANGE_STATUS_TODO = "CHANGE_STATUS_TODO";

export const todosReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INIT_TODO:
      return { ...state, todos: [...action.payload] };
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload;
          }
          return todo;
        }),
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case CHANGE_STATUS_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status;
          }
          return todo;
        }),
      };
    default:
      return state;
  }
};

export const addTodoAction = (payload) => ({ type: ADD_TODO, payload });
export const updateTodoAction = (payload) => ({ type: UPDATE_TODO, payload });
export const removeTodoAction = (payload) => ({ type: REMOVE_TODO, payload });
export const initTodoAction = (payload) => ({ type: INIT_TODO, payload });
export const changeStatusTodoAction = (payload) => ({
  type: CHANGE_STATUS_TODO,
  payload,
});
