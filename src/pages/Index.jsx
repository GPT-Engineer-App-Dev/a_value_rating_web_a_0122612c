import { useState } from "react";
import { Box, Button, Container, Heading, Input, InputGroup, InputLeftElement, List, ListItem, Stack, Text, VStack, Image, OrderedList } from "@chakra-ui/react";
import { FaArrowRight, FaSearch, FaStar } from "react-icons/fa";

// Example values
const allValues = ["Respect", "Honesty", "Integrity", "Courage", "Commitment", "Perseverance", "Responsibility", "Compassion", "Generosity", "Fairness", "Loyalty", "Excellence", "Empathy", "Gratitude", "Humility"];

const Index = () => {
  const [stage, setStage] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [matchups, setMatchups] = useState([]);
  const [currentMatchup, setCurrentMatchup] = useState(0);
  const [rankings, setRankings] = useState({});

  const filteredValues = allValues.filter((value) => value.toLowerCase().includes(search.toLowerCase()));

  const handleValueSelect = (value) => {
    if (!selectedValues.includes(value)) {
      const newValues = [...selectedValues, value];
      setSelectedValues(newValues);
      if (newValues.length === 10) {
        prepareMatchups(newValues);
      }
    }
  };

  const prepareMatchups = (values) => {
    let pairings = [];
    for (let i = 0; i < values.length; i++) {
      for (let j = i + 1; j < values.length; j++) {
        pairings.push([values[i], values[j]]);
      }
    }
    setMatchups(pairings);
    setStage(2);
  };

  const handleMatchupChoice = (winner) => {
    setRankings({
      ...rankings,
      [winner]: (rankings[winner] || 0) + 1,
    });
    if (currentMatchup < matchups.length - 1) {
      setCurrentMatchup(currentMatchup + 1);
    } else {
      setStage(3);
    }
  };

  const getRankingList = () => {
    return Object.entries(rankings)
      .sort((a, b) => b[1] - a[1])
      .map(([value]) => value);
  };

  return (
    <Container maxW="container.md" py={10}>
      {stage === 0 && (
        <VStack spacing={6}>
          <Heading>Welcome to the Value Rating App!</Heading>
          <Text>Discover what values are most important to you by rating them against each other.</Text>
          <Button rightIcon={<FaArrowRight />} colorScheme="teal" onClick={() => setStage(1)}>
            Start Rating
          </Button>
        </VStack>
      )}

      {stage === 1 && (
        <VStack spacing={4}>
          <Heading>Select Your Top 10 Values</Heading>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaSearch />} />
            <Input placeholder="Search values..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </InputGroup>
          <List spacing={2} style={{ width: "100%" }}>
            {filteredValues.map((value) => (
              <ListItem key={value} padding={2} bg={selectedValues.includes(value) ? "teal.100" : "gray.100"} onClick={() => handleValueSelect(value)} cursor="pointer" borderRadius="md">
                {value}
              </ListItem>
            ))}
          </List>
        </VStack>
      )}

      {stage === 2 && (
        <VStack spacing={6}>
          <Heading>Compare The Values</Heading>
          <Text>Which value is more important to you? Click to select.</Text>
          <Stack direction="row" spacing={4}>
            <Button flex={1} colorScheme="teal" onClick={() => handleMatchupChoice(matchups[currentMatchup][0])}>
              {matchups[currentMatchup][0]}
            </Button>
            <Text>vs</Text>
            <Button flex={1} colorScheme="teal" onClick={() => handleMatchupChoice(matchups[currentMatchup][1])}>
              {matchups[currentMatchup][1]}
            </Button>
          </Stack>
        </VStack>
      )}

      {stage === 3 && (
        <VStack spacing={6}>
          <Heading>Your Values Ranked</Heading>
          <OrderedList spacing={3}>
            {getRankingList().map((value, index) => (
              <ListItem key={index}>
                <Stack direction="row" align="center">
                  <Text fontWeight="bold">{index + 1}.</Text>
                  <Text>{value}</Text>
                  <FaStar color="#FFD700" />
                </Stack>
              </ListItem>
            ))}
          </OrderedList>
          <Button colorScheme="teal" onClick={() => setStage(0)}>
            Start Over
          </Button>
        </VStack>
      )}
    </Container>
  );
};

export default Index;
