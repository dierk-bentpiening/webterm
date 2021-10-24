import * as Registry from 'native-reg';
import type {HKEY} from 'native-reg';

const appPath = `"${process.execPath}"`;
const regKeys = [
  `Software\\Classes\\Directory\\Background\\shell\\webterm`,
  `Software\\Classes\\Directory\\shell\\webterm`,
  `Software\\Classes\\Drive\\shell\\webterm`
];
const regParts = [
  {key: 'command', name: '', value: `${appPath} "%V"`},
  {name: '', value: 'Open webterm here'},
  {name: 'Icon', value: `${appPath}`}
];

function addValues(webtermKey: HKEY, commandKey: HKEY) {
  try {
    Registry.setValueSZ(webtermKey, regParts[1].name, regParts[1].value);
  } catch (error) {
    console.error(error);
  }
  try {
    Registry.setValueSZ(webtermKey, regParts[2].name, regParts[2].value);
  } catch (err) {
    console.error(err);
  }
  try {
    Registry.setValueSZ(commandKey, regParts[0].name, regParts[0].value);
  } catch (err_) {
    console.error(err_);
  }
}

export const add = () => {
  regKeys.forEach((regKey) => {
    try {
      const webtermKey =
        Registry.openKey(Registry.HKCU, regKey, Registry.Access.ALL_ACCESS) ||
        Registry.createKey(Registry.HKCU, regKey, Registry.Access.ALL_ACCESS);
      const commandKey =
        Registry.openKey(Registry.HKCU, `${regKey}\\${regParts[0].key}`, Registry.Access.ALL_ACCESS) ||
        Registry.createKey(Registry.HKCU, `${regKey}\\${regParts[0].key}`, Registry.Access.ALL_ACCESS);
      addValues(webtermKey, commandKey);
      Registry.closeKey(webtermKey);
      Registry.closeKey(commandKey);
    } catch (error) {
      console.error(error);
    }
  });
};

export const remove = () => {
  regKeys.forEach((regKey) => {
    try {
      Registry.deleteTree(Registry.HKCU, regKey);
    } catch (err) {
      console.error(err);
    }
  });
};
