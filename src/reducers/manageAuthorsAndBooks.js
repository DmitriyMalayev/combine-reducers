import { combineReducers } from "redux";
import uuid from "uuid";
const rootReducer = combineReducers({
  authors: authorsReducer,
  books: booksReducer,
});

export default rootReducer;

function booksReducer(state = [], action) {
  let idx;
  switch (action.type) {
    case "ADD BOOK":
      return [...state, action.book];
    case "REMOVE_BOOK":
      idx = state.findIndex((book) => book.id === action.id);
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    default:
      return state;
  }
}

function authorsReducer(state = [], action) {
  let idx;
  switch (action.type) {
    case "ADD_AUTHOR":
      return [...state, action.author];
    case "REMOVE_AUTHOR":
      idx = state.findIndex((book) => book.id === action.id);
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    case "ADD_BOOK":
      let existingAuthor = state.filter(
        (author) => author.authorName === action.book.authorName
      );
      if (existingAuthor.length > 0) {
        return state;
      } else {
        return [...state, { authorName: action.book.authorName, id: uuid() }];
      }
    default:
      return state;
  }
}

/*
CombineReducer
We're telling Redux to produce a reducer which will return a state that has both a key of books with a value equal to the return value of the booksReducer() and a key of authors with a value equal to the return value of the authorsReducer()

In the new "ADD_BOOK" case, we're checking to see if an authorName matches with the name that dispatches from the BookInput component. 
If the name already exists, state is returned unchanged. If the name is not present, it is added to the author array. 

uuid
Handles unique id generation
Since we're creating an author id from within the reducer instead of in AuthorInput.js we need to import it as well. 



*/
