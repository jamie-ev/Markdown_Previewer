// React code
var React = require('react');
var ReactDOM = require('react-dom');

// initial Editor text (template literal using ES6 syntax) using Marked.js syntax to highlight different use cases
const defaultText = `
# Welcome to my React Markdown Previewer!

Let's discuss how to use it so you can jump right in!

# This is an h1.
## This is an h2.
### And so on...

You create paragraphs simply by typing on a new line. If you want **bolded** text just wrap it in **double asterisks**.

To create links, format the display text and the URL like so: [Google](http://www.google.com).

Images are also supported and work exactly like links, but with exclamation points in front.

![Google Logo](https://lh3.googleusercontent.com/NGPrjka2ai0w7sfhxkxCwtOSh2wVyEZMdtrVxI4vrA22ebA_fcyl9PSvhTaCYXSWh0A68ZhvXhVZ4U-Nnp3v9IfoXg5o5H1tjjK97cs)

If you want to include block quotes, start each line with a greater-than symbol.
> See how easy this is?
> Anyone can do it!
> It is quite fantastic.

To make bulleted lists, use any of these three symbols like so:
* Use asterisks
- Or hyphens
+ Or even plus symbols

For numbered lists, you can use any numbers followed periods (they don't need to be in order):
1. Sample item
142. The number itself doesn't matter.
3. This is still item 3

And last of all let's cover inserting code. You can just type it inline like normal HTML. Prior versions required the use of backticks, i.e. \`<strike>sample crossout</strike>\`, but that is no longer necessary: <strike>sample crossout</strike>.

You can also type blocks of code as needed. Just make sure block level elements are separated from text by a blank line and do not have any spaces before the opening and closing HTML. Here's an example:

\`\`\`
<div>
How neat is it that you can include your own HTML and Marked properly parses it?
It is a pretty useful tool!
</div>
\`\`\`

And there you have it! Now you can edit directly in the Editor pane and see how it looks live in the Previewer pane. Thanks for stopping by and have fun!

Copyright 2019, Jamie Ev.; Marked Library from [Marked](https://marked.js.org).
`;

// parent Editor box React code
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: defaultText
    };
  }
  // handle client-side text input
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  render() {
    return (
      <div>
        {/* render to the left/top side */}
        <div id="left">
          <h1 className="main"><i className="fas fa-edit"></i> Editor</h1>
          <textarea id="editor" aria-label="entertext" value={this.state.value} onChange={this.handleChange.bind(this)} />
        </div>
        <Previewer userInput={this.state.value} /> {/* Pass the Editor text as props to the Previewer */}
      </div>
    );
  }
}

// child Preview box React code
class Previewer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // use the Marked library to convert the inputted props into HTML
    const previewText = marked(this.props.userInput);
    function previewMarkup() {
      // syntax unique to React necessary for modifying the inner HTML of an elem
      return {__html: previewText};
    }
    return (
      <div id="right"> {/* render to the right/bottom side */}
        <h1 className="main"><i className="fas fa-eye"></i> Previewer</h1>
        <div id="preview-box">
          <div id="preview" dangerouslySetInnerHTML={previewMarkup()}/>  {/* Syntax unique to React for modifying the inner HTML of an elem */}
        </div>
      </div>
    );
  }
}

// render the parent React container to the DOM
ReactDOM.render(<Editor />, document.getElementById('presentational'));

