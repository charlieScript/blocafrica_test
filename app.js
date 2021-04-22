const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// database connection
const dbURI = 'mongodb://localhost:27017/todos';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => app.listen(PORT, console.log(`server started on port ${PORT}`)))
  .catch((err) => console.log(err));

// CRUD API FOR TODO LIST
// tod schema
const todoSchema = new mongoose.Schema(
  {
    todoID: {
      type: Number,
      required: true,
      unique: true,
    },
    todo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Todo = mongoose.model('todo', todoSchema);

/**
 * @description GET /todos
 * GETS ALL TODOS
 */
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find({}).select('todoID todo');
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'an error occured getting data' });
  }
});

/**
 * @description post /todos
 * POST A TODO 
 * BODY { 
 *    "todoID": 
 *  }
 */
app.post('/todos', async (req, res) => {
  try {
    if (!req.body.todo) {
      return res.status(400).json({ message: 'please add the required body' });
    }
    const { todo, todoID } = req.body;
    await Todo.create({
      todo,
      todoID,
    });
    res.status(200).json({ message: 'todo added!' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'an error occured posting data' });
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    if (!req.params.id && !req.body.todo) {
      return res
        .status(400)
        .json({ message: 'please add the required parameter' });
    }
    const id = req.params;
    const todo = req.body.todo;
    await Todo.findOneAndUpdate(id, {
      todo: todo,
    });
    res.status(200).json({ message: 'todo updated!' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'an error occured updating data' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ message: 'please add the required parameter' });
    }
    const id = req.params.id;
    await Todo.findOneAndDelete({ todoID: id });
    res.status(200).json({ message: 'todo deleted!' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'an error occured deleting data' });
  }
});
