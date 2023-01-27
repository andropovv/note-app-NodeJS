const fs = require("fs/promises");
const path = require("path");

const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function writeFile(path, data) {
  await fs.writeFile(path, JSON.stringify(data));
}

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await writeFile(notesPath, notes);
  console.log(chalk.green("Note was added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  if (!notes) return [];
  else {
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
  }
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.green("List of notes"));
  notes.forEach((note) => console.log(`${note.id}: ${chalk.blue(note.title)}`));
}

async function removeNote(id) {
  const notes = await getNotes();
  const filteredNotes = notes.filter((n) => n.id !== id);

  if (filteredNotes.length === notes.length)
    console.log(chalk.red("Id isn't correct"));
  else {
    await writeFile(notesPath, filteredNotes);
    console.log(chalk.green(`Note ${id} was deleted`));
  }
}

async function editNote(id, title) {
  const notes = await getNotes();

  notes.map((n) => {
    if (n.id === id) n.title = title;
  });

  await writeFile(notesPath, notes);
}

module.exports = {
  addNote,
  removeNote,
  getNotes,
  editNote,
};
