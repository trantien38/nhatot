import React from 'react';
import SunEditor from 'suneditor-react';

import {
  align,
  blockquote,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  image,
  lineHeight,
  link,
  list,
  paragraphStyle,
  table,
  template,
  textStyle,
} from 'suneditor/src/plugins';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
function Editor({ handleChangeDescription }) {
  return (
    <SunEditor
      onChange={handleChangeDescription}
      setOptions={{
        plugins: [
          align,
          font,
          fontColor,
          blockquote,
          fontSize,
          formatBlock,
          hiliteColor,
          horizontalRule,
          lineHeight,
          list,
          paragraphStyle,
          table,
          template,
          textStyle,
          image,
          link,
        ],
        buttonList: [
          ['undo', 'redo'],
          ['font', 'fontSize', 'formatBlock'],
          ['paragraphStyle'],
          ['blockquote'],
          ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
          ['fontColor', 'hiliteColor'],
          ['removeFormat'],
          ['outdent', 'indent'],
          ['align', 'horizontalRule', 'list', 'lineHeight'],
          ['table', 'link', 'image'],
          ['codeView', 'preview', 'print'],
          ['save'],
        ],
        formats: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        font: ['Arial', 'Open Sans ', 'Moon Dance', 'Lato', 'Quicksand', 'Roboto'],
        height: '200px',
      }}
    />
  );
}

export default Editor;
