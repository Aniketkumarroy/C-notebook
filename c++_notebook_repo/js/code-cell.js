// this code will autoresize our text area based on the no. of input lines /////////
textarea = document.querySelectorAll(".code-input");                             //
for (let index = 0; index < textarea.length; index++) {                          //
    textarea[index].addEventListener('input', autoResize, false);                //
}                                                                                //
                                                                                 //
function autoResize() {                                                          //
    this.style.height = 'auto';                                                  //
    this.style.height = this.scrollHeight + 'px';                                //
}                                                                                //
///////////////////////////////////////////////////////////////////////////////////

// this function will copy inputs from textarea and paste them in code tag   //
function update(text) {
    let result_element = document.querySelector(".highlighted-code");       //
    // Update code
    result_element.innerText = text;
    // Syntax Highlight
    hljs.highlightAll();
    // this adjustment is necessary since hljs.highlightAll(); interfere with the padding of code tag, so after applyling hljs.highlightAll(); we need to reset the padding
    result_element.style.paddingTop = '0px';
    result_element.style.paddingBottom = '0px';
    result_element.style.paddingLeft = '20px';
    result_element.style.paddingRight = '20px';
  }