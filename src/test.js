import convert from './index';

convert({
  files: [`${__dirname}/test.js`]
})
  .then(x => console.log(JSON.stringify(x, null, 2)))
  .catch(x => console.error(x));

export default {

  /**
   * Updates some guy's password
   *
   * @deprecated
   *
   * @PUT /user/:user/password
   * @body {!string} password - The new password.
   * @pathParam {!number} user - The user ID.
   * @queryParam {!Array.<string>} [someParam] - An array of strings.
   *
   * @responds {!string} 200 - The new password hash.
   */
  updateChallengeStatus() {}
};
