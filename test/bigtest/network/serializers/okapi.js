import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serialize(...args) {
    return ApplicationSerializer.prototype.serialize.apply(this, args);
  }
});
