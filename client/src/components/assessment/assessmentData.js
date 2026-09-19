const assessmentData = {
  HTML: [
      {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correctAnswer: "<a>"
  },
  {
    question: "Which tag is used to display an image in HTML?",
    options: ["<image>", "<img>", "<src>", "<picture>"],
    correctAnswer: "<img>"
  },
  {
    question: "Which HTML tag is used to create an unordered list?",
    options: ["<ol>", "<list>", "<ul>", "<li>"],
    correctAnswer: "<ul>"
  },
  {
    question: "Which tag is used to create a form in HTML?",
    options: ["<input>", "<form>", "<fieldset>", "<submit>"],
    correctAnswer: "<form>"
  },
  {
    question: "Which HTML element is used for the main heading of a page?",
    options: ["<heading>", "<h6>", "<head>", "<h1>"],
    correctAnswer: "<h1>"
  }
  ],
  CSS: [
      {
    question: "Which CSS property is used to change the text color?",
    options: ["font-color", "text-color", "color", "foreground"],
    correctAnswer: "color"
  },
  {
    question: "Which CSS property is used to change the background color?",
    options: ["background-color", "bg-color", "color-background", "background"],
    correctAnswer: "background-color"
  },
  {
    question: "Which CSS property is used to make an element a flex container?",
    options: ["display: flex", "position: flex", "flex: display", "layout: flex"],
    correctAnswer: "display: flex"
  },
  {
    question: "Which part of the CSS box model represents the space inside the border?",
    options: ["Margin", "Padding", "Outline", "Spacing"],
    correctAnswer: "Padding"
  },
  {
    question: "Which CSS layout system is commonly used to create two-dimensional layouts with rows and columns?",
    options: ["Flexbox", "Grid", "Float", "Position"],
    correctAnswer: "Grid"
  }
  ],
  JavaScript: [
      {
    question: "Which keyword is used to declare a variable whose value can be changed?",
    options: ["const", "let", "fixed", "static"],
    correctAnswer: "let"
  },
  {
    question: "Which of the following is a JavaScript data type?",
    options: ["String", "HTML", "CSS", "Element"],
    correctAnswer: "String"
  },
  {
    question: "Which keyword is used to define a function in JavaScript?",
    options: ["function", "def", "func", "method"],
    correctAnswer: "function"
  },
  {
    question: "Which method is used to add an element to the end of a JavaScript array?",
    options: ["add()", "insert()", "push()", "append()"],
    correctAnswer: "push()"
  },
  {
    question: "Which method is commonly used to select an HTML element by its ID?",
    options: [
      "document.getElementById()",
      "document.getElement()",
      "document.selectId()",
      "document.findById()"
    ],
    correctAnswer: "document.getElementById()"
  }
  ],
  "Git/GitHub": [
    {
    question: "Which command is used to create a new Git repository?",
    options: ["git start", "git init", "git create", "git new"],
    correctAnswer: "git init"
  },
  {
    question: "Which command is used to download an existing repository from GitHub?",
    options: ["git download", "git clone", "git pull-new", "git copy"],
    correctAnswer: "git clone"
  },
  {
    question: "Which command is used to stage changes before committing?",
    options: ["git stage", "git add", "git save", "git prepare"],
    correctAnswer: "git add"
  },
  {
    question: "Which command is used to save staged changes to the local Git repository?",
    options: ["git save", "git push", "git commit", "git store"],
    correctAnswer: "git commit"
  },
  {
    question: "Which command is commonly used to upload local commits to a remote repository such as GitHub?",
    options: ["git upload", "git send", "git push", "git publish"],
    correctAnswer: "git push"
  }
  ],
  React: [ {
    question: "What is React mainly used for?",
    options: [
      "Building user interfaces",
      "Managing databases",
      "Creating operating systems",
      "Writing SQL queries"
    ],
    correctAnswer: "Building user interfaces"
  },
  {
    question: "What is a React component?",
    options: [
      "A reusable UI building block",
      "A database table",
      "A CSS property",
      "A Git command"
    ],
    correctAnswer: "A reusable UI building block"
  },
  {
    question: "What syntax is commonly used to write HTML-like elements inside JavaScript in React?",
    options: ["JSX", "XML", "HTML5", "Template CSS"],
    correctAnswer: "JSX"
  },
  {
    question: "What are props used for in React?",
    options: [
      "Passing data to components",
      "Styling the entire application",
      "Creating a database",
      "Installing packages"
    ],
    correctAnswer: "Passing data to components"
  },
  {
    question: "Which React Hook is commonly used to manage state in a functional component?",
    options: ["useData", "useState", "useComponent", "useValue"],
    correctAnswer: "useState"
  }]
};

export default assessmentData;