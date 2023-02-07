const commentCounter = (domContainerId) => {
  const container = document.querySelectorAll(`#${domContainerId} li`);
  return container.length;
};

export default commentCounter;