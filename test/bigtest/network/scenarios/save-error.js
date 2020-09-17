const response = {
  errors : [
    {
      type : 'notUnique',
      parameters : [
        {
          key : 'name',
          value : 'value',
        },
      ],
    },
  ],
};

export default server => {
  server.post('sets', response, 422);

  server.put('sets/:id', response, 422);
};
