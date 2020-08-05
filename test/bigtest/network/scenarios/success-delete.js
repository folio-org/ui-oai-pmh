export default server => {
  server.delete('set/:id', {}, 200);
};
