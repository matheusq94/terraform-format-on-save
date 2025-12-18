// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec } from "child_process";

let terminal: vscode.Terminal;

function checkCommandExists(command: string): Promise<boolean> {
    return new Promise((resolve) => {
        exec(`command -v ${command}`, (error: string, stdout: string) => {
            resolve(!error && stdout.trim().length > 0);
        });
    });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
    const terraformExists = await checkCommandExists("terraform");
    const tofuExists = await checkCommandExists("tofu");
    
    if (!terraformExists && !tofuExists) {
        vscode.window.showErrorMessage("Neither terraform nor tofu command is available.");
        return;
    }
    
    function ensureTerminal() {
        if (!terminal || terminal.exitStatus !== undefined) {
            terminal = vscode.window.createTerminal({ hideFromUser: true });
        }
    }

    const disposable = vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        if (document.fileName.endsWith(".tf") || document.fileName.endsWith(".tfvars")) {
            ensureTerminal();
            terminal.sendText(`tofu fmt ${document.fileName}`);
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
    if (terminal) {
        terminal.dispose();
    }
}


