# kallo-student-extension

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Created Using](https://img.shields.io/badge/JavaScript-98.2%25-green.svg)](https://wikipedia.org/wiki/JavaScript)
[![Code Style: Prettier](https://img.shields.io/badge/Code%20Style-Prettier-blue.svg)](https://prettier.io/)

[https://github.com/kallo-project/about](https://github.com/kallo-project/about)

----

### Usage
After cloning this repository, open the [background.js](https://github.com/kallo-project/kallo-student-extension/blob/main/background.js) file and on [line number two](https://github.com/kallo-project/kallo-student-extension/blob/main/background.js#L2), insert the URL to the back-end.

Example (let's say `http://localhost:8080` is the URL to our back-end):
```javascript
// Before:
const socket = io.connect('' /* Back-end URL */);

// After:
const socket = io.connect('http://localhost:8080' /* Back-end URL */);
```

NOTE: It is also a good idea to minify all the code and obfuscate some JavaScript files such as [background.js](https://github.com/kallo-project/kallo-student-extension/blob/main/background.js) and [index.js](https://github.com/kallo-project/kallo-student-extension/blob/main/index.js).

[Download Demo](https://github.com/kallo-project/kallo-student-extension/releases)

### Installing on Chrome
1. Nativate to `chrome://extensions/`
2. On the top right hand side, enable `Developer mode`
3. Click on `Load Unpacked` and load Kallo.

----

### Technologies Used
- [Chrome APIs](https://developer.chrome.com/extensions/api_index)
- [JavaScript](https://wikipedia.org/wiki/JavaScript)

----

### License
[MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2020 Kallo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
