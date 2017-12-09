import React from 'react';
import Marked from 'marked';

require("./Markdown.scss");


class Markdown extends React.Component {
  constructor(props) {
    super(props);
    var initialText = "# h1 \n## h2 \n### h3";


    this.state = {
      srcInput: initialText,
      renderedText: Marked(initialText),
    };
  }

  markIt(e) {
    var markUp = Marked(e.target.value);
    this.setState({
      srcInput: e.target.value,
      renderedText: markUp
    });
  }

  render() {
    return (
      <div className="markdown">
        <div className="container">
          <textarea className="markdownInput inline" value={this.state.srcInput} onChange={this.markIt.bind(this)}>
          </textarea>
          <div id="" className="inline markdownInput mardownOutput" dangerouslySetInnerHTML={{ __html: this.state.renderedText }} />
        </div>
      </div>
    );
  }
}
export default Markdown;