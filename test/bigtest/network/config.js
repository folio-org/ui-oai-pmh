// typical mirage config export
// http://www.ember-cli-mirage.com/docs/v0.4.x/configuration/
export default function config() {
  this.namespace = 'oai-pmh/';

  this.get('set/:id', ({ sets }, { params }) => {
    const set = sets.find(params.id).attrs;

    if (!set) {
      return new Response(404, { errors: 'Record is not found' });
    }

    return set;
  });

  this.post('set', () => {});

  this.put('set/:id', () => {});
}
