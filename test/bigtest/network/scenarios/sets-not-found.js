export default server => {
  server.get('sets/:id', {}, 404);
};
