import {CONFIG_LOAD, CONFIG_RELOAD} from '../constants/config';
import {webtermActions} from '../hyper';
import {configOptions} from '../config';

export function loadConfig(config: configOptions): webtermActions {
  return {
    type: CONFIG_LOAD,
    config
  };
}

export function reloadConfig(config: configOptions): webtermActions {
  const now = Date.now();
  return {
    type: CONFIG_RELOAD,
    config,
    now
  };
}
