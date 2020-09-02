// typical mirage config export
// http://www.ember-cli-mirage.com/docs/v0.4.x/configuration/

export default function config() {
  this.namespace = 'oai-pmh/';

  this.get('sets/:id', ({ sets }, { params }) => {
    const set = sets.find(params.id).attrs;

    if (!set) {
      return new Response(404, { errors: 'Record is not found' });
    }

    return set;
  });

  this.post('sets', () => {});

  this.put('sets/:id', () => {});

  this.get('sets');

  this.get('filtering-conditions', () => ({
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
  }));
}
