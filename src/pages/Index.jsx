import { useState } from "react";
import { Box, Input, Button, List, ListItem, Checkbox, Heading, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);

  const handleTodoDoubleClick = (index) => {
    setTodos(todos.map((todo, i) => (i === index ? { ...todo, isEditing: true, editingText: todo.text } : todo)));
  };

  const handleEditingInputChange = (event, index) => {
    setTodos(todos.map((todo, i) => (i === index ? { ...todo, editingText: event.target.value } : todo)));
  };

  const handleEditingInputBlur = (index) => {
    setTodos(todos.map((todo, i) => (i === index ? { ...todo, isEditing: false, text: todo.editingText } : todo)));
  };

  const handleEditingInputKeyDown = (event, index) => {
    if (event.key === "Enter") {
      handleEditingInputBlur(index);
    }
  };
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { text: inputValue, isCompleted: false, isEditing: false, editingText: inputValue }]);
      setInputValue("");
    }
  };

  const handleCheckboxChange = (index) => {
    const newTodos = todos.map((todo, todoIndex) => {
      if (todoIndex === index) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  return (
    <Box p={4}>
      <Heading size="5xl" mb={4}>
        Todo List
      </Heading>
      <Box display="flex" mb={4}>
        <Input placeholder="Add a todo" value={inputValue} onChange={handleInputChange} />
        <Button onClick={handleAddTodo} ml={2} leftIcon={<FaPlus />} size="xl" colorScheme="red">
          Add
        </Button>
      </Box>
      <List>
        {todos.map((todo, index) => (
          <ListItem key={index} display="flex" alignItems="center" mb={2}>
            <Checkbox isChecked={todo.isCompleted} onChange={() => handleCheckboxChange(index)} mr={2} size="lg" />
            {todo.isEditing ? (
              <Input value={todo.editingText} onChange={(event) => handleEditingInputChange(event, index)} onBlur={() => handleEditingInputBlur(index)} onKeyDown={(event) => handleEditingInputKeyDown(event, index)} size="lg" />
            ) : (
              <Text as={todo.isCompleted ? "s" : "span"} fontSize="2xl" onDoubleClick={() => handleTodoDoubleClick(index)}>
                {todo.text}
              </Text>
            )}
            <Button
              onClick={() => {
                const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
                setTodos(newTodos);
              }}
              ml={2}
              size="lg"
              colorScheme="red"
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;
