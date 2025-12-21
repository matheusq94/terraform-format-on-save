// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {

		if ((document.fileName.endsWith('.tf')) || (document.fileName.endsWith('.tfvars'))) {
			const terminal = vscode.window.createTerminal({ hideFromUser: true })
			terminal.sendText(` terraform fmt ${document.fileName}`)
		}
	})
	
	context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() {}
