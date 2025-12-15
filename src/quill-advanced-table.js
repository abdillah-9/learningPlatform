import Quill from "quill";

const Module = Quill.import("core/module");
const Delta = Quill.import("delta");
const TableContainer = Quill.import("formats/table-container");
const TableRow = Quill.import("formats/table-row");
const TableCell = Quill.import("formats/table-cell");

export default class AdvancedTableModule extends Module {
  constructor(quill, options) {
    super(quill, options);

    this.quill = quill;
    this.options = options;

    // Toolbar "table" button
    quill.getModule("toolbar")?.addHandler("table", () => this.insertTable());

    // Right-click context menu
    quill.root.addEventListener("contextmenu", this.openContextMenu.bind(this));

    // Create HTML menu container
    this.menu = this.createContextMenu();
    document.body.appendChild(this.menu);
  }

  /****************************
   * INSERT A NEW TABLE
   ****************************/
  insertTable(rows = 3, columns = 3) {
    const range = this.quill.getSelection(true);
    if (!range) return;

    const delta = new Delta()
      .retain(range.index)
      .insert({ table: { rows, columns } });

    this.quill.updateContents(delta, Quill.sources.USER);
  }

  /****************************
   * CONTEXT MENU SYSTEM
   ****************************/
  createContextMenu() {
    const menu = document.createElement("div");
    menu.style.position = "fixed";
    menu.style.zIndex = "9999";
    menu.style.background = "white";
    menu.style.border = "1px solid #ccc";
    menu.style.padding = "5px";
    menu.style.display = "none";
    menu.style.width = "180px";
    menu.className = "quill-table-menu";

    const items = [
      { label: "Insert Row Above", action: () => this.insertRow("above") },
      { label: "Insert Row Below", action: () => this.insertRow("below") },
      { label: "Insert Column Left", action: () => this.insertColumn("left") },
      { label: "Insert Column Right", action: () => this.insertColumn("right") },
      { label: "Merge Cells", action: () => this.mergeCells() },
      { label: "Unmerge Cells", action: () => this.unmergeCells() },
      { label: "Delete Row", action: () => this.deleteRow() },
      { label: "Delete Column", action: () => this.deleteColumn() },
      { label: "Delete Table", action: () => this.deleteTable() },
    ];

    items.forEach(({ label, action }) => {
      const item = document.createElement("div");
      item.innerText = label;
      item.style.padding = "6px";
      item.style.cursor = "pointer";

      item.onmouseenter = () => (item.style.background = "#eee");
      item.onmouseleave = () => (item.style.background = "transparent");
      item.onclick = () => {
        action();
        menu.style.display = "none";
      };

      menu.appendChild(item);
    });

    return menu;
  }

  openContextMenu(event) {
    const cell = event.target.closest("td, th");
    if (!cell) return;

    event.preventDefault();

    this.currentCell = cell;

    this.menu.style.left = `${event.clientX}px`;
    this.menu.style.top = `${event.clientY}px`;
    this.menu.style.display = "block";

    document.addEventListener("click", () => {
      this.menu.style.display = "none";
    }, { once: true });
  }

  /****************************
   * ROW & COLUMN OPERATIONS
   ****************************/
  insertRow(position) {
    const cell = this.currentCell;
    const row = cell.parentElement;
    const table = row.parentElement;

    const newRow = row.cloneNode(true); 
    newRow.querySelectorAll("td").forEach((td) => (td.innerHTML = ""));

    if (position === "above") table.insertBefore(newRow, row);
    else table.insertBefore(newRow, row.nextSibling);
  }

  insertColumn(position) {
    const cellIndex = [...this.currentCell.parentElement.children].indexOf(
      this.currentCell
    );
    const table = this.currentCell.closest("table");

    table.querySelectorAll("tr").forEach((row) => {
      const newCell = document.createElement("td");
      newCell.innerHTML = "";
      if (position === "left")
        row.insertBefore(newCell, row.children[cellIndex]);
      else row.insertBefore(newCell, row.children[cellIndex + 1]);
    });
  }

  deleteRow() {
    const row = this.currentCell.parentElement;
    row.remove();
  }

  deleteColumn() {
    const cellIndex = [...this.currentCell.parentElement.children].indexOf(
      this.currentCell
    );
    const table = this.currentCell.closest("table");

    table.querySelectorAll("tr").forEach((row) => {
      row.children[cellIndex]?.remove();
    });
  }

  deleteTable() {
    const table = this.currentCell.closest("table");
    table.remove();
  }

  /****************************
   * MERGE / UNMERGE
   ****************************/
  mergeCells() {
    const cell = this.currentCell;
    const next = cell.nextElementSibling;
    if (!next) return;
    cell.colSpan += 1;
    next.remove();
  }

  unmergeCells() {
    const cell = this.currentCell;
    const count = cell.colSpan;
    cell.colSpan = 1;

    const row = cell.parentElement;

    for (let i = 1; i < count; i++) {
      const newCell = document.createElement("td");
      newCell.innerHTML = "";
      row.insertBefore(newCell, cell.nextSibling);
    }
  }
}
