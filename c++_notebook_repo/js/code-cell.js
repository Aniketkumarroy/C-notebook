// this part will run only once i.e. loading of the page /////////////////////////////////////////////////////////////////////////////////
// this code will autoresize our text area based on the no. of input lines ////////                                                    //
// credits to Stackoverflow ///////////////////////////////////////////////////////                                                     //
textarea = document.querySelectorAll(".code-input");                             //                                                     //
for (let index = 0; index < textarea.length; index++) {                          //                                                     //
    textarea[index].addEventListener('input', autoResize, false);                //                                                     //
}                                                                                //                                                     //
                                                                                 //                                                     //
function autoResize() {                                                          //                                                     //
    this.style.height = 'auto';                                                  //                                                     //
    this.style.height = this.scrollHeight + 'px';                                //                                                     //
}                                                                                //                                                     //
///////////////////////////////////////////////////////////////////////////////////                                                     //
var cell_track = {}; // this will keep track for the code cell border highlighting                                                      //
cell_track["1"] = true; // for the first cell, border will be always highlighted(1px solid white)                                       //
var no_of_code_cells = 1; // this will assign unique no. to the newly added code cells                                                  //
var no_of_markdown_cells = 0; // this will assign unique no. to the newly added markdown cells                                          //
let output = document.getElementById("output-" + no_of_code_cells); // remember current value of no_of_code_cells is 1 now              //
if (output.innerHTML == ""){ // if thre is no content inside the output                                                                 //
    output.style.display = "none"; // we will make its display none                                                                     //
}else{                                                                                                                                  //
    output.style.display = "initial"; // else we need to show it                                                                        //
}                                                                                                                                       //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// this function will copy inputs from textarea and paste them in code tag   //
function update(text, id) {
    let result_element = document.getElementById("highlighted-code-" + id.charAt(id.length - 1));       // since we had id, we can extract its last character to know the unique no. associated with that element. then we will just append this unique no. to its class to get its id
    // Update code
    result_element.innerText = text;
    // Syntax Highlight
    hljs.highlightAll(); // syntax highlighting
    // this adjustments is necessary since hljs.highlightAll(); interfere with the padding of code tag, so after applyling hljs.highlightAll(); we need to reset the padding
    result_element.style.paddingTop = '0px';
    result_element.style.paddingBottom = '0px';
    result_element.style.paddingLeft = '20px';
    result_element.style.paddingRight = '20px';
}
function add_cells_below() { // this will add code cells by updating the innerHTML of editor
    no_of_code_cells++; // update it so that we can give it a unique id no.
    // code cell html code
    let code_cell =     `<div id ='code-cell-` + no_of_code_cells + `' class='code-cell' onmouseover="additional_utilities(this.id,'block');" onmouseleave="additional_utilities(this.id,'none');">
                            <!-- our run button container to run code cell -->
                            <div id='code-cell-btn-` + no_of_code_cells + `' class='code-cell-btn'>
                                <button>
                                    <img title='run' class='run-icon' src='../images/play-icon.png' alt='run'> <!-- run button icon -->
                                    <img title='running' class='running-icon' src='../images/loading-icon.gif' alt='running'> <!-- buffering icon -->
                                </button>
                            </div>
                            <!-- run button container ends -->

                            <!-- this will contain both our input and output blocks -->
                            <div id='code-cell-input-output-` + no_of_code_cells + `' class='code-cell-input-output'>
                                <!-- some more additional utilities buttons to be kept at top right of each cell -->
                                <div id='code-cell-other-util-btn-` + no_of_code_cells + `' class='code-cell-other-util-btn'>
                                    <button title='clean output of cell'>
                                        <img src='../images/clean-icon-white.png' alt='clean output'>
                                    </button>
                                    <button title='delete cell' onclick='delete_code_cell(this.parentNode.id);'>
                                        <img src='../images/delete-icon.png' alt='delete cell'>
                                    </button>
                                    <button title='add markdown cell'>
                                        <img src='../images/markdown-cell.png' alt='add markdown cell'>
                                    </button>
                                    <button title='toggle code editing' onclick="toggle_code_edit(this.parentNode.id);">
                                        <img src='../images/code-cell.png' alt='add code cell'>
                                    </button>
                                </div>
                                <!-- additional utilities buttons container ends -->
                                
                                <!-- this is the input part, code will be enterred in textarea and pre > code tag will be used for syntax highlighting -->
                                <textarea id="code-input-` + no_of_code_cells + `" class='code-input' wrap='off' cols='' rows='2' oninput='update(this.value, this.id);' onfocus="code_cell_focus(this.id, true);" onblur="code_cell_focus(this.id, false);"></textarea>
                                <pre id='highlight-area-` + no_of_code_cells + `' class='highlight-area'>
                                    <code id='highlighted-code-` + no_of_code_cells + `' class='highlighted-code highlight-area language-cpp'></code>
                                </pre>
                                <!-- input part ends -->

                                <!-- this is our output container, any output of the above code cell should be put inside it -->
                                <div id='output-` + no_of_code_cells + `' class='output'></div>
                                <!-- output container ends -->
                            </div>
                            <!-- input output block container ends -->
                        </div>`;
    editor = document.querySelector(".editor");
    editor.innerHTML = editor.innerHTML + "\n" + code_cell;
    let output = document.getElementById("output-" + no_of_code_cells);
    if (output.innerHTML == ""){ // if output is empty
        output.style.display = "none"; // display none
    }else{
        output.style.display = "initial"; // otherwise show
    }
    Object.getOwnPropertyNames(cell_track).forEach(element => {
        cell_track[element] = false; // remove the border of all the previous existing code cells
    });
    cell_track[no_of_code_cells] = true; // and add border to the newly added code cell
    hljs.highlightAll(); // activate highlighting
}
function delete_code_cell(id){ // delete code cell
    let code_cell = document.getElementById("code-cell-" + id.charAt(id.length - 1))
    while (code_cell.firstChild) { // removing all its child
        code_cell.removeChild(code_cell.firstChild);
    }
    code_cell.remove(); // removing it
    delete cell_track[id.charAt(id.length - 1)]; // since code cell is deleted, no need to have border highlighting for it
}

