!macro customInstall
  WriteRegStr HKCU "Software\Classes\Directory\Background\shell\webterm" "" "Open webterm here"
  WriteRegStr HKCU "Software\Classes\Directory\Background\shell\webterm" "Icon" "$appExe"
  WriteRegStr HKCU "Software\Classes\Directory\Background\shell\webterm\command" "" `$appExe "%V"`

  WriteRegStr HKCU "Software\Classes\Directory\shell\webterm" "" "Open webterm here"
  WriteRegStr HKCU "Software\Classes\Directory\shell\webterm" "Icon" "$appExe"
  WriteRegStr HKCU "Software\Classes\Directory\shell\webterm\command" "" `$appExe "%V"`

  WriteRegStr HKCU "Software\Classes\Drive\shell\webterm" "" "Open webterm here"
  WriteRegStr HKCU "Software\Classes\Drive\shell\webterm" "Icon" "$appExe"
  WriteRegStr HKCU "Software\Classes\Drive\shell\webterm\command" "" `$appExe "%V"`
!macroend

!macro customUnInstall
  DeleteRegKey HKCU "Software\Classes\Directory\Background\shell\webterm"
  DeleteRegKey HKCU "Software\Classes\Directory\shell\webterm"
  DeleteRegKey HKCU "Software\Classes\Drive\shell\webterm"
!macroend

!macro customInstallMode
  StrCpy $isForceCurrentInstall "1"
!macroend

!macro customInit
  IfFileExists $LOCALAPPDATA\webterm\Update.exe 0 +2
  nsExec::Exec '"$LOCALAPPDATA\webterm\Update.exe" --uninstall -s'
!macroend
