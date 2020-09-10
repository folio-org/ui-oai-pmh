export default server => {
  server.post('sets', {}, 500);

  server.put('sets/:id', {}, 500);
};
