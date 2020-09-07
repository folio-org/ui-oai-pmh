export default server => {
  server.post('sets', {}, 422);

  server.put('sets/:id', {}, 422);
};
