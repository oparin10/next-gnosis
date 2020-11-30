import { nanoid } from "nanoid";
import { db, fieldValues, storage } from "../../../firebase/index";

const firestore = db;

const docRefs = {
  course_levels: firestore.collection("courseLevels"),
  course_areas: firestore.collection("courseAreas"),
  courses: firestore.collection("courses"),
};

export const ACTION_TYPE = {
  ADD_LEVEL_START: "ADD_LEVEL_START",
  ADD_LEVEL_SUCCESS: "ADD_LEVEL_SUCESS",
  ADD_LEVEL_FAIL: "ADD_LEVEL_FAIL",
  // ------------------------------- \\
  GET_LEVEL_START: "GET_LEVEL_START",
  GET_LEVEL_SUCCESS: "GET_LEVEL_SUCCESS",
  GET_LEVEL_FAIL: "GET_LEVEL_FAIL",
  // ------------------------------- \\
  ADD_AREA_START: "ADD_AREA_START",
  ADD_AREA_SUCCESS: "ADD_AREA_SUCCESS",
  ADD_AREA_FAIL: "ADD_AREA_FAIL",
  // ------------------------------- \\
  GET_AREA_START: "GET_AREA_START",
  GET_AREA_SUCCESS: "GET_AREA_SUCCESS",
  GET_AREA_FAIL: "GET_AREA_FAIL",
  // ------------------------------- \\
  DELETE_LEVEL_WITH_UID_START: "DELETE_LEVEL_WITH_UID_START",
  DELETE_LEVEL_WITH_UID_SUCCESS: "DELETE_LEVEL_WITH_UID_SUCCESS",
  DELETE_LEVEL_WITH_UID_FAIL: "DELETE_LEVEL_WITH_UID_FAIL",
  // ------------------------------- \\
  UPDATE_LEVEL_NAME_WITH_UID_START: "UPDATE_LEVEL_NAME_WITH_UID_START",
  UPDATE_LEVEL_NAME_WITH_UID_SUCCESS: "UPDATE_LEVEL_NAME_WITH_UID_SUCCESS",
  UPDATE_LEVEL_NAME_WITH_UID_FAIL: "UPDATE_LEVEL_NAME_WITH_UID_FAIL",
  // ------------------------------- \\
  DELETE_AREA_WITH_UID_START: "DELETE_AREA_WITH_UID_START",
  DELETE_AREA_WITH_UID_SUCCESS: "DELETE_AREA_WITH_UID_SUCCESS",
  DELETE_AREA_WITH_UID_FAIL: "DELETE_AREA_WITH_UID_FAIL",
  // ------------------------------- \\
  ADD_COURSE_START: "ADD_COURSE_START",
  ADD_COURSE_SUCCESS: "ADD_COURSE_SUCCESS",
  ADD_COURSE_FAIL: "ADD_COURSE_FAIL",
  // ------------------------------- \\
  GET_COURSE_START: "GET_COURSE_START",
  GET_COURSE_SUCCESS: "GET_COURSE_SUCCESS",
  GET_COURSE_FAIL: "GET_COURSE_FAIL",
};

export const addNewCourse = (
  courseName,
  courseSlug,
  courseArea,
  courseLevel,
  courseSyllabus,
  courseEmec,
  courseImage,
  courseDuration,
  courseDescription
) => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPE.ADD_COURSE_START });

    const UIDSuffix = nanoid(5);

    storage
      .ref()
      .child(`images/emec/${courseSlug + UIDSuffix}-emec.png`)
      .putString(courseEmec, "data_url")
      .then((imageResultEmec) => {
        imageResultEmec.ref
          .getDownloadURL()
          .then((emecResult) => {
            storage
              .ref()
              .child(`images/courses/${courseSlug + UIDSuffix}.png`)
              .putString(courseImage, "data_url")
              .then((courseImageSuccess) => {
                courseImageSuccess.ref
                  .getDownloadURL()
                  .then((courseImageLinkFinal) => {
                    docRefs.courses
                      .add({
                        uid: nanoid(),
                        course_image: courseImageLinkFinal,
                        course_emec: emecResult,
                        course_slug: courseSlug,
                        course_area: courseArea,
                        course_syllabus: courseSyllabus,
                        course_duration: courseDuration,
                        course_name: courseName,
                        course_level: courseLevel,
                        course_description: courseDescription,
                      })
                      .then((courseSuccessResult) => {
                        console.log("fish");
                        dispatch({ type: ACTION_TYPE.ADD_COURSE_SUCCESS });
                      })
                      .catch((error) =>
                        dispatch({
                          type: ACTION_TYPE.ADD_COURSE_FAIL,
                          error: error.message,
                        })
                      );
                  })
                  .catch((error) =>
                    dispatch({
                      type: ACTION_TYPE.ADD_COURSE_FAIL,
                      error: error.message,
                    })
                  );
              })
              .catch((error) =>
                dispatch({
                  type: ACTION_TYPE.ADD_COURSE_FAIL,
                  error: error.message,
                })
              );
          })
          .catch((error) =>
            dispatch({
              type: ACTION_TYPE.ADD_COURSE_FAIL,
              error: error.message,
            })
          );
      })
      .catch((error) =>
        dispatch({
          type: ACTION_TYPE.ADD_COURSE_FAIL,
          error: error.message,
        })
      );
  };
};

