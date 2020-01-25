const askPath = (currentPath = null): string => {
  let panel = NSOpenPanel.openPanel();
  panel.setMessage("Choose a location...");
  panel.setPrompt("Select");
  panel.setCanChooseDirectories(true)
  panel.setCanChooseFiles(false)
  panel.setCanCreateDirectories(true);
  panel.setAllowsMultipleSelection(false)
  panel.setShowsHiddenFiles(false)
  panel.setExtensionHidden(false)

  if (currentPath != null && currentPath != undefined) {
    let url = [NSURL fileURLWithPath: currentPath]
    panel.setDirectoryURL(url)
  }

  const buttonPressed = panel.runModal()
  const newURL = panel.URL()
  panel.close()
  panel = null
  if (buttonPressed == NSFileHandlingPanelOKButton) {
    return newURL.path() + ''
  } else {
    throw '';
  }
}

export default askPath;