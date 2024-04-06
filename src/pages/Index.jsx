import { useState } from "react";
import { Box, Input, Button, List, ListItem, Checkbox, Heading, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { Reorder } from "framer-motion";

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
      setTodos([...todos, { id: Date.now(), text: inputValue, isCompleted: false, isEditing: false, editingText: inputValue }]);
      setInputValue("");
    }
  };

  const handleReorder = (newOrder) => {
    const updatedTodos = newOrder.map((item) => {
      const oldTodo = todos.find((t) => t.id === item.id);
      return { ...item, isCompleted: oldTodo.isCompleted };
    });
    setTodos(updatedTodos);
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
    <Box p={8}>
      <Heading size="5xl" mb={4}>
        Todo List
      </Heading>
      <Box display="flex" mb={4} pb={4}>
        <Input placeholder="Add a todo" value={inputValue} onChange={handleInputChange} />
        <Button onClick={handleAddTodo} ml={2} leftIcon={<FaPlus />} size="xl" colorScheme="red">
          Add
        </Button>
      </Box>
      <Reorder.Group as={List} values={todos} onReorder={handleReorder}>
        {todos.map((todo, index) => (
          <Reorder.Item key={todo.id} value={todo} whileDrag={{ backgroundColor: "gray.100" }} display="flex" alignItems="center" mb={2} p={2}>
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
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </Box>
  );
};

export default Index;
