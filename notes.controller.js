const fs = require("fs/promises");
const path = require("path");

const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
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
  console.log(id);
  const notes = await getNotes();
  const filteredNotes = notes.filter((n) => n.id !== id);
  fs.truncate(notesPath);
  await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
  console.log(chalk.green(`Note ${id} was deleted`));
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
};
