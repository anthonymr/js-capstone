const commentCounter = function (domContainerId) {
  const container = document.querySelectorAll(`#${domContainerId} li`);
  if (NodeList.prototype.isPrototypeOf(container)) {
    return container.length;
  } else {
    return 0;
  }
}

export default commentCounter;