export const addNewArea = (areaName, areaLevel) => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPE.ADD_AREA_START });

    docRefs.course_areas
      .add({
        uid: nanoid(),
        course_area_name: areaName,
        course_area_level: areaLevel,
      })
      .then((doc) => {
        dispatch({
          type: ACTION_TYPE.ADD_AREA_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: ACTION_TYPE.ADD_AREA_FAIL,
          error: error.message,
        });
      });
  };
};

export const getCourses = () => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPE.GET_COURSE_START });

    try {
      docRefs.courses.onSnapshot((coursesResult) => {
        let coursesArray = [];

        coursesResult.forEach((course) => {
          coursesArray.push(course.data());
        });

        dispatch({
          type: ACTION_TYPE.GET_COURSE_SUCCESS,
          payload: coursesArray,
        });
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.GET_COURSE_FAIL,
        error: error.message,
      });
    }
  };
};

export const getAreas = () => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPE.GET_AREA_START });

    try {
      docRefs.course_areas.onSnapshot((result) => {
        let courseAreasArray = [];

        result.forEach((doc) => {
          courseAreasArray.push(doc.data());

          // console.log(doc.metadata);;
          // console.log("Read the data");
        });

        dispatch({
          type: ACTION_TYPE.GET_AREA_SUCCESS,
          payload: courseAreasArray,
        });
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.GET_AREA_FAIL,
        error: error.message,
      });
    }
  };
};

export const addNewLevel = (courseLevelName) => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPE.ADD_LEVEL_START });

    docRefs.course_levels
      .add({
        uid: nanoid(),
        course_level_name: courseLevelName,
      })
      .then((doc) => {
        dispatch({
          type: ACTION_TYPE.ADD_LEVEL_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: ACTION_TYPE.ADD_LEVEL_FAIL,
          error: error.message,
        });
      });
  };
};

export const getLevels = () => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPE.GET_LEVEL_START });

    try {
      docRefs.course_levels.onSnapshot((result) => {
        let courseLevelsArray = [];

        result.forEach((doc) => {
          courseLevelsArray.push(doc.data());
        });

        dispatch({
          type: ACTION_TYPE.GET_LEVEL_SUCCESS,
          payload: courseLevelsArray,
        });
      });
    } catch (error) {
      dispatch({ type: ACTION_TYPE.GET_LEVEL_FAIL, error: error.message });
    }
  };
};

export const deleteAreaWithUID = (uid) => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPE.DELETE_AREA_WITH_UID_START });

    docRefs.course_areas
      .where("uid", "==", uid)
      .get()
      .then((result) => result.forEach((doc) => doc.ref.delete()))
      .then(() => {
        dispatch({ type: ACTION_TYPE.DELETE_AREA_WITH_UID_SUCCESS });
      })
      .catch((error) => {
        dispatch({
          type: ACTION_TYPE.DELETE_AREA_WITH_UID_FAIL,
          error: error.message,
        });
      });
  };
};

// Fix this to throw an error if it cant find an UID that matches
export const deleteLevelWithUID = (uid) => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPE.DELETE_LEVEL_WITH_UID_START });

    docRefs.course_levels.where("uid", "==", uid).onSnapshot((doc) => {
      doc.forEach((unique_doc) => {
        unique_doc.ref
          .delete()
          .then(() => {
            dispatch({ type: ACTION_TYPE.DELETE_LEVEL_WITH_UID_SUCCESS });
          })
          .catch((error) => {
            dispatch({
              type: ACTION_TYPE.DELETE_LEVEL_WITH_UID_FAIL,
              error: error.message,
            });
          });
      });
    });
  };
};

export const updateLevelNameWithUID = (uid, newCourseLevelName) => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPE.UPDATE_LEVEL_NAME_WITH_UID_START });

    docRefs.course_levels
      .where("uid", "==", uid)
      .get()
      .then((result) => {
        result.forEach((doc) => {
          doc.ref.update({
            course_level_name: newCourseLevelName,
          });
        });
      })
      .then(() => {
        dispatch({ type: ACTION_TYPE.UPDATE_LEVEL_NAME_WITH_UID_SUCCESS });
      })
      .catch((error) => {
        dispatch({
          type: ACTION_TYPE.UPDATE_LEVEL_NAME_WITH_UID_FAIL,
          error: error.message,
        });
      });
  };
};
