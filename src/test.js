import extractRouteDoc from './index';
import openApi from './formatters/openapi';

extractRouteDoc({
  files: [`${__dirname}/test.js`],
  formatter: openApi({
    baseDefinition: {
      info: {
        title: 'JSdoc->OpenAPI Test',
        description: 'A test formatting JSDoc api doc into an OpenAPI document.',
        version: '0.0.1'
      },
      host: 'test.github.io',
      basePath: '/v1',
      schemes: ['http']
    }
  })
})
  .then(result => console.log(JSON.stringify(result, null, 2)))
  .catch(e => console.error(e));

// /**
//  * @typedef {!Object} [ApiExercisePlan]
//  * @property {!Array.<ApiChallenge>} challenges - The list of challenges in the plan.
//  * @property {!number} [subject]
//  */

// /**
//  * @typedef {!Object} ApiDailyChallenge
//  * @property {!ApiChallengeStatus} status - The status of the challenge for the current day.
//  * @property {!ApiChallenge} challenge - The challenge.
//  */
//
// /**
//  * @typedef {!Object} ApiChallenge
//  * // TODO
//  */
//
// /**
//  * @typedef {!Object} ApiChallengeStatus
//  * // TODO
//  */

// export default {

  // /**
  //  * Returns the list of challenges that the patient still needs to do for today.
  //  *
  //  * @GET /users/:patient/daily_challenges
  //  * @pathParam {!number} patient - The ID of the patient.
  //  * @queryParam {!Date} [date] - The date for which the challenges will be retrieved.
  //  * @responds 200 {{ data: !Array.<ApiDailyChallenge> }}
  //  * @responds 404 {!ApiError}
  //  */
  // getDailyChallenges() {},
  //
  // /**
  //  * Updates the details on a challenge.
  //  *
  //  * @PATCH /users/:patient/daily_challenges/:challenge
  //  * @override PUT /users/:patient/daily_challenges/:challenge
  //  */
  // updateChallengeStatus() {},
  //
  // /**
  //  * Marks a daily challenge as completed (or skipped / partly completed).
  //  * Creates or update the daily log of the challenge.
  //  *
  //  * @PUT /challenges/:challenge
  //  * @pathParam {!number} challengeId - The ID of the challenge to complete.
  //  * @queryParam {!Date} [date] - The date for which the challenges will be retrieved.
  //  * @bodyParam {!ApiChallengeStatus} status - The status for the challenge.
  //  * @responds 200 {{ data: !ApiChallengeStatus }} The stored log information for the challenge.
  //  * @responds 404 {!ApiError} - ERR_CHALLENGE_NOT_FOUND: Invalid challenge ID.
  //  * @responds 403 {!ApiError} - ERR_ACCESS_DENIED: This challenge is not in the plan of the user.
  //  * @authenticated
  //  */
  // setChallengeStatus() {},
  //
  // /**
  //  * Creates a new exercise plan.
  //  *
  //  * @POST /exercise_plan
  //  * @bodyParam {!(string|number)} [to] - The user to whom this plan is destined. The user needs to be either the author
  //  *                                      or a patient of the author.
  //  *                                      If a string is provided,
  //  *                                        The plan will be added to the user whose email matches the value.
  //  *                                        The system will invite the user if he isn't registered.
  //  *                                      If a number is privided,
  //  *                                        The plan will be added to the user whose id matches the value.
  //  *                                      If nothing is provided,
  //  *                                        The plan will be added to the author's personal plans.
  //  * @bodyParam {!Array.<ApiChallenge>} challenges - The list of challenges of the plan.
  //  * @responds {{ data: !ApiExercisePlan }} 201 - The plan.
  //  * @responds {!ApiError} 404 - ERR_USER_NOT_FOUND: Invalid patient ID.
  //  * @consumes application/json
  //  * @produces application/json
  //  * @authenticated
  //  */
  // createExercisePlan() {}
// };

export default {

  /**
   * Creates a new account.
   * @GET /thing
   * @bodyParam {(string|boolean)} username - The name of the user.
   */
  createUser() {
  }
};
