import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/tag';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import GithubCorner from './GithubCorner';
import Direction from './Direction';
import About from './About.mdx';
import Demo from './Demo.mdx';

function Editor(props) {
  const { children, className } = props;
  if (className === 'language-jsx') {
    return (
      <LiveProvider code={children} className="react-live">
        <LivePreview className="react-live__preview" />
        <LiveEditor className="react-live__editor" dir="ltr" />
        <LiveError className="react-live__error" dir="ltr" />
      </LiveProvider>
    );
  }
  return <code {...props} />;
}

Editor.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string.isRequired,
};

export default function App() {
  return (
    <MDXProvider components={{ code: Editor }}>
      <GithubCorner />
      <About />
      <hr />
      <Demo />
      <Direction />
    </MDXProvider>
  );
}
