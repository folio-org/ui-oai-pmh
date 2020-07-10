import ApplicationSerializer from './application';

const { isArray } = Array;

export default ApplicationSerializer.extend({
  serialize(...args) {
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);

    if (isArray(json.sets)) {
      return {
        sets: json.sets,
        totalRecords: json.sets.length,
      };
    }

    return json.sets;
  }
});
