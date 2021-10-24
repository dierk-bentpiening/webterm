module.exports = {
  config: {
      // choose either `'stable'` for receiving highly polished,
      // or `'canary'` for less polished but more frequent updates
      updateChannel: 'stable',
      // default font size in pixels for all tabs
      fontSize: 9,
      // font family with optional fallbacks
      fontFamily: 'Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console", monospace',
      // default font weight: 'normal' or 'bold'
      fontWeight: 'normal',
      // font weight for bold characters: 'normal' or 'bold'
      fontWeightBold: 'bold',
      // line height as a relative unit
      lineHeight: 1,
      // letter spacing as a relative unit
      letterSpacing: 0,
      // terminal cursor background color and opacity (hex, rgb, hsl, hsv, hwb or cmyk)
      cursorColor: 'rgba(248,28,229,0.8)',
      // terminal text color under BLOCK cursor
      cursorAccentColor: '#000',
      // `'BEAM'` for |, `'UNDERLINE'` for _, `'BLOCK'` for █
      cursorShape: 'BLOCK',
      // set to `true` (without backticks and without quotes) for blinking cursor
      cursorBlink: false,
      // color of the text
      foregroundColor: '#fff',
      // terminal background color
      // opacity is only supported on macOS
      backgroundColor: '#000',
      // terminal selection color
      selectionColor: 'rgba(248,28,229,0.3)',
      // border color (window, tabs)
      borderColor: '#333',
      // custom CSS to embed in the main window
      css: '',
      // custom CSS to embed in the terminal window
      termCSS: '',
      // set custom startup directory (must be an absolute path)
      workingDirectory: '',
      // if you're using a Linux setup which show native menus, set to false
      // default: `true` on Linux, `true` on Windows, ignored on macOS
      showHamburgerMenu: '',
      // set to `false` (without backticks and without quotes) if you want to hide the minimize, maximize and close buttons
      // additionally, set to `'left'` if you want them on the left, like in Ubuntu
      // default: `true` (without backticks and without quotes) on Windows and Linux, ignored on macOS
      showWindowControls: '',
      // custom padding (CSS format, i.e.: `top right bottom left`)
      padding: '12px 14px 18px',
      // the full list. if you're going to provide the full color palette,
      // including the 6 x 6 color cubes and the grayscale map, just provide
      // an array here instead of a color map object
      colors: {
          black: '#000000',
          red: '#C51E14',
          green: '#1DC121',
          yellow: '#C7C329',
          blue: '#0A2FC4',
          magenta: '#C839C5',
          cyan: '#20C5C6',
          white: '#C7C7C7',
          lightBlack: '#686868',
          lightRed: '#FD6F6B',
          lightGreen: '#67F86F',
          lightYellow: '#FFFA72',
          lightBlue: '#6A76FB',
          lightMagenta: '#FD7CFC',
          lightCyan: '#68FDFE',
          lightWhite: '#FFFFFF',
          limeGreen: '#32CD32',
          lightCoral: '#F08080',
      },
      // the shell to run when spawning a new session (i.e. /usr/local/bin/fish)
      // if left empty, your system's login shell will be used by default
      //
      // Windows
      // - Make sure to use a full path if the binary name doesn't work
      // - Remove `--login` in shellArgs
      //
      // Windows Subsystem for Linux (WSL) - previously Bash on Windows
      // - Example: `C:\\Windows\\System32\\wsl.exe`
      //
      // Git-bash on Windows
      // - Example: `C:\\Program Files\\Git\\bin\\bash.exe`
      //
      // PowerShell on Windows
      // - Example: `C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`
      //
      // Cygwin
      // - Example: `C:\\cygwin64\\bin\\bash.exe`
      shell: '',
      // for setting shell arguments (i.e. for using interactive shellArgs: `['-i']`)
      // by default `['--login']` will be used
      shellArgs: ['--login'],
      // for environment variables
      env: {},
      // Supported Options:
      //  1. 'SOUND' -> Enables the bell as a sound
      //  2. false: turns off the bell
      bell: 'SOUND',
      // An absolute file path to a sound file on the machine.
      // bellSoundURL: '/path/to/sound/file',
      // if `true` (without backticks and without quotes), selected text will automatically be copied to the clipboard
      copyOnSelect: false,

      defaultSSHApp: true,

      quickEdit: false,

      macOptionSelectionMode: 'vertical',

      webGLRenderer: true,
      webLinksActivationKey: '',

      disableLigatures: true,
      disableAutoUpdates: false,
  },

  plugins: [
      "git-falcon9",
      "webtermline",
      "webtermcwd",
      //"webterm-github-dark-dimmed"
      "webterm-gruv"
  ],

  localPlugins: [],
  keymaps: {

  },
};
