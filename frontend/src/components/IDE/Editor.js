import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { python } from '@codemirror/lang-python';
import { createTheme } from '@uiw/codemirror-themes';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript'; 

const getTheme = (theme) => {
  return createTheme({
    theme: theme,
    settings: {
      background: theme === 'dark' ? '#000' : '#fff',
      foreground: theme === 'dark' ? '#fff' : '#000',
      caret: theme === 'dark' ? '#fff' : '#000',
      selection: theme === 'dark' ? '#555' : '#ddd',
      lineHighlight: theme === 'dark' ? '#333' : '#f0f0f0',
      gutterBackground: theme === 'dark' ? '#222' : '#eee',
      gutterForeground: theme === 'dark' ? '#aaa' : '#555',
    },
    styles: [
      { tag: 'comment', color: theme === 'dark' ? '#888' : '#555' },
      { tag: 'variableName', color: '#0080ff' },
      { tag: 'string', color: '#d14' },
      { tag: 'number', color: '#098' },
      { tag: 'keyword', color: '#a00' },
    ],
  });
};


const languageMap = {
  javascript: javascript(),
  html: html(),
  css: css(),
  python: python(),
};

const Editor = ({ language, value, onChange, theme }) => {
  const editorRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    console.log('EditorView theme prop changed:', theme);
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        languageMap[language] || javascript(),
        getTheme(theme),
      ],
    });

    viewRef.current = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current.dispatch({
      effects: EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChange(viewRef.current.state.doc.toString());
        }
      }),
    });

    return () => {
      if (viewRef.current) {
        console.log('Destroying EditorView');
        viewRef.current.destroy();
      }
    };
  }, [language, value, onChange, theme]);

  useEffect(() => {
    console.log('EditorView value prop changed:', value);
    if (viewRef.current) {
      viewRef.current.dispatch({
        changes: { from: 0, to: viewRef.current.state.doc.length, insert: value },
      });
    }
  }, [value]);

  useEffect(() => {
    console.log('EditorView theme prop changed:', theme);
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: EditorView.theme(getTheme(theme)),
      });
    }
  }, [theme]);

  return (
    <div
      ref={editorRef}
      style={{
        height: '500px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    />
  );
};

Editor.propTypes = {
  language: PropTypes.oneOf(['javascript', 'html', 'css', 'python']).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(['dark', 'light']),
};

Editor.defaultProps = {
  theme: 'dark',
};

export default Editor;
