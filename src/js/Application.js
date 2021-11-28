import EventEmitter from "eventemitter3";
import Beat from "./Beat";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  _create(text) {
    const message = document.createElement("div");
    message.classList.add("message");
    message.innerText = text;

    document.querySelector(".main").appendChild(message);
  }

  constructor() {
    super();

    const lyrics = ["Ah", "ha", "ha", "ha", "stayin` alive", "stayin` alive"];
    let count = 0;

    this._beat = new Beat();

    this._beat.addListener(Beat.events.BIT, () => {
      this._create(lyrics[count++ % lyrics.length]);
    });

    this.emit(Application.events.READY);
  }
}
