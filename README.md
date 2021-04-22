# A CRUD REST API FOR A TODO LIST

### API FUNCTIONS

- GET  `/todos`
    > gets all the todos 
- POST  `/todos`
    > ADDS A todos 
    ```JS
    BODY
    {
      "todoID": 1,
      "todo": "todo"
    }
    ```
- PUT  `/todos/:todoID`
    > update a todo list item
    ```JS
    BODY
    {
      "todo": "todo"
    }
    ```
- DELETE  `/todos/:todoID`
    > Deletes a  todo 
