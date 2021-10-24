import {release} from 'os';
import {app, shell, MenuItemConstructorOptions, dialog, clipboard} from 'electron';
import {getConfig, getPlugins} from '../../config';
const {arch, env, platform, versions} = process;
import {version} from '../../package.json';

export default (commands: Record<string, string>, showAbout: () => void): MenuItemConstructorOptions => {
  const submenu: MenuItemConstructorOptions[] = [
    {
      label: `${app.name} Website`,
      click() {
        void shell.openExternal('https://gruppo-ib.com');
      }
    },
    {
      label: 'Report Issue',
      click(menuItem, focusedWindow) {
        const body = `<!--
  Hi there! Thank you for discovering and submitting an issue.
  Before you submit this; let's make sure of a few things.
  Please make sure the following boxes are ✅ if they are correct.
  If not, please try and fulfil these first.



\`\`\`json
${JSON.stringify(getConfig(), null, 2)}
\`\`\`
</details>
<details><summary><strong>plugins</strong></summary>

\`\`\`json
${JSON.stringify(getPlugins(), null, 2)}
\`\`\`
</details>`;

        const issueURL = `https://github.com/dierk-bentpiening/webterm/issues/new?body=${encodeURIComponent(body)}`;
        const copyAndSend = () => {
          clipboard.writeText(body);
          void shell.openExternal(
            `https://github.com/dierk-bentpiening/webterm/issues/new?body=${encodeURIComponent(
              '<!-- We have written the needed data into your clipboard because it was too large to send. ' +
                'Please paste. -->\n'
            )}`
          );
        };
        if (!focusedWindow) {
          copyAndSend();
        } else if (issueURL.length > 6144) {
          void dialog
            .showMessageBox(focusedWindow, {
              message:
                'There is too much data to send to GitHub directly. The data will be copied to the clipboard, ' +
                'please paste it into the GitHub issue page that will open.',
              type: 'warning',
              buttons: ['OK', 'Cancel']
            })
            .then((result) => {
              if (result.response === 0) {
                copyAndSend();
              }
            });
        } else {
          void shell.openExternal(issueURL);
        }
      }
    }
  ];

  if (process.platform !== 'darwin') {
    submenu.push(
      {type: 'separator'},
      {
        label: 'About WebTerm',
        click() {
          showAbout();
        }
      }
    );
  }
  return {
    role: 'help',
    submenu
  };
};
