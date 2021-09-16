
exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {user_id: 1, username: 'buttercup', password: 'green'},
        {user_id: 2, username: 'blossom', password: 'pink'},
        {user_id: 3, username: 'bubbles', password: 'blue'}
      ]);
    });
};
