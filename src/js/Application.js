import EventEmitter from "eventemitter3";
import Beat from "./Beat";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();

    const lyrics = ["Ah", "ha", "ha", "ha", "stayin` alive", "stayin` alive"];
    let count = 0;

    this._beat = new Beat();

    this._beat.addListener(Beat.events.BIT, () => {
      if (count < lyrics.length) {
        document
          .querySelector(".main")
          .appendChild(this._create(lyrics[count]));
      } else {
        this._beat.removeListener(Beat.events.BIT);
      }
      count++;
    });

    this.emit(Application.events.READY);
  }

  _create(lyricText) {
    const message = document.createElement("div");
    message.classList.add("message");
    message.innerText = lyricText;
    return message;
  }
}
