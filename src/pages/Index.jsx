import { useState } from "react";
import { Box, Input, Button, List, ListItem, Checkbox } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { text: inputValue, isCompleted: false }]);
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
      <Box display="flex" mb={4}>
        <Input placeholder="Add a todo" value={inputValue} onChange={handleInputChange} />
        <Button onClick={handleAddTodo} ml={2} leftIcon={<FaPlus />}>
          Add
        </Button>
      </Box>
      <List>
        {todos.map((todo, index) => (
          <ListItem key={index} display="flex" alignItems="center" mb={2}>
            <Checkbox isChecked={todo.isCompleted} onChange={() => handleCheckboxChange(index)} mr={2} />
            <Box as={todo.isCompleted ? "s" : "span"}>{todo.text}</Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;
