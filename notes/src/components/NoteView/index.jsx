import "./index.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

function NoteView({ text }) {
  return <ReactMarkdown remarkPlugins={[gfm]}>{text}</ReactMarkdown>;
}

export default NoteView;
