import React from 'react';
import Marked from 'marked';

require("./scss/Form.scss");


class InputForm extends React.Component {
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
    console.log(Marked('I am using __markdown__.'));
  }

  render() {
    return (
      <div className="container">
        <textarea className="markdownInput inline" value={this.state.srcInput} onChange={this.markIt.bind(this)}>
        </textarea>
        <div id="mardownOutput" className="inline markdownInput" dangerouslySetInnerHTML={{__html: this.state.renderedText}} />
      </div>
    );
  }
}
export default InputForm;