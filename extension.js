const path = require('path');
const vscode = require('vscode');

function get_file_and_folder_name(file) {
	let parsed = path.parse(file);
	return { folder: path.dirname(file), name: parsed.name, name_w_extension: parsed.name + parsed.ext }
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Header / Source Side-By-Side is installed and active!');
	let disposable = vscode.commands.registerCommand('header-source-side-by-side.do', function () {
		let current_open_docs = vscode.window.visibleTextEditors;
		let active_doc = vscode.window.activeTextEditor;
		let ff = get_file_and_folder_name(active_doc.document.fileName);

		let active_column = active_doc.viewColumn;
		let total_columns = vscode.window.visibleTextEditors.length;
		if (active_column > 2)
			active_column = 1;

		vscode.workspace.findFiles(ff.name + ".*", ff.name_w_extension).then(files => {
			files.forEach(file => {
				console.log(file.path);
				vscode.workspace.openTextDocument(file.path).then(file => {
					vscode.window.showTextDocument(file).then(fin => {
						if (active_column == 2) {
							vscode.commands.executeCommand('moveActiveEditor', { to: 'left', by: 'group' })
						} else if (active_column == 1) {
							vscode.commands.executeCommand('moveActiveEditor', { to: 'right', by: 'group' })
						}
					});
				})
			});
		});

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
