import { createAction } from "@reduxjs/toolkit";
import fakeApi from "../../utils/fakeApi";

const updatePublicStatus = (noteId, status) => async (dispatch) => {
  await fakeApi.setPublicStatus(status);
  dispatch(setNotePublicStatus(noteId, status));
};

const updatePublishedDate = (noteId) => async (dispatch) => {
  const publishedDate = await fakeApi.getPublishedDate();
  dispatch(setNotePublishedDate(noteId, publishedDate.toLocaleTimeString()));
};

export const publishNote = (noteId) => async (dispatch) => {
  dispatch(setMetadataUpdating(true));

  await Promise.all([
    dispatch(updatePublicStatus(noteId, true)),
    dispatch(updatePublishedDate(noteId)),
  ]);

  dispatch(setMetadataUpdating(false));
};

export const unpublishNote = (noteId) => async (dispatch) => {
  dispatch(setMetadataUpdating(true));

  await dispatch(updatePublicStatus(noteId, false));

  dispatch(setMetadataUpdating(false));
};

const setMetadataUpdating = createAction(
  "notes/setMetadataUpdating",
  (isUpdating) => {
    return {
      payload: {
        isUpdating,
      },
    };
  }
);

const setNotePublicStatus = createAction(
  "notes/setPublicStatus",
  (noteId, status) => {
    return {
      payload: {
        noteId,
        status,
      },
    };
  }
);

const setNotePublishedDate = createAction(
  "notes/setPublishedDate",
  (noteId, publishedDate) => {
    return {
      payload: {
        noteId,
        publishedDate,
      },
    };
  }
);

const initialState = {
  isUpdating: false,
  publicity: {},
  publishedDate: {},
};

const noteMetadataReducer = (noteMetadata = initialState, action) => {
  if (action.type === setMetadataUpdating.toString()) {
    return {
      ...noteMetadata,
      isUpdating: action.payload.isUpdating,
    };
  }

  if (action.type === setNotePublicStatus.toString()) {
    return {
      ...noteMetadata,
      publicity: {
        ...noteMetadata.publicity,
        [action.payload.noteId]: action.payload.status,
      },
    };
  }

  if (action.type === setNotePublishedDate.toString()) {
    return {
      ...noteMetadata,
      publishedDate: {
        ...noteMetadata.publicity,
        [action.payload.noteId]: action.payload.publishedDate,
      },
    };
  }

  return noteMetadata;
};

export default noteMetadataReducer;
