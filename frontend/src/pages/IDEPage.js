import React, { useState } from 'react';
import Editor from '../components/IDE/Editor';
import FileTree from '../components/IDE/FileTree';
import Terminal from '../components/IDE/Terminal';
import LivePreview from '../components/IDE/LivePreview';

const IDEPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [editorContent, setEditorContent] = useState('');

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setEditorContent(file.content);
  };

  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
  };

  const files = [
    { id: '1', name: 'index.js', language: 'javascript', content: 'console.log("Hello World");' }
  ];

  return (
    <div>
      <FileTree files={files} onFileSelect={handleFileSelect} />
      <Editor language={selectedFile?.language} value={editorContent} onChange={handleEditorChange} />
      <Terminal />
      <LivePreview />
    </div>
  );
};

export default IDEPage;
