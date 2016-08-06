import extractRouteDoc from './index';

extractRouteDoc({
  files: [__dirname + '/test.js']
});

/**
 * @typedef {!Object} TestType1
 * @property noType - anything is allowed.
 * @property {*} anything - anything is allowed.
 * @property {!*} anythingNotNull - anything is allowed except null.
 * @property {!*|string} anythingNotNullAndStrings - anything and strings.
 * @property {!string|!boolean|{test:number}} [optString] - An optional string, boolean, or object.
 * @property {!number} number - A number.
 * @property {!Array.<string>} arr - An array.
 * @property {!Array} arr2 - Another array.
 */

export default {

  /**
   * Searches for exercises in the public list.
   *
   * @GET /exercises
   * @queryParam {!Array.<string>} [tags = []] - The list of tags the exercise must have.
   * @queryParam {!Array.<number>} [catagories = []] - The list of the ids of the categories in which
   *                                                   the search shall occur.
   * @queryParam {!Array.<string>} [limit] - The upper limit on the total of items to return.
   * @queryParam {!Array.<string>} [page] - The data page count.
   * @responds 200 {{ page: !number, pageCount: !number, data: Array.<MmcExercises> }} - The list of public exercises.
   * @responds 400 {{ error: { code: 'ERR_INVALID_TAGS' } }} - The tag array is malformed.
   * @authenticated
   */
  findExercises() {},

  /**
   * Returns the list of exercises created by a given user.
   * If the requesting user is not the author of these exercises nor an admin, they will only receive public
   * exercises in their response.
   *
   * @GET /users/:uid/exercises
   * @pathParam {!number} uid - The ID of the author.
   * @responds 200 {{ page: !number, pageCount: !number, data: !Array.<MmcExercises> }} - The list of exercises
   *                                                                                     of the author.
   * @responds 404 {{ error: { code: 'ERR_USER_NOT_FOUND' } }} - No user with such id.
   * @authenticated
   */
  getByAuthor() {},

  /**
   * Creates a new exercise with the logged user as its author.
   * Logged user must be a therapist.
   *
   * @POST /exercises
   * @bodyParam {!string} name - The name of the exercise.
   * @bodyParam {!string} description - The description of the exercise.
   * @bodyParam {!string} visibility - The visibility of the exercise.
   * @bodyParam {!string} tags - The list of tags to add to the exercise.
   * @responds 201 {{ data: !MmcExercises }} - The created exercise.
   * @responds 403 {{ error: { code: 'ERR_ACCESS_DENIED' } }} - The author is not a therapist.
   * @authenticated
   */
  postExercise() {},

  /**
   * Retrieves an exercise by its ID
   *
   * @GET /exercises/:id
   * @responds 200 {{ data: !MmcExercises }} - The exercise.
   * @responds 403 {{ error: { code: 'ERR_ACCESS_DENIED' } }} - The exercise is not visible to the logged user.
   * @responds 404 {{ error: { code: 'ERR_EXERCISE_NOT_FOUND' } }} - The exercise does not exist.
   * @authenticated
   */
  getExercise() {},

  /**
   * Updated an exercise.
   * Logged user must be author or admin.
   *
   * @PATCH /exercises/:id
   * @pathParam {!number} id - The id of the exercise to update.
   * @bodyParam {!string} [name] - The new name of the exercise.
   * @bodyParam {!string} [description] - The new description of the exercise.
   * @bodyParam {!string} [visibility] - The new visibility of the exercise.
   * @bodyParam {!string} [tags] - The new list of tags to set on the exercise.
   * @responds 200 {{ data: !MmcExercises }} - The updated exercise.
   * @responds 403 {{ error: { code: 'ERR_ACCESS_DENIED' } }} - The logged user cannot edit this exercise.
   * @authenticated
   */
  updateExercise() {},

  /**
   * Deletes an exercise.
   * Logged user must be author or admin.
   *
   * @DELETE /exercises/:id
   * @pathParam {!TestType1} id - The id of the exercise to update.
   * @queryParam {!number|string} [testOptional] - The id of the exercise to update.
   * @queryParam {{ test: Array.<string>, data: boolean, hu: 'red' }} [testOptional] - The id of the exercise to update.
   * @responds 200 {{ data: true }} - The exercise was deleted.
   * @responds 403 {{ error: { code: 'ERR_ACCESS_DENIED' } }} - The logged user cannot delete this exercise.
   * @authenticated
   */
  deleteExercise(req) {}
};
