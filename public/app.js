document.addEventListener("click", (e) => {
  if (e.target.dataset.type === "remove") {
    remove(e.target.dataset.id).then(e.target.closest("li").remove());
  }

  if (e.target.dataset.type === "edit") {
    const data = prompt("Enter the title:");

    if (data === "") alert("Enter the title!");
    else {
      edit(e.target.dataset.id, data).then(() => {
        let itemTitle = e.target.closest("li").children[0];
        itemTitle.innerText = data;
      });
    }
  }
});

async function remove(id) {
  await fetch(`${id}`, { method: "DELETE" });
}

async function edit(id, data) {
  await fetch(`${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: data }),
  });
}
