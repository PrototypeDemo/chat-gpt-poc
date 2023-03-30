import React, { useState } from "react";
import ReactQuill from "react-quill";
import QuillEditorToolBar, {
  modules,
  formats,
} from "../QuillEditorToolBar/QuillEditorToolBar";
import "react-quill/dist/quill.snow.css";

import { Container } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import "./QuillEditor.css";
import axios from "axios";

function QuillEditor() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEditorChange = (content, delta, source, editor) => {
    setResponse(editor.getHTML());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      // .post("http://localhost:5555/chat", { prompt })
      .post("/chat", { prompt })
      .then((res) => {
        setResponse(res.data);
        // split response into an array of words
        // const words = res.data.split(" ");

        // // iterate over the array of words and display them one by one
        // words.forEach((word, index) => {
        //   setTimeout(() => {
        //     //setResponse((prevValue) => `${prevValue}` + " " + `${word}`);
        //     setResponse((prevValue) => prevValue + " " + word);
        //   }, index * 500);
        // });

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="lg">
      <Card className="quill-card">
        <CardContent className="quill-card-content">
          <form onSubmit={handleSubmit}>
            <div className="m-b-15">
              <TextField
                label="Write your question here and click send icon"
                placeholder="Enter your question..."
                multiline
                fullWidth
                maxRows={2}
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="generate answer"
                        edge="end"
                        color="primary"
                        type="submit"
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSubmit(event);
                  }
                }}
              />
            </div>
          </form>
          <div className="text-editor">
            <QuillEditorToolBar />
            <ReactQuill
              theme="snow"
              value={loading ? "loading..." : response}
              onChange={handleEditorChange}
              placeholder={"Answer will come here..."}
              modules={modules}
              formats={formats}
            />
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

export default QuillEditor;
