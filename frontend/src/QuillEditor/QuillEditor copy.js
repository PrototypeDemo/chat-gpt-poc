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
//import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import "./QuillEditor.css";
import axios from "axios";
const { configuration, OpenAIApi } = require("openai");

function QuillEditor() {
  const [editorValue, setEditorValue] = useState("");
  const [promptValue, setPromptValue] = useState("");

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handlePromptChange = (event) => {
    setPromptValue(event.target.value);
  };

  const handleGenerateText = () => {
    // Call the ChatGPT API when the user clicks the "Generate Text" button
    axios
      .post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: promptValue,
          max_tokens: 1024,
          //   n: 1,
          stop: "\n",
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
        }
      )
      .then((response) => {
        // Set the value of the editor to the API response
        setEditorValue(response.data.choices[0].text);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container maxWidth="xl">
      <Card className="quill-card">
        <CardContent className="quill-card-content">
          <div className="m-b-15">
            <TextField
              label="Write your question here and click send icon"
              placeholder="Enter your question..."
              multiline
              fullWidth
              maxRows={4}
              id="prompt"
              value={promptValue}
              onChange={handlePromptChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="generate answer"
                      onClick={handleGenerateText}
                      edge="end"
                      color="primary"
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="text-editor">
            <QuillEditorToolBar />
            <ReactQuill
              theme="snow"
              value={editorValue}
              onChange={handleEditorChange}
              placeholder={"Answer will come here..."}
              modules={modules}
              formats={formats}
            />
            {/* <TextField value={editorValue} /> */}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

export default QuillEditor;
