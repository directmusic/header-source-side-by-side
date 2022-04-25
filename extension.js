var fs = require('fs');
const path = require('path');
const vscode = require('vscode');

function get_file_and_folder_name(file) {
	let parsed = path.parse(file);
	return { dir: path.dirname(file), name: parsed.name, name_w_extension: parsed.name + parsed.ext }
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Header / Source Side-By-Side is installed and active!');

	let hs_switch = vscode.commands.registerCommand('header-source-side-by-side.switch_file_in_same_window', function () {
		let active_doc = vscode.window.activeTextEditor;
		let ff = get_file_and_folder_name(active_doc.document.fileName);
		fs.readdir(ff.dir, function (err, files) {
			if (err) {
				return console.log('Unable to scan directory: ' + err);
			}
			files.forEach(function (file) {
				let split = file.split(".");
				if (split.length < 1)
					return;

				let name = split[0];
				let extension = split[split.length - 1];

				if (name == ff.name && file != ff.name_w_extension) {
					console.log("true " + file + " ff " + ff.name_w_extension);

					// Open Editor
					vscode.workspace.openTextDocument(ff.dir + "/" + file).then(file => {
						vscode.window.showTextDocument(file);
					})
				}
			});

		});
	});

	let side_by_side = vscode.commands.registerCommand('header-source-side-by-side.side-by-side', function () {
		let current_open_docs = vscode.window.visibleTextEditors;
		let active_doc = vscode.window.activeTextEditor;
		let ff = get_file_and_folder_name(active_doc.document.fileName);

		let active_column = active_doc.viewColumn;
		let total_columns = vscode.window.visibleTextEditors.length;
		if (active_column > 2)
			active_column = 1;

		fs.readdir(ff.dir, function (err, files) {
			if (err) {
				return console.log('Unable to scan directory: ' + err);
			}

			files.forEach(function (file) {
				let split = file.split(".");
				if (split.length < 1)
					return;

				let name = split[0];
				let extension = split[split.length - 1];

				if (name == ff.name && file != ff.name_w_extension) {
					console.log("true " + file + " ff " + ff.name_w_extension);
					let open_columns = vscode.window.visibleTextEditors;
					let found_visible_column_with_winning_file = false;

					for (let i = 0; i < open_columns.length; i++) {
						const column = open_columns[i];

						if (column.document.fileName == ff.dir + "/" + file) {
							// skip this one because it's our current one
							if (i == active_column)
								continue;
							// we found a file in editor id (i) switch to (i) editor.
							if (i == 1)
								vscode.commands.executeCommand('workbench.action.focusFirstEditorGroup')
							else if (i == 2)
								vscode.commands.executeCommand('workbench.action.focusSecondEditorGroup')
							found_visible_column_with_winning_file = true;
						}
					}

					// skip opening a new eidtor if we found one
					if (found_visible_column_with_winning_file)
						return;

					// Open Editor
					vscode.workspace.openTextDocument(ff.dir + "/" + file).then(file => {
						vscode.window.showTextDocument(file).then(fin => {
							if (active_column == 2) {
								vscode.commands.executeCommand('moveActiveEditor', { to: 'left', by: 'group' })
							} else if (active_column == 1) {
								vscode.commands.executeCommand('moveActiveEditor', { to: 'right', by: 'group' })
							}
						});
					})
				}

			});
		});
	});

	context.subscriptions.push(side_by_side);
	context.subscriptions.push(hs_switch);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
