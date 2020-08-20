export default server => {
  server.get('filtering-conditions', {
    setsFilteringConditions: [
      {
        name : 'location',
        values : [
          'location 1',
          'location 2',
          'location 3',
        ],
      },
    ],
  }, 200);
};
