export default server => {
  server.get('set/:id', {}, 404);
};
