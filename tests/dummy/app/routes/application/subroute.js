import Route from '@ember/routing/route';

export default class SubRouteRoute extends Route {
  model(params) {
    return {
      id: params.model_id,
      name: 'foo',
    };
  }
}
