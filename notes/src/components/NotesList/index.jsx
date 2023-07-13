import { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import FilterInput from "../FilterInput";
import NoteButton from "../NoteButton";
import "./index.css";
import { startTransition } from "react";

function NotesList({
  notes,
  activeNoteId,
  onNoteActivated,
  onNewNotesRequested,
  onDeleteAllRequested,
}) {
  const [filterInputValue, setFilterInputValue] = useState("");
  const [filter, setFilter] = useState("");

  return (
    <div className="notes-list" style={{ position: "relative" }}>
      <div className="notes-list__filter">
        <FilterInput
          filter={filterInputValue}
          onChange={(value) => {
            setFilterInputValue(value)
            startTransition(() => {
              setFilter(value)
            })
          }}
          noteCount={Object.keys(notes).length}
        />
      </div>

      <div className="notes-list__notes">
        {Object.values(notes)
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .filter(({ text }) => {
            if (!filter) {
              return true;
            }

            return text.toLowerCase().includes(filter.toLowerCase());
          })
          .map(({ id, text, date }) => (
            <NoteButton
              key={id}
              isActive={activeNoteId === id}
              id={id}
              onNoteActivated={onNoteActivated}
              text={text}
              filterText={filter}
              date={date}
            />
          ))}
      </div>

      <div className="notes-list__controls">
        <ButtonGroup size="small">
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 1, paragraphs: 1 })}
          >
            + Note
          </Button>
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 1, paragraphs: 300 })}
          >
            + Huge
          </Button>
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 100, paragraphs: 1 })}
          >
            + 100
          </Button>
        </ButtonGroup>
        <ButtonGroup size="small">
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onDeleteAllRequested()}
          >
            Delete all
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default NotesList;
