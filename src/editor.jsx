import React, { useState, useRef } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import Editor from "draft-js-plugins-editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "draft-js-mention-plugin";
import "draft-js/dist/Draft.css";
import "draft-js-mention-plugin/lib/plugin.css";
import "draft-js-static-toolbar-plugin/lib/plugin.css";
import editorStyles from "./SimpleMentionEditor.module.css";
import mentions from "./mentions";

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "draft-js-buttons";
import createToolbarPlugin from "draft-js-static-toolbar-plugin";
import draftToHtml from "draftjs-to-html";

// Draft-JS-Toolbar plugin configuration
const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

// Draft-JS-Mentions plugin configuration
const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin, toolbarPlugin];

const getHtml = (editorState) =>
  draftToHtml(convertToRaw(editorState.getCurrentContent()));

const djEditor = (value) => {
  if (value && value !== "") {
    return EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(value))
    );
  }
  return EditorState.createEmpty();
};

const MyEditor = (props) => {
    const { placeholder, getValue, value } = props;

    // Draft-JS editor configuration
  const [editorState, setEditorState] = useState(djEditor(value));

  const [suggestions, setSuggestions] = useState(mentions);

  const editor = useRef(null);

  const handelChange = (state) => {
    setEditorState(state);
    getValue(getHtml(editorState));
  };

  // Check editor text for mentions
  const onSearchChange = ({ value }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  };

  const onAddMention = () => {};

  // Focus on editor window
  const focusEditor = () => {
    editor.current.focus();
  };

  return (
    <div onClick={() => focusEditor()} className={editorStyles.editor}>
      <Editor
        ref={editor}
        editorState={editorState}
        plugins={plugins}
        onChange={handelChange}
        placeholder={placeholder}
      />
      <MentionSuggestions
        onSearchChange={onSearchChange}
        suggestions={suggestions}
        onAddMention={onAddMention}
      />
      <Toolbar>
        {(externalProps) => (
          <React.Fragment>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <CodeButton {...externalProps} />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            <BlockquoteButton {...externalProps} />
            <CodeBlockButton {...externalProps} />
          </React.Fragment>
        )}
      </Toolbar>
    </div>
  );
};

export default MyEditor;
