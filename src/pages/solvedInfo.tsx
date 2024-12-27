import FilterableTable from "../components/FilterableTable";
const sampleRows = [
    {
      id: 1,
      solveDate: new Date(2023, 10, 26),
      reviewDate: new Date(2023, 11, 2),
      difficulty: 'Medium',
      tags: ['Array', 'Hash Table'],
    },
    {
      id: 2,
      solveDate: new Date(2023, 10, 20),
      reviewDate: new Date(2023, 10, 27),
      difficulty: 'Easy',
      tags: ['String', 'Two Pointers'],
    },
    {
      id: 3,
      solveDate: new Date(2023, 11, 1),
      reviewDate: new Date(2023, 11, 8),
      difficulty: 'Hard',
      tags: ['Dynamic Programming', 'Bit Manipulation'],
    },
  ];
  
const SolvedInfo = () => {
  return (
    <div>
        <FilterableTable rows={sampleRows} />
    </div>
  );
}

export default SolvedInfo;