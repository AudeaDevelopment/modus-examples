export const languages = [
  'Python',
  'R',
  'Bash',
  'C',
  'C++',
  'Perl',
  'Ruby',
  'Java',
  'JavaScript',
  'PHP'
];

export const defaultText = {
  JavaScript:
    'const go = () => {\n const message = "Hello, world.";\n  console.log(message);\n}',
  Python: 'print("Hello, world!")\n',
  R: 'myString <- "Hello, World!"\nprint ( myString)\n',
  Bash: '#!/bin/bash\necho "hello world"\n',
  C:
    '#include <stdio.h>\nint main()\n{\nprintf("Hello, World!");\nreturn 0;\n}\n',
  'C++':
    '#include <iostream>\nusing namespace std;\n\nint main()\n{\ncout << "Hello, World!";\nreturn 0;\n}\n',
  Perl: '#!/usr/bin/perl\nuse warnings;\nprint("Hello World\n");\n',
  Ruby: "puts 'Hello, world!'\n",
  Java:
    'public class HelloWorld {\n\npublic static void main(String[] args) {\nSystem.out.println("Hello, World");\n}\n}\n',
  PHP:
    "<html>\n<head>\n<title>PHP Test</title>\n</head>\n<body>\n<?php echo '<p>Hello World</p>'; ?>\n</body>\n</html>\n"
};
