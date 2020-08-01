const sqlEditor = CodeMirror.fromTextArea(document.getElementById("sqlEditor"), {
    mode: "text/x-sparksql", // spark sql模式
    tabSize: 4,
    styleActiveLine: true, // 行高亮
    lineNumbers: true,	//显示行号
    theme: "dracula",	//设置主题
    lineWrapping: true, // 自动换行
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    matchBrackets: true,	//括号匹配
    extraKeys: {
        "Ctrl": "autocomplete", // tab键自动补全
        'Ctrl-F': formatSQL,  // Ctrl+F 实现格式化
    },
    hintOptions: {
        tables: {
            table1_xxx: [],
            table2_xxx: ['id', 'name']
        }
    },
});

function formatSQL() {
    let originSQL = "";
    originSQL = this.sqlEditor.getValue();
    this.sqlEditor.setValue(sqlFormatter.format(originSQL));
}


sqlEditor.on('keyup', (cm, event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90 || (event.keyCode >=97 && event.keyCode < 122) || (event.keyCode >=46 && event.keyCode <= 57)) {        
        CodeMirror.commands.autocomplete(cm, null, {completeSingle:false});
    }
});

// 自定义关键字高亮显示
const SQL_CUSTOM_KEYWORDS = ['color', 'datasource', 'ak', 'sk'];
SQL_CUSTOM_KEYWORDS.forEach(words => {
    CodeMirror.resolveMode("text/x-sparksql").keywords[words] = true;
});