function add_markdown_cell(){ // adding markdown cell
    no_of_markdown_cells++; // update it everytime we produce a new markdown cell to give all of them a unique no.
    // our mardown cell html
    let markdown = `<div class="markdown" id="markdown-` + no_of_markdown_cells + `" onmouseover="markdown_btn_visibility(this.id, 'initial');" onmouseleave="markdown_btn_visibility(this.id, 'none');">
                        <div class="markdown-btn" id="markdown-btn-` + no_of_markdown_cells + `">
                            <button title="delete cell" onclick="delete_markdown_cell(this.parentNode.id);">
                                <img src="../images/delete-icon.png" alt="delete cell">
                            </button>
                            <button title="Edit markdown cell" onclick="make_markdown_editable(this.parentNode.id)">
                                <img src="../images/markdown-cell.png" alt="Edit markdown cell">
                            </button>
                        </div>
                        <div class="markdown-write" id="markdown-write-` + no_of_markdown_cells + `" contentEditable = "true" onblur="make_markdown_non_editable(this.id)"></div>
                    </div>`
    editor = document.querySelector(".editor");
    editor.innerHTML = editor.innerHTML + "\n" + markdown;
}
function delete_markdown_cell(id){ // deleting markdown cell
    let markdown_cell = document.getElementById("markdown-" + id.charAt(id.length - 1))
    while (markdown_cell.firstChild) { // removing all its child
        markdown_cell.removeChild(markdown_cell.firstChild);
    }
    markdown_cell.remove(); // removing it
}

function additional_utilities(id, Dspl){ // this function will show/hide the additional utilities button of no-active code cells
    if(!(cell_track[id.charAt(id.length - 1)])){ // if it is not the last selected code cell, we will hide its additional buttons when cursor is not hovering on it
        if(Dspl == "none"){
            document.getElementById("code-cell-other-util-btn-" + id.charAt(id.length - 1)).style.display = Dspl;
            document.getElementById("code-cell-btn-" + id.charAt(id.length - 1)).style.borderLeft = "none";
        }else{ // if it is the last selected code cells(i.e. after selecting this code cell, no other code cell is selected) we will not hide its additional utilities buttons
            document.getElementById("code-cell-other-util-btn-" + id.charAt(id.length - 1)).style.display = Dspl;
            document.getElementById("code-cell-btn-" + id.charAt(id.length - 1)).style.borderLeft = "1px solid white";
        }
    }
}
function code_cell_focus(id, value){ // change the border of the selected/last-selected code cell and hide the border of all the other code cells
    let no = id.charAt(id.length - 1);
    Object.getOwnPropertyNames(cell_track).forEach(element => {
        cell_track[element] = false; // hide border of all the other code cells
    });
    document.querySelectorAll(".code-cell-other-util-btn").forEach(element => {
        element.style.display = "none"; // hide the additional utilities buttons of all the other code cells
    });
    document.querySelectorAll(".code-cell-btn").forEach(element => {
        element.style.borderLeft = "none";
    });
    cell_track[no] = true; // show border for this code sell
    if(value == true){ // the cell is in focus, change its border look (3px solid rgb(32, 237, 32))
        document.getElementById("code-cell-btn-" + no).style.borderLeft = "3px solid rgb(32, 237, 32)";
        document.getElementById("code-cell-other-util-btn-" + no).style.border = "1px solid rgb(32, 237, 32)";
    }else{ // the cell is not in focus but it is the last selected cell, retain its original border(1px solid white)
        document.getElementById("code-cell-btn-" + no).style.borderLeft = "1px solid white";
        document.getElementById("code-cell-other-util-btn-" + no).style.border = "1px solid white";
    }
    document.getElementById("code-cell-other-util-btn-" + no).style.display = "initial"; // show its additional utilities buttons
}

function make_markdown_editable(id){ // making markdown cell editable
    document.getElementById("markdown-write-" + id.charAt(id.length - 1)).contentEditable = "true";
}
function make_markdown_non_editable(id){ // making markdown cell non-editable
    document.getElementById("markdown-write-" + id.charAt(id.length - 1)).contentEditable = "false";
}
function markdown_btn_visibility(id, Dspl){
    document.getElementById("markdown-btn-" + id.charAt(id.length - 1)).style.display = Dspl;
}
function toggle_code_edit(id){ // this function will make the code cell editable/non-editable
    let no = id.charAt(id.length - 1);
    let textarea = document.getElementById("code-input-" + no);
    let highlighted_code = document.getElementById("highlight-area-" + no);
    if(textarea.style.zIndex > highlighted_code.style.zIndex){
        textarea.style.zIndex = 0;
        highlighted_code.style.zIndex = 1;
    }
    else{
        textarea.style.zIndex = 1;
        highlighted_code.style.zIndex = 0;
    }
}