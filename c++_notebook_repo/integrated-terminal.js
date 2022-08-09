// https://www.youtube.com/watch?v=vhDBbbMJWoY&t=1149s
var term = new Terminal();
term.open(document.querySelector(".output"));
term.write("hello world");
term.onData(e =>{
    term.write(e);
});