export class Modal {
  constructor(contentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.contentTemplateEl = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById("modal-template");
  }

  show() {
    if ("content" in document.createElement("template")) {

      // The Document object's importNode() method creates a copy of a Node or DocumentFragment 
      // from another document, to be inserted into the current document later.
      // It collects the nodes from the imported document in a document fragment and returns it.
      const modalElements = document.importNode(
        this.modalTemplateEl.content,
        true
      );

      this.modalElement = modalElements.querySelector(".modal");
      this.backdropElement = modalElements.querySelector(".backdrop");

      const contentElement = document.importNode(
        this.contentTemplateEl.content,
        true
      );

      this.modalElement.appendChild(contentElement);

      // The insertAdjacentElement() method of the Element interface inserts a given element node at a given position relative to the element it is invoked upon.
      document.body.insertAdjacentElement("afterbegin", this.modalElement);
      document.body.insertAdjacentElement("afterbegin", this.backdropElement);
    } else {
      alert(this.fallbackText);
    }
  }

  hide() {
    if (this.modalElement) {
      document.body.removeChild(this.modalElement);
      document.body.removeChild(this.backdropElement);
      this.modalElement = null;
      this.backdropElement = null;
    }
  }
}
