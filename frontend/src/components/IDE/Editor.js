import React, { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';

const Editor = ({ language, value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const state = EditorState.create({
        doc: value,
        extensions: [basicSetup, javascript()]
      });

      const view = new EditorView({
        state,
        parent: editorRef.current
      });

      const updateListener = view.updateListener || ((update) => {
        if (update.docChanged) {
          onChange(view.state.doc.toString());
        }
      });

      view.updateListener = updateListener;

      return () => {
        view.destroy();
      };
    }
  }, [value, language]);

  return <div ref={editorRef} style={{ height: '500px', border: '1px solid #ccc' }} />;
};

export default Editor;
