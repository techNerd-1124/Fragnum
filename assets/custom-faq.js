class AccordionElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.tabHeader = this.querySelector(".accordion__item--question");
    this.tabContent = this.querySelector(".accordion__item--answer");

    this.tabHeader.addEventListener("click", this.handleToggle.bind(this));
  }

  handleToggle() {
    const isOpen = this.hasAttribute("open");

    document.querySelectorAll("accordion-element[open]").forEach((el) => {
      if (el !== this) el.closeAccordion();
    });

    if (isOpen) {
      this.closeAccordion();
      this.tabHeader?.classList.remove("red");
    } else {
      this.openAccordion();
      this.tabHeader?.classList.add("red");
    }
  }

  openAccordion() {
    this.setAttribute("open", "");
    this.tabHeader.setAttribute("aria-expanded", "true");

    this.tabContent.style.maxHeight = this.tabContent.scrollHeight + "px";

    this.tabContent.addEventListener(
      "transitionend",
      () => {
        if (this.hasAttribute("open")) {
          this.tabContent.style.maxHeight = "none";
        }
      },
      { once: true }
    );
  }

  closeAccordion() {
    this.removeAttribute("open");
    this.tabHeader.setAttribute("aria-expanded", "false");

    this.tabContent.style.maxHeight = this.tabContent.scrollHeight + "px";
    requestAnimationFrame(() => {
      this.tabContent.style.maxHeight = "0px";
    });
  }
}

customElements.define("accordion-element", AccordionElement);

document.addEventListener("DOMContentLoaded", () => {
  const faq = document.querySelector(".custom__faq--accordions");
  const img = document.querySelector(".custom__faq--media img");

  function syncHeight() {
    if (window.innerWidth >= 768 && img && faq) {
      faq.style.maxHeight = img.clientHeight + "px";
    } else if (faq) {
      faq.style.maxHeight = "none";
    }
  }

  if (img) {
    img.addEventListener("load", syncHeight);
  }
  window.addEventListener("resize", syncHeight);

  syncHeight();
});
