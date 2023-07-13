import { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/mode/markdown/markdown";
import "codemirror/lib/codemirror.css";
import "./index.css";
import { debounce } from 'lodash'

function NoteEditor({ notes, activeNoteId, saveNote }) {
  const currentNote = notes[activeNoteId];
  const textareaRef = useRef();
  const editorRef = useRef();

  // useEffect that syncs CodeMirror with the textarea
  useEffect(() => {
    editorRef.current = CodeMirror.fromTextArea(textareaRef.current, {
      mode: "markdown",
      lineWrapping: true,
    });

    return () => editorRef.current.toTextArea();
  }, [activeNoteId]);

  // useEffect that syncs `saveNote` with CodeMirror's `change` event
  useEffect(() => {
    if (!editorRef.current) return;

    const debouncedSaveNote = debounce((doc) => {
      saveNote({ text: doc.getValue() });
    }, 300)

    const eventListener = (doc, change) => {
      if (change.origin !== "setValue") {
        debouncedSaveNote(doc)
      }
    };

    editorRef.current.on("change", eventListener);
    return () => editorRef.current.off("change", eventListener);
  }, [saveNote]);

  return (
    <div className="note-editor" key={activeNoteId}>
      <textarea
        ref={textareaRef}
        defaultValue={currentNote.text}
        autoComplete="off"
      />
    </div>
  );
}

export default NoteEditor;
